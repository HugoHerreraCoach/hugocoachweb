// src/components/ui/FaqLista.tsx
// Lista de preguntas frecuentes con <details> nativo (sin JavaScript). La usan la home y /servicios.

import { ChevronDown } from 'lucide-react';

export interface PreguntaFaq {
    pregunta: string;
    respuesta: string;
}

interface FaqListaProps {
    preguntas: PreguntaFaq[];
    className?: string;
}

export function FaqLista({ preguntas, className = '' }: FaqListaProps) {
    return (
        <div className={`divide-y divide-slate-800 border-y border-slate-800 ${className}`}>
            {preguntas.map((item) => (
                <details key={item.pregunta} className="group">
                    <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-white marker:hidden [&::-webkit-details-marker]:hidden">
                        {item.pregunta}
                        <ChevronDown
                            className="h-5 w-5 flex-shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180 group-open:text-[#4d8bff]"
                            aria-hidden="true"
                        />
                    </summary>
                    <p className="pb-5 pr-8 text-base leading-relaxed text-slate-300 lg:text-lg">{item.respuesta}</p>
                </details>
            ))}
        </div>
    );
}
