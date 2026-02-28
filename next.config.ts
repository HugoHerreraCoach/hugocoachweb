import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/servicios/entrenamiento-equipos",
        destination: "/servicios/aceleracion-comercial",
        permanent: true, // 301
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
