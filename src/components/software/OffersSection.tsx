import { Bot, Zap } from 'lucide-react';
import type { ElementType, ReactNode } from 'react';

// Interfaz para definir la estructura de datos de cada tarjeta de oferta.
interface OfferCardData {
  icon: ElementType;
  title: string;
  tagline: string;
  description: ReactNode;
}

// Array con los datos de las tarjetas.
const offerCardsData: OfferCardData[] = [
  {
    icon: Zap,
    title: 'Motor de Ventas Digital',
    tagline: 'PARA ATRAER Y CONVERTIR',
    description: (
      <>
        Es el sistema de{' '}
        <span className="font-semibold text-white">cara al cliente.</span>{' '}
        Construimos el embudo o la página web de alta performance que transforma
        extraños en prospectos calificados.
      </>
    ),
  },
  {
    icon: Bot,
    title: 'Centro de Mando Comercial',
    tagline: 'PARA OPERAR Y CONTROLAR',
    description: (
      <>
        Es el sistema de{' '}
        <span className="font-semibold text-white">gestión interna.</span>{' '}
        Diseñamos el software a medida que automatiza tu operación, elimina el
        caos y{' '}
        <span className="font-semibold text-white">te da control total</span>{' '}
        sobre tus pedidos y clientes.
      </>
    ),
  },
];

export default function OffersSection() {
  return (
    <section
      className="relative w-full bg-fixed bg-cover bg-center py-20 lg:py-28"
      style={{ backgroundImage: "url('/images/software/liquidSoftware.jpg')" }}
    >
      <div
        className="absolute inset-0 bg-slate-950/70"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Construyo 2 Sistemas a Medida para Escalar tu Negocio
          </h2>
          <p className="text-balance mt-6 text-xl leading-[1.4] text-slate-300 lg:text-2xl">
            Cada negocio tiene un cuello de botella distinto. Identifica cuál es
            el tuyo.
          </p>
        </div>

        <div className="mx-auto mt-8 lg:mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {offerCardsData.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-white/20 bg-slate-500/10 p-8 backdrop-blur-xl 
                         transition-all duration-300 hover:-translate-y-2 hover:border-[#0a4afc]/60 
                         hover:bg-slate-500/20 hover:shadow-2xl hover:shadow-[#0a4afc]/10"
            >
              <div className="flex items-center gap-x-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#0a4afc]/15">
                  <card.icon className="h-7 w-7 text-[#0a4afc]" aria-hidden="true" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  {card.title}
                </h3>
              </div>
              <p className="mt-1 text-base lg:text-xl font-semibold text-blue-600">
                {card.tagline}
              </p>
              <p className="mt-4 text-lg lg:text-2xl leading-[1.4] text-slate-200">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}