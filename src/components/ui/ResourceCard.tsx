//src/components/ResourceCard.tsx

import Link from 'next/link';
import type { FC, ReactNode } from 'react';

interface ResourceCardProps {
  tag: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  icon: ReactNode; 
}

export const ResourceCard: FC<ResourceCardProps> = ({ tag, title, description, ctaText, ctaLink, icon }) => {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Etiqueta de Segmentación */}
      <p className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-600">{tag}</p>
      
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-slate-100">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      </div>

      {/* Descripción (El Pitch) */}
      <p className="mt-5 flex-grow text-lg leading-relaxed text-slate-600">
        {description}
      </p>

      {/* Llamada a la Acción (La Conversión) */}
      <div className="mt-6">
        <Link href={ctaLink} className="inline-block rounded-md bg-slate-800 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-black">
          {ctaText}
        </Link>
      </div>
    </div>
  );
};