import { Video, Presentation } from 'lucide-react';
import type { ReactNode } from 'react';

// 1. Tipado Estricto con TypeScript para el objeto de modalidad.
type Modality = {
    // Usamos 'ReactNode' para permitir JSX en el icono y la descripción.
    icon: ReactNode;
    title: string;
    description: ReactNode;
};

// 2. La data se define fuera del componente para evitar su redeclaración.
const modalities: Modality[] = [
    {
        icon: <Video className="h-7 w-7 text-white" />,
        title: 'Ejecución Remota',
        description: (
            <>
                Perfecto para equipos distribuidos o para no frenar el ritmo de ventas. <b>Dividimos el sistema en 4 sesiones de 2 horas.</b> Este formato permite que el equipo aplique lo aprendido entre cada bloque, consolidando el método en el campo de batalla real.
            </>
        ),
    },
    {
        icon: <Presentation className="h-7 w-7 text-white" />,
        title: 'Inmersión Estratégica',
        description: (
            <>
                Concentramos toda la transformación en <b>una jornada intensiva de 8 horas en tus oficinas.</b> Es la ruta más directa para estandarizar el proceso, alinear la visión del equipo y provocar un cambio de resultados inmediato.
            </>
        ),
    },
];

export function ModalitiesSection() {
    return (
        // 3. Eliminamos el 'style' y gestionamos todo con clases de Tailwind.
        <section
            className="relative w-full py-20 sm:py-28 
                       bg-cover bg-center 
                       bg-[url('/images/equipos/modalitySection.jpg')] 
                       bg-scroll md:bg-fixed" // <-- AQUÍ LA SOLUCIÓN
        >
            {/* Capa de superposición oscura para la legibilidad del texto */}
            <div className="absolute inset-0 bg-black/60 z-0" aria-hidden="true" />

            {/* Contenedor del contenido */}
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                        Elige la ruta de ejecución para tu equipo.
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-200 mx-auto text-balance">
                        El sistema y el resultado son los mismos. He diseñado dos formatos para que el entrenamiento se integre a tu operación con la mínima fricción y el máximo impacto.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 max-w-5xl mx-auto md:grid-cols-2">
                    {modalities.map((modality) => (
                        <div
                            key={modality.title}
                            className="rounded-2xl border border-white/20 bg-white/5 p-8 shadow-lg backdrop-blur-lg transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/30">
                                    {modality.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white">{modality.title}</h3>
                            </div>
                            <p className="mt-6 text-lg text-slate-200 leading-[1.4]">
                                {modality.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}