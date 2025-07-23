// app/components/home/SolutionSection.tsx

'use client';

import { useState } from 'react';
import type { TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import StepCard from '../ui/StepCard';

type SolutionStep = {
  title: string;
  desc: string;
  imageUrl: string;
  width: number;
  height: number;
};

const solutionSteps: SolutionStep[] = [
  {
    title: '1. Unificar el Método',
    desc: 'Implementamos un proceso de ventas único. Todos hablan el mismo idioma y ejecutan la misma estrategia probada para cerrar.',
    imageUrl: '/images/equipos/step1.jpg',
    width: 768,
    height: 1408,
  },
  {
    title: '2. Estructurar la Habilidad',
    desc: 'Le damos a cada vendedor un sistema que potencia sus fortalezas y las enfoca en cerrar la venta de manera eficiente y rentable.',
    imageUrl: '/images/equipos/step2.jpg',
    width: 768,
    height: 1408,
  },
  {
    title: '3. Provocar Resultados Medibles',
    desc: 'Pasamos de la esperanza a la certeza. Con un sistema claro, los resultados se vuelven predecibles para poder invertir y escalar.',
    imageUrl: '/images/equipos/step3.jpg',
    width: 768,
    height: 1408,
  },
];

const SWIPE_THRESHOLD: number = 50;

export function SolutionSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const goToPrevious = (): void => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? solutionSteps.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (): void => {
    const isLastSlide = currentIndex === solutionSteps.length - 1;
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
    // CAMBIO: Fondo negro y padding ajustado
    <section className="w-full bg-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          {/* CAMBIO: Color del ícono */}
          <ShieldCheck className="mx-auto h-12 w-12 text-[#0a4afc]" />
          {/* CAMBIO: Color y estilo del título */}
          <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl leading-[1.1] text-balance">
            La venta no es un arte, es una <span className="text-[#0a4afc]">ciencia</span>. Y tu equipo necesita la <span className="text-[#0a4afc]">fórmula</span>.
          </h2>
          {/* CAMBIO: Color del párrafo */}
          <p className="mt-6 text-xl text-white/95 lg:text-2xl text-balance">
            Mi trabajo no es dar charlas de &quot;motivación vacía&quot;. Es instalar una estructura. Un sistema de ventas que funciona sin depender de la inspiración. Así es como lo construimos:
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
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
                {solutionSteps.map((step) => (
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
              {/* CAMBIO: Estilo de botones de flecha */}
              <button onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 left-2 z-30 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white" aria-label="Anterior">
                <ChevronLeft size={24} />
              </button>
              <button onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-2 z-30 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white" aria-label="Siguiente">
                <ChevronRight size={24} />
              </button>
            </div>
            {/* CAMBIO: Estilo de los puntos de navegación */}
            <div className="mt-8 flex justify-center gap-2">
              {solutionSteps.map((_, slideIndex) => (
                <button key={slideIndex} onClick={() => goToSlide(slideIndex)} className={`h-2 w-2 rounded-full ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/40'}`} aria-label={`Ir al paso ${slideIndex + 1}`} />
              ))}
            </div>
          </div>

          <div className="hidden md:grid max-w-[1200px] mx-auto md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionSteps.map((step) => (
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