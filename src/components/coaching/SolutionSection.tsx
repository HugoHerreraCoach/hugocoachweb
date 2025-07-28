// src/components/coaching/SolutionSection.tsx

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SolutionSection() {
    return (
        <section className="bg-slate-900 text-white py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="text-3xl text-center mb-6 lg:mb-12 font-bold leading-[1.2] tracking-tight lg:text-5xl text-balance">
                    Un Vendedor Experto no nace. Se construye con un sistema.
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
                                He entrenado a más de 20,000 vendedores y he visto el mismo error una y otra vez: confundir estar ocupado con ser productivo. El carisma ayuda, pero no paga las cuentas de forma consistente. Lo que sí lo hace es una estructura.
                            </p>
                            <p>
                                La <strong className="text-white font-semibold">Sesión de Aceleración de Comisiones</strong> es tu atajo. En 2 horas de trabajo intenso, instalaremos en tu ADN de ventas el sistema que usan los cerradores de élite. No es teoría. Es un entrenamiento práctico para darte el guion y el proceso exacto que necesitas para empezar a vender más, mañana mismo.
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