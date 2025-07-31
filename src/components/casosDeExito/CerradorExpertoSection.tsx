'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Importamos ambas flechas

interface WhatsAppPrueba {
    imageUrl: string;
    altText: string;
    width: number;
    height: number;
}

const pruebasWhatsApp: WhatsAppPrueba[] = [
    {
        imageUrl: '/images/casosdeexito/cerrador1.jpg',
        altText: 'Cliente mostrando su libro Cerrador Experto recién llegado',
        width: 760,
        height: 1280,
    },
    {
        imageUrl: '/images/casosdeexito/cerrador2.jpg',
        altText: 'Conversación de WhatsApp con un vendedor agradeciendo por el libro',
        width: 589,
        height: 1280,
    },
    {
        imageUrl: '/images/casosdeexito/cerrador3.jpg',
        altText: 'Prueba de compra del manual Cerrador Experto',
        width: 589,
        height: 1280,
    },
];

const CerradorExpertoSection = (): React.ReactElement => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Estados para habilitar/deshabilitar las flechas
    const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
    const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

    // Callback para manejar el scroll y actualizar el estado de los botones
    const checkScrollability = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const { scrollLeft, scrollWidth, clientWidth } = el;
            setCanScrollLeft(scrollLeft > 0);
            // El -1 es para evitar problemas de precisión en algunos navegadores
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

            // Actualizar los puntos de paginación
            const slideWidth = scrollWidth / pruebasWhatsApp.length;
            const newIndex = Math.round(scrollLeft / slideWidth);
            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex);
            }
        }
    }, [activeIndex]);

    // Efecto para añadir el listener de scroll y comprobar el estado inicial
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (el) {
            el.addEventListener('scroll', checkScrollability, { passive: true });
            checkScrollability(); // Comprobar al montar
        }
        return () => {
            if (el) {
                el.removeEventListener('scroll', checkScrollability);
            }
        };
    }, [checkScrollability]);

    // Función para desplazarse a un slide específico o en una dirección
    const scrollTo = (target: number | 'left' | 'right'): void => {
        const el = scrollContainerRef.current;
        if (!el) return;

        let targetIndex: number;
        if (target === 'left') {
            targetIndex = activeIndex - 1;
        } else if (target === 'right') {
            targetIndex = activeIndex + 1;
        } else {
            targetIndex = target;
        }

        targetIndex = Math.max(0, Math.min(pruebasWhatsApp.length - 1, targetIndex));

        const slideWidth = el.scrollWidth / pruebasWhatsApp.length;
        el.scrollTo({
            left: slideWidth * targetIndex,
            behavior: 'smooth',
        });
        setActiveIndex(targetIndex);
    };

    return (
        <section className="bg-slate-50 py-16 sm:py-20 lg:py-28">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                        El Guion que Cierra Ventas
                    </h2>
                    <p className="mt-4 text-xl lg:text-2xl leading-8 text-slate-600 sm:mt-6 sm:text-xl text-balance">
                        Cuando un vendedor tiene las palabras exactas, la confianza cambia.
                        Mira cómo &quot;Cerrador Experto&quot; está armando a cientos de vendedores
                        para ganar.
                    </p>
                </div>

                {/* Contenedor relativo para posicionar las flechas de navegación */}
                <div className="relative mt-12 sm:mt-16">

                    {/* Contenedor del Carrusel/Grid */}
                    <div
                        ref={scrollContainerRef}
                        className="
              flex items-start snap-x snap-mandatory scroll-pl-4
              gap-6 overflow-x-auto scroll-smooth pb-6
              lg:grid lg:grid-cols-3 lg:overflow-visible lg:scroll-auto lg:p-0
              [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {pruebasWhatsApp.map((prueba) => (
                            <div
                                key={prueba.imageUrl}
                                className="w-4/5 flex-shrink-0 snap-start sm:w-2/5 lg:w-auto"
                            >
                                <div className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/10">
                                    {/* La imagen ahora define la altura de la tarjeta */}
                                    <Image
                                        src={prueba.imageUrl}
                                        alt={prueba.altText}
                                        width={prueba.width}
                                        height={prueba.height}
                                        className="h-auto w-full" // La altura es automática
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Flechas de Navegación - SOLO PARA MÓVIL/TABLET */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-between lg:hidden">
                        <button
                            onClick={() => scrollTo('left')}
                            disabled={!canScrollLeft}
                            className="pointer-events-auto ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 shadow-md ring-1 ring-slate-900/10 backdrop-blur-sm transition disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Anterior"
                        >
                            <ArrowLeft className="h-6 w-6 text-slate-800" />
                        </button>
                        <button
                            onClick={() => scrollTo('right')}
                            disabled={!canScrollRight}
                            className="pointer-events-auto mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 shadow-md ring-1 ring-slate-900/10 backdrop-blur-sm transition disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Siguiente"
                        >
                            <ArrowRight className="h-6 w-6 text-slate-800" />
                        </button>
                    </div>
                </div>

                {/* Indicadores de Paginación (Puntos) - SOLO PARA MÓVIL/TABLET */}
                <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
                    {pruebasWhatsApp.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => scrollTo(index)}
                            className={`h-2.5 w-2.5 rounded-full ring-1 ring-slate-400 ring-offset-2 ring-offset-slate-50 transition-colors ${activeIndex === index
                                    ? 'bg-slate-900'
                                    : 'bg-slate-400/50 hover:bg-slate-500'
                                }`}
                            aria-label={`Ir a la imagen ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CerradorExpertoSection;