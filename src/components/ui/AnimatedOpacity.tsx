// app/components/ui/AnimatedOpacity.tsx
'use client';

import { type ReactNode, type Ref } from 'react';
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver';

interface AnimatedOpacityProps {
  children: ReactNode;
  className?: string;
  duration?: string; 
}

export const AnimatedOpacity = ({
  children,
  className,
  duration = 'duration-1000', // <-- 2. AÑADIMOS UN VALOR POR DEFECTO
}: AnimatedOpacityProps): React.ReactElement => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    freezeOnceVisible: true,
  }) as [Ref<HTMLDivElement>, boolean];

  return (
    <div
      ref={ref}
      className={`${className} transition-all ${duration} ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
};