// archivo app/api/meta/events/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// --- PASO 1: DEFINIMOS UNA INTERFAZ ESTRICTA PARA LOS DATOS DEL USUARIO ---
interface MetaUserData {
  client_ip_address: string;
  client_user_agent: string;
  fbp: string | null;
  fbc: string | null;
  em?: string; 
  ph?: string;
  fn?: string;
  ln?: string;
}

function sha256(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventName, userData, customData, eventSourceUrl, fbp, fbc } = body;

    if (!eventName) {
        return NextResponse.json({ error: 'Falta eventName' }, { status: 400 });
    }

    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    const testEventCode = process.env.META_TEST_EVENT_CODE;

    if (!pixelId || !accessToken) {
      console.error("Error: Las variables de entorno de Meta no están configuradas.");
      return NextResponse.json({ error: 'Configuración del servidor incompleta.' }, { status: 500 });
    }

    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';

    // --- PASO 2: USAMOS NUESTRA NUEVA INTERFAZ ---
    let payloadUserData: MetaUserData = {
      client_ip_address: ipAddress,
      client_user_agent: userAgent,
      fbp: fbp || null,
      fbc: fbc || null,
    };
    
    if (userData) {
      payloadUserData = {
        ...payloadUserData,
        em: userData.em ? sha256(userData.em.trim().toLowerCase()) : undefined,
        ph: userData.ph ? sha256(userData.ph.replace(/\D/g, '')) : undefined,
        fn: userData.fn ? sha256(userData.fn.trim().toLowerCase()) : undefined,
        ln: userData.ln ? sha256(userData.ln.trim().toLowerCase()) : undefined,
      };
    }

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: eventSourceUrl,
          user_data: payloadUserData,
          custom_data: customData ? {
            value: customData.value,
            currency: customData.currency,
          } : undefined,
        },
      ],
      ...(testEventCode && { test_event_code: testEventCode }),
    };

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Error de la API de Meta:', responseData);
      return NextResponse.json({ error: 'Fallo al enviar el evento a Meta', details: responseData }, { status: response.status });
    }

    return NextResponse.json({ success: true, metaResponse: responseData });

  } catch (error) {
    console.error('Error interno del servidor:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
