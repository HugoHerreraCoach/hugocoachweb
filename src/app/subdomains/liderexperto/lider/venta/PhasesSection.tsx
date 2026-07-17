import React from 'react';
import Image from 'next/image';

const PhasesSection: React.FC = () => {
    const phases = [
        {
            id: 1,
            title: "Identifica por qué tu equipo no está vendiendo más",
            image: "/subdomains/liderexperto/venta/searchIcon.jpg",
            description: "Antes de mejorar, necesitas saber por qué tu equipo no está vendiendo como debería.",
            bullets: [
                "Identifica los bloqueos ocultos que afectan tus resultados",
                "Descubre si el problema está en el equipo, el sistema o el liderazgo.",
                "Alinea el diagnóstico con acciones que realmente cambien resultados."
            ]
        },
        {
            id: 2,
            title: "Diseña un equipo que sí vende (con el que tienes o desde cero)",
            image: "/subdomains/liderexperto/venta/moreSalesIcon.jpg",
            description: "No necesitas más vendedores. Necesitas a los correctos, con el sistema correcto.",
            bullets: [
                "Cómo definir roles, responsabilidades y compensaciones que den resultados.",
                "Guía práctica para reclutar y seleccionar vendedores que sí encajen con tu negocio.",
                "Qué hacer si tu equipo actual no tiene el perfil ideal (sin tener que despedir de inmediato)."
            ]
        },
        {
            id: 3,
            title: "Mide lo que realmente importa",
            image: "/subdomains/liderexperto/venta/foldersIcon.jpg",
            description: "No puedes liderar lo que no puedes medir. Aprende a medir lo que mueve las ventas y a corregir lo que no funciona.",
            bullets: [
                "Establece metas que tu equipo sí entienda y pueda cumplir.",
                "Usa KPIs simples pero potentes (sin volverte loco con números inútiles).",
                "Aplica un seguimiento diario que no dependa de tu presión constante."
            ]
        },
        {
            id: 4,
            title: "Forma vendedores expertos en solo 30 días",
            image: "/subdomains/liderexperto/venta/calendarIcon.jpg",
            description: "No necesitas más capacitaciones eternas. Solo necesitas enseñar lo correcto, de la forma correcta.",
            bullets: [
                "Diseña un plan de formación continua que no dependa de ti.",
                "Convierte a cualquier vendedor en experto en 30 días.",
                "Enséñales lo que sí necesitan para vender… y descarta lo innecesario."
            ]
        },
        {
            id: 5,
            title: " Herramientas listas para usar",
            image: "/subdomains/liderexperto/venta/toolsIcon.jpg",
            description: "Deja de improvisar. Aquí tienes los recursos que usan los equipos que sí venden.",
            bullets: [
                "Scripts de ventas listos para usar por mensaje, llamada o presencial.",
                "Estructuras para cerrar ventas High Ticket con claridad y confianza.",
                "Herramientas de apoyo que reducen errores y aumentan conversiones."
            ]
        },
        {
            id: 6,
            title: " Lidera con estrategia, no con desgaste",
            image: "/subdomains/liderexperto/venta/leadershipIcon.jpg",
            description: "No necesitas gritar más fuerte. Necesitas crear una cultura que sostenga resultados... incluso sin ti.",
            bullets: [
                "Pasa de jefe a líder: guía con visión, no con correcciones constantes.",
                "Crea una cultura de ventas con creencias, rituales e identidad visual propia.",
                "Aplica sistemas de reconocimiento y comunicación que generan compromiso real."
            ]
        },
        {
            id: 7,
            title: "Implementa tu sistema en solo 24 horas",
            image: "/subdomains/liderexperto/venta/24hoursIcon.jpg",
            description: "No necesitas meses para empezar. Aquí tienes los pasos exactos para aplicar lo aprendido y ver resultados inmediatos.",
            bullets: [
                "Checklist clara para líderes que quieren empezar hoy.",
                "Cómo ajustar si tu equipo no responde como esperabas.",
                "Qué revisar, cómo corregir y cómo evitar retrocesos."
            ]
        }
    ];

    return (        
        <section className='bg-white flex flex-col max-w-[85%] mx-auto lg:grid lg:grid-cols-3 lg:grid-rows-3 lg:gap-10 lg:mb-20'>
            {phases.map((phase, index) => (
                <div key={phase.id} className={`bg-white relative p-4 pl-6 pb-12 border-l-2 border-l-red-500 ml-6 md:pb-16 lg:border-3 lg:border-red-500 lg:p-6 lg:ml-0 lg:rounded-xl ${index===6 ? 'lg:col-start-2' : ''}`}> 

                    {/* Círculo rojo de conexión entre Fases (visible solo para móviles) */}
                    <div className="absolute left-[-12px] top-0 w-6 h-6 bg-red-600 rounded-full border-4 border-gray-300 shadow-md z-10 lg:hidden"></div>
                    
                    {/* Contenido de cada Fase */}
                    <div className='flex flex-col justify-center items-start mt-[-24px] lg:mt-0'>
                        <h3 className='font-barlow-condensed font-bold text-3xl leafing[1.2] text-[#E40200] pb-2'>
                            FASE {phase.id}: <span className='text-black'>{phase.title}</span>
                        </h3>
                        <Image 
                            src={phase.image}
                            alt={`Fase ${phase.id} icon`}
                            width={150}
                            height={150}
                            className='w-[90px] py-4 mx-auto md:w-[100px]'
                        />
                        <p className='font-inter font-medium text-xl py-4 pt-2 leading-[1.2] text-black'>
                            {phase.description}
                        </p>
                        <ul className='list-disc list-outside pl-6 space-y-4 font-inter font-medium text-xl text-black'>
                            {phase.bullets.map((bullet, index) => (
                                <li key={index}>{bullet}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Línea horizontal final para la fase 7 */}
                    {index === phases.length - 1 && (
                        <div className="absolute ml-[-24px] bottom-0 w-full h-0.5 bg-red-600 lg:hidden"></div>
                    )}
                </div>   
            ))}
            
            {/* Texto final (después de las Fases) */}
            <p className="font-inter font-medium text-xl pl-6 pt-8 mb-0 md:text-2xl lg:col-span-3 lg:pt-2 lg:text-center lg:leading-[1] text-black">
                Este no es un libro para leer y olvidar.<br/><br/>
                Es una herramienta práctica para transformar tu equipo y liberar tu tiempo.<br/><br/>
                Si lo aplicas, no solo lograrás que vendan más... lograrás que funcionen sin depender de ti.
            </p>
            <a 
                className="bg-[#2375ED] hover:bg-blue-600 p-4 rounded-xl mx-auto text-center my-4 mb-10 col-span-3 text-white font-barlow font-extrabold text-2xl md:text-3xl leading-[1]"
                href="#form"
            >
                ¡OBTENER UNA COPIA GRATUITA! <br />
                <span className="font-barlow-condensed font-normal text-lg">¡Sí! ¡Quiero este Libro GRATIS!</span>
            </a>
        </section>
    );
};

export default PhasesSection;