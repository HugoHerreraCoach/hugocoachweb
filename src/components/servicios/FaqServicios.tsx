// src/components/servicios/FaqServicios.tsx
// Dudas de quien compara servicios. Todo sale del catálogo y de las constantes de precios.

import { FaqLista, type PreguntaFaq } from '@/components/ui/FaqLista';
import {
    EQUIPO,
    FULL_DAY_MAX_PERSONAS,
    PRECIOS,
    SESION_ENTRENAMIENTO_MAX_PERSONAS,
    formatUsd,
} from '@/lib/precios-servicios';
import { TODO_INCLUIDO, serviciosEmpresas } from '@/lib/servicios';

const sesion = serviciosEmpresas.find((s) => s.id === 'sesion-estrategica');
const programa = serviciosEmpresas.find((s) => s.id === 'aceleracion-comercial');
const abono = sesion?.incluye.find((texto) => texto.toLowerCase().includes('abona'));

const preguntas: PreguntaFaq[] = [
    {
        pregunta: '¿Cuál me conviene si no sé por dónde empezar?',
        respuesta: `Agenda la llamada gratis de 20 minutos: un asesor de mi equipo te escucha y te recomienda un servicio. Si prefieres un plan claro antes de decidir, la Sesión Estratégica (${formatUsd(PRECIOS.sesionEstrategica)}, 2 horas por videollamada) es el primer paso.${abono ? ` ${abono}.` : ''}`,
    },
    {
        pregunta: '¿Para qué sirve la Sesión Estratégica?',
        respuesta: `Son 2 horas en vivo conmigo, por videollamada. Puede ser una consultoría para el dueño o gerente de un negocio (revisamos cómo vendes y te llevas un plan con pasos) o un entrenamiento rápido para tu equipo, de hasta ${SESION_ENTRENAMIENTO_MAX_PERSONAS} personas. Lo defines al agendar o en la llamada gratis.`,
    },
    {
        pregunta: '¿Qué significa "todo incluido"?',
        respuesta: `${TODO_INCLUIDO} En el Taller Full Day, tú pones la sala y los equipos.`,
    },
    {
        pregunta: '¿Es presencial o por videollamada?',
        respuesta: `La Sesión Estratégica es virtual, por videollamada (presencial solo si estás en Cajamarca). El Coaching para Equipos son 4 sesiones por videollamada. El Taller Full Day, la Conferencia y la Aceleración Comercial son en tu empresa o en tu ciudad. La Conferencia también existe en versión virtual (${formatUsd(PRECIOS.conferenciaVirtual)}).`,
    },
    {
        pregunta: '¿El precio cambia según el tamaño del equipo?',
        respuesta: `En el Coaching para Equipos no: es fijo para ${EQUIPO.min} a ${EQUIPO.max} personas (${formatUsd(PRECIOS.coachingEquipos)}). El Taller Full Day es para hasta ${FULL_DAY_MAX_PERSONAS} personas; si son más, lo cotizamos. El entrenamiento rápido de la Sesión Estratégica es para hasta ${SESION_ENTRENAMIENTO_MAX_PERSONAS}.`,
    },
    {
        pregunta: '¿Cómo funciona la garantía?',
        respuesta: `Solo aplica a la Aceleración Comercial. ${programa?.garantia ?? ''} Las condiciones van por contrato.`,
    },
];

export function FaqServicios() {
    return (
        <section className="w-full bg-black py-14 lg:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">Preguntas frecuentes</p>
                <h2 className="mt-3 max-w-3xl text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
                    Antes de elegir, esto es lo que suelen preguntar.
                </h2>
                <FaqLista preguntas={preguntas} className="mt-8 max-w-4xl lg:mt-12" />
            </div>
        </section>
    );
}
