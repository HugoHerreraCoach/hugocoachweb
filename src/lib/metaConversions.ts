// src/lib/metaConversions.ts
// API de Conversiones de Meta (eventos desde el servidor).
//
// Sirve a /api/meta/events (lo que el navegador reporta) y al webhook de Stripe, que es el
// único lugar que sabe con certeza que un pago se completó: el navegador puede cerrarse
// antes de llegar a /gracias, y los bloqueadores de anuncios descartan el píxel.
//
// Requiere en Vercel: META_PIXEL_ID y META_CAPI_ACCESS_TOKEN (opcional: META_TEST_EVENT_CODE).
// Sin ellas no falla: simplemente no envía (resultado `skipped`).

import crypto from 'crypto';

export interface EventoMeta {
  eventName: string;
  /**
   * Debe ser el mismo id que usa el píxel del navegador para este evento: así Meta
   * lo cuenta una sola vez aunque llegue por los dos caminos.
   */
  eventId?: string;
  eventSourceUrl?: string;
  userData?: { em?: string; ph?: string; fn?: string; ln?: string; country?: string };
  customData?: {
    value?: number;
    currency?: string;
    content_ids?: string[];
    content_name?: string;
    content_type?: string;
    num_items?: number;
  };
  fbp?: string | null;
  fbc?: string | null;
  clientIp?: string;
  clientUserAgent?: string;
}

export interface ResultadoMeta {
  ok: boolean;
  /** true cuando faltan las variables de entorno y no se intentó enviar. */
  skipped?: boolean;
  status?: number;
  error?: unknown;
}

const GRAPH_VERSION = 'v21.0';

const sha256 = (valor: string) => crypto.createHash('sha256').update(valor).digest('hex');
const normalizar = (valor: string) => valor.trim().toLowerCase();

export function metaConfigurado(): boolean {
  return !!process.env.META_PIXEL_ID && !!process.env.META_CAPI_ACCESS_TOKEN;
}

/** `x-forwarded-for` puede traer una lista ("ip del cliente, proxy1, proxy2"): Meta quiere solo la primera. */
export function primeraIp(forwardedFor: string | null | undefined): string | undefined {
  return forwardedFor?.split(',')[0]?.trim() || undefined;
}

export async function enviarEventoMeta(evento: EventoMeta): Promise<ResultadoMeta> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    return { ok: false, skipped: true };
  }

  const { userData = {} } = evento;
  const userDataPayload: Record<string, unknown> = {
    client_ip_address: evento.clientIp || undefined,
    client_user_agent: evento.clientUserAgent || undefined,
    fbp: evento.fbp || undefined,
    fbc: evento.fbc || undefined,
    // Meta exige estos datos en minúsculas y con hash SHA-256; el teléfono, solo dígitos.
    em: userData.em ? sha256(normalizar(userData.em)) : undefined,
    ph: userData.ph && userData.ph.replace(/\D/g, '') ? sha256(userData.ph.replace(/\D/g, '')) : undefined,
    fn: userData.fn ? sha256(normalizar(userData.fn)) : undefined,
    ln: userData.ln ? sha256(normalizar(userData.ln)) : undefined,
    country: userData.country ? sha256(normalizar(userData.country)) : undefined,
  };

  const payload = {
    data: [
      {
        event_name: evento.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: evento.eventId,
        action_source: 'website',
        event_source_url: evento.eventSourceUrl,
        user_data: userDataPayload,
        custom_data: evento.customData,
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE && { test_event_code: process.env.META_TEST_EVENT_CODE }),
    access_token: accessToken,
  };

  try {
    const respuesta = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      console.error('[Meta CAPI] Error de la API de Meta:', detalle);
      return { ok: false, status: respuesta.status, error: detalle };
    }
    return { ok: true, status: respuesta.status };
  } catch (error) {
    console.error('[Meta CAPI] No se pudo contactar a Meta:', error);
    return { ok: false, error };
  }
}
