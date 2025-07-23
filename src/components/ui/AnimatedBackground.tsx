'use client';

import { useRef, useState } from 'react';
import type { ReactNode, MouseEvent, CSSProperties } from 'react';

interface AnimatedBackgroundProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
}

export function AnimatedBackground({
  children,
  className = '',
  borderRadius = '',
}: AnimatedBackgroundProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Esta lógica de JS solo se usará para el efecto de escritorio
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const dynamicStyles = {
    '--mouse-x': `${mousePosition.x}px`,
    '--mouse-y': `${mousePosition.y}px`,
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={dynamicStyles}
      className={`relative overflow-hidden ${borderRadius} ${className}`}
    >
      {/* 1. Resplandor ESTÁTICO para MÓVIL */}
      {/* Es visible por defecto y se oculta en pantallas grandes (lg:hidden) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,74,252,0.15),transparent_80%)] lg:hidden"
        aria-hidden="true"
      />
      
      {/* 2. Resplandor DINÁMICO para ESCRITORIO (el que ya teníamos) */}
      {/* Está oculto por defecto y se muestra en pantallas grandes (lg:block) */}
      <div
        className="pointer-events-none absolute inset-0 hidden transition-opacity duration-500 lg:block"
        style={{
          opacity: isHovering ? 1 : 0,
          background:
            'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(10, 74, 252, 0.15), transparent 80%)',
        }}
        aria-hidden="true"
      />
      
      {/* El contenido se renderiza por encima de ambos fondos */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}