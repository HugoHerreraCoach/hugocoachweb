// src/app/api/meta/events/route.ts
// Recibe los eventos que reporta el navegador (PageView, Lead, AddToCart, ViewContent...) y los
// reenvía a la API de Conversiones de Meta. El Purchase NO pasa por aquí: lo envía el webhook de
// Stripe cuando el pago se confirma de verdad (src/app/api/webhooks/stripe/route.ts).

import { NextResponse } from 'next/server';
import { enviarEventoMeta, primeraIp } from '@/lib/metaConversions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventName, eventId, userData, customData, eventSourceUrl, fbp, fbc } = body;

    if (!eventName || typeof eventName !== 'string') {
      return NextResponse.json({ error: 'Falta eventName' }, { status: 400 });
    }

    const resultado = await enviarEventoMeta({
      eventName,
      eventId: typeof eventId === 'string' ? eventId : undefined,
      eventSourceUrl: typeof eventSourceUrl === 'string' ? eventSourceUrl : undefined,
      userData,
      customData,
      fbp,
      fbc,
      clientIp: primeraIp(request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip')),
      clientUserAgent: request.headers.get('user-agent') || undefined,
    });

    // Sin credenciales de Meta no es un error del visitante: se acepta y no se envía.
    if (resultado.skipped) {
      return NextResponse.json({ skipped: true }, { status: 202 });
    }
    if (!resultado.ok) {
      return NextResponse.json({ error: 'Fallo al enviar el evento a Meta' }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Meta CAPI] Error interno en /api/meta/events:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
