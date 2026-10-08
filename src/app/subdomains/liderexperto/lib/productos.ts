// src/app/subdomains/liderexperto/lib/productos.ts
// Catálogo del embudo de Líder Experto.
//
// Antes todos los OTO mandaban el mismo productId ("liderexperto-completo"),
// así que al recibir un pago era imposible saber si la persona había comprado
// Lobos de Ventas o Pricing de Poder. Sin identificar el producto no se puede
// entregar nada automáticamente.

export const PRODUCTOS_LE = {
  LIBRO: "liderexperto",
  AUDIOLIBRO: "audiolibro",
  CLASE_KIT: "clase-kit",
  LOBOS: "lobos-de-ventas",
  PRICING: "pricing-de-poder",
} as const;

/** Arma el id del libro incluyendo los order bumps que el cliente marcó. */
export function idDelLibro(bumps: { audiolibro?: boolean; claseKit?: boolean }): string {
  const partes: string[] = [PRODUCTOS_LE.LIBRO];
  if (bumps.audiolibro) partes.push(PRODUCTOS_LE.AUDIOLIBRO);
  if (bumps.claseKit) partes.push(PRODUCTOS_LE.CLASE_KIT);
  return partes.join("+");
}

/** Id de un pago en cuotas, para distinguirlo de un pago único. */
export function idEnCuotas(productId: string, cuotas: number): string {
  return cuotas > 1 ? `${productId}-cuota1-${cuotas}` : productId;
}
