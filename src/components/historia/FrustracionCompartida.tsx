// app/components/home/FrustracionCompartida.tsx
'use client';

import Image from 'next/image';
// 1. Cambiamos la importación
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';

type Frustration = {
    imageUrl: string;
    altText: string;
    description: string;
    width: number;
    height: number;
};

const frustrations: Frustration[] = [
    {
        imageUrl: '/images/scaryBurger.jpg',
        altText: 'Emprendimiento de hamburguesas "Scary Burger"',
        description: 'Una hamburguesería en la cochera de un amigo.',
        width: 960,
        height: 539,
    },
    {
        imageUrl: '/images/mathematics.jpg',
        altText: 'Profesor particular de matemáticas y física',
        description: 'Clases particulares de matemáticas y física.',
        width: 600,
        height: 426,
    },
    {
        imageUrl: '/images/enfoqueMagico.jpg',
        altText: 'Estudio fotográfico "Enfoque Mágico"',
        description: 'Un pequeño estudio fotográfico para eventos.',
        width: 600,
        height: 426,
    },
    {
        imageUrl: '/images/emprendimientos.jpg',
        altText: 'Varios intentos de emprendimientos fallidos',
        description: 'Y muchos otros intentos que nunca despegaron.',
        width: 600,
        height: 426,
    },
];


export const FrustracionCompartida = (): React.ReactElement => {
    return (
        <section className="bg-gray-100 text-black py-16 lg:py-24 bg-gradient-to-br from-[#ffffff] to-[#e4e2e2]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-y-8 lg:gap-y-10">
                    {/* ... (resto del código del componente se mantiene igual) ... */}
                    <div className="w-full max-w-7xl text-center">
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 text-balance leading-[1.2]">
                            Inteligente en el papel, novato en el mundo real
                        </h2>
                        <p className="mt-6 text-xl lg:text-2xl text-gray-700 leading-[1.4] text-balance">
                            En el colegio era el chico de las notas perfectas. Todos a mi alrededor daban por hecho que tendría éxito, pero el mundo real tenía otros planes y me golpeó con fuerza.<br /><br />
                            A los 17 años, <span className='font-semibold'>mi hambre por emprender era incontrolable.</span> Soñaba con tener mi propio negocio, así que lo intenté todo:
                        </p>
                    </div>

                    <div className="w-full max-w-8xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {frustrations.map((item) => (
                            <div key={item.altText} className="flex flex-col h-full bg-[white]/10 backdrop-blur-[12px] rounded-xl shadow-lg overflow-hidden border border-gray-200/80  transition-transform hover:scale-105 duration-500">
                                <div className="relative w-full aspect-[4/3]">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.altText}
                                        width={item.width}
                                        height={item.height}
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="p-4 flex-grow">
                                    <p className="text-gray-700 text-xl text-center text-balance">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full max-w-4xl">
                        <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed text-balance">
                            El resultado siempre era el mismo: <span className='font-semibold'>un fracaso rotundo.</span> Me esforzaba hasta el agotamiento, pero no entendía por qué nada funcionaba. ¿Te suena familiar?
                        </p>
                        <p className="mt-6 text-xl lg:text-2xl text-gray-700 leading-relaxed font-semibold">
                            Fue entonces cuando choqué contra la dura verdad:
                        </p>
                        {/* 2. Envolvemos todo el blockquote con el nuevo componente */}
                        <AnimatedOpacity className="w-full mt-6">
                            <blockquote className="max-w-4xl italic border-l-4 border-blue-600 pl-6 lg:pl-8">
                                <p className="text-2xl lg:text-3xl text-gray-800 font-medium leading-[1.4] text-balance">
                                    &quot;No importaba qué tan bueno era mi producto. Si no sabía cómo venderlo, estaba destinado a desaparecer.&quot;
                                </p>
                            </blockquote>
                        </AnimatedOpacity>
                    </div>


                </div>
            </div>
        </section>
    );
};