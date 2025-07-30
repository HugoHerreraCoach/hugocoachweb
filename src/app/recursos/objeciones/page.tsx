import { ResourceLayout } from '@/components/layout/ResourceLayout';
import type { Metadata } from 'next';

// Metadatos para SEO
export const metadata: Metadata = {
    title: 'Mapa Definitivo de Objeciones | Hugo Herrera Coach',
    description: 'El sistema probado para desarmar la excusa, descubrir la objeción real y tomar el control de la conversación.',
};

// Los datos específicos para esta página
const pageData = {
    title: 'Descarga el Mapa Definitivo de Objeciones',
    subtitle: 'El sistema para tomar el control de la conversación y provocar el cierre.',
    imageSrc: '/images/recursos/mapa-objeciones.png', // Debes colocar tu imagen aquí
    imageAlt: 'Portada del PDF Mapa Definitivo de Objeciones de Hugo Herrera',
    benefits: [
        'Descubrir la objeción real detrás de la excusa del cliente.',
        'Tomar el control absoluto de cualquier conversación de ventas.',
        'Implementar un guion probado para cerrar con autoridad.'
    ],
    ctaText: 'ACCEDER AL SISTEMA AHORA'
};

export default function ObjecionesPage() {
    return <ResourceLayout {...pageData} />;
}