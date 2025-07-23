import Image from 'next/image';
import Link from 'next/link';
import { Counter } from '@/components/ui/Counter';
import type { ReactNode } from 'react';


interface Metric {
    target: number;
    prefix: string;
    desc: ReactNode;
}

export default function AuthorityHome() {

    const metrics: Metric[] = [
        {
            target: 12,
            prefix: 'x',
            desc: <><span className="font-semibold">Aumento de facturación</span> para un vendedor multinivel en 45 días.</>
        },
        {
            target: 6,
            prefix: 'x',
            desc: <><span className="font-semibold">Crecimiento en ventas</span> logrado para una empresa del sector inmobiliario en 60 días.</>
        },
        {
            target: 180,
            prefix: '+',
            desc: <><span className="font-semibold">Testimonios de 5 estrellas</span> de clientes verificados en Google.</>
        },
    ];

    return (
        // Este es un Server Component por defecto, lo cual es ideal para contenido estático.
        <section className="py-14 lg:py-20 bg-gradient-to-br from-[#ffffff] to-[#dedede] text-black">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-center">
                    Resultados, no promesas.
                </h2>
                <div className="mt-6 lg:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {metrics.map((item, index) => (
                        <div
                            key={index}
                            className="group rounded-xl border border-white/30 bg-white/10 px-4 py-6 text-center shadow-2xl shadow-black/20 backdrop-blur-lg transition-all duration-300 hover:border-white/60 hover:bg-[#153eb5]/12"
                        >
                            <p className="text-5xl font-extrabold text-[#153eb5]">
                                <Counter
                                    targetValue={item.target}
                                    prefix={item.prefix}
                                />
                            </p>
                            {/* La descripción se renderiza directamente como un nodo de React, no hay riesgo de seguridad. */}
                            <p className="mt-3 text-xl text-black">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-16 flex flex-col md:flex-row items-center gap-4 lg:gap-12">
                    <div className="md:w-1/2 relative">
                        <Image
                            src="/images/hugoAuthority.jpg"
                            alt="Hugo Herrera coach de ventas y liderazgo"
                            width={800}
                            height={533}
                            className="rounded-2xl"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h3 className="text-2xl lg:text-5xl font-extrabold">De la trinchera, no de la teoría.</h3>
                        <p className="mt-4 text-xl lg:text-2xl text-black">
                            Mi método no nació en la teoría, sino en la trinchera de mis propios negocios fallidos.<br/><br/>
                            Tras aprender de los mejores y adaptar sus estrategias al mercado real de Latinoamérica, he validado este sistema con la reestructuración de más de <span className='font-semibold'>120 equipos comerciales</span> y el entrenamiento de <span className='font-semibold'>20,000 vendedores.</span>
                        </p>
                        <p className="mt-8 text-[3rem] lg:text-[4rem] text-[#153eb5] font-tangerine leading-[0.7]">“El éxito no es suerte, es un sistema.”</p>
                        <Link
                            href="/mi-historia"
                            className="mt-6 lg:inline-block flex items-center justify-center max-w-[250px] mx-auto bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] text-white font-[700] py-3 px-8 rounded-full hover:bg-gradient-to-r hover:from-[#0F172A] hover:to-[#1E3A8A] hover:scale-105 transition-all duration-300"
                        >
                            CONOCER MI HISTORIA
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}