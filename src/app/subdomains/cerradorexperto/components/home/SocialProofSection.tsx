// src/components/home/SocialProofSection.tsx

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
// ✅ 1. Importamos nuestro hook personalizado y corregido
import { useIntersectionObserver } from '@cerradorexperto/hooks/useIntersectionObserver';

// Hook useMediaQuery para detectar el tamaño de la pantalla
const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(false);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = (): void => setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);
    return matches;
};

const testimonials = [
    {
        quote: "Antes me bloqueaba con cualquier objeción y perdía el control. Este libro te da el guion exacto para manejar la conversación con seguridad.",
        highlight: "Ahora sé exactamente qué decir",
        name: "Jhon Deza Cabanillas",
        role: "Asesor Inmobiliario",
        imageUrl: "/subdomains/cerradorexperto/images/jhon.jpg",
    },
    {
        quote: "Se convirtió en mi manual de consulta antes de cada reunión importante. Dejé de perder el tiempo y ahora mis conversaciones van directo al cierre. Súper práctico.",
        highlight: "Dejé de perder el tiempo",
        name: "Sindy Castillo Vera",
        role: "Fundadora de Nails Art",
        imageUrl: "/subdomains/cerradorexperto/images/sindy.jpg",
    },
    {
        quote: "Me dio la confianza que necesitaba para pedir el cierre sin sentirme nerviosa. Las estrategias para pasar a la parte del pago son oro puro. ¡Funcionan!",
        highlight: "Me dio confianza para pedir el cierre",
        name: "Maritza Sosa Quispe",
        role: "Emprendedora del Rubro Textil",
        imageUrl: "/subdomains/cerradorexperto/images/maritza.jpg",
    },
];

export default function SocialProofSection() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const isScrollingProgrammatically = useRef(false);

    // ✅ 2. Usamos el hook y lo activamos solo si NO es desktop.
    useIntersectionObserver(
        sliderRef, 
        { threshold: 0.5 },
        setActiveIndex,
        isScrollingProgrammatically,
        !isDesktop // El hook está habilitado solo en móvil/tablet
    );

    const scrollToIndex = useCallback((index: number) => {
        const container = sliderRef.current;
        const slide = container?.children[index] as HTMLElement;
        if (container && slide) {
            isScrollingProgrammatically.current = true;
            container.scrollTo({
                left: slide.offsetLeft,
                behavior: 'smooth'
            });
            setTimeout(() => { isScrollingProgrammatically.current = false; }, 600);
        }
    }, []);

    const handlePrev = () => {
        const newIndex = Math.max(activeIndex - 1, 0);
        setActiveIndex(newIndex); // Actualizamos el estado para los puntos
        scrollToIndex(newIndex); // Hacemos scroll
    };

    const handleNext = () => {
        const newIndex = Math.min(activeIndex + 1, testimonials.length - 1);
        setActiveIndex(newIndex);
        scrollToIndex(newIndex);
    };

    return (
        <section
            id="testimonios"
            className="relative bg-slate-950 text-white py-24 sm:py-32 overflow-hidden"
        >
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/2 w-[80rem] h-[50rem] -translate-x-1/3 bg-gradient-to-tr from-primary-blue/30 via-accent-green/10 to-slate-950 blur-3xl opacity-30" />
                <div className="absolute bottom-0 right-1/2 w-[80rem] h-[50rem] translate-x-1/3 bg-gradient-to-tl from-secondary-blue/30 to-slate-950 blur-3xl opacity-20" />
            </div>

            <div className="container mx-auto px-4">
                <div className="text-center max-w-7xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                        No lo digo yo. Lo dicen sus resultados.
                    </h2>
                    <p className="mt-4 text-xl lg:text-2xl text-slate-400 leading-relaxed">
                        Vendedores como tú, que estaban estancados, ahora tienen un sistema que cierra. Esto es lo que dicen:
                    </p>
                </div>
                
                <div className="relative mt-10 max-w-5xl mx-auto">
                    {/* ✅ 3. El layout se transforma de carrusel a grid en desktop. El diseño de las tarjetas no cambia. */}
                    <div ref={sliderRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} data-index={index} className="flex-none w-full snap-center p-2 lg:w-auto lg:p-0">
                                <figure className="bg-white/5 ring-1 ring-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col h-full">
                                    <div className="relative w-48 h-48 mx-auto">
                                        <Image
                                            src={testimonial.imageUrl}
                                            alt={`Foto de ${testimonial.name}`}
                                            width={400}
                                            height={400}
                                            className="rounded-full object-cover shadow-2xl shadow-primary-blue/20"
                                        />
                                        <div className="absolute -bottom-2 -right-2 flex items-center gap-1 bg-white text-yellow-500 px-2 py-1 rounded-full text-xs font-bold">
                                            <Star size={14} fill="currentColor"/> 5.0
                                        </div>
                                    </div>
                                    <div className="text-center mt-6 flex-grow flex flex-col">
                                        <blockquote className="relative flex-grow">
                                            <p className="absolute -top-4 inset-x-0 text-6xl font-serif text-primary-blue/20 opacity-70">“</p>
                                            <h3 className="text-2xl font-semibold text-white text-balance leading-tight relative">
                                                {testimonial.highlight}
                                            </h3>
                                            <p className="text-xl mt-2 text-slate-300 text-balance leading-tight relative">{testimonial.quote}</p>
                                        </blockquote>
                                        <figcaption className="mt-6">
                                            <div className="font-bold text-white text-xl">{testimonial.name}</div>
                                            <div className="text-primary-blue text-lg font-medium">{testimonial.role}</div>
                                        </figcaption>
                                    </div>
                                </figure>
                            </div>
                        ))}
                    </div>
                    
                    {/* ✅ 4. Los controles del carrusel solo se muestran si NO es desktop. */}
                    {!isDesktop && (
                        <div className="flex justify-center items-center gap-8 mt-8">
                            <button
                                onClick={handlePrev}
                                disabled={activeIndex === 0}
                                className="bg-white/10 ring-1 ring-white/20 p-3 rounded-full hover:bg-white/20 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                aria-label="Testimonio anterior"
                            >
                                <ChevronLeft className="h-6 w-6 text-white" />
                            </button>
                            <div className="flex justify-center gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => scrollToIndex(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
                                        aria-label={`Ir al testimonio ${index + 1}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={handleNext}
                                disabled={activeIndex === testimonials.length - 1}
                                className="bg-white/10 ring-1 ring-white/20 p-3 rounded-full hover:bg-white/20 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                aria-label="Siguiente testimonio"
                            >
                                <ChevronRight className="h-6 w-6 text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}