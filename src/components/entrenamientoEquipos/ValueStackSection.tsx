'use client';

import { useState, useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { Award, CalendarClock, LifeBuoy, Library, MessageSquare, Presentation } from 'lucide-react';
import { ProgressCircle } from '../ui/ProgressCircle';
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'; 

interface ValueItem {
  icon: ElementType;
  title: string;
  description: string;
}

const valueStack: ValueItem[] = [
  { icon: Presentation, title: 'Entrenamiento del equipo (8h)', description: 'Aquí se instala el sistema. Es el trabajo práctico y directo donde tu equipo construye los guiones, ejecuta las técnicas y adopta la mentalidad de un cerrador experto.' },
  { icon: CalendarClock, title: 'Talleres grupales (1 año)', description: 'Aseguramos que tu equipo se mantenga a la vanguardia con talleres quincenales de refuerzo y nuevas tácticas (incluyendo IA) para que el sistema nunca pierda efectividad.' },
  { icon: Library, title: 'Sistema de Onboarding', description: 'Recibes 5 licencias de por vida de mi programa "Lobos de Ventas" para entrenar a nuevos vendedores de forma estandarizada y rápida, liberándote de la repetición.' },
  { icon: MessageSquare, title: 'Soporte Directo (30 días)', description: 'Durante 30 días, tu equipo tiene acceso directo a mí por WhatsApp para resolver dudas en tiempo real y acelerar el retorno de tu inversión.' },
  { icon: LifeBuoy, title: 'Sistema Documentado', description: 'Recibes todas las plantillas, guiones y grabaciones. Es el manual de operaciones invaluable de tu fuerza de ventas; un activo invaluable que te pertenece para siempre.' },
  { icon: Award, title: 'Certificación Oficial', description: 'Un reconocimiento que valida la nueva habilidad y el estatus profesional de tu equipo. Aumenta el compromiso y retiene al mejor talento.' },
];

const AUTOPLAY_INTERVAL: number = 8000; // 5 segundos

export function ValueStackSection(): ReactNode {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Usa el hook useIntersectionObserver para detectar cuándo la sección es visible
  const [sectionRef, isSectionVisible] = useIntersectionObserver({
    threshold: 0.25, // La sección se considera visible cuando al menos el 25% de ella está en el viewport
    freezeOnceVisible: true, // Deja de observar una vez que la sección ha sido visible
  });

  const activeItem = valueStack[activeIndex];
  const ActiveIcon = activeItem.icon;

  useEffect(() => {
    if (isSectionVisible) {
      // Inicia el intervalo de avance automático SOLO cuando la sección es visible.
      // Si el intervalo ya existe, lo limpiamos para evitar duplicidades al re-entrar.
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % valueStack.length);
      }, AUTOPLAY_INTERVAL);
    } else {
      // Si la sección ya no es visible o aún no lo ha sido, asegúrate de limpiar el intervalo.
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Reinicia la referencia
      }
    }

    // Limpia el intervalo cuando el componente se desmonta o cuando isSectionVisible cambia
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isSectionVisible]); // Este efecto depende de `isSectionVisible`

  const handleItemClick = (index: number): void => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      // Opcional: Si el usuario interactúa, reinicia el temporizador
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % valueStack.length);
        }, AUTOPLAY_INTERVAL);
      }
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-slate-50 py-20 sm:py-28"> {/* Asigna la referencia aquí */}
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
            Más que un curso: la instalación de un sistema de resultados.
          </h2>
          <p className="mt-6 text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto text-balance">
            Tu inversión construye un ecosistema de ventas. Cada componente está diseñado para generar un retorno medible y devolverte el control.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 mt-8 lg:mt-16">
          {valueStack.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeIndex === index;
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
                  ${isActive ? 'bg-blue-500/15' : 'bg-slate-200/70'}
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

        <div className="mt-6 md:mt-12 rounded-xl bg-white p-8 shadow-lg border border-slate-200/80 min-h-[180px] md:min-h-[160px] relative overflow-hidden">
          <div key={`content-${activeIndex}`} className="animate-fadeIn">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#0a4afc]/15">
                <ActiveIcon className="h-7 w-7 text-[#0a4afc]" />
              </div>
              <h3 className="flex-1 text-2xl font-bold text-slate-900 text-balance">{activeItem.title}</h3>
            </div>
            <p className="mt-4 text-lg lg:text-xl text-slate-600 leading-snug">{activeItem.description}</p>
          </div>

          {/* Renderiza ProgressCircle solo si la sección es visible,
              forzando una nueva animación al cambiar la clave cuando se vuelve visible */}
          {isSectionVisible && (
            <ProgressCircle
              key={`progress-${activeIndex}-${isSectionVisible}`} // Añadimos isSectionVisible a la key para forzar re-render
              duration={AUTOPLAY_INTERVAL - 100}
              className="absolute bottom-2 right-2"
            />
          )}
        </div>
      </div>
    </section>
  );
}