// app/components/casosDeExito/TestimonialModal.tsx

'use client'; // Necesario para usar Hooks (useState, useEffect) y manejar eventos del usuario.

import React, { useEffect, type FC } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

// Definimos la forma de los datos que espera este componente.
// La reutilizamos desde la sección principal para mantener la consistencia.
interface ResenaDestacada {
    imageUrl: string;
    altText: string;
    width?: number;
    height?: number;
}

// Definimos las props del componente Modal.
interface TestimonialModalProps {
    review: ResenaDestacada;
    onClose: () => void; // Función para cerrar el modal
}

const TestimonialModal: FC<TestimonialModalProps> = ({ review, onClose }) => {
    // Efecto para cerrar el modal al presionar la tecla "Escape".
    // Es una mejora de accesibilidad y UX fundamental.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        // Añadimos el listener cuando el componente se monta.
        document.addEventListener('keydown', handleKeyDown);

        // Limpiamos el listener cuando el componente se desmonta para evitar fugas de memoria.
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        // Contenedor principal del modal: superpuesto, fijo y cubriendo toda la pantalla.
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in-0"
            onClick={onClose} // Cierra el modal al hacer clic en el fondo oscuro.
        >
            {/* Contenedor de la imagen: evita que el clic en la imagen cierre el modal. */}
            <div
                className="relative max-w-4xl max-h-[90vh] w-full rounded-xl bg-white shadow-2xl animate-in zoom-in-95"
                onClick={(e: React.MouseEvent<HTMLDivElement>): void => e.stopPropagation()}
            >
                {/* Botón para cerrar el modal: posicionado en la esquina superior derecha. */}
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg transition-all hover:bg-slate-900 hover:scale-110 cursor-pointer"
                    aria-label="Cerrar testimonio"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Usamos Next/Image para la optimización. object-contain asegura que toda la imagen sea visible. */}
                <Image
                    src={review.imageUrl}
                    alt={review.altText}
                    width={review.width ?? 1000} // Usamos los valores originales para la relación de aspecto
                    height={review.height ?? 500}
                    className="w-full h-auto object-contain rounded-xl"
                />
            </div>
        </div>
    );
};

export default TestimonialModal;