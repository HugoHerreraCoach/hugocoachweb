import { ResourceLayout } from '@/components/layout/ResourceLayout';
import type { Metadata } from 'next';

// Metadatos para SEO y posicionamiento
export const metadata: Metadata = {
    title: 'Sistema de Capacitación de 30 Días | Hugo Herrera Coach',
    description: 'El plan de estudios probado para transformar a un vendedor nuevo en un cerrador de élite.',
};

// Datos específicos para este recurso
const pageData = {
    title: 'Descarga el Sistema de Capacitación de 30 Días',
    subtitle: 'El plan de acción probado para construir un equipo de ventas de alto rendimiento.',
    imageSrc: '/images/recursos/sistema-30-dias.png', // Coloca tu imagen en esta ruta
    imageAlt: 'Portada del PDF Sistema de Capacitación de 30 Días de Hugo Herrera',
    benefits: [
        'Instalar un proceso de onboarding que funciona sin tu supervisión constante.',
        'Acelerar la curva de aprendizaje de tus nuevos vendedores.',
        'Estandarizar las habilidades de tu equipo para garantizar resultados predecibles.'
    ],
    ctaText: 'OBTENER PLAN DE ACCIÓN'
};

export default function CapacitacionPage() {
    return <ResourceLayout {...pageData} />;
}