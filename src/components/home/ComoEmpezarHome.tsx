// src/components/home/ComoEmpezarHome.tsx
// Quita la incertidumbre de contratar: tres pasos y un solo botón. Desde md, con una foto real de Hugo.

import Image from 'next/image';
import { CtaButton } from '@/components/ui/CtaButton';
import { IconoPng } from '@/components/ui/IconoPng';
import { LLAMADA_GRATIS_URL } from '@/lib/servicios';

interface Paso {
    titulo: string;
    texto: string;
    icono: string;
}

const pasos: Paso[] = [
    {
        titulo: 'Llamada gratis de 20 minutos',
        texto: 'Un asesor de mi equipo te escucha, te dice qué servicio te conviene y cuánto cuesta.',
        icono: '/images/home/iconos/paso-llamada.png',
    },
    {
        titulo: 'Propuesta clara',
        texto: 'Recibes el plan, el precio y la fecha, por escrito y sin letra chica.',
        icono: '/images/home/iconos/paso-propuesta.png',
    },
    {
        titulo: 'Trabajamos en tu empresa',
        texto: 'Voy a tu ciudad. Entrenamos a tu equipo y medimos tus ventas antes y después.',
        icono: '/images/home/iconos/paso-empresa.png',
    },
];

export default function ComoEmpezarHome() {
    return (
        <section className="bg-slate-950 py-14 lg:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">Cómo empezar</p>
                <h2 className="mt-3 max-w-3xl text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
                    Empezar es simple. Tres pasos.
                </h2>

                <div className="mt-8 md:grid md:grid-cols-[2fr_3fr] md:items-center md:gap-10 lg:mt-12 lg:gap-16">
                    <div className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl md:block">
                        <Image
                            src="/images/home/entrenamiento-equipo.webp"
                            alt="Hugo Herrera explicando el proceso de ventas a un equipo comercial"
                            fill
                            className="object-cover object-left"
                            sizes="(min-width: 768px) 40vw, 100vw"
                        />
                    </div>

                    <div>
                        <ol className="space-y-6 lg:space-y-8">
                            {pasos.map((paso, indice) => (
                                <li key={paso.titulo} className="flex items-start gap-4 lg:gap-5">
                                    <IconoPng src={paso.icono} tamano="lg" />
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-widest text-[#4d8bff]">Paso {indice + 1}</p>
                                        <h3 className="mt-0.5 text-xl font-semibold text-white">{paso.titulo}</h3>
                                        <p className="mt-1 text-base leading-snug text-slate-300 lg:text-lg">{paso.texto}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-10">
                            <CtaButton href={LLAMADA_GRATIS_URL} className="w-full sm:w-auto">
                                Agendar mi llamada gratis
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
