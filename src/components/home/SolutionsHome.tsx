// app/components/home/SolutionsHome.tsx

'use client'; // <-- DIRECTIVA OBLIGATORIA para usar Hooks y manejar estado.

import { useState } from 'react';
import type { TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SolutionCard from "../ui/SolutionCard";

// La definición del tipo y los datos no cambian.
type Solution = {
    title: string;
    desc: string;
    link: string;
    cta: string;
    image: string;
};

const solutionsData: Solution[] = [
    {
        title: 'Programa Lobos de Ventas',
        desc: 'Formación intensiva para transformar vendedores promedio en profesionales de alto rendimiento.',
        link: 'https://lobosdeventas.hugoherreracoach.com/',
        cta: 'CONOCER PROGRAMA',
        image: '/images/lobosProgram.jpg',
    },
    {
        title: 'Asesoría para Empresas',
        desc: 'Diseño e implementación de sistemas comerciales a medida para escalar tus ventas.',
        link: '/servicios/asesoria-comercial',
        cta: 'VER SERVICIOS',
        image: '/images/consultingBusiness.jpg',
    },
    {
        title: 'Mis Libros y Recursos',
        desc: 'Conocimiento práctico para cerrar más ventas y liderar equipos comerciales.',
        link: '/recursos',
        cta: 'EXPLORAR RECURSOS',
        image: '/images/resources.jpg',
    },
];

const SWIPE_THRESHOLD: number = 50;

export default function SolutionsHome() {
    // --- ESTADO PARA CONTROLAR EL CARRUSEL ---
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // --- FUNCIONES DE NAVEGACIÓN ---
    const goToPrevious = (): void => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? solutionsData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = (): void => {
        const isLastSlide = currentIndex === solutionsData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number): void => {
        setCurrentIndex(slideIndex);
    };

    // --- MANEJADORES DE EVENTOS TÁCTILES ---
    const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (): void => {
        if (touchStart === null || touchEnd === null) return;
        const diff = touchStart - touchEnd;
        if (diff > SWIPE_THRESHOLD) {
            goToNext();
        } else if (diff < -SWIPE_THRESHOLD) {
            goToPrevious();
        }
        setTouchStart(null);
        setTouchEnd(null);
    };


    return (
        <section className="py-20 bg-black text-white">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-balance">
                    Soluciones de Venta para Cada Etapa de tu Negocio.
                </h2>
                <p className="mt-4 text-xl lg:text-2xl text-slate-400 text-center max-w-5xl mx-auto text-balance">
                    Elige la herramienta ideal para tu equipo, tu empresa o tu desarrollo profesional.
                </p>

                <div className="mt-6 lg:mt-16">
                    {/* --- VISTA MÓVIL: CARRUSEL CON CONTROLES (Visible hasta 'md') --- */}
                    <div className="md:hidden">
                        <div
                            className="relative overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {/* Contenedor de las tarjetas que se transladará */}
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {solutionsData.map((solution) => (
                                    <div key={solution.title} className="flex-shrink-0 w-full p-2">
                                        <SolutionCard {...solution} />
                                    </div>
                                ))}
                            </div>

                            {/* Botón de navegación: Izquierda */}
                            <button
                                onClick={goToPrevious}
                                className="absolute top-1/2 -translate-y-1/2 left-0 z-20 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors"
                                aria-label="Solución anterior"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            {/* Botón de navegación: Derecha */}
                            <button
                                onClick={goToNext}
                                className="absolute top-1/2 -translate-y-1/2 right-0 z-20 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors"
                                aria-label="Siguiente solución"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Puntos de paginación */}
                        <div className="mt-6 flex justify-center gap-2">
                            {solutionsData.map((_, slideIndex) => (
                                <button
                                    key={slideIndex}
                                    onClick={() => goToSlide(slideIndex)}
                                    className={`h-2.5 w-2.5 rounded-full transition-colors ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
                                    aria-label={`Ir a la solución ${slideIndex + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* --- VISTA ESCRITORIO: GRID (Sin cambios) --- */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {solutionsData.map((solution) => (
                            <SolutionCard key={solution.title} {...solution} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}