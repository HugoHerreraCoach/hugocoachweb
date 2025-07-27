// src/components/conferencias/SocialProofSection.tsx

'use client'; 

import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect, type FC, useCallback } from 'react';

// --- Interfaces y Datos ---
interface Testimonial {
  quote: string;
  name: string;
  title: string;
  summary: string;
  avatarSrc: string;
}

interface CompanyLogo {
  src: string;
  alt: string;
}

const testimonials: Testimonial[] = [
    { quote: 'Su dominio del tema y forma de conectar con el público hicieron que cada minuto fuera valioso. Una charla llena de ideas interesantes y aplicables.', name: 'Edith Tovar Pino', title: 'Asistente a Conferencia', summary: 'Cada Minuto Fue Valioso', avatarSrc: '/images/conferencias/edith.jpg' },
    { quote: 'Extraordinario, se aprendió muchísimo. Hugo es directo y va al grano. Sales con herramientas que puedes usar al instante.', name: 'Arnold Gallardo', title: 'Local Guide', summary: 'Directo y al Grano', avatarSrc: '/images/conferencias/arnold.jpg' },
    { quote: 'Tras contratarlo, mi equipo de ventas llegó a un siguiente nivel en muy poco tiempo. El sistema que implementa es práctico y funciona.', name: 'Zócima Cárdenas', title: 'Líder de Equipo', summary: 'Llevó a mi equipo a otro nivel', avatarSrc: '/images/conferencias/zocima.jpg' },
    { quote: 'Gracias Hugo por compartir tu conocimiento referente a las ventas y crecimiento personal, excelente Líder.', name: 'David Rea', title: 'Unialfa S.A Inmobiliaria, Ecuador', summary: 'Excelente Conocimiento y Liderazgo', avatarSrc: '/images/conferencias/david.jpg' },
];

const companyLogos: CompanyLogo[] = [
    { src: '/images/empresas/century21Logo.png', alt: 'Century 21' }, { src: '/images/empresas/inclubLogo.png', alt: 'Inclub' }, { src: '/images/empresas/municipalidadCajamarca.png', alt: 'Municipalidad de Cajamarca' }, { src: '/images/empresas/topXLogo.png', alt: 'TopX' }, { src: '/images/empresas/royalLogo.png', alt: 'Royal prestige' }, { src: '/images/empresas/fuxionLogo.png', alt: 'Fuxion' },
];


export const SocialProofSection: FC = () => {
    // ✅ 1. Definimos los keyframes de la animación por separado.
    const marqueeKeyframes = `
      @keyframes marqueeLocal {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
    `;

    // Lógica de 'useMediaQuery' integrada
    const [isDesktop, setIsDesktop] = useState<boolean>(false);
    
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        const handleResize = (event: MediaQueryListEvent | MediaQueryList): void => setIsDesktop(event.matches);
        handleResize(mediaQuery);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    // Lógica del carrusel de testimonios
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const scrollToTestimonial = useCallback((index: number): void => {
        if (isDesktop) return;
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollTo({ left: container.offsetWidth * index, behavior: 'smooth' });
            setActiveIndex(index);
        }
    }, [isDesktop]);

    const handleNext = useCallback((): void => {
        const newIndex = (activeIndex + 1) % testimonials.length;
        scrollToTestimonial(newIndex);
    }, [activeIndex, scrollToTestimonial]);

    const handlePrev = useCallback((): void => {
        const newIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
        scrollToTestimonial(newIndex);
    }, [activeIndex, scrollToTestimonial]);
    
    useEffect(() => {
        if (isDesktop || !scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const handleScroll = (): void => {
            const index = Math.round(container.scrollLeft / container.offsetWidth);
            setActiveIndex(index);
        };
        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [isDesktop]);

    // ✅ 2. Añadimos la lógica para calcular la duración dinámicamente.
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [animationDuration, setAnimationDuration] = useState<string>('40s');

    useEffect(() => {
        if (!marqueeRef.current) return;

        const calculateDuration = () => {
            const container = marqueeRef.current;
            if(container) {
                const speed = 55; // Velocidad en píxeles por segundo. ¡Puedes ajustar este valor!
                const distance = container.scrollWidth / 2; // La distancia que anima es la mitad del total.
                setAnimationDuration(`${distance / speed}s`);
            }
        };

        calculateDuration(); // Calcular al inicio
        
        // Usamos ResizeObserver para recalcular si el layout cambia.
        const resizeObserver = new ResizeObserver(calculateDuration);
        resizeObserver.observe(document.body);

        return () => resizeObserver.disconnect();
    }, []);


    return (
        <>
            {/* Inyectamos SÓLO los keyframes, sin la clase de animación. */}
            <style>{marqueeKeyframes}</style>

            <section id="testimonios" className="w-full bg-white py-20 lg:py-28 scroll-mt-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* ... (código de cabecera y testimonios sin cambios) ... */}
                    <div className="mx-auto text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                            El Sistema Funciona. Esta es la Evidencia.
                        </h2>
                        <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-600 text-balance">
                            No pido que confíes en mis palabras. Pido que verifiques los resultados medibles.
                        </p>
                    </div>
                    
                    <div className="relative mt-12 lg:mt-16">
                        <div 
                            ref={scrollContainerRef}
                            className={isDesktop 
                                ? "grid grid-cols-2 gap-8"
                                : "flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
                            }
                        >
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.name} className={isDesktop ? "" : "w-full flex-shrink-0 snap-center px-4"}>
                                    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-lg">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                                        </div>
                                        <h3 className="mt-4 text-xl font-bold text-[#0a4afc]">{testimonial.summary}</h3>
                                        <blockquote className="mt-2 text-lg text-slate-700 leading-relaxed flex-grow">
                                            <p>&quot;{testimonial.quote}&quot;</p>
                                        </blockquote>
                                        <footer className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-4">
                                            <Image src={testimonial.avatarSrc} alt={`Avatar de ${testimonial.name}`} width={48} height={48} className="h-12 w-12 rounded-full object-cover"/>
                                            <div>
                                                <p className="font-bold text-slate-900">{testimonial.name}</p>
                                                <p className="text-sm text-slate-500">{testimonial.title}</p>
                                            </div>
                                        </footer>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {!isDesktop && (
                            <>
                                <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-0 pointer-events-none">
                                    <button onClick={handlePrev} className="pointer-events-auto -ml-4 p-2 rounded-full bg-white/60 backdrop-blur-sm shadow-md hover:bg-white transition-colors" aria-label="Anterior"><ChevronLeft className="h-6 w-6 text-slate-700" /></button>
                                    <button onClick={handleNext} className="pointer-events-auto -mr-4 p-2 rounded-full bg-white/60 backdrop-blur-sm shadow-md hover:bg-white transition-colors" aria-label="Siguiente"><ChevronRight className="h-6 w-6 text-slate-700" /></button>
                                </div>
                                <div className="mt-8 flex justify-center gap-2">
                                    {testimonials.map((_, index) => (<button key={index} onClick={() => scrollToTestimonial(index)} className={`h-2 w-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[#0a4afc] scale-125' : 'bg-slate-300 hover:bg-slate-400'}`} aria-label={`Ir al testimonio ${index + 1}`}/>))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* --- Marquee de Logos de Empresas --- */}
                    <div className="mt-16 text-center">
                        <h3 className="text-xl lg:text-2xl font-semibold text-slate-700 tracking-wider">
                            Equipos que ya escalan con un sistema probado:
                        </h3>
                        <div className="relative mt-8 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                            {/* ✅ 3. Aplicamos la animación dinámicamente con un estilo en línea. */}
                            <div
                                ref={marqueeRef}
                                className="flex w-max-content"
                                style={{ animation: `marqueeLocal ${animationDuration} linear infinite` }}
                            >
                                {[...companyLogos, ...companyLogos].map((logo, index) => (
                                    <div key={`${logo.alt}-${index}`} className="mx-8 flex-shrink-0">
                                        <Image className="h-10 w-auto object-contain lg:h-12" src={logo.src} alt={logo.alt} width={140} height={48} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};