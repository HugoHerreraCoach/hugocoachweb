import { NextResponse } from "next/server";
import { z } from "zod";

// Usamos Zod para definir y validar el esquema de entrada.
// Tolerancia Cero a 'any'. Esto asegura que siempre recibimos los datos correctos.
const subscribePayloadSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "El formato del email es inválido." }),
  resource: z.string().min(1, { message: "El recurso es requerido." }),
});

// Tipamos la función POST con los tipos de Next.js para mayor claridad.
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    // 1. Validar el cuerpo de la petición con Zod.
    // Si la validación falla, Zod lanza un error que será capturado por el catch.
    const validatedData = subscribePayloadSchema.parse(body);
    const { name, email, resource } = validatedData;

    // 2. Validar variables de entorno.
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      console.error("Error: Faltan variables de entorno de Brevo.");
      return NextResponse.json(
        { message: "La configuración del servidor es incompleta." },
        { status: 500 }
      );
    }

    // 3. Crear o actualizar el contacto en Brevo.
    // Esta parte estaba bien, mantenemos la lógica.
    const contactData = {
      email,
      attributes: {
        NOMBRE: name,
        ULTIMO_RECURSO: resource,
        SECUENCIA_VENDEDOR_INICIADA: false,
      },
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
      identifiers: {
        email_id: email,
      },
      event_properties: {
        nombre_recurso: resource,
      },
      event_date: new Date().toISOString(),
    };

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
    // Si el error es de Zod, devolvemos un mensaje y un objeto de errores estructurado.
    if (error instanceof z.ZodError) {
      console.warn("Error de validación de Zod:", error.flatten());
      return NextResponse.json(
        // Usamos .flatten() para obtener un objeto de errores fácil de consumir en el frontend.
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
