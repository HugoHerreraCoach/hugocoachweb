//src/components/ui/Modal.tsx

"use client";

import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-70 backdrop-blur-sm overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* Fondo clicable */}
            <div
                className="fixed inset-0"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Contenedor del modal */}
            <div className="relative w-full max-w-lg m-4 mt-10 bg-white rounded-xl shadow-2xl z-10 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-20">
                    <h2 id="modal-title" className="text-xl font-bold text-slate-800">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 transition-colors"
                        aria-label="Cerrar modal"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Contenido scrollable */}
                <div className="p-4 sm:p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
