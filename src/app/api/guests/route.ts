import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import {
  validateAndSanitizeConfirmationData,
  checkRateLimit,
} from "../../../lib/input-sanitization";

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    const rateLimit = checkRateLimit(clientIP, 5, 60000); // 5 requests per minute

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Trop de tentatives. Veuillez attendre avant de réessayer.",
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(
              (rateLimit.resetTime - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const rawData = await request.json();
    const validatedData = validateAndSanitizeConfirmationData(rawData);

    // Insert into database
    const { data, error } = await supabase
      .from("guests")
      .insert([
        {
          name: validatedData.name,
          thursday: validatedData.thursday,
          message: validatedData.message,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);

      if (error.message.includes('relation "public.guests" does not exist')) {
        return NextResponse.json(
          { error: "Configuration de base de données manquante" },
          { status: 500 }
        );
      }

      if (error.code === "23505") {
        // Unique constraint violation
        return NextResponse.json(
          { error: "Une réponse avec ce nom existe déjà" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Réponse enregistrée avec succès",
    });
  } catch (error) {
    console.error("API error:", error);

    if (error instanceof Error && error.message.includes("Données invalides")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // More generous rate limit for read operations
    const rateLimit = checkRateLimit(`${clientIP}:read`, 30, 60000); // 30 requests per minute

    if (!rateLimit.allowed) {
      return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
    }

    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Erreur lors du chargement des données" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
