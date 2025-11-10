//src/app/api/subscribe/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";

// Esquema de validación para los datos de entrada.
const subscribePayloadSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "El formato del email es inválido." }),
  resource: z.string().min(1, { message: "El recurso es requerido." }),
});

// ***** MEJORA DE TIPADO *****
// Definimos un tipo estricto para los atributos que enviaremos a Brevo.
// La propiedad de la secuencia es opcional con `?`.
type BrevoAttributes = {
  NOMBRE: string;
  ULTIMO_RECURSO: string;
  SECUENCIA_VENDEDOR_INICIADA?: boolean;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = subscribePayloadSchema.parse(body);
    const { name, email, resource } = validatedData;

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      console.error("Error: Faltan variables de entorno de Brevo.");
      return NextResponse.json(
        { message: "La configuración del servidor es incompleta." },
        { status: 500 }
      );
    }

    let contactExists = true;
    try {
      const existingContactResponse = await fetch(
        `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
        {
          headers: {
            "api-key": BREVO_API_KEY,
            accept: "application/json",
          },
        }
      );
      if (existingContactResponse.status === 404) {
        contactExists = false;
      }
    } catch (error) {
      console.error("Error al verificar el contacto:", error);
    }

    // ***** MEJORA DE TIPADO *****
    // Construimos el objeto de atributos de forma segura y tipada.
    const attributes: BrevoAttributes = {
      NOMBRE: name,
      ULTIMO_RECURSO: resource,
    };

    if (!contactExists) {
      // Añadimos la propiedad opcional solo si es necesario. TypeScript lo entiende perfectamente.
      attributes.SECUENCIA_VENDEDOR_INICIADA = false;
      console.log(
        `El contacto ${email} es nuevo. Se establecerá SECUENCIA_VENDEDOR_INICIADA = false.`
      );
    } else {
      console.log(
        `El contacto ${email} ya existe. El atributo de secuencia no se modificará.`
      );
    }

    const contactData = {
      email,
      attributes, // Ahora este objeto es 100% type-safe.
      listIds: [Number(BREVO_LIST_ID)],
      updateEnabled: true,
    };

    const contactResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
        accept: "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!contactResponse.ok) {
      const errorData = await contactResponse.json();
      console.error("Error de la API de Brevo (Contacts):", errorData);
      return NextResponse.json(
        { message: "Error al registrar el contacto en el sistema." },
        { status: contactResponse.status }
      );
    }

    console.log(`Contacto ${email} creado/actualizado con éxito.`);

    const eventPayload = {
      event_name: "recurso_solicitado",
      identifiers: { email_id: email },
      event_properties: { nombre_recurso: resource },
      event_date: new Date().toISOString(),
    };

    console.log(
      "Enviando este payload a Brevo Events:",
      JSON.stringify(eventPayload, null, 2)
    );

    const trackEventResponse = await fetch("https://api.brevo.com/v3/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
        accept: "application/json",
      },
      body: JSON.stringify(eventPayload),
    });

    if (!trackEventResponse.ok) {
      const errorData = await trackEventResponse.json();
      console.error("Error de la API de Brevo (Events):", errorData);
    } else {
      console.log(
        `Evento 'recurso_solicitado' para ${email} enviado con éxito.`
      );
    }

    return NextResponse.json(
      { message: "Proceso completado con éxito." },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.warn("Error de validación de Zod:", error.flatten());
      return NextResponse.json(
        { message: "Datos inválidos.", errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error("Error inesperado en /api/subscribe:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
