// src/components/coaching/FilterSection.tsx

import { CheckCircle2, XCircle } from 'lucide-react';

/**
 * Componente para la Sección 7: Filtro de Audiencia.
 * Su propósito es calificar al prospecto, aumentar la percepción de exclusividad
 * y asegurar que solo los candidatos correctos agenden la sesión.
 */

// Listas de características para mantener el código limpio y escalable.
const idealTraits = [
    "Estás decidido a ser el #1 de tu equipo.",
    "Tratas tus comisiones como un negocio, no como un sueldo.",
    "Estás listo para dejar de improvisar y seguir un sistema.",
    "Inviertes en tus habilidades para multiplicar tus ingresos.",
];

const nonIdealTraits = [
    "Te conformas con solo cumplir la cuota.",
    "Culpas a la economía o al cliente por no cerrar.",
    "Buscas un truco mágico en lugar de una estructura.",
    "Crees que ya lo sabes todo sobre ventas.",
];

export default function FilterSection() {
    return (
        <section className="bg-slate-900 text-white py-20 lg:py-28">
            <div className="container mx-auto max-w-6xl px-4">
                {/* Encabezado de la sección */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight lg:text-5xl text-balance">
                        Esta sesión es para cerradores, no para aficionados.
                    </h2>
                </div>

                {/* Contenedor de las dos columnas */}
                <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">

                    {/* Columna "Para ti" */}
                    <div className="rounded-2xl bg-green-500/5 p-8 ring-1 ring-inset ring-green-500/30">
                        <h3 className="text-2xl font-semibold text-white">Esto es para ti si:</h3>
                        <ul className="mt-6 space-y-4">
                            {idealTraits.map((trait, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-400 mt-1" />
                                    <span className="text-xl text-slate-300">{trait}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna "No para ti" */}
                    <div className="rounded-2xl bg-red-500/5 p-8 ring-1 ring-inset ring-red-500/30">
                        <h3 className="text-2xl font-semibold text-white">Esto NO es para ti si:</h3>
                        <ul className="mt-6 space-y-4">
                            {nonIdealTraits.map((trait, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <XCircle className="h-6 w-6 flex-shrink-0 text-red-400 mt-1" />
                                    <span className="text-xl text-slate-300">{trait}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
