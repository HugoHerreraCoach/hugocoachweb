import { AnimatedStep, StyleInjector } from "../ui/AnimatedStep"

// Definimos un tipo para la forma de nuestros objetos 'step'
type ProcessStep = {
    title: string;
    description: string;
};

export default function ProcessHome() {
    const processSteps: ProcessStep[] = [
  {
    title: 'Diagnóstico de Crecimiento',
    description: 'Analizamos tu operación para encontrar cuellos de botella y te entregamos una hoja de ruta clara para escalar tus resultados.',
  },
  {
    title: 'Construcción de tu Motor de Ventas',
    description: 'Creamos los guiones, procesos y KPIs a medida para un equipo de ventas que consigue resultados predecibles y de alto impacto.',
  },
  {
    title: 'Activación y Dominio del Sistema',
    description: 'Equipamos y entrenamos a tu equipo para que dominen el sistema, permitiéndoles escalar los resultados con completa autonomía.',
  },
];

    return (
        <>
            {/* Inyectamos los estilos de animación en el DOM */}
            <StyleInjector />
            <section className="bg-white py-16 lg:py-20 text-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center lg:text-5xl">
                        Tu Proceso de Transformación
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-center text-xl lg:text-2xl text-slate-600">
                        El método probado para escalar tus ventas de forma predecible y estructurada.
                    </p>

                    <div className="mt-8 lg:mt-12 grid grid-cols-1 gap-8 lg:gap-16 md:grid-cols-3">
                        {processSteps.map((step, index) => (
                            <AnimatedStep
                                key={step.title}
                                index={index}
                                title={step.title}
                                description={step.description}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}