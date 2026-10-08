import { HeroSection } from '@/components/aceleracionComercial/HeroSection';
import { PainSection } from '@/components/aceleracionComercial/PainSection';
import { PivotSection } from '@/components/aceleracionComercial/PivotSection';
import { SystemSection } from '@/components/aceleracionComercial/SystemSection';
import { BonusSection } from '@/components/aceleracionComercial/BonusSection';
import { GuaranteeSection } from '@/components/aceleracionComercial/GuaranteeSection';
import { AuthoritySection } from '@/components/aceleracionComercial/AuthoritySection';
import { SocialProofSection } from '@/components/aceleracionComercial/SocialProofSection';
import { FilterSection } from '@/components/aceleracionComercial/FilterSection';
import { CtaFinalSection } from '@/components/aceleracionComercial/CtaFinalSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aceleración Comercial | Sistema de ventas para tu equipo | Hugo Herrera',
  description:
    'Estoy 5 días en tu empresa y dejo instalado un sistema de ventas para aumentar la facturación de tu equipo comercial al menos un 10% en 90 días. Si no lo logramos, te devolvemos tu inversión.',
};

export default function AceleracionComercialPage() {
  return (
    <main>
      <HeroSection />
      <PainSection />
      <PivotSection />
      <SystemSection />
      <BonusSection />
      <GuaranteeSection />
      <AuthoritySection />
      <SocialProofSection />
      <FilterSection />
      <CtaFinalSection />
    </main>
  );
}
