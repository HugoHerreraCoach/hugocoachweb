//src/app/recursos/seguimiento/page.tsx

import { ResourceLayout } from '@/components/layout/ResourceLayout';
import type { Metadata } from 'next';

// Metadatos para SEO y posicionamiento
export const metadata: Metadata = {
  title: 'Plantillas de Seguimiento Efectivo por WhatsApp | Hugo Herrera Coach',
  description: 'La estrategia de 7 días para mantener el interés, aportar valor y guiar a tus prospectos hacia la compra.',
};

// Datos específicos para este recurso
const pageData = {
  title: 'Descarga las Plantillas de Seguimiento Efectivo',
  subtitle: 'La estrategia probada de 7 días para convertir conversaciones en ventas sin sonar insistente.',
  imageSrc: '/images/recursos/seguimiento.jpg',
  imageAlt: 'Portada del PDF de Plantillas de Seguimiento de Hugo Herrera',
  imageWidth: 700,
  imageHeight: 990,
  benefits: [
    'Convertir prospectos en clientes con una secuencia probada de 7 días.',
    'Saber exactamente qué decir cada día para aportar valor y resolver dudas de forma proactiva.',
    'Dejar de recibir "vistos" y generar conversaciones que terminan en ventas reales.'
  ],
  ctaText: 'DESCARGAR PLANTILLAS AHORA'
};

export default function SeguimientoPage() {
  return <ResourceLayout {...pageData} resourceIdentifier="seguimiento" />;
}