// src/components/coaching/SolutionSection.tsx

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SolutionSection() {
    return (
        <section className="bg-slate-900 text-white py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="text-3xl text-center mb-6 lg:mb-12 font-bold leading-[1.2] tracking-tight lg:text-5xl text-balance">
                    El carisma consigue amigos. El sistema construye imperios.
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-16 items-center">

                    {/* Columna de la Imagen */}
                    <div className="lg:col-span-2 flex justify-center">
                        <div className="relative w-[280px] h-[280px] lg:w-[350px] lg:h-[350px]">
                            <Image
                                src="/images/coaching/hugoEntrenamiento.jpg"
                                alt="Retrato de Hugo Herrera, coach de ventas"
                                width={720}
                                height={720}
                                className="rounded-full object-cover border-4 border-slate-700 shadow-2xl shadow-blue-500/10"
                                sizes="(max-width: 768px) 280px, 350px"
                            />
                        </div>
                    </div>

                    {/* Columna de Texto */}
                    <div className="lg:col-span-3 text-center lg:text-left">

                        <div className="mt-0 text-xl lg:text-2xl leading-[1.4] text-slate-300 space-y-6 text-balance">
                            <p>
                                He entrenado a más de 20,000 vendedores y el patrón es el mismo: el esfuerzo sin estructura solo produce agotamiento.
                                <br /> <br/>Yo no enseño trucos, instalo sistemas. Esa es la diferencia entre una comisión casual y un ingreso predecible.
                            </p>
                            <p>
                                La <strong className="text-white font-semibold">Sesión de Aceleración es tu atajo a ese sistema.</strong> En 2 horas de trabajo 1 a 1, te entrego un plan de ataque.<br /> <br/>
                                Auditamos tu proceso, corregimos las fugas de comisiones y construimos el guion exacto que necesitas para duplicar tus resultados. <br /> <br/>
                                Sales con un sistema para ejecutar, no con teoría para olvidar.
                            </p>
                        </div>

                        {/* Llamada a la Acción (CTA) */}
                        <div className="mt-10 flex justify-center lg:justify-start">
                            <Link
                                href="/sesion" // Asegúrate de que esta ruta sea la correcta
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc] px-8 py-3 text-xl font-semibold text-white shadow-lg"
                            >
                                Descubrir la Sesión
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}