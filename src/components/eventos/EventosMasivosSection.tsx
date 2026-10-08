// src/components/eventos/EventosMasivosSection.tsx
// Prueba de autoridad: la trayectoria de eventos masivos, no solo la última edición.

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CONEXIPEMA_URL, EVENTO, EVENTOS_ANTERIORES, PONENTES, TRAYECTORIA } from '@/lib/evento';

interface EventosMasivosSectionProps {
    /** Fondo de la sección, para alternar con la sección de arriba. */
    fondo?: 'black' | 'slate';
}

export const EventosMasivosSection = ({ fondo = 'black' }: EventosMasivosSectionProps) => {
    return (
        <section id="eventos" className={`w-full scroll-mt-24 py-14 lg:py-28 ${fondo === 'black' ? 'bg-black' : 'bg-slate-950'}`}>
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">Mis eventos</p>
                    <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
                        Eventos masivos de ventas y negocios en {TRAYECTORIA.ciudades} ciudades del Perú.
                    </h2>
                    <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 lg:mt-8 lg:gap-x-12">
                        <div>
                            <dt className="text-4xl font-black tracking-tighter text-white lg:text-6xl">{TRAYECTORIA.asistentes}</dt>
                            <dd className="mt-1 text-slate-400">asistentes en total</dd>
                        </div>
                        <div>
                            <dt className="text-4xl font-black tracking-tighter text-white lg:text-6xl">{TRAYECTORIA.ciudades}</dt>
                            <dd className="mt-1 text-slate-400">ciudades</dd>
                        </div>
                    </dl>
                </div>

                {/* Último evento, el más grande */}
                <div className="mt-8 grid items-center gap-5 lg:mt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl lg:aspect-[4/3]">
                        <Image
                            src="/images/negocioslegendarios/escenario-hugo.jpg"
                            alt={`Hugo Herrera en el escenario frente a un coliseo lleno en ${EVENTO.nombre} 2026`}
                            fill
                            className="object-cover object-[50%_65%]"
                            sizes="(max-width: 1024px) 100vw, 55vw"
                        />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">
                            Último evento · {EVENTO.fecha}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold tracking-tight text-white lg:mt-3 lg:text-4xl">{EVENTO.nombre} 2026</h3>
                        <p className="mt-1 text-base text-slate-400 lg:mt-2 lg:text-lg">{EVENTO.lugar}</p>
                        <p className="mt-4 text-5xl font-black tracking-tighter text-white lg:mt-6 lg:text-7xl">{EVENTO.cifra}</p>
                        <p className="mt-1 text-lg text-slate-300 lg:text-xl text-balance">
                            {EVENTO.cifraEtiqueta} en {EVENTO.claim.charAt(0).toLowerCase() + EVENTO.claim.slice(1)}.
                        </p>
                    </div>
                </div>
            </div>

            {/* Eventos anteriores: se deslizan en móvil y forman cuadrícula desde md */}
            <div className="mx-auto max-w-7xl lg:px-8">
                <ul className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:px-6 md:mt-12 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
                    {EVENTOS_ANTERIORES.map((evento) => (
                        <li
                            key={evento.nombre}
                            className="w-[78%] flex-shrink-0 snap-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 sm:w-[48%] md:w-auto"
                        >
                            <div className="relative aspect-[4/3] w-full">
                                <Image
                                    src={evento.foto}
                                    alt={evento.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 80vw, 33vw"
                                    quality={60}
                                />
                            </div>
                            <div className="flex items-end justify-between gap-4 p-4 lg:p-5">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">{evento.ciudad}</p>
                                    <p className="mt-1 text-base font-semibold text-white lg:text-lg">{evento.nombre}</p>
                                </div>
                                <p className="text-right">
                                    <span className="block text-2xl font-black tracking-tight text-white lg:text-3xl">{evento.asistentes}</span>
                                    <span className="block text-sm text-slate-400">asistentes</span>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-6 lg:mt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:pt-8">
                    <p className="text-base text-slate-300 lg:text-lg">
                        <span className="font-semibold text-white">Han estado en mis eventos: </span>
                        {PONENTES.join(' · ')}.
                    </p>
                    <a
                        href={CONEXIPEMA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-[44px] flex-shrink-0 items-center gap-2 text-base font-semibold text-[#4d8bff] transition-colors hover:text-white lg:text-lg"
                    >
                        Ver los eventos de {EVENTO.productora}
                        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    );
};
