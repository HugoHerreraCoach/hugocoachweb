import { NextRequest, NextResponse } from "next/server";
import { getUserDataBySession } from "@liderexperto/lib/db";

export async function GET(request: NextRequest) {
  try {
    const cookieSession = request.cookies.get("session_id")?.value;
    
    if (!cookieSession) {
      return NextResponse.json(
        { error: "No hay sesión activa" },
        { status: 401 }
      );
    }

    const userData = await getUserDataBySession(cookieSession);
    
    if (!userData) {
      return NextResponse.json(
        { error: "No se encontraron datos del usuario" },
        { status: 404 }
      );
    }

    return NextResponse.json(userData, { status: 200 });

  } catch (error) {
    console.error("Error obteniendo datos del usuario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}