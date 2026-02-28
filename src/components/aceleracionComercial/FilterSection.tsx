'use client';

import { Check, X } from 'lucide-react';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';

interface FilterItem {
  text: string;
}

const yesItems: FilterItem[] = [
  { text: 'Tienes un buen producto/servicio que ya se vende.' },
  { text: 'Tienes un equipo de ventas, aunque sea pequeño.' },
  { text: 'Estás dispuesto a soltar el control y dejarte guiar.' },
];

const noItems: FilterItem[] = [
  { text: 'Buscas una pastilla mágica sin trabajar.' },
  { text: 'Tu producto no tiene demanda en el mercado.' },
  { text: 'No estás dispuesto a invertir en tu negocio.' },
];

export function FilterSection() {
  return (
    <section className="w-full bg-slate-950 py-16 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <AnimatedOpacity>
          <h2 className="text-center text-2xl lg:text-5xl font-bold tracking-tight text-white text-balance mb-8 lg:mb-16">
            ¿Esto es para ti?
          </h2>
        </AnimatedOpacity>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          {/* YES column */}
          <AnimatedOpacity>
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 lg:p-8 h-full">
              <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                <Check className="h-6 w-6" /> Sí agenda si...
              </h3>
              <ul className="space-y-4">
                {yesItems.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                    <span className="text-base lg:text-lg text-slate-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedOpacity>

          {/* NO column */}
          <AnimatedOpacity duration="duration-[1500ms]">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 lg:p-8 h-full">
              <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <X className="h-6 w-6" /> NO agendes si...
              </h3>
              <ul className="space-y-4">
                {noItems.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20">
                      <X className="h-3 w-3 text-red-400" />
                    </div>
                    <span className="text-lg text-slate-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedOpacity>
        </div>
      </div>
    </section>
  );
}
