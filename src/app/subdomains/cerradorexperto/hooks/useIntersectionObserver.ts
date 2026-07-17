import { type RefObject, useEffect } from 'react';

type Options = IntersectionObserverInit;

export function useIntersectionObserver(
    elementRef: RefObject<HTMLDivElement | null>, 
    options: Options,
    setCurrentIndex: (index: number) => void,
    isScrollingProgrammatically: RefObject<boolean>,
    // ✅ MEJORA: Añadimos un parámetro para habilitar/deshabilitar el hook
    enabled: boolean = true 
) {
    useEffect(() => {
        // Si el hook está deshabilitado (ej. en desktop) o no hay contenedor, no hacemos nada.
        if (!enabled || !elementRef.current) return;

        const container = elementRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrollingProgrammatically.current) return;
                
                const intersectingEntry = entries.find(entry => entry.isIntersecting);
                
                if (intersectingEntry) {
                    const indexStr = (intersectingEntry.target as HTMLElement).dataset.index;
                    if (indexStr) {
                        const newIndex = parseInt(indexStr, 10);
                        setCurrentIndex(newIndex);
                    }
                }
            },
            {
                root: container,
                ...options,
            }
        );

        Array.from(container.children).forEach(child => {
            if (child.hasAttribute('data-index')) {
                observer.observe(child);
            }
        });

        return () => observer.disconnect();
        
    // ✅ El efecto ahora depende también del estado 'enabled'
    }, [elementRef, options, setCurrentIndex, isScrollingProgrammatically, enabled]);
}