// src/components/servicios/MasDeHugo.tsx
// Lo que no es el negocio principal pero existe: eventos, CRM y software a medida.

import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Code2, Smartphone, type LucideIcon } from 'lucide-react';
import { CONEXIPEMA_URL } from '@/lib/evento';
import { CONEXIGO_URL } from '@/lib/servicios';

interface Item {
    nombre: string;
    texto: string;
    href: string;
    isExternal: boolean;
    Icono: LucideIcon;
}

const items: Item[] = [
    {
        nombre: 'Eventos con Conexipema',
        texto: 'Mi empresa de eventos. Negocios Legendarios y otros encuentros de ventas y negocios en Perú.',
        href: CONEXIPEMA_URL,
        isExternal: true,
        Icono: CalendarDays,
    },
    {
        nombre: 'ConexiGO, el sistema de ventas',
        texto: 'Sistema para ordenar tus clientes y ventas por WhatsApp, con juegos y entrenamiento para tu equipo. Planes desde S/50 al mes.',
        href: CONEXIGO_URL,
        isExternal: true,
        Icono: Smartphone,
    },
    {
        nombre: 'Software y embudos a medida',
        texto: 'Programas hechos a la medida para ordenar tus ventas, tus clientes y tu operación.',
        href: '/servicios/desarrollo-software',
        isExternal: false,
        Icono: Code2,
    },
];

export function MasDeHugo() {
    return (
        <section className="w-full bg-slate-950 py-12 lg:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-white lg:text-3xl">También hago esto</h2>
                <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
                    {items.map(({ nombre, texto, href, isExternal, Icono }) => (
                        <Link
                            key={nombre}
                            href={href}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-slate-600 md:p-5 lg:p-6"
                        >
                            <span className="flex items-center gap-4">
                                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#0a4afc]/15 text-[#4d8bff]">
                                    <Icono size={22} aria-hidden="true" />
                                </span>
                                <span className="flex flex-grow items-center justify-between gap-2 text-lg font-semibold leading-tight text-white">
                                    {nombre}
                                    <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#4d8bff]" aria-hidden="true" />
                                </span>
                            </span>
                            <span className="mt-3 hidden text-slate-400 md:block">{texto}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
