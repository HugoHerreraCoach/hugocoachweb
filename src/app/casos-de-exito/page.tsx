// src/app/casos-de-exito/page.tsx

import type { Metadata } from 'next';
import HeroSection from '@/components/casosDeExito/HeroSection';
import TestimoniosVideoSection from '@/components/casosDeExito/TestimoniosVideoSection';
import GoogleReviewsSection from '@/components/casosDeExito/GoogleReviewsSection';
import LiderExpertoSection from '@/components/casosDeExito/LiderExpertoSection';
import CerradorExpertoSection from '@/components/casosDeExito/CerradorExpertoSection';
import EscalaAutoridadSection from '@/components/casosDeExito/EscalaAutoridadSection';
import CtaSection from '@/components/casosDeExito/CtaSection';

export const metadata: Metadata = {
    title: 'Casos de Éxito | Hugo Herrera Coach',
    description: 'Resultados reales y pruebas del sistema de ventas de Hugo Herrera. Testimonios de vendedores y líderes que aplicaron el método.',
};

const CasosDeExitoPage = () => {
    return (
        <main>
            <HeroSection />
            <TestimoniosVideoSection />
            <GoogleReviewsSection />
            <LiderExpertoSection /> 
            <CerradorExpertoSection />
            <EscalaAutoridadSection />
            <CtaSection />
        </main>
    );
};

export default CasosDeExitoPage;