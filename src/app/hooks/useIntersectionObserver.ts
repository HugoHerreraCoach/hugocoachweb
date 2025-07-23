// app/hooks/useIntersectionObserver.ts
"use client";

// 1. Importa 'Ref' además de los otros hooks.
import { useState, useEffect, useRef, type Ref } from "react";

interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

// 2. Cambia el tipo de retorno en la firma de la función.
export const useIntersectionObserver = (
  options: IntersectionObserverOptions = {}
): [Ref<HTMLDivElement>, boolean] => {
  // <-- CAMBIO AQUÍ
  const {
    threshold = 0.1,
    root = null,
    rootMargin = "0px",
    freezeOnceVisible = true,
  } = options;

  // Esta línea se mantiene igual, es correcta.
  const targetRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    if (isIntersecting && freezeOnceVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (freezeOnceVisible) {
            observer.unobserve(node);
          }
        } else {
          if (!freezeOnceVisible) {
            setIntersecting(false);
          }
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
    // Usamos el objeto ref completo como dependencia, no su propiedad .current
  }, [
    targetRef,
    threshold,
    root,
    rootMargin,
    freezeOnceVisible,
    isIntersecting,
  ]);

  return [targetRef, isIntersecting];
};
