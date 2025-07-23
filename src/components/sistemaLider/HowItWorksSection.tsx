'use client';

import { useState } from 'react';
import type { TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, Waypoints } from 'lucide-react';
import StepCard from '../ui/StepCard'; 

interface ProcessStep {
  name: string;
  description: string;
  imageUrl: string;
  width: number;
  height: number;
}

const processSteps: ProcessStep[] = [
  {
    name: 'Fase 1: Diagnóstico Estratégico',
    description: 'Analizo tu operación para encontrar los puntos de quiebre en tu proceso y estructura. Te entrego un plan de acción concreto para construir tu sistema.',
    imageUrl: '/images/empresas/step1.jpg',
    width: 768,
    height: 1408,
  },
  {
    name: 'Fase 2: Arquitectura del Sistema',
    description: 'Construyo tus activos comerciales estratégicos: Plan Comercial, Propuesta Única de Venta (PUV), proceso medible y el panel de KPIs que te da control absoluto.',
    imageUrl: '/images/empresas/step2.jpg', 
    width: 768,
    height: 1408,
  },
  {
    name: 'Fase 3: Equipamiento y Activación',
    description: 'Te entrego el sistema y entreno a la persona clave (tú o tu gerente) con el método exacto para implementar la nueva estructura y dirigir al equipo.',
    imageUrl: '/images/empresas/step3.jpg',
    width: 768,
    height: 1408,
  },
  {
    name: 'Fase 4: Optimización y Autonomía.',
    description: 'Analizamos los datos para que aprendas a optimizar el sistema por tu cuenta. El resultado: te conviertes en un líder que dirige con un sistema probado.',
    imageUrl: '/images/empresas/step4.jpg', 
    width: 768,
    height: 1408,
  },
];

const SWIPE_THRESHOLD: number = 50;

export function HowItWorksSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const goToPrevious = (): void => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? processSteps.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (): void => {
    const isLastSlide = currentIndex === processSteps.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number): void => {
    setCurrentIndex(slideIndex);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    setTouchEnd(null);
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
      goToNext();
    } else if (diff < -SWIPE_THRESHOLD) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section id="como-funciona" className="w-full bg-black pt-16 pb-20 lg:pb-32 scroll-mt-20">
      <div className="mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-8xl text-center">
          <Waypoints className="mx-auto h-12 w-12 text-[#0a4afc]" /> 
          <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl leading-[1.1] text-balance">
            Mi plan de <span className="text-[#0a4afc]">4 fases</span> para construir tu sistema comercial
          </h2>
          <p className="mt-6 text-xl text-white/95 lg:text-2xl text-balance">
            Este es el método probado para dejar de gestionar el día a día y empezar a construir un motor de ventas predecible.
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
          {/* Carrusel para móviles */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <div
                className={`flex ease-in-out ${!isDragging ? 'transition-transform duration-500' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
              >
                {processSteps.map((step: ProcessStep) => (
                  <div key={step.name} className="w-full flex-shrink-0 p-2">
                    <StepCard
                      title={step.name}
                      subtitle={step.description}
                      imageUrl={step.imageUrl}
                      width={step.width}
                      height={step.height}
                    />
                  </div>
                ))}
              </div>
              <button onClick={goToPrevious} className="absolute top-9/20 -translate-y-1/2 left-2 z-30 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white" aria-label="Anterior">
                <ChevronLeft size={24} />
              </button>
              <button onClick={goToNext} className="absolute top-9/20 -translate-y-1/2 right-2 z-30 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white" aria-label="Siguiente">
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {processSteps.map((_, slideIndex: number) => (
                <button
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className={`h-2 w-2 rounded-full ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/40'}`}
                  aria-label={`Ir a la fase ${slideIndex + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Grid para escritorio */}
          <div className="hidden md:grid max-w-[1400px] mx-auto md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step: ProcessStep) => (
              <StepCard
                key={step.name}
                title={step.name}
                subtitle={step.description}
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