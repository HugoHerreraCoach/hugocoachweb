// src/app/api/convert-to-buyer/route.ts
import { NextResponse } from 'next/server';

// 1. Definimos las interfaces necesarias
interface RequestBody {
  email: string;
  dni?: string;
}

interface BrevoErrorResponse {
  message: string;
  code?: string;
}

// Interface para los atributos de Brevo
interface BrevoAttributes {
  DNI?: string;
}

// Interface para el payload de Brevo
interface BrevoUpdatePayload {
  listIds: number[];
  unlinkListIds: number[];
  attributes?: BrevoAttributes;
}

// 2. Creamos la función POST que se ejecutará
export async function POST(request: Request) {
  try {
    const { email, dni } = await request.json() as RequestBody;
    
    if (!email) {
      return NextResponse.json({ error: 'El email es requerido.' }, { status: 400 });
    }
    
    const subscribersListId = process.env.BREVO_LIST_ID;       // Tu lista actual (ID 8)
    const buyersListId = process.env.BREVO_BUYERS_LIST_ID;     // Tu nueva lista (ID 9)
    const brevoApiKey = process.env.BREVO_API_KEY;

    // Verificación de configuración del servidor
    if (!subscribersListId || !buyersListId || !brevoApiKey) {
      console.error('Error de Configuración: Falta una variable de entorno de Brevo (LIST_ID, BUYERS_LIST_ID, o API_KEY).');
      return NextResponse.json({ error: 'Configuración del servidor incompleta.' }, { status: 500 });
    }

    const LISTA_SUSCRIPTORES_ID = parseInt(subscribersListId);
    const LISTA_COMPRADORES_ID = parseInt(buyersListId);

    // 3. Preparamos la llamada a la API de Brevo para ACTUALIZAR el contacto
    const identifier = encodeURIComponent(email);
    const url = `https://api.brevo.com/v3/contacts/${identifier}`;

    // Preparamos el payload con las listas Y los atributos (incluyendo DNI)
    const payload: BrevoUpdatePayload = {
      listIds: [LISTA_COMPRADORES_ID],
      unlinkListIds: [LISTA_SUSCRIPTORES_ID],
    };

    // Si se proporciona DNI, lo agregamos a los atributos
    if (dni) {
      payload.attributes = {
        DNI: dni
      };
    }

    // 4. Realizamos la llamada a Brevo con el método PUT
    const responseBrevo = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify(payload),
    });

    // 5. Manejamos la respuesta de Brevo
    if (!responseBrevo.ok) {
      const errorData = await responseBrevo.json() as BrevoErrorResponse;
      console.error('Error desde la API de Brevo al mover contacto:', errorData);
      return NextResponse.json(
        { error: `Error al mover el contacto: ${errorData.message}` },
        { status: responseBrevo.status }
      );
    }

    console.log(`Contacto ${email} movido exitosamente de la lista ${LISTA_SUSCRIPTORES_ID} a la ${LISTA_COMPRADORES_ID}${dni ? ' con DNI actualizado' : ''}.`);
    return NextResponse.json({ message: 'El estado del contacto fue actualizado a comprador.' }, { status: 200 });

  } catch (error) {
    console.error('Error interno del servidor en /api/convert-to-buyer:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'Ocurrió un error inesperado.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}