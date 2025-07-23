'use client'; // Directiva para indicar que es un Client Component

import { useState, useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { Package, BrainCircuit, Dna, BotMessageSquare, Library, MessageCircle } from 'lucide-react';
import { ProgressCircle } from '../ui/ProgressCircle'; 
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'; 

// Definición de la interfaz para los elementos de valor
interface ValueItem {
  icon: ElementType;
  title: string;
  description: string;
}

// Datos de los elementos de valor
const valueStack: ValueItem[] = [
  {
    icon: Package,
    title: 'Sistema Comercial a Medida',
    description: '8 semanas de trabajo práctico donde instalo contigo los pilares de tu nuevo sistema comercial. Yo construyo la estructura, tú validas la estrategia.',
  },
  {
    icon: BrainCircuit,
    title: 'Acceso a "Lobos de Ventas"',
    description: 'Tu equipo recibe acceso a mi programa de entrenamiento digital. Mientras construimos el sistema, ellos afilan sus habilidades tácticas.',
  },
  {
    icon: Dna,
    title: 'Diagnóstico 360° y Plan de Acción',
    description: 'Iniciamos con una radiografía de tu área comercial para identificar los puntos de quiebre. Te entrego una hoja de ruta clara desde el día uno.',
  },
  {
    icon: BotMessageSquare,
    title: 'Kit de Herramientas Líder Experto',
    description: 'Recibes mis plantillas probadas para control de ventas, guiones y seguimiento. Herramientas listas para implementar, no para crear desde cero.',
  },
  {
    icon: Library,
    title: 'Biblioteca Estratégica',
    description: 'Acceso a recursos y masterclasses creadas por mí para que sigas afilando tu liderazgo comercial, incluso después de terminar la asesoría.',
  },
  {
    icon: MessageCircle,
    title: 'Acompañamiento Directo',
    description: 'Tienes acceso a mí vía WhatsApp durante la implementación para resolver dudas. No hablas con asistentes, hablas directamente con el estratega.',
  }
];

const AUTOPLAY_INTERVAL: number = 6000; 

export function ValueStackSection(): ReactNode {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [sectionRef, isSectionVisible] = useIntersectionObserver({
    threshold: 0.25, 
    freezeOnceVisible: false, 
  });

  const activeItem: ValueItem = valueStack[activeIndex];
  const ActiveIcon: ElementType = activeItem.icon;

  useEffect(() => {
    if (isSectionVisible) {
      // Limpia cualquier intervalo existente para evitar duplicidades
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex: number) => (prevIndex + 1) % valueStack.length);
      }, AUTOPLAY_INTERVAL);
    } else {
      // Si la sección no es visible, asegura que el intervalo se detenga
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null; 
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isSectionVisible]); 

  // Manejador de click para los botones de selección
  const handleItemClick = (index: number): void => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      // Reinicia el temporizador de auto-avance si el usuario interactúa
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setActiveIndex((prevIndex: number) => (prevIndex + 1) % valueStack.length);
        }, AUTOPLAY_INTERVAL);
      }
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-slate-50 py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-7xl">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
            Más que una asesoría: la entrega de un sistema.
          </h2>
          <p className="mt-6 text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto text-balance">
            Cada componente está diseñado para construir tu estructura, acelerar los resultados y devolverte el control como líder.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-3 lg:gap-4 mt-8 lg:mt-16">
          {valueStack.map((item: ValueItem, index: number) => {
            const IconComponent: ElementType = item.icon;
            const isActive: boolean = activeIndex === index;
            return (
              <button
                key={item.title}
                onClick={() => handleItemClick(index)}
                className={`
                  relative overflow-hidden p-4 rounded-lg transition-all duration-300 ease-in-out
                  flex items-center gap-3 text-left cursor-pointer
                  ${isActive
                    ? 'bg-white scale-105 shadow-xl ring-2 ring-[#0a4afc]' 
                    : 'bg-white/60 hover:bg-white hover:shadow-md ring-2 ring-transparent' 
                  }
                `}
                aria-label={`Seleccionar beneficio: ${item.title}`}
              >
                <div className={`
                  hidden md:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md
                  transition-colors duration-300
                  ${isActive ? 'bg-[#0a4afc]/15' : 'bg-slate-200/70'}
                `}>
                  <IconComponent className={`h-6 w-6 transition-colors duration-300 ${isActive ? 'text-[#0a4afc]' : 'text-slate-600'}`} />
                </div>
                <div className={`flex-1 min-w-0 break-words font-semibold transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 md:mt-12 rounded-xl max-w-5xl mx-auto bg-white p-8 shadow-lg border border-slate-200/80 min-h-[180px] md:min-h-[160px] relative overflow-hidden">
          <div key={`content-${activeIndex}`} className="animate-fadeIn"> {/* Key para forzar re-render de la animación */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#0a4afc]/15">
                <ActiveIcon className="h-7 w-7 text-[#0a4afc]" />
              </div>
              <h3 className="flex-1 text-2xl font-bold text-slate-900 text-balance">{activeItem.title}</h3>
            </div>
            <p className="mt-4 text-lg lg:text-xl text-slate-600 leading-snug">{activeItem.description}</p>
          </div>

          {/* Renderiza ProgressCircle solo si la sección es visible para activar la animación */}
          {isSectionVisible && (
            <ProgressCircle
              key={`progress-${activeIndex}-${isSectionVisible}`} // La key cambia con activeIndex y visibilidad para reiniciar la animación
              duration={AUTOPLAY_INTERVAL - 100} // Ligeramente menor que el intervalo para que termine antes del cambio
              className="absolute bottom-2 right-2"
            />
          )}
        </div>
      </div>
    </section>
  );
}