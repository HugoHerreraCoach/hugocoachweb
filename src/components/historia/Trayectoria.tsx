// src/components/historia/Trayectoria.tsx
// Capítulo 6: lo que vino después de probar el sistema. Cifras desde src/lib/evento.ts.

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CONEXIPEMA_URL, EVENTOS_ANTERIORES, EVENTO } from '@/lib/evento';
import { CONEXIGO_URL } from '@/lib/servicios';

interface Direccion {
    titulo: string;
    texto: string;
    foto: string;
    alt: string;
    enlace: { etiqueta: string; href: string; externo?: boolean };
}

const eventosEnTexto = [
    ...EVENTOS_ANTERIORES.map((evento) => `${evento.ciudad} (${evento.asistentes})`),
    `${EVENTO.nombre} ${EVENTO.fecha.slice(-4)} (${EVENTO.cifra})`,
].join(', ');

const direcciones: Direccion[] = [
    {
        titulo: 'Empresas',
        texto: 'Más de 120 equipos comerciales y 20,000 vendedores capacitados.',
        foto: '/images/casosdeexito/tallerAyni.jpg',
        alt: 'Hugo Herrera entrenando a un equipo comercial',
        enlace: { etiqueta: 'Ver los casos de éxito', href: '/casos-de-exito' },
    },
    {
        titulo: 'Libros y programas',
        texto: 'Cerrador Experto, Líder Experto y Lobos de Ventas, para quien quiere aprender a su ritmo.',
        foto: '/images/negocioslegendarios/libro-139.jpg',
        alt: 'Una asistente mostrando el libro Cerrador Experto de Hugo Herrera',
        enlace: { etiqueta: 'Ver libros y programas', href: '/servicios#vendedores' },
    },
    {
        titulo: 'Eventos',
        texto: `Con Conexipema, mi empresa de eventos, enseñamos a miles a la vez: ${eventosEnTexto}.`,
        foto: '/images/negocioslegendarios/escenario-hugo.jpg',
        alt: 'Hugo Herrera en el escenario de Negocios Legendarios 2026',
        enlace: { etiqueta: 'Ver los eventos', href: CONEXIPEMA_URL, externo: true },
    },
];

export const Trayectoria = () => {
    return (
        <section className="bg-slate-100 py-16 text-slate-900 lg:py-24">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Capítulo 6</p>
                    <h2 className="mt-3 text-3xl font-extrabold text-balance lg:text-5xl">De un equipo a miles de vendedores.</h2>
                    <p className="mt-6 text-xl text-gray-700 lg:text-2xl text-balance">
                        Con un sistema probado, mi trabajo creció en tres direcciones.
                    </p>
                </div>

                <ul className="mt-12 grid gap-6 md:grid-cols-3">
                    {direcciones.map((direccion) => (
                        <li key={direccion.titulo} className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                            <div className="relative aspect-[4/3] w-full">
                                <Image
                                    src={direccion.foto}
                                    alt={direccion.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="text-2xl font-bold">{direccion.titulo}</h3>
                                <p className="mt-3 flex-1 text-lg text-gray-700">{direccion.texto}</p>
                                <Link
                                    href={direccion.enlace.href}
                                    target={direccion.enlace.externo ? '_blank' : undefined}
                                    rel={direccion.enlace.externo ? 'noopener noreferrer' : undefined}
                                    className="mt-5 inline-flex items-center gap-1.5 text-lg font-semibold text-blue-700 hover:text-blue-900"
                                >
                                    {direccion.enlace.etiqueta}
                                    {direccion.enlace.externo && <ArrowUpRight className="h-5 w-5" aria-hidden="true" />}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>

                <p className="mx-auto mt-12 max-w-4xl text-center text-xl leading-[1.5] text-gray-700 lg:text-2xl text-balance">
                    Hoy dirijo un equipo de más de 25 personas en Cajamarca. También creamos nuestro propio software,{' '}
                    <a href={CONEXIGO_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900">
                        ConexiGO
                    </a>
                    , para que los equipos de ventas registren clientes y ventas con juegos y premios.
                </p>
            </div>
        </section>
    );
};
