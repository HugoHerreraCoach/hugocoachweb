// src/app/lobos/page.tsx
import { Metadata } from 'next';
import OfferSection from '@cerradorexperto/components/lobos/OfferSection';
import ConnectionSection from '@cerradorexperto/components/lobos/ConnectionSection';
import { HeroSection } from '@cerradorexperto/components/lobos/HeroSection';
import PresentationSection from '@cerradorexperto/components/lobos/PresentationSection';
import RiskReversalSection from '@cerradorexperto/components/lobos/RiskReversalSection';
import FinalCtaSection from '@cerradorexperto/components/lobos/FinalCtaSection';
import { ScrollToTop } from '@cerradorexperto/components/utils/ScrollToTop';

export const metadata: Metadata = {
  title: 'Espera... Has Desbloqueado un Acceso Único | Hugo Herrera Coach',
  description: 'Por comprar \'Cerrador Experto\', has calificado para una oferta única. Accede al sistema completo que usan los equipos de élite y convierte tus tácticas en resultados predecibles.',
  // Metadata para redes sociales (Open Graph)
  openGraph: {
    title: 'Oferta Reservada: Tu Acceso al Sistema Lobos de Ventas',
    description: 'Accede a la estructura completa de ventas que usan los equipos de alto rendimiento con un descuento exclusivo por tiempo limitado.',
    url: 'https://cerradorexperto.hugoherreracoach.com/lobos',
    siteName: 'Hugo Herrera Coach',
    images: [
      {
        url: 'https://cerradorexperto.hugoherreracoach.com/images/lobos/lobosProgram.jpg',
        width: 600,
        height: 600,
        alt: 'Oferta Exclusiva del Programa Lobos de Ventas',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  // Evitar que los motores de búsqueda indexen esta página de oferta
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};



export default function LobosPage() {
  return (
    <>
      <main>
        <ScrollToTop />
        <HeroSection />
        <ConnectionSection />
        <PresentationSection />
        <OfferSection />
        <RiskReversalSection />
        <FinalCtaSection />
      </main>
    </>
  );
}
