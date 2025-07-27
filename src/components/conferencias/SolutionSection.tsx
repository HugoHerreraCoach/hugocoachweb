// app/components/conferencias/SolutionSection.tsx

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactElement } from 'react';
import Image from 'next/image';
import {
    ChevronLeft,
    ChevronRight,
    DollarSign,
    FileText,
    Brain,
} from 'lucide-react';

// Interfaz para definir la estructura de cada pilar de la intervención.
interface InterventionPillar {
    icon: ReactElement;
    title: string;
    description: string;
    imageUrl: string;
}

// Datos constantes para los pilares.
const pillars: InterventionPillar[] = [
    {
        icon: <DollarSign className="h-8 w-8 text-slate-400" />,
        title: 'El Sistema de Cierre',
        description:
            'Les entrego el arsenal de técnicas probadas para manejar objeciones y provocar el "sí". Esta es la herramienta central para aumentar la facturación de inmediato.',
        imageUrl: '/images/conferencias/arsenal.jpg',
    },
    {
        icon: <FileText className="h-8 w-8 text-slate-400" />,
        title: 'El Guion de Venta',
        description:
            'Construimos la estructura de la conversación. Un proceso claro que elimina las dudas y estandariza el camino hacia la venta.',
        imageUrl: '/images/conferencias/guion.jpg',
    },
    {
        icon: <Brain className="h-8 w-8 text-slate-400" />,
        title: 'La Mentalidad de Control',
        description:
            'Forjamos la mentalidad de un profesional que lidera la venta, defiende el precio y opera con un sistema, no con excusas.',
        imageUrl: '/images/conferencias/brain.jpg',
    },
];

// Componente de tarjeta reutilizable para cada pilar.
const PillarCard = ({ pillar }: { pillar: InterventionPillar }): ReactElement => (
    <div className="relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
        <Image
            src={pillar.imageUrl}
            alt={`Fondo para ${pillar.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/10" />

        <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8 text-white">
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                    {pillar.icon}
                </div>
                <h3 className="text-2xl leading-[1.3] font-bold">{pillar.title}</h3>
            </div>

            <p className="text-lg lg:text-xl leading-[1.4] text-balance text-slate-200">
                {pillar.description}
            </p>
        </div>
    </div>
);

export default function SolutionSection(): ReactElement {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const goToSlide = useCallback((slideIndex: number): void => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const slide = carousel.children[slideIndex] as HTMLElement;
        if (slide) {
            slide.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    }, []);

    const goToPrevious = (): void => {
        const newIndex = (currentIndex - 1 + pillars.length) % pillars.length;
        goToSlide(newIndex);
    };

    const goToNext = (): void => {
        const newIndex = (currentIndex + 1) % pillars.length;
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
            {
                root: carousel,
                threshold: 0.7,
            },
        );

        const slides = Array.from(carousel.children);
        slides.forEach((slide) => observer.observe(slide));

        return () => slides.forEach((slide) => observer.unobserve(slide));
    }, []);

    return (
        <section id="intervencion" className="w-full bg-black py-20 lg:py-28 scroll-mt-20">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mx-auto text-center">
                    <h2 className="text-balance text-4xl font-bold tracking-tight text-white lg:text-5xl">
                        Una Intervención Estratégica, no una Charla.
                    </h2>
                    <p className="text-balance mt-6 text-xl leading-[1.4] text-slate-300 lg:text-2xl">
                        Mi conferencia es una sesión de trabajo de alto impacto. No comparto teorías; instalo el núcleo de mi sistema de ventas, enfocándome en las herramientas que tu equipo necesita hoy.
                    </p>
                </div>

                <div className="mt-10 lg:mt-16">
                    {/* ---- INICIO CARRUSEL MÓVIL ---- */}
                    <div className="md:hidden">
                        <div
                            ref={carouselRef}
                            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 -mx-4 px-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {pillars.map((pillar) => (
                                <div
                                    key={pillar.title}
                                    className="w-[90%] flex-shrink-0 snap-center px-2"
                                >
                                    <div className="aspect-[3/4]">
                                        <PillarCard pillar={pillar} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-4">
                            <button
                                onClick={goToPrevious}
                                className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                                aria-label="Anterior"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <div className="flex justify-center gap-2">
                                {pillars.map((_, slideIndex) => (
                                    <button
                                        key={slideIndex}
                                        onClick={() => goToSlide(slideIndex)}
                                        className={`h-2 w-2 rounded-full transition-colors ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                                            }`}
                                        aria-label={`Ir al pilar ${slideIndex + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={goToNext}
                                className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                                aria-label="Siguiente"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                    {/* ---- FIN CARRUSEL MÓVIL ---- */}


                    {/* ---- INICIO GRID ESCRITORIO (MODIFICADO) ---- */}
                    <div className="hidden md:grid md:grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-8">
                        {pillars.map((pillar) => (
                            <div
                                key={pillar.title}
                                className="group aspect-[4/5] transition-all duration-300 hover:!scale-105"
                            >
                                <PillarCard pillar={pillar} />
                            </div>
                        ))}
                    </div>
                    {/* ---- FIN GRID ESCRITORIO ---- */}
                </div>
            </div>
        </section>
    );
}