// src/components/gracias/AccessSteps.tsx

import React from 'react';
import Link from 'next/link';


interface Step {
    title: string;
    description: React.ReactNode;
}


const stepsData: Step[] = [
    {
        title: 'Revisa tu bandeja de entrada',
        description: 'En los próximos 2-3 minutos, recibirás un correo con el acceso a tu arsenal.',
    },
    {
        title: 'Identifica el objetivo',
        description: (
            <>
                El asunto del correo será:{' '}
                <strong className="font-semibold text-white">
                    &quot;[ACCESO] Tu arsenal de cierre está listo&quot;
                </strong>
                . Búscalo.
            </>
        ),
    },
    {
        title: 'Asegura el acceso',
        description: (
            <>
                Si no lo encuentras, revisa tu carpeta de Spam o Promociones. Si hay
                cualquier problema, contacta al centro de mando:{' '}
                <Link
                    href="mailto:info@hugoherreracoach.com"
                    className="font-semibold text-blue-500 underline transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm"
                >
                    info@hugoherreracoach.com
                </Link>
                .
            </>
        ),
    },
];


const AccessSteps = (): React.ReactElement => {
    return (
        <section className="bg-slate-900 pb-20 lg:pb-24">
            <div className="container mx-auto max-w-4xl px-4">

                {/* Titular de la sección con un gradiente sutil */}
                <h2 className="text-3xl lg:text-4xl font-extrabold text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    Tus Órdenes de Acceso
                </h2>

                {/* Contenedor de la línea de tiempo */}
                <div className="mt-12 sm:mt-16">
                    <ol>
                        {stepsData.map((step, index) => (
                            <li key={index} className="relative flex items-start pb-10 last:pb-0">

                                {/* Línea de tiempo vertical que conecta los pasos */}
                                <div
                                    className="absolute left-5 top-5 -ml-px h-full w-px bg-slate-700/50 hidden last:block sm:block"
                                    aria-hidden="true"
                                />

                                <div className="relative flex-shrink-0">
                                    {/* Círculo numerado con gradiente para destacar */}
                                    <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-lg shadow-md ring-4 ring-slate-900">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Contenido del paso */}
                                <div className="ml-6 sm:ml-8 flex-1">
                                    <h3 className="text-lg lg:text-xl font-bold text-slate-100 uppercase tracking-wider">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-lg lg:text-xl text-slate-400 text-balance">
                                        {step.description}
                                    </p>
                                </div>

                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default AccessSteps;