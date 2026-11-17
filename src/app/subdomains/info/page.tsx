import React from 'react';
import HeroSection from '@info/components/HeroSection';
import ConexigoShowcaseSection from '@info/components/ConexigoShowcaseSection';
import BooksAndToolsSection from '@info/components/BooksAndToolsSection';
import ToolboxSection from '@info/components/ToolboxSection';
import CtaSection from '@info/components/CtaSection';

export default function InfoHomePage(): React.ReactElement {
  return (
    <div>
      <HeroSection />
      <ConexigoShowcaseSection />
      <BooksAndToolsSection />
      <ToolboxSection />
      <CtaSection />
    </div>
  );
}
