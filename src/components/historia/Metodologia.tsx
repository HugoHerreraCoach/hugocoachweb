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
        title: 'Liderazgo con Visión',
        description: 'Dejamos atrás al jefe que solo da órdenes. Formamos líderes que dirigen con estrategia, datos y un propósito que inspira.',
    },
    {
        icon: Waypoints,
        title: 'Procesos Claros',
        description: 'Creamos un mapa de ventas tan claro que tu equipo sabe exactamente qué hacer cada día para conseguir resultados predecibles.',
    },
    {
        icon: Users,
        title: 'Cultura de Rendimiento',
        description: 'Construimos un equipo motivado que se sostiene a sí mismo, inmune a los "bajones" de energía y enfocado en la mejora continua.',
    },
];

export const Metodologia = () => {
    return (
        <section className="relative bg-cover bg-top bg-no-repeat bg-fixed py-16 lg:py-24 text-white bg-[linear-gradient(rgba(5,10,20,1),rgba(5,10,20,0.6)),url('/images/espiralBackground.jpg')]">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-7xl mx-auto">
                    {/* Cambiamos el color del texto a blanco para que sea legible sobre el fondo oscuro */}
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-white">
                        Toda esta historia te la cuento por una razón
                    </h2>
                    {/* Ajustamos el color del párrafo a un gris claro para una mejor jerarquía visual */}
                    <p className="mt-6 text-xl lg:text-2xl text-gray-200 leading-[1.4]">
                        Te he contado todo esto porque mi viaje se convirtió en un mapa, y con él, puedo ver exactamente en qué punto del camino te encuentras tú.<br/><br/>
                        Quizás estás en el valle del &quot;esfuerzo sin recompensa&quot; o atrapado en la cima del &quot;éxito que no dura&quot;.<br/><br/>
                        Para ambos casos, la solución no es acumular más técnicas de ventas. La verdadera solución es el <span className="font-bold text-white">sistema</span> que da sentido y poder a esas técnicas.<br/><br/>
                        Todos mis fracasos, revelaciones y aprendizajes están concentrados en una metodología probada que construye ese sistema para ti. Se llama <span className="font-bold text-white">Líder Comercial</span>, y su misión es simple: crear equipos que vendan de forma consistente, no por motivación.
                    </p>
                    <p className="mt-6 text-xl lg:text-2xl text-gray-200 leading-relaxed">
                        Se trata de construir tres pilares fundamentales:
                    </p>
                </div>

                <div className="mt-4 lg:mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {pilares.map((pilar) => (
                        // Los estilos de las tarjetas no necesitan cambios, ya que su fondo blanco crea el contraste necesario.
                        <div key={pilar.title} className="text-center p-6 px-4 bg-[white]/8 backdrop-blur-[12px] rounded-xl shadow-2xl transition-transform hover:scale-105 duration-300">
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