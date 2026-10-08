// src/components/home/ProblemaHome.tsx
// Que el gerente se reconozca en tres síntomas y entienda que la salida es un método, no más ánimo.

import { IconoPng } from '@/components/ui/IconoPng';

interface Sintoma {
    texto: string;
    icono: string;
}

const sintomas: Sintoma[] = [
    { texto: 'Dos o tres vendedores traen casi todo.', icono: '/images/home/iconos/problema-pocos.png' },
    {
        texto: 'Después de una charla suben… y a las semanas vuelven a lo de antes.',
        icono: '/images/home/iconos/problema-altibajos.png',
    },
    {
        texto: 'Cada uno vende a su manera y nadie mide qué funciona.',
        icono: '/images/home/iconos/problema-desorden.png',
    },
];

export default function ProblemaHome() {
    return (
        <section className="bg-black py-14 lg:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">¿Te suena?</p>
                <h2 className="mt-3 max-w-3xl text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
                    ¿Tu equipo vende por ratos?
                </h2>

                <ul className="mt-8 space-y-3 lg:mt-12 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
                    {sintomas.map((sintoma) => (
                        <li
                            key={sintoma.texto}
                            className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 lg:flex-col lg:items-start lg:gap-5 lg:p-6"
                        >
                            <IconoPng src={sintoma.icono} tamano="lg" />
                            <p className="text-lg leading-snug text-slate-200 lg:text-xl">{sintoma.texto}</p>
                        </li>
                    ))}
                </ul>

                <p className="mt-10 max-w-3xl text-xl font-semibold leading-snug text-white lg:text-2xl text-balance">
                    No es falta de ganas. Es falta de un método que todos sigan.
                </p>
            </div>
        </section>
    );
}
