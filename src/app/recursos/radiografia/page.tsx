import { ResourceLayout } from '@/components/layout/ResourceLayout';
import type { Metadata } from 'next';

// Metadatos para SEO y posicionamiento
export const metadata: Metadata = {
  title: 'Radiografía de tu Sistema Comercial | Hugo Herrera Coach',
  description: 'La herramienta de diagnóstico para dueños que están cansados de "apagar fuegos".',
};

// Datos específicos para este recurso
const pageData = {
  title: 'Obtén la Radiografía de tu Sistema Comercial',
  subtitle: 'La herramienta para diagnosticar los 15 errores ocultos que frenan tu crecimiento.',
  imageSrc: '/images/recursos/radiografia.png',
  imageAlt: 'Portada del PDF Radiografía Comercial de Hugo Herrera',
  imageWidth: 700,
  imageHeight: 931,
  benefits: [
    'Obtener claridad total sobre los cuellos de botella de tu operación.',
    'Identificar las fugas de dinero en tu proceso de ventas actual.',
    'Descubrir qué palanca estratégica mover para escalar tus resultados.'
  ],
  ctaText: 'OBTENER DIAGNÓSTICO AHORA'
};

export default function RadiografiaPage() {
  return <ResourceLayout {...pageData} resourceIdentifier="radiografia" />;
}