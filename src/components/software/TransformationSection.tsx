'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

// Defino un tipo para el estado del toggle, asegurando que solo pueda ser 'before' o 'after'.
type ViewState = 'before' | 'after';

// He movido el contenido de las tarjetas a un objeto para mantener el JSX más limpio y fácil de mantener.
const content: Record<ViewState, { title: string; description: string; tag: string; tagColor: string; icon: React.ReactNode; ringColor: string; }> = {
  before: {
    tag: 'Estado Actual',
    tagColor: 'text-red-400',
    title: 'Tu Web como "Catálogo Pasivo"',
    description: 'Tu web actual es un catálogo que espera. <strong>Te obliga a ti a hacer el trabajo pesado:</strong> responder preguntas básicas, calificar prospectos y perseguir el cierre. Es un costo fijo que no vende por sí solo.',
    icon: <XCircle className="w-7 h-7 text-red-400" />,
    ringColor: 'border-slate-700',
  },
  after: {
    tag: 'Estado Futuro',
    tagColor: 'text-green-400',
    title: 'Tu Web como "Activo Inteligente"',
    description: 'Instalamos un sistema que trabaja para ti. <strong>Filtra a los curiosos, califica a los compradores</strong> y los guía paso a paso hacia la venta. Es un activo que produce resultados y te libera para que actúes como estratega.',
    icon: <CheckCircle2 className="w-7 h-7 text-green-400" />,
    ringColor: 'border-[#0a4afc]/50 ring-2 ring-[#0a4afc]/30',
  }
};

const TransformationSection: FC = () => {
  // Uso useState para controlar qué vista está activa. 'after' será el estado inicial.
  const [view, setView] = useState<ViewState>('after');

  const activeContent = content[view];

  return (
    <section className="w-full bg-slate-900 py-20 lg:py-28 text-center">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
          Tu web es solo la herramienta. El sistema es lo que provoca la venta.
        </h2>

        {/* CONTENEDOR DEL COMPONENTE INTERACTIVO */}
        <div className="mt-12">
          {/* Toggle Switch */}
          <div className="inline-flex items-center justify-center bg-black/20 p-1.5 rounded-xl mb-6 border border-slate-700">
            <button
              onClick={() => setView('before')}
              className={`px-6 py-2 rounded-lg text-base font-semibold transition-colors duration-200 cursor-pointer ${
                view === 'before'
                  ? 'bg-slate-700 text-white'
                  : 'bg-transparent text-slate-400 hover:text-white'
              }`}
            >
              Estado Actual
            </button>
            <button
              onClick={() => setView('after')}
              className={`px-6 py-2 rounded-lg text-base font-semibold transition-colors duration-200 cursor-pointer ${
                view === 'after'
                  ? 'bg-[#0a4afc] text-white'
                  : 'bg-transparent text-slate-400 hover:text-white'
              }`}
            >
              Estado Futuro
            </button>
          </div>

          {/* Tarjeta de Contenido Dinámico (REFACTORIZADA) */}
          <div
            className={`p-8 border rounded-2xl bg-black/50 text-left transition-all duration-300 ${activeContent.ringColor}`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-bold tracking-widest uppercase ${activeContent.tagColor}`}>
                {activeContent.tag}
              </h3>
              {activeContent.icon}
            </div>
            <p className="mt-2 text-2xl font-bold text-white">{activeContent.title}</p>
            <p
              className="mt-4 text-lg text-slate-300"
              dangerouslySetInnerHTML={{ __html: activeContent.description }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;