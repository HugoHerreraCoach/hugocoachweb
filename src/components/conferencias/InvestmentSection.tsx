// src/components/conferencias/InvestmentSection.tsx

import Link from 'next/link';

export const InvestmentSection = () => {
    return (
        <section className="w-full bg-black py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Encabezado de la sección */}
                <div className="mx-auto text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                        Una Inversión Fija. Un Retorno Exponencial.
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 text-balance">
                        Piensa en una sola venta que tu equipo pierde al mes por falta de un sistema. Mi intervención no es un costo, es la inversión más rentable que harás en tu equipo este año.
                    </p>
                </div>

                {/* Cajas de Inversión */}
                <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:mt-16">

                    {/* Opción 1: Nacional */}
                    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center transition-all duration-300 hover:border-[#0a4afc]/50 hover:bg-slate-900">
                        <h3 className="text-2xl font-semibold text-white">Conferencia en Perú</h3>
                        <p className="mt-2 text-slate-400">(Todo el territorio nacional)</p>
                        <p className="mt-6 text-5xl font-bold tracking-tight text-white">$1,000 USD</p>
                        <p className="mt-4 font-semibold text-lg lg:text-xl text-[#0a4afc]">PAGO ÚNICO. TODO INCLUIDO.</p>
                        <p className="text-base text-slate-400">(Traslados, estancia y honorarios)</p>
                        <Link
                            href="https://calendly.com/hugoherrerateam/sesion-estrategica"
                            target="_blank"
                            className="rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 mt-6 text-xl font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
                        >
                            Agendar Sesión
                        </Link>
                    </div>

                    {/* Opción 2: Internacional */}
                    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center transition-all duration-300 hover:border-[#0a4afc]/50 hover:bg-slate-900">
                        <h3 className="text-2xl font-semibold text-white">Impacto Internacional</h3>
                        <p className="mt-2 text-slate-400">(Bolivia, Colombia y Ecuador)</p>
                        <p className="mt-6 text-5xl font-bold tracking-tight text-white">$2,000 USD</p>
                        <p className="mt-4 font-semibold text-lg lg:text-xl text-[#0a4afc]">PAGO ÚNICO. TODO INCLUIDO.</p>
                        <p className="text-base text-slate-400">(Traslados, estancia y honorarios)</p>
                        <Link
                            href="https://calendly.com/hugoherrerateam/sesion-estrategica"
                            target="_blank"
                            className="rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 mt-6 text-xl font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
                        >
                            Agendar Sesión
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};