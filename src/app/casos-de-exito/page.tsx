// src/app/casos-de-exito/page.tsx
// Orden pensado para un gerente: primero empresas como la suya, luego voces, eventos y libros.

import type { Metadata } from 'next';
import HeroSection from '@/components/casosDeExito/HeroSection';
import EmpresasSection from '@/components/casosDeExito/EmpresasSection';
import TestimoniosVideoSection from '@/components/casosDeExito/TestimoniosVideoSection';
import GoogleReviewsSection from '@/components/casosDeExito/GoogleReviewsSection';
import { EventosMasivosSection } from '@/components/eventos/EventosMasivosSection';
import MentoresComunidadSection from '@/components/casosDeExito/MentoresComunidadSection';
import LiderExpertoSection from '@/components/casosDeExito/LiderExpertoSection';
import CerradorExpertoSection from '@/components/casosDeExito/CerradorExpertoSection';
import { LlamadaGratisCta } from '@/components/servicios/LlamadaGratisCta';

export const metadata: Metadata = {
    title: 'Casos de éxito | Hugo Herrera',
    description:
        'Empresas, vendedores y líderes que aplicaron el método de Hugo Herrera, más de 180 reseñas en Google y eventos masivos en 8 ciudades del Perú.',
};

const CasosDeExitoPage = () => {
    return (
        <main>
            <HeroSection />
            <EmpresasSection />
            <TestimoniosVideoSection />
            <GoogleReviewsSection />
            <EventosMasivosSection />
            <MentoresComunidadSection />
            <LiderExpertoSection />
            <CerradorExpertoSection />
            <LlamadaGratisCta />
        </main>
    );
};

export default CasosDeExitoPage;
