// src/components/landing/OfferSection.tsx

'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Gift, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIntersectionObserver } from '@cerradorexperto/hooks/useIntersectionObserver';

const offerComponents = [
    {
        type: 'Componente Principal',
        name: 'Libro Digital "Cerrador Experto"',
        description: 'El manual de campo con 139 estrategias probadas para manejar cualquier objeción y cerrar ventas de forma predecible.',
        value: 25,
        imageSrc: '/subdomains/cerradorexperto/images/cerradorExperto.jpg',
        width: 920,
        height: 1300,
    },
    {
        type: 'Bono #1',
        name: 'Kit de Cierre de Emergencia',
        description: 'Un PDF de acción rápida con 5 guiones exactos para salvar una venta en los primeros 60 segundos. Resultados inmediatos.',
        value: 47,
        imageSrc: '/subdomains/cerradorexperto/images/bono1.jpg',
        width: 600,
        height: 848,
    },
    {
        type: 'Bono #2',
        name: 'El Guion Exacto para Cerrar Ventas por Teléfono',
        description: 'La estructura de llamada paso a paso para vender productos y servicios de valor. Olvídate de dudar.',
        value: 67,
        imageSrc: '/subdomains/cerradorexperto/images/bono2.jpg',
        width: 600,
        height: 848,
    },
    {
        type: 'Bono #3',
        name: 'El Modelo para Ventas High Ticket',
        description: 'Domina las ventas presenciales o por videollamada y cierra tratos grandes con confianza.',
        value: 97,
        imageSrc: '/subdomains/cerradorexperto/images/bono3.jpg',
        width: 600,
        height: 848,
    },
    {
        type: 'Bono #4',
        name: 'El Anti-Visto: Las 7 Plantillas de WhatsApp',
        description: 'La secuencia de seguimiento inteligente de 7 días con los mensajes exactos para que tus prospectos siempre te respondan.',
        value: 77,
        imageSrc: '/subdomains/cerradorexperto/images/bono4.jpg',
        width: 600,
        height: 848,
    },
    {
        type: 'Bono #5',
        name: 'Afirmaciones del Cerrador Experto',
        description: 'El cierre es 80% mentalidad. Usa este audio de 7 minutos con afirmaciones poderosas para anclar una mentalidad ganadora antes de cada llamada o reunión.',
        value: 37,
        imageSrc: '/subdomains/cerradorexperto/images/bono5.png',
        width: 600,
        height: 699,
    },
];

export default function OfferSection() {
    const totalValue = offerComponents.reduce((sum, item) => sum + item.value, 0);
    const mainProduct = offerComponents[0];
    const bonuses = offerComponents.slice(1);

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isScrollingProgrammatically = useRef(false);

    // El hook sigue actualizando el estado en el scroll manual, lo cual es correcto.
    useIntersectionObserver(scrollContainerRef, { threshold: 0.5 }, setCurrentIndex, isScrollingProgrammatically);

    // ✅ LÓGICA CENTRALIZADA: Esta función maneja el scroll programático.
    const handleGoTo = useCallback((index: number) => {
        if (scrollContainerRef.current) {
            isScrollingProgrammatically.current = true;
            const scrollContainer = scrollContainerRef.current;
            const targetNode = scrollContainer.children[index] as HTMLElement;
            if (targetNode) {
                const scrollLeft = targetNode.offsetLeft - scrollContainer.offsetLeft;
                scrollContainer.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth',
                });
                // Pequeño delay para asegurar que la animación 'smooth' termine
                // antes de permitir que el IntersectionObserver actúe de nuevo.
                setTimeout(() => { isScrollingProgrammatically.current = false; }, 500);
            }
        }
    }, []);

    // ✅ LÓGICA CORREGIDA: Los manejadores de clic ahora actualizan el estado Y llaman directamente a la función de scroll.
    const handleNext = () => {
        const newIndex = Math.min(currentIndex + 1, bonuses.length - 1);
        setCurrentIndex(newIndex);
        handleGoTo(newIndex);
    };

    const handlePrev = () => {
        const newIndex = Math.max(currentIndex - 1, 0);
        setCurrentIndex(newIndex);
        handleGoTo(newIndex);
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        handleGoTo(index);
    }

    // ❌ LÓGICA ELIMINADA: Se quita el `useEffect` que reaccionaba a [currentIndex].
    // Este era el causante del scroll redundante y el movimiento brusco.

    return (
        <section
            id="oferta"
            className="relative bg-slate-50 py-24 sm:py-32 overflow-hidden"
        >
            <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <div className="bg-gradient-to-r from-primary-blue/10 via-accent-green/5 to-white rounded-full w-[80rem] h-[50rem] blur-3xl opacity-40" />
            </div>

            <div className="relative mx-auto px-4 lg:px-8">
                {/* --- El resto de tu JSX de presentación (SIN NINGÚN CAMBIO DE DISEÑO) --- */}
                <div className="text-center mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-balance">
                        Tu arsenal completo para dejar de perder ventas.
                    </h2>
                    <p className="mt-4 text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto text-balance">
                        No solo recibes un libro, obtienes un arsenal de herramientas diseñadadas para asegurar resultados.
                    </p>
                </div>

                <div className="mt-10 max-w-5xl mx-auto">
                    <div className="bg-gradient-to-b from-primary-blue to-secondary-blue p-1 rounded-3xl shadow-2xl shadow-primary-blue/20">
                        <div className="bg-slate-50 rounded-[22px] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="rounded-2xl">
                                <Image
                                    src={mainProduct.imageSrc}
                                    alt={mainProduct.name}
                                    width={mainProduct.width}
                                    height={mainProduct.height}
                                    className="w-full max-w-[300px] rounded-xl object-cover justify-self-center transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-base font-bold text-primary-blue uppercase tracking-wider flex items-center gap-2">
                                    <Star size={20} className="text-accent-green" fill="currentColor" /> OFERTA PRINCIPAL
                                </p>
                                <h3 className="text-3xl font-bold text-slate-800 mt-2">{mainProduct.name}</h3>
                                <p className="mt-4 text-slate-600 text-xl lg:text-2xl leading-relaxed flex-grow">{mainProduct.description}</p>
                                <div className="mt-6 text-right">
                                    <span className="text-base text-slate-500">Valorado en:</span>
                                    <span className="text-3xl font-bold text-primary-blue ml-2">${mainProduct.value} USD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="text-center mb-4">
                        <h3 className="text-3xl font-bold text-slate-800">5 Bonos de Acción Rápida:</h3>
                    </div>

                    <div className="relative">
                        <div
                            ref={scrollContainerRef}
                            className="grid grid-flow-col auto-cols-[85%] max-w-7xl mx-auto sm:auto-cols-[60%] md:auto-cols-[45%] lg:grid-flow-row lg:grid-cols-3 lg:auto-cols-auto gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                        >
                            {bonuses.map((bonus, index) => (
                                <div key={bonus.name} data-index={index} className="snap-center snap-always w-full h-full">
                                    <div className="bg-gradient-to-br from-slate-300/50 to-slate-100/50 p-px rounded-2xl h-full transition-all duration-300 hover:shadow-primary-blue/20">
                                        <div className="bg-slate-50 rounded-[15px] h-full flex flex-col overflow-hidden shadow-lg">
                                            <div className="aspect-w-4 flex justify-center items-center aspect-h-3">
                                                <Image
                                                    src={bonus.imageSrc}
                                                    alt={bonus.name}
                                                    width={bonus.width}
                                                    height={bonus.height}
                                                    className="mt-4 w-[75%] max-w-[250px] rounded-lg object-cover"
                                                />
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-base pt-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-secondary-blue uppercase tracking-wider flex items-center gap-2">
                                                        <Gift size={20} className="text-primary-blue" /> {bonus.type}
                                                    </p>
                                                    <div className="bg-primary-blue/10 text-primary-blue text-base font-bold px-3 py-1 rounded-full">
                                                        ${bonus.value} USD
                                                    </div>
                                                </div>
                                                <h4 className="text-2xl font-bold text-slate-800 mt-3">{bonus.name}</h4>
                                                <p className="mt-2 text-slate-600 text-lg lg:text-xl flex-grow">{bonus.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:hidden">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                            >
                                <ChevronLeft className="h-6 w-6 text-primary-blue" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex === bonuses.length - 1}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                            >
                                <ChevronRight className="h-6 w-6 text-primary-blue" />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 mt-6 lg:hidden">
                        {bonuses.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-6 bg-primary-blue' : 'w-2 bg-slate-300'}`}
                                aria-label={`Ir al bono ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl p-8 lg:p-12 border-2 border-dashed border-slate-300 shadow-2xl shadow-primary-blue/10">
                        <p className="text-xl text-slate-600">Valor Total de Todo el Sistema:</p>
                        <p className="text-5xl font-extrabold text-slate-400 line-through my-2">${totalValue} USD</p>
                        <p className="text-2xl text-slate-800 font-semibold mt-6">Accede a Todo Hoy por un Único Pago de</p>
                        <p className="text-7xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-secondary-blue mt-2">
                            Solo $7
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}