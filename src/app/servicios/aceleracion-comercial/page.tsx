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
  title: 'Aceleración Comercial | Instala una Máquina de Ventas Autónoma | Hugo Herrera',
  description:
    'Diseñamos, instalamos y auditamos el sistema comercial de tu empresa para aumentar tu facturación un 20% en 90 días. Garantizado por contrato o trabajamos gratis.',
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
