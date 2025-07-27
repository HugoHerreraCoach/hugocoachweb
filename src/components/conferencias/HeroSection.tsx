// src/components/conferencias/Herosection.tsx

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative bg-black text-white flex justify-center items-center min-h-[91vh] text-center py-20 md:py-32 overflow-hidden">
      {/* Overlay Oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.8)] z-10" />

      {/* Imagen de Fondo - Reemplazar con una foto tuya de alto impacto en un escenario */}
      <Image
        src="/images/conferencias/conferenciasHeader.jpg"
        alt="Hugo Herrera dando una conferencia"
        fill={true}
        className="object-cover opacity-50 object-[43%_50%] md:object-center"
        priority
      />

      <div className="max-w-5xl px-4 relative z-20">
        <h1 className="text-4xl font-bold tracking-tight leading-[1.2] text-white lg:text-6xl text-balance">
          Menos Aplausos. Más Cierres.
        </h1>
        <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-300 text-balance">
          Deja de invertir en charlas que generan aplausos el viernes y se olvidan el lunes. Instala un sistema de ventas probado en tu equipo.
        </p>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
          <Link
            href="https://calendly.com/hugoherrerateam/sesion-estrategica"
            target="_blank"
            className="rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 text-lg lg:text-xl font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
          >
            Quiero Más Cierres
          </Link>
          <Link
            href="#testimonios"
            className="group text-lg lg:text-xl mt-4 md:mt-0 font-semibold leading-[1.2] text-slate-300 flex items-center gap-x-1"
          >
            Ver +180 testimonios <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};