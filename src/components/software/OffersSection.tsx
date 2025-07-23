import { Bot, Zap } from 'lucide-react';

export default function OffersSection() {
  return (
    <section className="w-full bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
            Construyo 2 Sistemas a Medida para Escalar tu Negocio
          </h2>
          <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-600 text-balance">
            Cada negocio tiene un cuello de botella distinto. Identifica cuál es el tuyo.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Oferta A */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-[#0a4afc]/50">
            <div className="flex items-center gap-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0a4afc]/15">
                <Zap className="h-7 w-7 text-[#0a4afc]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Motor de Ventas Digital</h3>
            </div>
            <p className="mt-1 text-base font-semibold text-[#0a4afc]">PARA ATRAER Y CONVERTIR</p>
            <p className="mt-4 text-lg text-slate-700">
              Es el sistema de <span className='font-semibold'>cara al cliente.</span> Construimos el embudo o la página web de alta performance que transforma extraños en prospectos calificados. Es la solución para el negocio que necesita un <span className='font-semibold'>flujo constante y predecible</span>  de oportunidades de venta.
            </p>
          </div>
          {/* Oferta B */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-[#0a4afc]/50">
            <div className="flex items-center gap-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0a4afc]/15">
                <Bot className="h-7 w-7 text-[#0a4afc]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Centro de Mando Comercial</h3>
            </div>
            <p className="mt-1 text-base font-semibold text-[#0a4afc]">PARA OPERAR Y CONTROLAR</p>
            <p className="mt-4 text-lg text-slate-700">
              Es el sistema de <span className='font-semibold'>gestión interna.</span> Diseñamos el software a medida que automatiza tu operación, elimina el caos y <span className='font-semibold'>te da control total</span> sobre tus pedidos y clientes. Es la solución para el negocio que ya vende, pero está ahogado en procesos manuales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}