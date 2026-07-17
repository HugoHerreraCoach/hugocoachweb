// src/components/ui/UpsellOffer.tsx

"use client";

import { useId, useState, type ReactNode } from 'react';
import Image from 'next/image';

// --- DEFINICIÓN DE TIPOS ACTUALIZADA ---
interface UpsellOfferProps {
    offerId: string;
    offerHeadline: string;
    productTitle: string;
    description: string;
    checked: boolean;
    onChange: (isChecked: boolean) => void;
    price: number;
    currencySymbol?: string;
    imageUrl: string;
    imageAlt: string;
    imageWidth?: number;  
    imageHeight?: number; 
    children: ReactNode;
}

export function UpsellOffer({
    offerHeadline,
    productTitle,
    description,
    checked,
    onChange,
    price,
    currencySymbol = 'S/',
    imageUrl,
    imageAlt,
    imageWidth = 75, 
    imageHeight = 75, 
    children
}: UpsellOfferProps) {
    const id = useId();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <label 
            htmlFor={id}
            className={`!mt-6 p-4 block border rounded-lg transition-all duration-300 cursor-pointer ${checked ? 'border-green-500 bg-green-50/50 shadow-md' : 'border-slate-300'}`}
        >
            <div className="flex items-start gap-4">
                {/* Columna Izquierda: Imagen del Producto */}
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={imageWidth}
                    height={imageHeight}
                    className="rounded-md object-contain flex-shrink-0"
                />

                {/* Columna Derecha */}
                <div className="flex">
                    <div className="flex flex-col">
                        {/* Fila Superior: Título y Precio */}
                        <div className="flex justify-between items-start">
                            <div className='flex'>
                                <input
                                    id={id}
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => onChange(e.target.checked)}
                                    className="mr-1 h-8 w-8 lg:h-6 lg:w-6 rounded border-gray-400 text-green-600 focus:ring-green-500"
                                />
                                <p className="font-semibold text-lg mt-1 text-gray-800 leading-[1]">{offerHeadline}</p>
                            </div>
                            <span className="font-bold text-lg text-green-600 whitespace-nowrap">
                                {currencySymbol}{price.toFixed(2)}
                            </span>
                        </div>

                        {/* Descripción corta y botón para expandir */}
                        <div>
                            <h4 className="font-bold text-xl mt-2 text-slate-900 leading-[1.2]">{productTitle}</h4>
                            <p className="text-lg leading-[1.2] text-slate-600 mt-1">
                                {description}{' '}
                                <span
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsExpanded(!isExpanded); }}
                                    className="text-primary-blue font-semibold hover:underline"
                                >
                                    {isExpanded ? 'Ver menos...' : 'Ver más...'}
                                </span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Sección Expandible para los beneficios detallados */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? `max-h-96 mt-3` : 'max-h-0'}`}>
                {children}
            </div>
        </label>
    );
}