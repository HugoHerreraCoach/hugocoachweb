// src/app/servicios/conferencias/page.tsx

import { HeroSection } from '@/components/conferencias/HeroSection';
import type { Metadata } from 'next';
import  PainSection  from '@/components/conferencias/PainSection';
import { PivotSection } from '@/components/conferencias/PivotSection';
import  SolutionSection  from '@/components/conferencias/SolutionSection';
import { OfferStackSection } from '@/components/conferencias/OfferStackSection';
import { GuaranteeSection } from '@/components/conferencias/GuaranteeSection';
import { InvestmentSection } from '@/components/conferencias/InvestmentSection';
import { SocialProofSection } from '@/components/conferencias/SocialProofSection';
import { QualificationSection } from '@/components/conferencias/QualificationSection';
import { ProcessSection } from '@/components/conferencias/ProcessSection';
import { CtaSection } from '@/components/conferencias/CtaSection';


export const metadata: Metadata = {
  title: 'Conferencias | Hugo Herrera',
  description: 'TDeja de contratar motivación. Instala un sistema de ventas probado en tu equipo con una conferencia de alto impacto y resultados medibles.',
};

export default function ConferenciasHugoHerreraPage() {
  return (
    <main>
        <HeroSection />
        <PainSection />
        <PivotSection />
        <SolutionSection />
        <OfferStackSection />
        <GuaranteeSection />
        <InvestmentSection />
        <SocialProofSection />
        <QualificationSection />
        <ProcessSection />
        <CtaSection />

    </main>
  );
}