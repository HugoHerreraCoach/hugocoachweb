// Ejemplo: src/app/api/tokens/route.ts  (esta ruta se ejecuta en el server)
import { NextRequest, NextResponse } from "next/server";
import { getTokensBySession } from "@liderexperto/lib/db";

export async function GET(request: NextRequest) {
  try {
    const cookieSession = request.cookies.get("session_id")?.value;
    if (!cookieSession) {
      // Si no hay session_id, respondemos un array vacío
      return NextResponse.json([], { status: 200 });
    }

    const tokens = await getTokensBySession(cookieSession);
    return NextResponse.json(tokens, { status: 200 });
  } catch (error) {
    console.error("Error en /api/tokens (GET):", error);
    return NextResponse.json(
      { error: "Error al leer tokens de la sesión." },
      { status: 500 }
    );
  }
}
