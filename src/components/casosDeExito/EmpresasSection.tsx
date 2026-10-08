// src/components/casosDeExito/EmpresasSection.tsx
// La prueba que más pesa para un gerente: otras empresas como la suya.

import Image from 'next/image';

interface CasoEmpresa {
    empresa: string;
    resultado: string;
    imageUrl: string;
}

const casos: CasoEmpresa[] = [
    {
        empresa: 'CCT Inmobiliaria',
        resultado: 'Armamos un guion de ventas para todo el equipo y subieron sus ventas.',
        imageUrl: '/images/casosdeexito/cctInmobiliaria.jpg',
    },
    {
        empresa: 'Dabcon Perú',
        resultado: 'Armamos una rutina de ventas que se puede medir. Resultado: duplicaron los números clave de su equipo.',
        imageUrl: '/images/casosdeexito/dabconPeru.jpg',
    },
    {
        empresa: 'Unialfa Ecuador',
        resultado: 'Definimos un proceso de ventas claro para que más visitas terminen en venta.',
        imageUrl: '/images/casosdeexito/unialfaInmobiliaria.jpg',
    },
    {
        empresa: 'Financiera Ayni',
        resultado: 'Creamos un método de ventas para que sus ventas crezcan de forma constante.',
        imageUrl: '/images/casosdeexito/tallerAyni.jpg',
    },
];

export default function EmpresasSection() {
    return (
        <section className="w-full bg-slate-950 py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#4d8bff]">Empresas</p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                        Empresas que ya trabajaron conmigo.
                    </h2>
                    <p className="mt-4 text-xl text-slate-300 text-balance">
                        Más de 120 equipos comerciales han usado mi método, en rubros distintos.
                    </p>
                </div>

                <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {casos.map((caso) => (
                        <li key={caso.empresa} className="overflow-hidden rounded-2xl border border-slate-800 bg-black/40">
                            <div className="relative aspect-[5/4] w-full">
                                <Image
                                    src={caso.imageUrl}
                                    alt={`Trabajo con ${caso.empresa}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-white">{caso.empresa}</h3>
                                <p className="mt-2 text-lg text-slate-400">{caso.resultado}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
