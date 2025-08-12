//src/app/api/subscribe/route.ts

import { NextResponse } from "next/server";
import type { SubscribePayload } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: SubscribePayload = await request.json();

    console.log("Datos recibidos en la API:", body);

    const { name, email, resource } = body;

    if (!name || !email || !resource) {
      return NextResponse.json(
        { message: "Faltan datos requeridos." },
        { status: 400 }
      );
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      return NextResponse.json(
        { message: "La configuración del servidor está incompleta." },
        { status: 500 }
      );
    }

    const contactData = {
      email,
      attributes: {
        NOMBRE: name,
        ULTIMO_RECURSO: resource,
      },
      listIds: [Number(BREVO_LIST_ID)],
      updateEnabled: true,
    };

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API Error:", errorData);
      return NextResponse.json(
        { message: "Error al registrar el contacto en el sistema." },
        { status: response.status }
      );
    }

    const trackEventData = {
      event: "recurso_solicitado",
      email: email,
      properties: {
        nombre_recurso: resource,
      },
    };

    await fetch("https://api.brevo.com/v3/trackEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(trackEventData),
    });

    return NextResponse.json(
      { message: "Contacto registrado con éxito." },
      { status: 201 }
    );

  } catch (error: unknown) {
    // Este error ocurre si el body no es un JSON válido, un dato clave.
    console.error("Error al procesar la petición:", error);
    return NextResponse.json(
      {
        message:
          "Error interno del servidor. El formato de los datos podría ser incorrecto.",
      },
      { status: 500 }
    );
  }
}
