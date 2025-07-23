import { HeroSection } from '@/components/entrenamientoEquipos/HeroSection';
import { ProblemSection } from '@/components/entrenamientoEquipos/ProblemSection';
import type { Metadata } from 'next';
import { SolutionSection } from '@/components/entrenamientoEquipos/SolutionSection';
import { ModalitiesSection } from '@/components/entrenamientoEquipos/ModalitiesSection';
import { CurriculumSection } from '@/components/entrenamientoEquipos/CurriculumSection';
import { ValueStackSection } from '@/components/entrenamientoEquipos/ValueStackSection';
import { CtaSection } from '@/components/entrenamientoEquipos/CtaSection';
import { TestimonialSection } from '@/components/entrenamientoEquipos/TestimonialSection';




export const metadata: Metadata = {
  title: 'Certificación Vendedor Experto | Entrenamiento para Equipos',
  description: 'Transforma a tu equipo de ventas en una fuerza de élite estandarizada con nuestro entrenamiento práctico de 8 horas en vivo.',
};

export default function CertificacionVendedorExpertoPage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ModalitiesSection />
      <CurriculumSection />
      <ValueStackSection />
      <TestimonialSection />
      <CtaSection />
    </main>
  );
}