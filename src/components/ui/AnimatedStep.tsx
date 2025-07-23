'use client';

import { useState, useEffect, useRef } from 'react';

// 1. Tipado explícito y preciso para las props del componente.
interface AnimatedStepProps {
    index: number;
    title: string;
    description: string;
}

// Usamos 'React.FC' (Functional Component) para tipar nuestro componente.
const AnimatedStep: React.FC<AnimatedStepProps> = ({ index, title, description }) => {
    // 2. Estado para controlar la visibilidad y disparar la animación.
    const [isVisible, setIsVisible] = useState<boolean>(false);
    // 3. Referencia al elemento DOM para que el IntersectionObserver lo vigile.
    const stepRef = useRef<HTMLDivElement>(null);

    // 4. Hook useEffect para la lógica del IntersectionObserver.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Tomamos la primera (y única) entrada.
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Una vez que es visible, dejamos de observar para mejorar el rendimiento.
                    observer.unobserve(entry.target);
                }
            },
            {
                // La animación se dispara cuando el 20% del elemento es visible.
                threshold: 0.2,
            }
        );

        // Empezamos a observar el elemento si la referencia existe.
        if (stepRef.current) {
            observer.observe(stepRef.current);
        }

        // 5. Función de limpieza para desconectar el observer cuando el componente se desmonte.
        return () => {
            if (stepRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(stepRef.current);
            }
        };
    }, []); // El array vacío asegura que este efecto solo se ejecute al montar/desmontar.

    // Circunferencia del círculo (2 * PI * Radio). Nuestro radio es 28. 2 * 3.14159 * 28 ≈ 176.
    const circleCircumference = 176;

    return (
        <div
            ref={stepRef}
            className="flex flex-col items-center text-center opacity-0 animate-fade-in-up"
            style={{ animation: isVisible ? 'fadeInUp 1s ease-out forwards' : 'none' }}
        >
            <div className="relative flex h-16 w-16 items-center justify-center">
                {/* Usamos un SVG para un control preciso de la animación del borde */}
                <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 64 64">
                    {/* Círculo de fondo (estático) */}
                    <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#e0e7ff" // Un color azul-grisáceo claro (equivalente a blue-100/200)
                        strokeWidth="4"
                        fill="transparent"
                    />
                    {/* Círculo animado (foreground) */}
                    <circle
                        cx="32"
                        cy="32"
                        r="28"
                        className="stroke-blue-500"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={circleCircumference}
                        // Aplicamos la animación solo cuando el componente es visible
                        style={{
                            strokeDashoffset: isVisible ? 0 : circleCircumference,
                            transition: 'stroke-dashoffset 1.5s ease-in-out',
                        }}
                    />
                </svg>

                {/* El número, posicionado sobre el SVG */}
                <span className="relative text-2xl font-bold text-blue-500">{index + 1}</span>
            </div>

            <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
            <p className="mt-2 text-xl text-slate-600">{description}</p>
        </div>
    );
};

// Añadimos unos keyframes básicos para un efecto de aparición del contenido
// Esto se podría mover a tailwind.config.ts si se reutiliza mucho
const keyframes = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation-name: fadeInUp;
}`;

// Esto es una forma de inyectar estilos globales desde un componente.
// Para un proyecto más grande, sería mejor ponerlo en globals.css
function StyleInjector() {
    return <style>{keyframes}</style>;
}

// Exportamos el componente y el inyector de estilos
export { AnimatedStep, StyleInjector };