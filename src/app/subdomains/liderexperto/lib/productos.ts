// src/app/subdomains/liderexperto/lib/productos.ts
// Catálogo del embudo de Líder Experto.
//
// El recorrido es: libro (con sus order bumps) -> oferta de Lobos de Ventas -> si la rechaza,
// Lobos en 3 cuotas -> /gracias. Cada paso manda un productId distinto para que, al recibir un
// pago, el webhook sepa qué se compró y pueda entregarlo.

import { bumpPrices, shippingCost, baseBookPrice } from "../constants/checkout";
import { getVerifiedPrice } from "../../cerradorexperto/lib/pricing";

export const PRODUCTOS_LE = {
  LIBRO: "liderexperto",
  AUDIOLIBRO: "audiolibro",
  CLASE_KIT: "clase-kit",
  LOBOS: "lobos-de-ventas",
  LOBOS_CUOTAS: "lobos-de-ventas-cuota-inicial",
} as const;

/** Arma el id del libro incluyendo los order bumps que el cliente marcó. */
export function idDelLibro(bumps: { audiolibro?: boolean; claseKit?: boolean }): string {
  const partes: string[] = [PRODUCTOS_LE.LIBRO];
  if (bumps.audiolibro) partes.push(PRODUCTOS_LE.AUDIOLIBRO);
  if (bumps.claseKit) partes.push(PRODUCTOS_LE.CLASE_KIT);
  return partes.join("+");
}

/** ¿Este id es un pedido del libro (con o sin order bumps)? Ej: "liderexperto+audiolibro". */
export function esPedidoDelLibro(productId: string): boolean {
  return productId.split("+")[0] === PRODUCTOS_LE.LIBRO;
}

/** Qué order bumps trae un id armado con idDelLibro. */
export function bumpsDelPedido(productId: string): { audiolibro: boolean; claseKit: boolean } {
  const partes = productId.split("+");
  return {
    audiolibro: partes.includes(PRODUCTOS_LE.AUDIOLIBRO),
    claseKit: partes.includes(PRODUCTOS_LE.CLASE_KIT),
  };
}

/**
 * Lo que cuesta un pedido del libro, calculado en el servidor.
 * El navegador manda su propio monto; esto es lo que se verifica contra él.
 */
export function montoDelLibro(productId: string): number {
  const bumps = bumpsDelPedido(productId);
  return (
    baseBookPrice +
    shippingCost +
    (bumps.audiolibro ? bumpPrices.audiolibro : 0) +
    (bumps.claseKit ? bumpPrices.claseKit : 0)
  );
}

/** ¿Este id pertenece al embudo de Líder Experto (libro o alguna de sus ofertas de Lobos)? */
export function esProductoLiderExperto(productId: string): boolean {
  return (
    esPedidoDelLibro(productId) ||
    productId === PRODUCTOS_LE.LOBOS ||
    productId === PRODUCTOS_LE.LOBOS_CUOTAS
  );
}

/**
 * Monto en soles que le toca cobrar a un producto del embudo, o undefined si no se puede
 * calcular. Los cobros de un solo pago se verifican contra esto; las cuotas las verifica
 * /api/stripe/subscription con el mismo catálogo.
 */
export function montoLiderExperto(productId: string): number | undefined {
  if (esPedidoDelLibro(productId)) return montoDelLibro(productId);
  if (productId === PRODUCTOS_LE.LOBOS || productId === PRODUCTOS_LE.LOBOS_CUOTAS) {
    return getVerifiedPrice(productId, "PEN");
  }
  return undefined;
}
