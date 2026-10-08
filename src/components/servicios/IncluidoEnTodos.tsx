// src/components/servicios/IncluidoEnTodos.tsx
// Lo que aplica a todas las opciones, dicho como argumento de venta y no como letra chica.

import Link from 'next/link';
import { IconoPng } from '@/components/ui/IconoPng';

interface Punto {
    icono: string;
    titulo: string;
    texto: string;
}

const puntos: Punto[] = [
    {
        icono: '/images/home/iconos/meta-viaje.png',
        titulo: 'Todo incluido en el Perú',
        texto: 'Honorarios, pasajes y hospedaje. Las zonas de difícil acceso se cotizan.',
    },
    {
        icono: '/images/home/iconos/paso-propuesta.png',
        titulo: 'Propuesta por escrito',
        texto: 'Recibes el plan, el precio y la fecha, sin letra chica.',
    },
    {
        icono: '/images/home/iconos/meta-garantia.png',
        titulo: 'Garantía en el programa',
        texto: 'Aceleración Comercial: +10% en tu facturación o te devolvemos tu inversión.',
    },
];

export function IncluidoEnTodos() {
    return (
        <section className="w-full bg-slate-950 py-12 lg:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <h2 className="max-w-3xl text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl text-balance">
                    Esto aplica a todas las opciones.
                </h2>

                <ul className="mt-6 space-y-5 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
                    {puntos.map((punto) => (
                        <li key={punto.titulo} className="flex items-start gap-4">
                            <IconoPng src={punto.icono} tamano="md" />
                            <div>
                                <h3 className="text-xl font-semibold text-white">{punto.titulo}</h3>
                                <p className="mt-1 text-base leading-snug text-slate-300 lg:text-lg">{punto.texto}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <p className="mt-6 text-base text-slate-400">
                    Los precios están en dólares (USD).{' '}
                    <Link href="/servicios/conferencias" className="font-semibold text-[#4d8bff] underline underline-offset-4 hover:text-white">
                        ¿Conferencia y taller en el mismo viaje? Mira el combo
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
