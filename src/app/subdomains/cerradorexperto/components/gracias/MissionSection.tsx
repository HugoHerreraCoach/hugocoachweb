// src/components/gracias/MissionSection.tsx

import {
    AudioWaveform,
    FolderSearch,
    CirclePlay, // Usamos CirclePlay para mayor consistencia visual
    type LucideProps,
} from 'lucide-react';
import React from 'react';


interface MissionStep {
    // Usamos React.ElementType para poder pasar componentes de ícono como props.
    icon: React.ElementType<LucideProps>;
    description: React.ReactNode;
}

const missionData: MissionStep[] = [
    {
        icon: FolderSearch,
        description: (
            <>
                Busca el{' '}
                <span className="font-bold text-green-300">
                    Bono #5: &quot;Afirmaciones del Cerrador Experto&quot;
                </span>
                .
            </>
        ),
    },
    {
        icon: AudioWaveform,
        description: 'Es un audio de 7 minutos diseñado para anclar una mentalidad ganadora.',
    },
    {
        icon: CirclePlay,
        description: (
            <>
                Escúchalo <strong className="font-semibold text-cyan-300">ahora</strong>. Y
                escúchalo mañana antes de tu primera reunión. Es la base sobre la que
                funciona todo lo demás.
            </>
        ),
    },
];


const MissionSection = (): React.ReactElement => {
    return (
        <section className="bg-slate-900 pb-20 sm:pb-24">
            <div className="container mx-auto px-4 text-center">

                {/* Titular de la Misión, manteniendo el excelente diseño original */}
                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                    Tu primera misión es simple
                </h2>

                {/* Párrafo de Contexto Estratégico */}
                <p className="mt-4 text-xl lg:text-2xl text-slate-300 mx-auto text-balance">
                    El cierre es 80% mentalidad y 20% técnica. Un guion perfecto dicho con la mentalidad incorrecta, fracasa.
                </p>

                {/* Contenedor de la tarjeta de misión con borde gradiente */}
                <div className="mt-10 text-left max-w-4xl mx-auto">
                    <div className="rounded-2xl bg-gradient-to-br from-green-400/80 via-cyan-400/80 to-blue-600/80 p-px shadow-2xl shadow-cyan-500/10">
                        <div className="rounded-[15px] bg-slate-900/80 p-6 backdrop-blur-sm sm:p-8">

                            <p className="text-xl lg:text-2xl font-semibold text-white mb-6">
                                Antes de aprender cualquier táctica, la primera orden es esta:
                            </p>

                            <ul className="space-y-6">
                                {missionData.map((step, index) => {
                                    const IconComponent = step.icon;
                                    return (
                                        <li key={index} className="flex items-start gap-4">

                                            {/* Contenedor de ícono para unificar el estilo */}
                                            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                                                <IconComponent
                                                    className="h-5 w-5 text-cyan-400"
                                                    aria-hidden="true"
                                                />
                                            </div>

                                            {/* Descripción del paso */}
                                            <span className="text-xl lg:text-2xl text-slate-300 pt-1.5">
                                                {step.description}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;