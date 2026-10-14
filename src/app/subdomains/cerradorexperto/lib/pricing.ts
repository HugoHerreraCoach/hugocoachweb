// src/lib/pricing.ts

export type ProductID =
  | "libro-digital"
  | "libro-fisico"
  | "comunidad-lobos"
  | "comunidad-lobos-cuota-inicial"
  | "lobos-de-ventas"
  | "lobos-de-ventas-cuota-inicial";
export type Currency = "PEN" | "USD";

// Definimos la estructura de cada producto
interface Product {
  id: ProductID;
  description: string;
  prices: Partial<Record<Currency, number>>;
}

// Nuestro catálogo de productos centralizado
const productCatalog: Product[] = [
  {
    id: "libro-digital",
    description: "Libro Digital Cerrador Experto",
    prices: {
      PEN: 25.0,
      USD: 7.0,
    },
  },
  {
    id: "libro-fisico",
    description: "Libro Físico: Cerrador Experto (Order Bump)",
    prices: {
      PEN: 50.0,
      USD: 15.0, 
    },
  },
  {
    id: "comunidad-lobos",
    description: "Programa Lobos de Ventas",
    prices: {
      PEN: 500.0,
      USD: 130.0,
    },
  },
  // Oferta de Lobos que se muestra después del libro Líder Experto (otro precio que la de Cerrador Experto).
  {
    id: "lobos-de-ventas",
    description: "Programa Lobos de Ventas (oferta Líder Experto)",
    prices: {
      PEN: 497.0,
    },
  },
  {
    id: "lobos-de-ventas-cuota-inicial",
    description: "Programa Lobos de Ventas (Pago 1 de 3)",
    prices: {
      PEN: 167.0,
    },
  },
  {
    id: "comunidad-lobos-cuota-inicial",
    description: "Programa Lobos de Ventas (Pago 1 de 5)", 
    prices: {
      PEN: 100.0,
      USD: 28.0,
    },
  },
];

export function getProductDetails(productId: ProductID): Product | undefined {
  return productCatalog.find((p) => p.id === productId);
}

export function getVerifiedPrice(
  productId: ProductID,
  currency: Currency
): number | undefined {
  const product = getProductDetails(productId);
  return product?.prices[currency];
}

/**
 * Productos que se cobran en cuotas mediante una suscripción de Stripe.
 * Stripe cobra cada cuota solo, reintenta las que fallan y se detiene
 * al llegar al número de cuotas indicado.
 */
export const PLANES_EN_CUOTAS: Partial<
  Record<ProductID, { cuotas: number; intervalo: "month"; programa: ProductID }>
> = {
  "comunidad-lobos-cuota-inicial": {
    cuotas: 5,
    intervalo: "month",
    programa: "comunidad-lobos",
  },
  "lobos-de-ventas-cuota-inicial": {
    cuotas: 3,
    intervalo: "month",
    programa: "lobos-de-ventas",
  },
};

export function esPlanEnCuotas(productId: string): boolean {
  return productId in PLANES_EN_CUOTAS;
}

export function getPlanEnCuotas(productId: string) {
  return PLANES_EN_CUOTAS[productId as ProductID];
}
