import { ResourceLayout } from '@/components/layout/ResourceLayout';
import type { Metadata } from 'next';

// Metadatos para SEO y posicionamiento
export const metadata: Metadata = {
    title: '50 Preguntas Estratégicas | Hugo Herrera Coach',
    description: 'El guion de preguntas exacto para filtrar a los curiosos y detectar a los compradores reales en minutos.',
};

// Datos específicos para este recurso
const pageData = {
    title: 'Descarga las 50 Preguntas Estratégicas de Calificación',
    subtitle: 'El guion exacto para dejar de perseguir y empezar a calificar a tus clientes.',
    imageSrc: '/images/recursos/preguntas.png', // Coloca tu imagen en esta ruta
    imageAlt: 'Portada del PDF 50 Preguntas Estratégicas de Hugo Herrera',
    imageWidth: 700,
    imageHeight: 848,
    benefits: [
        'Filtrar prospectos no calificados en menos de 5 minutos.',
        'Identificar el dolor real del cliente para presentar una solución irresistible.',
        'Acelerar tu ciclo de ventas enfocándote solo en quienes pueden y van a comprar.'
    ],
    ctaText: 'OBTENER EL GUION AHORA'
};

export default function PreguntasPage() {
    return <ResourceLayout {...pageData} resourceIdentifier="preguntas" />;
}