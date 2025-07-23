import SocialProofSection from '@/components/software/SocialProofSection';
import DifferentiationSection from '@/components/software/DifferentiationSection';
import HeroSection from '@/components/software/HeroSection';
import MethodologySection from '@/components/software/MethodologySection';
import OffersSection from '@/components/software/OffersSection';
import PainPointsSection from '@/components/software/PainPointsSection';
import TransformationSection from '@/components/software/TransformationSection';
import type { Metadata } from 'next';
import CtaSection from '@/components/software/CtaSection';





export const metadata: Metadata = {
    title: 'Certificación Vendedor Experto | Entrenamiento para Equipos',
    description: 'Transforma a tu equipo de ventas en una fuerza de élite estandarizada con nuestro entrenamiento práctico de 8 horas en vivo.',
};

export default function SoftwareParaEmpresasPage() {
    return (
        <main>
            <HeroSection />
            <PainPointsSection />
            <TransformationSection />
            <OffersSection />
            <MethodologySection />
            <DifferentiationSection />
            <SocialProofSection />
            <CtaSection />


        </main>
    );
}