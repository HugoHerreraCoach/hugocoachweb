// src/components/home/LogosHome.tsx
// Prueba social rápida: empresas que ya trabajaron con Hugo. Los logos ya son claros, aptos para fondo oscuro.

import Image from 'next/image';

interface Logo {
    nombre: string;
    src: string;
}

const logos: Logo[] = [
    { nombre: 'Municipalidad de Cajamarca', src: '/images/empresas/municipalidadCajamarca.png' },
    { nombre: 'Top X', src: '/images/empresas/topXLogo.png' },
    { nombre: 'Century 21', src: '/images/empresas/century21Logo.png' },
    { nombre: 'Inclub', src: '/images/empresas/inclubLogo.png' },
    { nombre: 'Royal Prestige', src: '/images/empresas/royalLogo.png' },
    { nombre: 'Fuxion', src: '/images/empresas/fuxionLogo.png' },
];

export default function LogosHome() {
    return (
        <section className="border-y border-slate-800 bg-slate-950 py-8">
            <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
                <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Equipos que confiaron en mí
                </p>
                <ul className="mt-6 grid grid-cols-3 items-center gap-x-6 gap-y-6 lg:grid-cols-6">
                    {logos.map((logo) => (
                        <li key={logo.nombre} className="relative h-8 w-full">
                            <Image
                                src={logo.src}
                                alt={logo.nombre}
                                fill
                                className="object-contain opacity-80"
                                sizes="(max-width: 1024px) 30vw, 150px"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
