import { z } from "zod";

// HTML sanitization regex patterns
const HTML_TAG_REGEX = /<[^>]*>/g;
const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const JAVASCRIPT_PROTOCOL_REGEX = /javascript:/gi;
const DATA_URL_REGEX = /data:[^;]*;base64,/gi;

/**
 * Sanitize HTML content by removing potentially dangerous elements
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  return input
    .replace(SCRIPT_REGEX, "") // Remove script tags
    .replace(JAVASCRIPT_PROTOCOL_REGEX, "") // Remove javascript: protocols
    .replace(DATA_URL_REGEX, "") // Remove data URLs
    .replace(HTML_TAG_REGEX, "") // Remove all HTML tags
    .trim();
}

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };

  return input.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
}

/**
 * Sanitize and validate guest name input
 */
export const guestNameSchema = z
  .string()
  .min(1, "Le nom est requis")
  .max(100, "Le nom ne peut pas dépasser 100 caractères")
  .regex(
    /^[a-zA-ZÀ-ÿ\s\-'\.]+$/,
    "Le nom contient des caractères non autorisés"
  )
  .transform((value) => sanitizeHtml(value.trim()));

/**
 * Sanitize and validate guest message input
 */
export const guestMessageSchema = z
  .string()
  .max(500, "Le message ne peut pas dépasser 500 caractères")
  .optional()
  .transform((value) => {
    if (!value) return null;
    const sanitized = sanitizeHtml(value.trim());
    return sanitized.length > 0 ? sanitized : null;
  });

/**
 * Validate attendance state
 */
export const attendanceSchema = z
  .object({
    thursday: z.boolean().nullable(),
  })
  .refine((data) => data.thursday !== null, {
    message: "Vous devez confirmer votre présence",
    path: ["attendance"],
  });

/**
 * Complete confirmation form validation schema
 */
export const confirmationFormSchema = z
  .object({
    name: guestNameSchema,
    message: guestMessageSchema,
    thursday: z.boolean().nullable(),
  })
  .refine((data) => data.thursday !== null, {
    message: "Vous devez confirmer votre présence",
    path: ["attendance"],
  });

/**
 * Sanitize and validate confirmation form data
 */
export function validateAndSanitizeConfirmationData(rawData: unknown) {
  try {
    return confirmationFormSchema.parse(rawData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((err: z.ZodIssue) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      throw new Error(
        `Données invalides: ${formattedErrors
          .map((e: { message: string }) => e.message)
          .join(", ")}`
      );
    }
    throw error;
  }
}

/**
 * Rate limiting helper (in-memory store for demo purposes)
 * In production, use Redis or a proper rate limiting service
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = identifier;

  let record = rateLimitStore.get(key);

  // Clean up expired records
  if (record && now > record.resetTime) {
    record = undefined;
  }

  if (!record) {
    record = { count: 0, resetTime: now + windowMs };
    rateLimitStore.set(key, record);
  }

  record.count++;

  const allowed = record.count <= maxRequests;
  const remaining = Math.max(0, maxRequests - record.count);

  return {
    allowed,
    remaining,
    resetTime: record.resetTime,
  };
}

/**
 * Clean up old rate limit records (call periodically)
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Clean up every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}
