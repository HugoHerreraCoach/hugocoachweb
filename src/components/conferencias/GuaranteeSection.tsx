import { Stamp } from 'lucide-react';
import type { FC } from 'react';

export const GuaranteeSection: FC = () => {
    return (
        <section className="w-full bg-slate-50 py-20 lg:py-28">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Contenedor principal relativo para anclar el sello */}
                <div className="group relative">

                    {/* --- Sello Adjunto (Visible en md y superior) --- */}
                    <div className="absolute left-0 top-1/2 z-10 hidden h-36 w-36 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white p-2 shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-110 md:flex">
                        <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-br from-slate-50 to-slate-200 ring-1 ring-slate-900/5">

                            {/* --- FIX: Se eliminó el 'span' con gradiente y se aplicó color directamente al ícono --- */}
                            <Stamp className="h-12 w-12 text-blue-600" aria-hidden="true" />

                            <p className="mt-1 text-center text-sm font-bold text-slate-700">
                                Garantía de
                                <br />
                                Resultados
                            </p>
                        </div>
                    </div>

                    {/* --- Panel Principal de Texto --- */}
                    <div className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-xl transition-shadow duration-300 group-hover:shadow-2xl md:pl-28 md:pr-10 md:py-12">

                        {/* Encabezado para la vista móvil (oculto en md y superior) */}
                        <div className="mb-6 flex items-center gap-4 text-blue-600 md:hidden">
                            <Stamp className="h-10 w-10 flex-shrink-0" />
                            <h3 className="text-xl font-bold text-slate-800">Garantía de Resultados</h3>
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
                            Mi Garantía de Arquitecto:
                            <br />
                            <span className="text-slate-700">O Construimos o No Cobro.</span>
                        </h2>

                        <p className="mt-4 text-lg leading-[1.4] text-slate-600">
                            Un motivador vende palabras. Un arquitecto entrega planos. Estoy tan seguro de la estructura de mi sistema que mis honorarios están en juego.
                        </p>

                        <div className="mt-6 rounded-lg border border-slate-200/80 bg-slate-50 p-5">
                            <p className="relative text-xl leading-[1.4] font-medium text-slate-800">
                                &quot;Mi promesa es directa: si a mitad de la sesión no tienes en tus manos un <strong className="text-[#0a4afc]">plan de acción claro con herramientas listas para ser ejecutadas</strong> por tu equipo, no me pagas. Es así de simple. El sistema funciona, y yo asumo todo el riesgo para probártelo.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};