//src/app/page.tsx
import { Metadata } from 'next';
import CheckoutSection from "@cerradorexperto/components/home/CheckoutSection";
import GuaranteeSection from "@cerradorexperto/components/home/GuaranteeSection";
import HeroSection from "@cerradorexperto/components/home/HeroSection";
import OfferSection from "@cerradorexperto/components/home/OfferSection";
import PainSection from "@cerradorexperto/components/home/PainSection";
import PresentationSection from "@cerradorexperto/components/home/PresentationSection";
import SocialProofSection from "@cerradorexperto/components/home/SocialProofSection";

export const metadata: Metadata = {
  title: 'Cerrador Experto | Hugo Herrera Coach',
  description: 'Descubre las 139 estrategias probadas para manejar objeciones, tomar el control de la conversación y transformar un "lo voy a pensar" en una venta cerrada.',
  // Metadata para redes sociales (Open Graph)
  openGraph: {
    title: 'Cerrador Experto: Deja de Vender, Empieza a Cerrar.',
    description: 'El arsenal completo con 139 estrategias, guiones y 5 bonos de acción rápida para dominar el cierre de ventas. Riesgo cero, garantía de 30 días.',
    url: 'https://cerradorexperto.hugoherreracoach.com', // Reemplaza con la URL final de producción
    siteName: 'Hugo Herrera Coach',
    images: [
      {
        url: 'https://cerradorexperto.hugoherreracoach.com/images/cerradorExperto.jpg', // IMPORTANTE: Crea y sube una imagen específica para compartir
        width: 920,
        height: 1300,
        alt: 'Libro Cerrador Experto de Hugo Herrera y Bonos',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  // Metadata para Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Cerrador Experto: El Sistema Probado Para Cerrar Más Ventas | Hugo Herrera',
    description: 'Descubre las 139 estrategias probadas para manejar objeciones y tomar el control de la conversación.',
    images: ['https://cerradorexperto.hugoherreracoach.com/images/cerradorExperto.jpg'], // Usa la misma imagen de Open Graph
  },
  // Opcional: Permitir que los motores de búsqueda indexen esta página
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <PainSection />
      <PresentationSection />
      <OfferSection />
      <SocialProofSection />
      <GuaranteeSection />
      <CheckoutSection />
    </>

  );
}
