// app/components/ui/AnimatedTypewriter.tsx
'use client';

import { useState, useEffect, type Ref } from 'react';
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'; // Asegúrate de que la ruta a tu hook sea correcta

interface AnimatedTypewriterProps {
    /** El texto completo que se animará. */
    text: string;
    /** Clases de Tailwind CSS para el elemento contenedor del texto. */
    className?: string;
    /** Velocidad de la animación en milisegundos por caracter. */
    speed?: number;
}

export const AnimatedTypewriter = ({
    text,
    className,
    speed = 50,
}: AnimatedTypewriterProps): React.ReactElement => {
    const [ref, isVisible] = useIntersectionObserver({
        threshold: 0.5,
        freezeOnceVisible: true,
    }) as [Ref<HTMLParagraphElement>, boolean];

    const [displayedText, setDisplayedText] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(true);

    useEffect(() => {
        if (isVisible) {
            let i = 0;
            const intervalId = setInterval(() => {
                if (i < text.length) {
                    setDisplayedText(text.substring(0, i + 1));
                    i++;
                } else {
                    clearInterval(intervalId);
                    setIsTyping(false); // Detiene el parpadeo del cursor
                }
            }, speed);

            // Función de limpieza para evitar fugas de memoria
            return () => clearInterval(intervalId);
        }
    }, [isVisible, text, speed]);

    return (
        <p ref={ref} className={className}>
            &quot;{displayedText}
            {/* El cursor solo se muestra mientras la animación está activa */}
            {isTyping && (
                <span
                    className="inline-block w-[3px] h-[1em] ml-1 bg-current animate-blink align-bottom"
                    aria-hidden="true"
                ></span>
            )}
            &quot;
        </p>
    );
};