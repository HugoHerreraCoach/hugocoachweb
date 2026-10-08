// src/components/home/TestimoniosHome.tsx
// Tres voces reales (de los testimonios en video de Casos de éxito). En móvil se deslizan; desde md, cuadrícula.

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { testimoniosData, type TestimonioVideo } from '@/lib/testimonios';

const DESTACADOS: string[] = ['Alex Gualpa', 'Pamela Gaón', 'Zócima Cárdenas'];

const testimonios: TestimonioVideo[] = DESTACADOS.flatMap((nombre) => {
    const encontrado = testimoniosData.find((testimonio) => testimonio.nombre === nombre);
    return encontrado ? [encontrado] : [];
});

function iniciales(nombre: string): string {
    return nombre
        .split(' ')
        .slice(0, 2)
        .map((palabra) => palabra.charAt(0))
        .join('')
        .toUpperCase();
}

export default function TestimoniosHome() {
    return (
        <section className="bg-black py-14 lg:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">Resultados reales</p>
                <h2 className="mt-3 max-w-3xl text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
                    Lo que dicen quienes ya lo aplicaron.
                </h2>
            </div>

            <ul className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:px-6 md:mx-auto md:grid md:max-w-7xl md:grid-cols-3 md:gap-6 md:overflow-visible md:px-6 lg:mt-12 lg:px-8 [&::-webkit-scrollbar]:hidden">
                {testimonios.map((testimonio) => (
                    <li
                        key={testimonio.youtubeVideoId}
                        className="flex w-[85%] flex-shrink-0 snap-center flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:w-[60%] md:w-auto"
                    >
                        <p className="text-2xl font-bold leading-tight text-white">&ldquo;{testimonio.resultado}&rdquo;</p>
                        <p className="mt-4 flex-grow text-base leading-snug text-slate-300">{testimonio.cita}</p>
                        <div className="mt-6 flex items-center gap-3 border-t border-slate-800 pt-5">
                            {testimonio.foto ? (
                                <Image
                                    src={testimonio.foto}
                                    alt={`Foto de ${testimonio.nombre}`}
                                    width={192}
                                    height={192}
                                    sizes="56px"
                                    className="h-14 w-14 flex-shrink-0 rounded-full object-cover ring-2 ring-[#0a4afc]"
                                />
                            ) : (
                                <span
                                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#0a4afc] text-base font-bold text-white"
                                    aria-hidden="true"
                                >
                                    {iniciales(testimonio.nombre)}
                                </span>
                            )}
                            <span>
                                <span className="block text-base font-semibold text-white">{testimonio.nombre}</span>
                                <span className="block text-sm leading-snug text-slate-400">{testimonio.rol}</span>
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-1 px-5 sm:px-6 lg:mt-10 lg:flex-row lg:gap-8 lg:px-8">
                <Link
                    href="/casos-de-exito"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-base font-semibold text-[#4d8bff] transition-colors hover:text-white"
                >
                    Ver los casos de éxito
                    <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                    href="/mi-historia"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-base font-semibold text-[#4d8bff] transition-colors hover:text-white"
                >
                    Conocer mi historia
                    <ArrowRight size={16} aria-hidden="true" />
                </Link>
            </div>
        </section>
    );
}
