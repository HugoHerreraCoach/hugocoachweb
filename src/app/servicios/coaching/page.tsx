// src/app/servicios/coaching/page.tsx

import CtaSection from '@/components/coaching/CtaSection';
import FaqSection from '@/components/coaching/FaqSection';
import FilterSection from '@/components/coaching/FilterSection';
import GuaranteeSection from '@/components/coaching/GuaranteeSection';
import HeroSection from '@/components/coaching/HeroSection';
import OfferSection from '@/components/coaching/OfferSection';
import ProblemSection from '@/components/coaching/ProblemSection';
import SocialProofSection from '@/components/coaching/SocialProofSection';
import SolutionSection from '@/components/coaching/SolutionSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Coaching 1:1 | Hugo Herrera Coach',
    description: 'Acelera tus ventas en tiempo récord',
};

export default function CoachingPage() {
    return (
        <main>
            <HeroSection />
            <ProblemSection />
            <SolutionSection />
            <OfferSection />
            <SocialProofSection />
            <GuaranteeSection />
            <FilterSection />
            <CtaSection />
            <FaqSection />

        </main>
    );
}