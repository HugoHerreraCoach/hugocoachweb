// src/lib/pricing.ts

export type ProductID = "libro-digital" | "libro-fisico" | "comunidad-lobos"| "comunidad-lobos-cuota-inicial";
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
