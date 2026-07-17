// src/app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

// Define una interfaz para el payload esperado de la solicitud
interface SubscribePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // Opcional
  address?: string; // Opcional - puede no estar en la primera fase
  apartment?: string; // Opcional
  country?: string; // Opcional - puede no estar en la primera fase
  state?: string; // Opcional - puede no estar en la primera fase
  city?: string; // Opcional - puede no estar en la primera fase
  postalCode?: string; // Opcional
  isBasicData?: boolean; // Flag para indicar si es solo información básica
}

// Define una interfaz para los atributos que enviarás a Brevo
// Asegúrate de que estos nombres coincidan con los atributos en tu cuenta de Brevo
interface BrevoAttributes {
  NOMBRE: string;
  APELLIDOS: string;
  SMS?: string;
  ADDRESS?: string;
  REFERENCIA?: string;
  COUNTRY?: string;
  STATE_PROVINCE?: string;
  CITY?: string;
  POSTAL_CODE?: string;
  // Puedes añadir otros atributos personalizados que tengas
}

// Interfaz para la respuesta de error de Brevo (simplificada)
interface BrevoErrorResponse {
  message: string;
  code?: string;
  // puedes añadir más campos si los necesitas
}

// Interfaz para la respuesta exitosa de Brevo (simplificada)
interface BrevoSuccessData {
  id?: number; // Por ejemplo, el ID del contacto creado
  // puedes añadir más campos si los necesitas
}

export async function POST(request: Request) {
  try {
    // Tipar el cuerpo de la solicitud
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      apartment,
      country,
      state,
      city,
      postalCode,
      isBasicData
    } = await request.json() as SubscribePayload; // <-- Tipado aquí

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'El correo electrónico no es válido.' }, { status: 400 });
    }

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Nombre, apellido y correo electrónico son requeridos.' }, { status: 400 });
    }
    
    // Solo validar dirección si no es información básica
    if (!isBasicData && (!address || !country || !state || !city)) {
      return NextResponse.json({ error: 'La dirección completa (dirección, país, departamento, ciudad) es requerida.' }, { status: 400 });
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const listIdString = process.env.BREVO_LIST_ID;
    const listId = listIdString ? parseInt(listIdString) : null;

    if (!brevoApiKey || listId === null || isNaN(listId)) {
      console.error('Error de Configuración: BREVO_API_KEY o BREVO_LIST_ID no están configurados correctamente o BREVO_LIST_ID no es un número válido.');
      return NextResponse.json({ error: 'Configuración del servidor incompleta o incorrecta. Contacte al administrador.' }, { status: 500 });
    }

    // Construir el objeto de atributos para Brevo con tipado específico
    const attributes: BrevoAttributes = {
      NOMBRE: firstName,
      APELLIDOS: lastName,
    };

    if (phone) attributes.SMS = phone;
    if (address) attributes.ADDRESS = address;
    if (apartment) attributes.REFERENCIA = apartment;
    if (country) attributes.COUNTRY = country;
    if (state) attributes.STATE_PROVINCE = state;
    if (city) attributes.CITY = city;
    if (postalCode) attributes.POSTAL_CODE = postalCode;

    const brevoPayload = {
      email: email,
      attributes: attributes,
      listIds: [listId],
      updateEnabled: true
    };

    const responseBrevo = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(brevoPayload)
    });

    if (!responseBrevo.ok) {
      // Tipar la respuesta de error de Brevo
      const errorData = await responseBrevo.json() as BrevoErrorResponse;
      console.error('Error desde la API de Brevo:', errorData);
      let errorMessage = `Error al registrar el contacto en Brevo: ${errorData.message || 'Respuesta no exitosa.'}`;
      if (errorData.code === 'missing_parameter' && errorData.message && errorData.message.includes('attribute') && errorData.message.includes('does not exist')) {
        const attributeNameMatch = errorData.message.match(/'([^']+)'/); // Intenta extraer el nombre del atributo
        const attributeName = attributeNameMatch ? attributeNameMatch[1] : 'desconocido';
        errorMessage = `Error de Brevo: Un atributo de contacto especificado (${attributeName}) no existe en tu configuración de Brevo. Por favor, créalo o verifica el nombre.`;
      }
      return NextResponse.json({ error: errorMessage, details: errorData }, { status: responseBrevo.status });
    }

    let brevoData: Partial<BrevoSuccessData> = {}; // Puede ser un objeto vacío si es 204
    if (responseBrevo.status === 201) { // Created
      brevoData = await responseBrevo.json() as BrevoSuccessData;
    }
    // Si es 204 (No Content - Actualizado), brevoData permanecerá vacío.

    const successMessage = `¡${firstName}, tus datos han sido registrados correctamente!`;
    const finalStatus = responseBrevo.status === 204 ? 200 : responseBrevo.status; // Ajusta el status para 204 si quieres devolver contenido

    return NextResponse.json({ message: successMessage, contactDetails: brevoData }, { status: finalStatus });

  } catch (error) {
    console.error('Error interno del servidor en /api/subscribe:', error);
    // Es buena práctica verificar el tipo de error antes de acceder a sus propiedades
    let errorMessage = 'Ocurrió un error inesperado en el servidor.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}