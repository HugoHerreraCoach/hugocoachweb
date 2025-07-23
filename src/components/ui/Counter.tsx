// app/components/ui/Counter.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Interface para las props del componente Counter.
 * @param {number} targetValue - El número final al que el contador debe llegar.
 * @param {number} [duration=2000] - La duración de la animación en milisegundos.
 * @param {string} [prefix=''] - Un prefijo opcional para mostrar antes del número (ej. '+').
 * @param {string} [suffix=''] - Un sufijo opcional para mostrar después del número (ej. 'x').
 * @param {string} [className] - Clases de Tailwind CSS para aplicar al elemento.
 */
interface CounterProps {
    targetValue: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export function Counter({
    targetValue,
    duration = 2000,
    prefix = '',
    suffix = '',
    className,
}: CounterProps) {
    const [currentValue, setCurrentValue] = useState<number>(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    let startTime: number | null = null;

                    const animate = (timestamp: number) => {
                        if (!startTime) {
                            startTime = timestamp;
                        }

                        const elapsedTime = timestamp - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        const value = Math.floor(progress * targetValue);

                        setCurrentValue(value);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                    // Una vez que la animación comienza, dejamos de observar el elemento.
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.5, // La animación empieza cuando el 50% del elemento es visible
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        // Función de limpieza para desconectar el observador cuando el componente se desmonte.
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [targetValue, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {currentValue}
            {suffix}
        </span>
    );
}