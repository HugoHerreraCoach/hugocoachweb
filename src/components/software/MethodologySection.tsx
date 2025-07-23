// app/components/software/MethodologySection.tsx

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactElement } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Code,
  Rocket,
} from 'lucide-react';

// Interfaz para definir la estructura de cada fase de la metodología.
interface MethodologyPhase {
  icon: ReactElement;
  phase: string;
  title: string;
  description: string;
  imageUrl: string;
}

// Datos constantes para las fases.
const phases: MethodologyPhase[] = [
  {
    icon: <ClipboardList className="h-8 w-8 text-slate-300" />,
    phase: 'Fase 1',
    title: 'Arquitectura y Estrategia',
    description:
      'Primero, el plano. Diseñamos la estrategia y los indicadores de tu activo digital para garantizar un resultado medible.',
    imageUrl: '/images/software/step1.jpg',
  },
  {
    icon: <Code className="h-8 w-8 text-slate-300" />,
    phase: 'Fase 2',
    title: 'Construcción de Alto Performance',
    description:
      'Aquí transformamos el plano en un activo digital. Construimos una herramienta de alto rendimiento, 100% enfocada en tu objetivo comercial.',
    imageUrl: '/images/software/step2.jpg',
  },
  {
    icon: <Rocket className="h-8 w-8 text-slate-300" />,
    phase: 'Fase 3',
    title: 'Activación y Entrega de Control',
    description:
      'Activamos la herramienta y te entregamos el control total. Recibes un sistema listo para operar y un equipo entrenado para liderar su ejecución.',
    imageUrl: '/images/software/step3.jpg',
  },
];

// Componente de tarjeta reutilizable para cada fase.
// No se exporta porque solo se usa en este archivo.
const PhaseCard = ({ phase }: { phase: MethodologyPhase }): ReactElement => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
    <Image
      src={phase.imageUrl}
      alt={`Fondo para ${phase.title}`}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
    />
    {/* Overlay para asegurar la legibilidad del texto */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/90" />

    {/* Contenido de la tarjeta */}
    <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8 text-white">
      <div className="flex items-center gap-2">
        {phase.icon}
        <span className="text-sm font-bold uppercase tracking-widest text-slate-300">
          {phase.phase}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-bold">{phase.title}</h3>
      <p className="mt-2 text-lg leading-[1.4] text-balance text-slate-200">
        {phase.description}
      </p>
    </div>
  </div>
);

export default function MethodologySection(): ReactElement {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // Ref para el contenedor del carrusel, para poder manipular su scroll.
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Función para navegar a un slide específico.
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
    const newIndex = currentIndex === 0 ? phases.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = (): void => {
    const newIndex = currentIndex === phases.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  // Efecto para observar qué slide está visible y actualizar el estado.
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // El slide está visible, encontramos su índice y actualizamos el estado.
            const index = Array.from(carousel.children).indexOf(entry.target);
            setCurrentIndex(index);
            break; // Solo nos interesa el primer slide visible.
          }
        }
      },
      // Opciones del observer: se activa cuando el 70% del slide es visible.
      {
        root: carousel,
        threshold: 0.7,
      },
    );

    // Observamos cada uno de los slides dentro del carrusel.
    const slides = Array.from(carousel.children);
    slides.forEach((slide) => observer.observe(slide));

    // Función de limpieza para desconectar el observer cuando el componente se desmonte.
    return () => slides.forEach((slide) => observer.unobserve(slide));
  }, []);

  return (
    <section
      id="proceso"
      className="w-full bg-black py-20 lg:py-28 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Mi Método de 3 Fases para Construir tu Activo Digital
          </h2>
          <p className="text-balance mt-6 text-xl leading-[1.4] text-slate-300 lg:text-2xl">
            No dejamos nada al azar. Hay un proceso probado para garantizar
            resultados.
          </p>
        </div>

        {/* --- Contenedor Principal del Carrusel y Grid --- */}
        <div className="mt-10 lg:mt-16">
          {/* --- Vista Móvil (Carrusel) --- */}
          <div className="md:hidden">
            <div
              ref={carouselRef}
              className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 -mx-4 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {phases.map((phase) => (
                <div
                  key={phase.title}
                  className="w-[90%] flex-shrink-0 snap-center px-2"
                >
                  <div className="aspect-[3/4]">
                    <PhaseCard phase={phase} />
                  </div>
                </div>
              ))}
            </div>

            {/* Navegación y Puntos */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={goToPrevious}
                className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-opacity disabled:opacity-50"
                aria-label="Anterior"
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex justify-center gap-2">
                {phases.map((_, slideIndex) => (
                  <button
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      currentIndex === slideIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                    aria-label={`Ir a la fase ${slideIndex + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-opacity disabled:opacity-50"
                aria-label="Siguiente"
                disabled={currentIndex === phases.length - 1}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* --- Vista Desktop (Grid) --- */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {phases.map((phase) => (
              <div
                key={phase.title}
                className="group aspect-[4/5] transition-all duration-300 hover:!scale-105"
              >
                <PhaseCard phase={phase} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}