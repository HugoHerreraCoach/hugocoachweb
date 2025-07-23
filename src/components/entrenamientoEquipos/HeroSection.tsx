import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const CALENDLY_URL: string = 'https://calendly.com/hugoherrera-coach/agendar-videollamada';

export function HeroSection() {
  return (
    <section className="relative bg-black text-white flex justify-center items-center min-h-[91vh] text-center py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.8)] z-10" />
      <Image
        src="/images/equipos/equiposHeader.jpg"
        alt="Hugo Herrera en su faceta como estratega de ventas"
        fill={true}
        className="object-cover opacity-50 object-[40%_50%] md:object-center"
        priority
      />

      <div className="max-w-7xl px-4 relative z-20">
        <h1 className="text-4xl font-bold tracking-tight leading-[1.2] text-white lg:text-6xl  text-balance">
          Tu equipo no necesita motivación. Necesita un sistema para cerrar.
        </h1>
        <p className="mt-6 text-xl lg:text-2xl leading-[1.2] text-slate-300  text-balance">
          Mi <span className="font-bold text-white">Certificación Vendedor Experto</span> instala un sistema de ventas probado en tu equipo para que vendan de forma consistente, y a ti te devuelve el tiempo para hacer crecer el negocio.
        </p>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-x-6">
          <Link
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 text-lg font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
          >
            Agendar Sesión de Diagnóstico
          </Link>
          <Link href="#plan-de-estudios" className="group text-lg mt-6 md:mt-0 font-semibold leading-[1.2] text-slate-300 flex items-center gap-x-1">
            Ver Plan de Estudios <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </section>
  );
}