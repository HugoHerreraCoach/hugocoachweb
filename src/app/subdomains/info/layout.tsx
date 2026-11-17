import type { Metadata } from 'next';
import './info-hub.css';

export const metadata: Metadata = {
  title: 'Hugo Herrera | ConexiGO IA, Libros y Recursos de Ventas',
  description:
    'Prueba ConexiGO (el CRM con IA que responde y vende por WhatsApp 24/7), pide mis libros Líder Experto y Cerrador Experto o descarga recursos gratuitos de ventas.',
  alternates: {
    canonical: 'https://info.hugoherreracoach.com',
  },
  openGraph: {
    title: 'Hugo Herrera | ConexiGO IA, Libros y Recursos de Ventas',
    description:
      'De entrenar a +20,000 vendedores a crear ConexiGO: el CRM + IA que atiende, da seguimiento y cierra ventas en tu WhatsApp 24/7.',
    url: 'https://info.hugoherreracoach.com',
    siteName: 'Hugo Herrera',
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: 'https://info.hugoherreracoach.com/subdomains/info/images/hugo-perfil-cuadrado.jpg',
        width: 720,
        height: 720,
        alt: 'Hugo Herrera, Fundador de ConexiGO y Entrenador de Ventas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hugo Herrera | ConexiGO IA, Libros y Recursos de Ventas',
    description:
      'De entrenar a +20,000 vendedores a crear ConexiGO: el CRM + IA que responde y vende en tu WhatsApp 24/7.',
    images: ['https://info.hugoherreracoach.com/subdomains/info/images/hugo-perfil-cuadrado.jpg'],
  },
};

export default function InfoSubdomainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="info-hub-root min-h-svh">{children}</div>;
}
