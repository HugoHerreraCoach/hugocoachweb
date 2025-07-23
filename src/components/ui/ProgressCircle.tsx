// src/components/ui/ProgressCircle.tsx

'use client';

import type { ReactNode } from 'react';

interface ProgressCircleProps {
  duration: number;
  className?: string;
}

export function ProgressCircle({ duration, className = '' }: ProgressCircleProps): ReactNode {
  const radius: number = 28;
  const animationName: string = 'progress-arc-component-scoped';

  return (
    <div className={`h-8 w-8 ${className}`}>
      <style>
        {`
          @keyframes ${animationName} {
            from {
              stroke-dashoffset: 1;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>

      <svg className="h-full w-full -rotate-90" viewBox="0 0 60 60">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0a4afc" floodOpacity="0.4"/>
          </filter>
        </defs>

        <circle
          cx="30"
          cy="30"
          r={radius}
          strokeWidth="4"
          className="stroke-slate-200/70 fill-transparent"
        />

        <circle
          cx="30"
          cy="30"
          r={radius}
          strokeWidth="4"
          pathLength="1"
          className="fill-transparent stroke-[#0a4afc]"
          style={{
            strokeDasharray: 1,
            animationName,
            animationDuration: `${duration}ms`,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
            filter: 'url(#shadow)',
          }}
        />
      </svg>
    </div>
  );
}