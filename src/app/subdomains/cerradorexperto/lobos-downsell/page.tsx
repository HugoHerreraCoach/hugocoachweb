// src/app/lobos-downsell/page.tsx

import type { Metadata } from 'next';
import HeroSection from '@cerradorexperto/components/lobosDownsell/HeroSection'; // Asegúrate de que la ruta a tu componente sea correcta.

export const metadata: Metadata = {
    title: 'Facilidad de Pago Única | Hugo Herrera Coach',
    description: 'Solo en esta página, accede al sistema completo \'Lobos de Ventas\' con un plan de pagos especial. Es tu última oportunidad para construir tu estructura de ventas.',
    robots: {
        index: false, 
        follow: false, 
    },
};

// --- COMPONENTE DE LA PÁGINA ---
export default function LobosDownsellPage() {
    return (
        <main>
            <HeroSection />
        </main>
    );
}