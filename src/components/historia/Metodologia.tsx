// app/components/Metodologia.tsx

import { Briefcase, Users, Waypoints, type LucideIcon } from 'lucide-react';

// Definimos un tipo explícito para los pilares para asegurar la consistencia de los datos.
type Pilar = {
    icon: LucideIcon;
    title: string;
    description: string;
};

const pilares: Pilar[] = [
    {
        icon: Briefcase,
        title: 'Líderes que dirigen',
        description: 'Pasamos del jefe que solo da órdenes al líder que dirige con un plan, números claros y un propósito.',
    },
    {
        icon: Waypoints,
        title: 'Un camino claro de venta',
        description: 'Un mapa de ventas tan claro que tu equipo sabe qué hacer cada día.',
    },
    {
        icon: Users,
        title: 'Un equipo que se sostiene solo',
        description: 'Un equipo motivado que no depende de una charla. Mejora semana a semana.',
    },
];

export const Metodologia = () => {
    return (
        <section
            className="relative bg-cover bg-top bg-no-repeat py-16 lg:py-24 text-white 
                       bg-[linear-gradient(rgba(5,10,20,1),rgba(5,10,20,0.6)),url('/images/historia/espiralBackground.jpg')] 
                       bg-scroll md:bg-fixed" // <-- CAMBIO APLICADO AQUÍ
        >
            <div className="container mx-auto px-4">
                <div className="text-center max-w-7xl mx-auto">
                    {/* Cambiamos el color del texto a blanco para que sea legible sobre el fondo oscuro */}
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#4d8bff]">Capítulo 7</p>
                    <h2 className="mt-3 text-3xl lg:text-5xl font-extrabold text-white text-balance">
                        Todo lo que aprendí, ahora al servicio de tu equipo.
                    </h2>
                    {/* Ajustamos el color del párrafo a un gris claro para una mejor jerarquía visual */}
                    <p className="mt-6 text-xl lg:text-2xl text-gray-200 leading-[1.4]">
                        Te conté esto porque mi camino se volvió un mapa. Con él puedo ver en qué punto estás tú.<br /><br />
                        Quizás estás en el valle del &quot;esfuerzo sin recompensa&quot;. O en la cima de un &quot;éxito que no dura&quot;.<br /><br />
                        En los dos casos, la solución no es juntar más técnicas de venta. Es tener un <span className="font-bold text-white">sistema</span> que les dé sentido.<br /><br />
                        Mis fracasos y aprendizajes están en mi método: crear equipos que vendan de forma constante, no por motivación.
                    </p>
                    <p className="mt-6 text-xl lg:text-2xl text-gray-200 leading-relaxed">
                        Se apoya en tres pilares:
                    </p>
                </div>

                <div className="mt-4 lg:mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {pilares.map((pilar) => (
                        // Los estilos de las tarjetas no necesitan cambios, ya que su fondo blanco crea el contraste necesario.
                        <div key={pilar.title} className="text-center p-6 px-4 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl">
                            <pilar.icon className="mx-auto h-16 w-16 lg:h-20 lg:w-20 text-blue-600" strokeWidth={1.5} />
                            <h3 className="mt-2 text-xl lg:text-2xl font-bold text-white text-balance">{pilar.title}</h3>
                            <p className="mt-2 text-lg lg:text-xl leading-[1.3] text-gray-100 text-balance">{pilar.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};