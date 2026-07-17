// src/app/page.tsx

import React from 'react';
import HeroSection from "@info/components/HeroSection"
import ToolboxSection from '@info/components/ToolboxSection';
import FeaturedProductSection from '@info/components/FeaturedProductSection';
import InnovationSection from '@info/components/InnovationSection';
import CtaSection from '@info/components/CtaSection';
import LiderExpertoOffer from '@info/components/LiderExpertoOffer';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
            <HeroSection />
            <LiderExpertoOffer />
            <ToolboxSection />
            <FeaturedProductSection />
            <InnovationSection />
            <CtaSection />
        </main>
    );
}
