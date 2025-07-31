// src/components/casosDeExito/CerradorExpertoSection.tsx
'use client'; // Necesario para la interactividad de los botones del carrusel

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// 1. Estructura de datos para las pruebas de WhatsApp
type WhatsAppPrueba = {
    imageUrl: string;
    altText: string;
};

const pruebasWhatsApp: WhatsAppPrueba[] = [
    // Aquí van tus 5 capturas de pantalla
    {
        imageUrl: '/images/casos-de-exito/cerrador-experto/ws1.jpg', // Reemplaza
        altText: 'Cliente mostrando su libro Cerrador Experto recién llegado',
    },
    {
        imageUrl: '/images/casos-de-exito/cerrador-experto/ws2.jpg', // Reemplaza
        altText: 'Conversación de WhatsApp con un vendedor agradeciendo por el libro',
    },
    {
        imageUrl: '/images/casos-de-exito/cerrador-experto/ws3.jpg', // Reemplaza
        altText: 'Prueba de compra del manual Cerrador Experto',
    },
    {
        imageUrl: '/images/casos-de-exito/cerrador-experto/ws4.jpg', // Reemplaza
        altText: 'Testimonio real de un cliente por WhatsApp',
    },
    {
        imageUrl: '/images/casos-de-exito/cerrador-experto/ws5.jpg', // Reemplaza
        altText: 'Foto enviada por un cliente de su libro Cerrador Experto',
    },
];

const CerradorExpertoSection: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const handleScroll = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const atLeft = el.scrollLeft <= 0;
            const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1; // -1 for precision
            setCanScrollLeft(!atLeft);
            setCanScrollRight(!atRight);
        }
    }, []);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (el) {
            el.addEventListener('scroll', handleScroll);
            handleScroll(); // Check initial state
        }
        return () => el?.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollBy = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.9; // Scroll by 90% of the container width
            el.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="bg-slate-50 py-20 lg:py-28">
            <div className="container mx-auto max-w-7xl px-4 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                    El Arsenal Llegando al Campo de Batalla
                </h2>
                <p className="mt-6 text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto text-balance">
                    Un sistema solo funciona si se usa. Esta es la prueba de cómo &quot;Cerrador Experto&quot; se convierte en la herramienta de cabecera de los vendedores desde el día uno.
                </p>
            </div>

            <div className="relative container mx-auto max-w-5xl px-4 mt-12 lg:mt-16">
                {/* Contenedor del Carrusel con scroll-snap */}
                <div
                    ref={scrollContainerRef}
                    className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {pruebasWhatsApp.map((prueba, index) => (
                        <div key={index} className="w-full flex-shrink-0 snap-center md:w-1/2 lg:w-1/3 p-4">
                            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-300/50">
                                <Image
                                    src={prueba.imageUrl}
                                    alt={prueba.altText}
                                    width={400}
                                    height={800} // Asumiendo formato vertical de captura
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controles de Navegación para Desktop */}
                <div className="hidden md:flex justify-center items-center mt-8 gap-4">
                    <button
                        onClick={() => scrollBy('left')}
                        disabled={!canScrollLeft}
                        className="p-3 rounded-full bg-white shadow-md ring-1 ring-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        aria-label="Anterior"
                    >
                        <ArrowLeft className="h-6 w-6 text-slate-700" />
                    </button>
                    <button
                        onClick={() => scrollBy('right')}
                        disabled={!canScrollRight}
                        className="p-3 rounded-full bg-white shadow-md ring-1 ring-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        aria-label="Siguiente"
                    >
                        <ArrowRight className="h-6 w-6 text-slate-700" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CerradorExpertoSection;