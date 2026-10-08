// src/components/conferencias/InvestmentSection.tsx

import Link from 'next/link';
import { ServicioCard } from '@/components/servicios/ServicioCard';
import { comboConferenciaTaller, serviciosEmpresas, type ServicioEmpresa } from '@/lib/servicios';

// Esta página vende conferencia y taller. El resto de la escalera vive en /servicios.
// La conferencia va primero: es el precio ancla de la página.
const formatos = ['conferencia', 'full-day']
    .map((id) => serviciosEmpresas.find((s) => s.id === id))
    .filter((s): s is ServicioEmpresa => Boolean(s));

export const InvestmentSection = () => {
    return (
        <section id="inversion" className="w-full bg-black py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                        Conferencias y talleres. Un precio, todo incluido.
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 text-balance">
                        Piensa en una sola venta que tu equipo pierde cada mes por no tener un método. Eso es lo que quiero ayudarte a recuperar.
                    </p>
                </div>

                <div className="mx-auto mt-8 max-w-6xl space-y-8 lg:mt-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {formatos.map((formato) => (
                            <ServicioCard key={formato.id} servicio={formato} />
                        ))}
                    </div>
                    <ServicioCard servicio={comboConferenciaTaller} layout="wide" badge="Mismo viaje" />
                </div>

                <p className="mx-auto mt-10 max-w-3xl text-center text-lg text-slate-400">
                    ¿Prefieres acompañar a tu equipo varias semanas o instalar un sistema completo?{' '}
                    <Link href="/servicios" className="font-semibold text-[#4d8bff] underline underline-offset-4 hover:text-white">
                        Mira todos los servicios
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
};
