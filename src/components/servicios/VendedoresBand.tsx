// src/components/servicios/VendedoresBand.tsx
// Segunda puerta: vendedores que compran por su cuenta. Se usa en la home y en /servicios.

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Precio } from '@/components/ui/Precio';
import { serviciosVendedores } from '@/lib/servicios';

interface VendedoresBandProps {
    /** Fondo de la sección, para alternar con la sección de arriba. */
    fondo?: 'black' | 'slate';
}

export function VendedoresBand({ fondo = 'slate' }: VendedoresBandProps) {
    return (
        <section id="vendedores" className={`w-full scroll-mt-24 py-14 lg:py-24 ${fondo === 'black' ? 'bg-black' : 'bg-slate-950'}`}>
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">Para vendedores</p>
                    <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl text-balance">
                        ¿Vendes por tu cuenta? Empieza por aquí.
                    </h2>
                    <p className="mt-3 text-lg text-slate-300 lg:text-xl text-balance">
                        Tres pasos para vender más sin esperar a que tu empresa te entrene.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl lg:px-8">
                <ol className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:px-6 md:grid md:grid-cols-3 md:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
                    {serviciosVendedores.map((servicio, index) => (
                        <li key={servicio.id} className="w-[82%] flex-shrink-0 snap-center sm:w-[55%] md:w-auto">
                            <Link
                                href={servicio.href}
                                target={servicio.isExternal ? '_blank' : undefined}
                                rel={servicio.isExternal ? 'noopener noreferrer' : undefined}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 transition-colors hover:border-[#0a4afc]/60 hover:bg-slate-900"
                            >
                                <span className="relative block aspect-[4/3] w-full bg-slate-950">
                                    <Image
                                        src={servicio.imagen.src}
                                        alt={servicio.imagen.alt}
                                        fill
                                        sizes="(min-width: 1280px) 400px, (min-width: 768px) 30vw, (min-width: 640px) 55vw, 82vw"
                                        className={
                                            servicio.imagen.ajuste === 'contain'
                                                ? 'object-contain p-4 drop-shadow-xl'
                                                : 'object-cover object-[50%_35%]'
                                        }
                                    />
                                    <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
                                        Paso {index + 1}
                                    </span>
                                </span>
                                <span className="flex flex-grow flex-col p-5 lg:p-6">
                                    <span className="text-xl font-semibold text-white">{servicio.nombre}</span>
                                    <span className="mt-2 flex-grow text-slate-400">{servicio.resumen}</span>
                                    <span className="mt-5 flex items-center justify-between">
                                        <Precio monto={servicio.monto} className="text-2xl font-bold text-white" />
                                        <ArrowRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-[#4d8bff]" aria-hidden="true" />
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
