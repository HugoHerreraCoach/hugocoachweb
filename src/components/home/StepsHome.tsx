// app/components/home/StepsHome.tsx

'use client';

import { useState } from 'react';
import type { TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StepCard from '../ui/StepCard';

// La definición del tipo 'Step' no cambia.
type Step = {
    title: string;
    desc: string;
    imageUrl: string;
    width: number;
    height: number;
};

// Los datos de los pasos se mantienen igual.
const steps: Step[] = [
    {
        title: '1. Procesos de Venta Claros',
        desc: 'Un mapa de ventas claro para que tu equipo convierta clientes de forma predecible.',
        imageUrl: '/images/step1.jpg',
        width: 700,
        height: 1283,
    },
    {
        title: '2. Ofertas Irresistibles',
        desc: 'Diseñamos una oferta tan potente que tus clientes consideren un error no comprar.',
        imageUrl: '/images/step2.jpg',
        width: 700,
        height: 1283,
    },
    {
        title: '3. Liderazgo Basado en Datos',
        desc: 'Te damos los KPIs para tomar decisiones con datos, no con intuición, y maximizar el rendimiento.',
        imageUrl: '/images/step3.jpg',
        width: 700,
        height: 1283,
    },
];

// Constante para el umbral de deslizamiento.
const SWIPE_THRESHOLD: number = 50;

export default function StepsHome() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // --- NUEVOS ESTADOS PARA EL DESLIZAMIENTO TÁCTIL ---
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragOffset, setDragOffset] = useState<number>(0);

    const goToPrevious = (): void => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? steps.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = (): void => {
        const isLastSlide = currentIndex === steps.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number): void => {
        setCurrentIndex(slideIndex);
    };
    
    // --- NUEVOS MANEJADORES DE EVENTOS TÁCTILES ---
    const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
        setIsDragging(true);
        setTouchEnd(null); // Resetea el final al empezar un nuevo toque
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
        if (touchStart === null) return;
        const currentTouch = e.targetTouches[0].clientX;
        setTouchEnd(currentTouch);
        setDragOffset(currentTouch - touchStart);
    };

    const handleTouchEnd = (): void => {
        setIsDragging(false);
        setDragOffset(0);

        if (touchStart === null || touchEnd === null) return;

        const diff = touchStart - touchEnd;

        if (diff > SWIPE_THRESHOLD) {
            // Deslizamiento hacia la izquierda
            goToNext();
        } else if (diff < -SWIPE_THRESHOLD) {
            // Deslizamiento hacia la derecha
            goToPrevious();
        }

        // Reseteamos las posiciones para el próximo deslizamiento
        setTouchStart(null);
        setTouchEnd(null);
    };

    return (
        <section className="py-20 bg-black text-white">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-center leading-[1.1] text-white text-balance">
                    Si tus ventas son <span className="text-[#0a4afc]">inestables</span>, no es culpa de tu equipo. Es la falta de un <span className="text-[#0a4afc]">sistema.</span>
                </h2>
                <p className="mt-6 text-xl lg:text-2xl text-white/95 text-center max-w-5xl mx-auto text-balance">
                    Un negocio que solo vive resolviendo los problemas del momento no puede crecer.<br /><br />
                    La solución no es ponerle más esfuerzo, sino implementar el<span className='font-semibold'> método correcto. </span>Así lo hacemos:
                </p>

                <div className="mt-4 lg:mt-12">
                    {/* --- VISTA MÓVIL: CARRUSEL (Se oculta en pantallas medianas y grandes) --- */}
                    <div className="md:hidden">
                        <div className="relative overflow-hidden">
                            <div
                                className={`flex ease-in-out ${!isDragging ? 'transition-transform duration-500' : ''}`}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                style={{
                                    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                                    cursor: isDragging ? 'grabbing' : 'grab'
                                }}
                            >
                                {steps.map((step) => (
                                    <div key={step.title} className="w-full flex-shrink-0 p-2">
                                        <StepCard
                                            title={step.title}
                                            subtitle={step.desc}
                                            imageUrl={step.imageUrl}
                                            width={step.width}
                                            height={step.height}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 left-2 z-20 p-2 bg-white/10 backdrop-blur-sm rounded-full" aria-label="Anterior">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-2 z-20 p-2 bg-white/10 backdrop-blur-sm rounded-full" aria-label="Siguiente">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                        <div className="mt-8 flex justify-center gap-2">
                            {steps.map((_, slideIndex) => (
                                <button key={slideIndex} onClick={() => goToSlide(slideIndex)} className={`h-2 w-2 rounded-full ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/40'}`} aria-label={`Ir al paso ${slideIndex + 1}`} />
                            ))}
                        </div>
                    </div>

                    {/* --- VISTA DE ESCRITORIO: PARRILLA (Se mantiene igual) --- */}
                    <div className="hidden md:grid md:grid-cols-2 max-w-[1200px] mx-auto lg:grid-cols-3 gap-8">
                        {steps.map((step) => (
                            <StepCard
                                key={step.title}
                                title={step.title}
                                subtitle={step.desc}
                                imageUrl={step.imageUrl}
                                width={step.width}
                                height={step.height}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}