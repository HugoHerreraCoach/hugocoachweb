// src/components/ui/IconoPng.tsx
// Icono 3D decorativo (PNG de 256 px). Dimensiones fijas para evitar saltos de diseño,
// carga diferida y `sizes` ajustado al tamaño real, así next/image sirve solo unos pocos KB.

import Image from 'next/image';

const TAMANOS = {
    xs: { px: 32, clase: 'h-8 w-8' },
    sm: { px: 44, clase: 'h-11 w-11' },
    md: { px: 56, clase: 'h-14 w-14' },
    lg: { px: 64, clase: 'h-16 w-16' },
} as const;

interface IconoPngProps {
    src: string;
    tamano?: keyof typeof TAMANOS;
    className?: string;
}

export function IconoPng({ src, tamano = 'md', className = '' }: IconoPngProps) {
    const { px, clase } = TAMANOS[tamano];

    return (
        <Image
            src={src}
            alt=""
            aria-hidden="true"
            width={256}
            height={256}
            sizes={`${px}px`}
            className={`flex-shrink-0 ${clase} ${className}`}
        />
    );
}
