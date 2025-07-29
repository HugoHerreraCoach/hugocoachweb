// src/components/blog/ArticleHighlights.tsx

import type { SVGProps } from 'react';

interface ArticleHighlightsProps {
  highlights: string[];
}

// Usamos Lucide-React para consistencia, pero mantenemos tu ícono por simplicidad
const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
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
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const ArticleHighlights = ({ highlights }: ArticleHighlightsProps) => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 my-8 border border-blue-500/20">
      <h3 className="text-xl lg:text-2xl font-bold text-blue-600 mb-4">En este Dossier aprenderás:</h3>
      <ul className="space-y-3">
        {highlights.map((highlight: string, index: number) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <span className="text-gray-200 text-lg md:text-xl">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};