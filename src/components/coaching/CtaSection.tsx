// src/components/coaching/CtaSection.tsx

import { Check, Rocket } from 'lucide-react';


export default function CtaSection() {
    const totalValue = 465;
    const investment = 200;

    return (
        <section className="bg-slate-50 py-20 lg:py-28">
            <div className="container mx-auto max-w-4xl px-4">
                <div className="rounded-2xl bg-slate-900 text-white p-8 text-center shadow-2xl shadow-blue-500/10 border border-slate-800">

                    <div className="flex justify-center mb-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0a4afc]">
                            <Rocket className="h-8 w-8 text-white" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight lg:text-5xl text-balance">
                        Tu próximo nivel de comisiones empieza con esta decisión.
                    </h2>
                    <p className="mt-6 text-xl text-slate-300">Esto es todo lo que obtienes al agendar tu sesión hoy:</p>

                    {/* Resumen detallado de la oferta */}
                    <ul className="mt-8 text-left max-w-md mx-auto space-y-3">
                        <li className="flex items-center gap-3">
                            <Check className="h-6 w-6 text-green-400 flex-shrink-0" />
                            <span className="text-lg">Sesión Estratégica 1 a 1 de 2 horas</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="h-6 w-6 text-green-400 flex-shrink-0" />
                            <span className="text-lg">3 Meses de Acceso a Talleres Grupales</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="h-6 w-6 text-green-400 flex-shrink-0" />
                            <span className="text-lg">Manual Digital &quot;Cerrador Experto&quot;</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="h-6 w-6 text-green-400 flex-shrink-0" />
                            <span className="text-lg">7 Días de Acompañamiento por WhatsApp</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="h-6 w-6 text-green-400 flex-shrink-0" />
                            <span className="text-lg">Grabación Completa de la Sesión</span>
                        </li>
                    </ul>

                    {/* Presentación final de la inversión */}
                    <div className="mt-10 border-t border-slate-700 pt-8">
                        <p className="text-lg font-medium text-slate-400">Valor Total del Paquete: <span className="line-through">${totalValue} USD</span></p>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-white lg:text-5xl">
                            Tu Inversión Única: ${investment} USD
                        </p>
                    </div>

                    <p className="mt-8 text-lg text-yellow-400 font-semibold">
                        Importante: Para garantizar la máxima calidad, solo abro 10 cupos al mes.
                    </p>

                    <div className="mt-8">
                        <a
                            href="https://calendly.com/hugoherrera-coach/agendar-videollamada"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full max-w-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] text-white font-semibold py-4 px-8 rounded-full shadow-lg shadow-blue-500/20 transition-all duration-300 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400/50 text-xl"
                        >
                            QUIERO MI PLAN PARA DUPLICAR COMISIONES
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
