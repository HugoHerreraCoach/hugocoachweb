// app/components/historia/FrustracionCompartida.tsx

'use client';

import { useState, useRef, useEffect, useCallback, type ReactElement } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
        imageUrl: '/images/historia/scaryBurger.jpg',
        altText: 'Emprendimiento de hamburguesas "Scary Burger"',
        description: 'Una hamburguesería en la cochera de un amigo (Scary Burger).',
        width: 960,
        height: 539,
    },
    {
        imageUrl: '/images/historia/mathematics.jpg',
        altText: 'Profesor particular de matemáticas y física',
        description: 'Clases particulares de matemáticas y física.',
        width: 600,
        height: 426,
    },
    {
        imageUrl: '/images/historia/enfoqueMagico.jpg',
        altText: 'Estudio fotográfico "Enfoque Mágico"',
        description: 'Un estudio fotográfico para eventos (Enfoque Mágico).',
        width: 600,
        height: 426,
    },
    {
        imageUrl: '/images/historia/emprendimientos.jpg',
        altText: 'Varios intentos de emprendimientos fallidos',
        description: 'Una lista de intentos más que nunca despegaron.',
        width: 600,
        height: 426,
    },
];

export const FrustracionCompartida = (): ReactElement => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const goToSlide = useCallback((index: number): void => {
        const carousel = carouselRef.current;
        if (!carousel) return;
        const card = carousel.children[index] as HTMLElement;
        if (card) {
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    }, []);

    const goToPrevious = (): void => {
        const newIndex = Math.max(0, currentIndex - 1);
        goToSlide(newIndex);
    };

    const goToNext = (): void => {
        const newIndex = Math.min(frustrations.length - 1, currentIndex + 1);
        goToSlide(newIndex);
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const index = Array.from(carousel.children).indexOf(entry.target);
                        setCurrentIndex(index);
                        break;
                    }
                }
            },
            { root: carousel, threshold: 0.5 }
        );

        const cards = Array.from(carousel.children);
        cards.forEach((card) => observer.observe(card));

        return () => cards.forEach((card) => observer.unobserve(card));
    }, [goToSlide]);

    return (
        <section className="bg-gray-100 text-black py-16 lg:py-24 bg-gradient-to-br from-[#ffffff] to-[#e4e2e2]">
            <div className="container mx-auto">
                <div className="flex flex-col items-center gap-y-8 lg:gap-y-10">
                    <div className="w-full max-w-4xl text-center px-4">
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Capítulo 1</p>
                        <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-gray-900 text-balance leading-[1.2]">
                            El mejor alumno del colegio. El peor en su primer negocio.
                        </h2>
                        <p className="mt-6 text-xl lg:text-2xl text-gray-700 leading-[1.4] text-balance">
                            En el colegio sacaba las mejores notas. Todos daban por hecho que me iría bien.
                        </p>
                        <p className="mt-4 text-xl lg:text-2xl text-gray-700 leading-[1.4] text-balance">
                            A los 17 años,{' '}
                            <span className="font-semibold">quería un negocio propio más que cualquier otra cosa.</span>{' '}
                            Y lo intenté todo:
                        </p>
                    </div>

                    {/* 👇 LA CORRECCIÓN SE APLICA AQUÍ, EN EL CONTENEDOR PADRE 👇 */}
                    <div className="w-full overflow-x-hidden">
                        {/* --- Vista Móvil (Carrusel) --- */}
                        <div className="sm:hidden">
                            <div
                                ref={carouselRef}
                                className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden scrollbar-width-none"
                            >
                                {frustrations.map((item, indice) => (
                                    <div
                                        key={item.altText}
                                        className="w-[90%] flex-shrink-0 snap-center px-2"
                                    >
                                        <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                                            <div className="relative w-full aspect-[4/3]">
                                                <span className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#0a4afc] text-lg font-bold text-white">{indice + 1}</span>
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.altText}
                                                    width={item.width}
                                                    height={item.height}
                                                    placeholder="blur"
                                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                                                    sizes="90vw"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="p-4 flex-grow flex items-center justify-center">
                                                <p className="text-gray-800 text-xl leading-[1.3] text-center text-balance">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navegación y Puntos para Móvil */}
                            <div className="mt-6 flex items-center justify-center gap-4">
                                <button
                                    onClick={goToPrevious}
                                    disabled={currentIndex === 0}
                                    className="p-2 rounded-full bg-white shadow-md transition-opacity disabled:opacity-30"
                                    aria-label="Anterior"
                                >
                                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                                </button>
                                <div className="flex items-center justify-center gap-2">
                                    {frustrations.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-6 bg-blue-600' : 'w-2.5 bg-gray-400'
                                                }`}
                                            aria-label={`Ir a la historia ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={goToNext}
                                    disabled={currentIndex === frustrations.length - 1}
                                    className="p-2 rounded-full bg-white shadow-md transition-opacity disabled:opacity-30"
                                    aria-label="Siguiente"
                                >
                                    <ChevronRight className="h-6 w-6 text-gray-800" />
                                </button>
                            </div>
                        </div>

                        {/* --- Vista Desktop (Grid) --- */}
                        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-4">
                            {frustrations.map((item, indice) => (
                                <div
                                    key={item.altText}
                                    className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                                >
                                    <div className="relative w-full aspect-[4/3]">
                                                <span className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#0a4afc] text-lg font-bold text-white">{indice + 1}</span>
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.altText}
                                            width={item.width}
                                            height={item.height}
                                            placeholder="blur"
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                                            sizes="(max-width: 1024px) 50vw, 25vw"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="p-4 flex-grow flex items-center justify-center">
                                        <p className="text-gray-800 text-xl leading-[1.4] text-center text-balance">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full max-w-4xl text-center px-4">
                        <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed text-balance">
                            Siempre el mismo final. Me esforzaba hasta agotarme y no entendía por qué nada funcionaba.{' '}
                            <span className="font-semibold">¿Te suena?</span>
                        </p>
                        <AnimatedOpacity className="w-full mt-8">
                            <blockquote className="max-w-4xl mx-auto italic border-l-4 border-blue-600 pl-6 lg:pl-8 text-left">
                                <p className="text-2xl lg:text-3xl text-gray-800 font-medium leading-[1.4] text-balance">
                                    &quot;No importaba qué tan bueno fuera mi producto. Si no sabía venderlo, iba a desaparecer.&quot;
                                </p>
                            </blockquote>
                        </AnimatedOpacity>
                    </div>
                </div>
            </div>
        </section>
    );
};