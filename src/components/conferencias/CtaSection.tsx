// src/components/conferencias/CtaSection.tsx

import Link from 'next/link';
import Image from 'next/image';
import { CircleCheck } from 'lucide-react';

export const CtaSection = () => {
    return (
        <section className="relative w-full min-h-[91vh] flex justify-center items-center py-20 sm:py-28 text-white">
            {/* Imagen de Fondo */}
            <div className="absolute inset-0">
                <Image
                    src="/images/conferencias/conferenciasCta.jpg" 
                    alt="Equipo de ventas celebrando el éxito tras una conferencia de Hugo Herrera"
                    fill
                    className="object-cover"
                />
            </div>
            {/* Overlay Oscuro */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/80" aria-hidden="true" />

            {/* Contenido */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-balance">
                    Tu Plan de Ejecución Comienza Aquí.
                </h2>
                <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-200 text-balance">
                    La &quot;Sesión Estratégica&quot; es la Fase 1. No es una llamada de ventas, es una sesión de trabajo. Te irás con:
                </p>

                {/* Entregables de la llamada */}
                <ul className="mt-8 inline-block max-w-2xl space-y-4 text-left">
                    <li className="flex items-start gap-x-4">
                        <CircleCheck className="h-6 w-6 text-[#0a4afc] mt-1 flex-shrink-0" />
                        <span className="text-xl lg:text-2xl leading-[1.4] text-slate-200">
                            <span className="font-semibold text-white">El Diagnóstico:</span> La causa raíz de tu problema de ventas.
                        </span>
                    </li>
                    <li className="flex items-start gap-x-4">
                        <CircleCheck className="h-6 w-6 text-[#0a4afc] mt-1 flex-shrink-0" />
                        <span className="text-xl lg:text-2xl leading-[1.4] text-slate-200">
                            <span className="font-semibold text-white">El Plan:</span> La hoja de ruta para tu equipo.
                        </span>
                    </li>
                    <li className="flex items-start gap-x-4">
                        <CircleCheck className="h-6 w-6 text-[#0a4afc] mt-1 flex-shrink-0" />
                        <span className="text-xl lg:text-2xl leading-[1.4] text-slate-200">
                            <span className="font-semibold text-white">El Retorno:</span> La proyección del ROI del sistema.
                        </span>
                    </li>
                </ul>

                <div className="mt-10">
                    <Link
                        href="https://calendly.com/hugoherrerateam/sesion-estrategica"
                        target="_blank"
                        className="rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 text-xl lg:text-2xl font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
                    >
                        Agendar Sesión
                    </Link>
                    <p className="mt-4 text-lg lg:text-xl lg:mt-6 text-slate-400">
                        Cero compromiso. 100% estrategia.
                    </p>
                </div>
            </div>
        </section>
    );
};