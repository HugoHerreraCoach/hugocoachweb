// src/components/ui/Precio.tsx
// Precio en dólares: "USD" pequeño y gris junto al monto grande, para que nunca se confunda con soles.

import { formatMonto } from '@/lib/precios-servicios';

interface PrecioProps {
    monto: number;
    /** Tamaño, peso y color del monto. "USD" se ajusta solo (la mitad del tamaño). */
    className?: string;
}

export function Precio({ monto, className = '' }: PrecioProps) {
    return (
        <span className={className}>
            <span className="mr-1.5 text-[0.5em] font-semibold uppercase tracking-wide text-slate-400">USD</span>
            {formatMonto(monto)}
        </span>
    );
}
