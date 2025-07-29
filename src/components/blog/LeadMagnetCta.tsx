// src/components/blog/LeadMagnetCta.tsx

import Link from 'next/link';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';
import type { SVGProps } from 'react';

// El icono se mantiene, solo cambiará su color vía className
const DownloadCloudIcon = (props: SVGProps<SVGSVGElement>)=> (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="8 17 12 21 16 17" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
  </svg>
);

interface LeadMagnetCtaProps {
  title: string;
  cta: string;
  link: string;
}

export const LeadMagnetCta = ({ title, cta, link }: LeadMagnetCtaProps) => {
  return (
    <AnimatedOpacity>
      <div className="bg-gray-800/50 rounded-xl p-6 my-12 border border-blue-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-shrink-0">
            <DownloadCloudIcon className="w-16 h-16 text-blue-600" />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h3 className="text-2xl font-bold text-blue-600">{title}</h3>
            <p className="mt-2 text-gray-300">
              Un recurso accionable para obtener resultados. Descárgalo y aplícalo hoy.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href={link}
              className="inline-block bg-gradient-to-b from-[#0a4afc] to-[#153eb5] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:from-[#153eb5] hover:to-[#0a4afc] hover:scale-105 shadow-md hover:shadow-blue-500/20"
            >
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </AnimatedOpacity>
  );
};