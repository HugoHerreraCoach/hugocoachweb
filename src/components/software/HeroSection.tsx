import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";



export default function HeroSection() {
  return (
    <section className="relative bg-black text-white flex justify-center items-center min-h-[91vh] text-center py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.8)] z-10" />
      <Image
        src="/images/software/softwareHeader.jpg"
        alt="Hugo Herrera, fundador de Líder Experto"
        fill={true}
        className="object-cover opacity-50 object-[48%_50%] md:object-center"
        priority
      />

      <div className="max-w-7xl px-4 -mt-10 relative z-20">
        <h1 className="text-4xl font-bold tracking-tight leading-[1.2] text-white lg:text-6xl text-balance">
          No construyas una página web. Instala un motor de ventas.
        </h1>
        <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-300 text-balance">
          Te diseño e implemento un sistema digital, no una simple página. Es la estructura probada para que tu negocio genere un flujo constante de clientes sin depender de ti.
        </p>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-x-6">
          <Link
            href="https://calendly.com/hugoherrerateam-imtt/30min"
            target="_blank"
            className="rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 text-lg lg:text-xl font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
          >
            Agendar Sesión Estratégica
          </Link>
          <Link
            href="#proceso"
            className="group text-lg lg:text-xl mt-6 md:mt-0 font-semibold leading-[1.2] text-slate-300 flex items-center gap-x-1"
          >
            Descubrir el Proceso <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}