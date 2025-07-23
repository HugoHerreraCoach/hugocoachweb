import { CtaSection } from '@/components/sistemaLider/CtaSection';
import { FaqSection } from '@/components/sistemaLider/FaqSection';
import { HeroSection } from '@/components/sistemaLider/HeroSection';
import { HowItWorksSection } from '@/components/sistemaLider/HowItWorksSection';
import { ProblemSection } from '@/components/sistemaLider/ProblemSection';
import { SocialProofSection } from '@/components/sistemaLider/SocialProofSection';
import { SolutionSection } from '@/components/sistemaLider/SolutionSection';
import { ValueStackSection } from '@/components/sistemaLider/ValueStackSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Implementación Líder Experto | Hugo Herrera Coach',
    description: 'Instalamos un sistema comercial a medida para escalar tus ventas y construir un equipo de alto rendimiento.',
};

export default function ImplementacionLiderExpertoPage() {
    return (
        <main>
            <HeroSection />
            <ProblemSection />
            <SolutionSection/>
            <HowItWorksSection />
            <ValueStackSection />
            <SocialProofSection />
            <CtaSection />
            <FaqSection />
        </main>
    );
}