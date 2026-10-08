import { DraftingCompass } from 'lucide-react';

export const PivotSection = () => {
  return (
    <section className="w-full bg-slate-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
          Más que motivación.
          <br />
          <span className="text-[#0a4afc]">Un método para vender.</span>
        </h2>
        
        {/* La tarjeta estática de "El Arquitecto" con el contenido original */}
        <div className="mx-auto mt-8 lg:mt-16 max-w-3xl">
          <div className="rounded-2xl bg-black/50 p-8 lg:p-12 text-left border-2 border-[#0a4afc]/50">
            <div className="flex justify-center items-center gap-4">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#0a4afc]/15">
                <DraftingCompass className="h-9 w-9 text-[#0a4afc]" />
              </div>
            </div>
            <p className="mt-6 text-xl lg:text-2xl leading-relaxed text-balance text-slate-200">
              La motivación dura un día. Un método dura años. Yo no vengo solo a dar una charla: construyo con tu equipo el método exacto para vender más.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};