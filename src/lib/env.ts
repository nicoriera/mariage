import { z } from "zod";

// Server-side schema with strict validation
const serverEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("Invalid Supabase URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "Supabase anon key is required"),
  ADMIN_PASSWORD: z
    .string()
    .min(8, "Admin password must be at least 8 characters"),
  IMGUR_CLIENT_ID: z.string().optional(),
  WEDDING_DATE: z.string().optional().default("2026-05-21"),
  WEDDING_LOCATION: z
    .string()
    .optional()
    .default("Restaurant Le Surfing, Seignosse"),
  COUPLE_NAMES: z.string().optional().default("Sandra & Nicolas"),
});

// Client-side schema with relaxed validation
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().default(""),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().default(""),
  ADMIN_PASSWORD: z.string().default("client-placeholder"),
  IMGUR_CLIENT_ID: z.string().optional(),
  WEDDING_DATE: z.string().default("2026-05-21"),
  WEDDING_LOCATION: z.string().default("Restaurant Le Surfing, Seignosse"),
  COUPLE_NAMES: z.string().default("Sandra & Nicolas"),
});

export type Env = z.infer<typeof serverEnvSchema>;

function validateEnv(): Env {
  const isClient = typeof window !== "undefined";

  const envData = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ADMIN_PASSWORD: isClient
      ? "client-placeholder"
      : process.env.ADMIN_PASSWORD,
    IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID,
    WEDDING_DATE: process.env.WEDDING_DATE,
    WEDDING_LOCATION: process.env.WEDDING_LOCATION,
    COUPLE_NAMES: process.env.COUPLE_NAMES,
  };

  try {
    if (isClient) {
      // Use relaxed validation on client
      return clientEnvSchema.parse(envData) as Env;
    } else {
      // Use strict validation on server
      return serverEnvSchema.parse(envData);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );

      if (isClient) {
        console.warn("Environment validation warnings (client):", missingVars);
        // Return defaults for client
        return clientEnvSchema.parse({}) as Env;
      }

      throw new Error(
        `Environment validation failed:\n${missingVars.join("\n")}`
      );
    }

    // Handle other errors or fallback
    if (isClient) {
      console.warn("Environment validation error (client):", error);
      return clientEnvSchema.parse({}) as Env;
    }

    console.error("Environment validation failed:", error);
    throw new Error("Environment validation failed");
  }
}

// Create a lazy-loaded env object to avoid initialization errors
let _env: Env | null = null;

export const env = new Proxy({} as Env, {
  get(target, prop) {
    if (!_env) {
      try {
        _env = validateEnv();
      } catch (error) {
        console.warn("Environment validation failed, using defaults:", error);
        // Return safe defaults
        _env = {
          NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
          NEXT_PUBLIC_SUPABASE_ANON_KEY:
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
          ADMIN_PASSWORD: "fallback-password",
          IMGUR_CLIENT_ID: undefined,
          WEDDING_DATE: "2026-05-21",
          WEDDING_LOCATION: "Restaurant Le Surfing, Seignosse",
          COUPLE_NAMES: "Sandra & Nicolas",
        };
      }
    }
    return _env[prop as keyof Env];
  },
});
