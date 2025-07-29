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
        description: 'Una hamburguesería en la cochera de un amigo.',
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
        description: 'Un pequeño estudio fotográfico para eventos.',
        width: 600,
        height: 426,
    },
    {
        imageUrl: '/images/historia/emprendimientos.jpg',
        altText: 'Varios intentos de emprendimientos fallidos',
        description: 'Y muchos otros intentos que nunca despegaron.',
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
                    <div className="w-full max-w-7xl text-center px-4">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-balance leading-[1.2]">
                            Inteligente en el papel, novato en el mundo real
                        </h2>
                        <p className="mt-6 text-xl lg:text-2xl text-gray-700 leading-[1.4] text-balance">
                            En el colegio era el chico de las notas perfectas. Todos a mi
                            alrededor daban por hecho que tendría éxito, pero el mundo real
                            tenía otros planes y me golpeó con fuerza.
                            <br />
                            <br />A los 17 años,{' '}
                            <span className="font-semibold">
                                mi hambre por emprender era incontrolable.
                            </span>{' '}
                            Soñaba con tener mi propio negocio, así que lo intenté todo:
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
                                {frustrations.map((item) => (
                                    <div
                                        key={item.altText}
                                        className="w-[90%] flex-shrink-0 snap-center px-2"
                                    >
                                        <div className="flex flex-col h-full bg-white/30 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-200/80">
                                            <div className="relative w-full aspect-[4/3]">
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
                            {frustrations.map((item) => (
                                <div
                                    key={item.altText}
                                    className="flex flex-col h-full bg-white/30 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-200/80 transition-transform hover:scale-105 duration-300"
                                >
                                    <div className="relative w-full aspect-[4/3]">
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
                            El resultado siempre era el mismo:{' '}
                            <span className="font-semibold">un fracaso rotundo.</span> Me
                            esforzaba hasta el agotamiento, pero no entendía por qué nada
                            funcionaba. ¿Te suena familiar?
                        </p>
                        <p className="mt-6 text-xl lg:text-2xl text-gray-700 leading-relaxed font-semibold">
                            Fue entonces cuando choqué contra la dura verdad:
                        </p>
                        <AnimatedOpacity className="w-full mt-6">
                            <blockquote className="max-w-4xl mx-auto italic border-l-4 border-blue-600 pl-6 lg:pl-8 text-left">
                                <p className="text-2xl lg:text-3xl text-gray-800 font-medium leading-[1.4] text-balance">
                                    &quot;No importaba qué tan bueno era mi producto. Si no sabía
                                    cómo venderlo, estaba destinado a desaparecer.&quot;
                                </p>
                            </blockquote>
                        </AnimatedOpacity>
                    </div>
                </div>
            </div>
        </section>
    );
};