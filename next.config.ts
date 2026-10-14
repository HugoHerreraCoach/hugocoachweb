import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF primero (mucho más liviano) y WebP como respaldo.
    formats: ["image/avif", "image/webp"],
    // Los archivos de /public son estáticos y versionados: caché de un año para las versiones optimizadas.
    minimumCacheTTL: 31536000,
    // Next 16 solo acepta las calidades listadas: 75 (por defecto) y 60 para fotos grandes de tarjetas.
    qualities: [60, 75],
  },
  async redirects() {
    return [
      {
        source: "/servicios/entrenamiento-equipos",
        destination: "/servicios/aceleracion-comercial",
        permanent: true, // 301
      },
      // Pricing de Poder se retiró del embudo de Líder Experto. Quien tenga el enlace viejo
      // (correos, mensajes) llega a la confirmación en vez de a un 404. Temporal: la oferta podría volver.
      {
        source: "/pricing",
        has: [{ type: "host", value: "liderexperto.hugoherreracoach.com" }],
        destination: "/gracias",
        permanent: false,
      },
      {
        source: "/servicios/asesoria-comercial",
        destination: "/servicios/aceleracion-comercial",
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;
