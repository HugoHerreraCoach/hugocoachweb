// app/components/ui/SolutionCard.tsx

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from 'lucide-react';

interface SolutionCardProps {
  title: string;
  desc: string;
  link: string;
  cta: string;
  image: string;
}

export default function SolutionCard({ title, desc, link, cta, image }: SolutionCardProps) {
  const isExternalLink: boolean = link.startsWith('http');

  return (
    <div className="p-8 bg-slate-900/40 rounded-xl border border-slate-800 flex flex-col h-full 
                   transition-all duration-300 ease-in-out 
                   hover:border-blue-600 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/40">

      <div className="relative w-full rounded-lg overflow-hidden mb-6">
        <Image
          src={image}
          alt={`Imagen representativa de ${title}`}
          width={800}
          height={800}
          sizes="(max-width: 768px) 80vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-slate-300 flex-grow">{desc}</p>

        {/* El hover del botón se mantiene como estaba, es claro y efectivo */}
        <Link
          href={link}
          target={isExternalLink ? '_blank' : '_self'}
          rel={isExternalLink ? 'noopener noreferrer' : undefined}
          className="group mt-6 inline-flex items-center justify-center gap-x-2 border border-slate-700 
                     text-white font-bold px-6 py-3 rounded-lg shadow-lg shadow-blue-950/30 
                     transition-colors duration-300 
                     hover:bg-[#0a4afc] hover:border-[#0a4afc]"
        >
          {cta}
          {/* El ícono se mueve gracias a 'group-hover' en el Link padre */}
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}