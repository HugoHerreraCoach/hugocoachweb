// src/components/ui/CtaButton.tsx
// Botón de la web: uno primario (azul sólido) y uno secundario (borde).

import Link from 'next/link';
import type { ReactNode } from 'react';

interface CtaButtonProps {
    href: string;
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'inverse';
    className?: string;
}

const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-lg font-semibold leading-tight transition-colors duration-200 active:scale-[0.98]';

const variants = {
    primary: 'bg-[#0a4afc] text-white hover:bg-[#0b3ccf]',
    secondary: 'border border-slate-600 text-white hover:border-slate-400 hover:bg-white/5',
    /** Para fondos azules. */
    inverse: 'bg-white text-black hover:bg-slate-200',
} as const;

export function CtaButton({ href, children, variant = 'primary', className = '' }: CtaButtonProps) {
    const isExternal = href.startsWith('http');

    return (
        <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </Link>
    );
}
