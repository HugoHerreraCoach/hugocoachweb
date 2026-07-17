// src/app/lobos-downsell/page.tsx

import type { Metadata } from 'next';
import HeroSection from '@cerradorexperto/components/gracias/HeroSection'; 
import AccessSteps from '@cerradorexperto/components/gracias/AccessSteps';
import MissionSection from '@cerradorexperto/components/gracias/MissionSection';

export const metadata: Metadata = {
    title: 'Gracias | Hugo Herrera Coach',
    description: 'Gracisa por comprar el libro Cerrador Experto',
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
            <AccessSteps/>
            <MissionSection/>
        </main>
    );
}