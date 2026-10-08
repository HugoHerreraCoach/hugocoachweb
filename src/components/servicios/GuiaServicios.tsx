// src/components/servicios/GuiaServicios.tsx
// "¿Cuál me conviene?": cada necesidad lleva a su servicio, con icono y precio a la vista.

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IconoPng } from '@/components/ui/IconoPng';
import { serviciosEmpresas } from '@/lib/servicios';

const filas = [
    { necesito: 'Quiero una asesoría rápida para mi negocio o mi equipo', id: 'sesion-estrategica' },
    { necesito: 'Quiero que mi equipo practique cerrar ventas en un día', id: 'full-day' },
    { necesito: 'Quiero acompañar a mi equipo varias semanas', id: 'coaching-equipos' },
    { necesito: 'Quiero reunir a todo mi equipo en un evento', id: 'conferencia' },
    { necesito: 'Quiero cambiar cómo vende toda mi empresa, con garantía', id: 'aceleracion-comercial' },
];

const servicioPorId = Object.fromEntries(serviciosEmpresas.map((s) => [s.id, s]));

export function GuiaServicios() {
    return (
        <section className="w-full bg-slate-950 py-14 lg:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">Para decidir rápido</p>
                <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl">¿Cuál me conviene?</h2>

                <ul className="mt-8 divide-y divide-slate-800 border-y border-slate-800">
                    {filas.map((fila) => {
                        const servicio = servicioPorId[fila.id];
                        if (!servicio) return null;
                        return (
                            <li key={fila.id}>
                                <Link
                                    href={`#${fila.id}`}
                                    className="group flex min-h-[80px] items-center gap-4 py-4 transition-colors hover:bg-white/[0.02]"
                                >
                                    {servicio.icono && <IconoPng src={servicio.icono} tamano="md" />}
                                    <span className="flex-grow">
                                        <span className="block text-base leading-snug text-slate-100 sm:text-lg lg:text-xl">{fila.necesito}</span>
                                        <span className="mt-1 block text-sm font-semibold text-[#4d8bff]">
                                            {servicio.nombre}
                                            <span className="whitespace-nowrap font-medium text-slate-400"> · {servicio.precio}</span>
                                        </span>
                                    </span>
                                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-[#4d8bff]" aria-hidden="true" />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
