// src/components/home/FaqHome.tsx
// Respuestas a las dudas que frenan la compra. Precios y garantía salen de las constantes del sitio.

import { FaqLista, type PreguntaFaq } from '@/components/ui/FaqLista';
import { EQUIPO, PRECIOS, formatUsd } from '@/lib/precios-servicios';

const preguntas: PreguntaFaq[] = [
    {
        pregunta: '¿La llamada gratis es con Hugo?',
        respuesta:
            'Es con un asesor de mi equipo. Te escucha, te dice qué servicio te conviene y cuánto cuesta. Sin compromiso.',
    },
    {
        pregunta: '¿Trabajan fuera de Cajamarca?',
        respuesta:
            'Sí. Voy a tu empresa en cualquier ciudad del Perú. El precio incluye honorarios, pasajes y hospedaje; en zonas de difícil acceso se cotiza aparte.',
    },
    {
        pregunta: '¿Qué pasa si no funciona?',
        respuesta:
            'En Aceleración Comercial hay garantía: si la facturación de tu equipo comercial no sube al menos 10% en los 90 días después de la inmersión, te devolvemos el 100% de lo que pagaste por el programa. Las condiciones van por contrato.',
    },
    {
        pregunta: '¿Cuánto cuesta?',
        respuesta: `Desde ${formatUsd(PRECIOS.sesionEstrategica)} (sesión virtual de 2 horas) hasta ${formatUsd(PRECIOS.programaAceleracion)} (programa completo). Ves todo en la página de servicios.`,
    },
    {
        pregunta: '¿Y si mi equipo es pequeño?',
        respuesta: `El coaching para equipos es para grupos de ${EQUIPO.min} a ${EQUIPO.max} personas, a ${formatUsd(PRECIOS.coachingEquipos)} sin importar el tamaño.`,
    },
];

export default function FaqHome() {
    return (
        <section className="bg-black py-14 lg:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">Preguntas frecuentes</p>
                <h2 className="mt-3 max-w-3xl text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
                    Antes de agendar, esto es lo que suelen preguntar.
                </h2>

                <FaqLista preguntas={preguntas} className="mt-8 max-w-4xl lg:mt-12" />
            </div>
        </section>
    );
}
