import Image from 'next/image';

const phases = [
        {
            id: 1,
            title: "Psicología del Precio y el Valor",
            image: "/subdomains/liderexperto/pricing/psychologyIcon.jpg",
            alt:"Ícono de psicología",
            bullets: [
                "Cómo se forma el valor percibido en la mente del cliente",
                "Los errores más comunes al definir precios",
                "Cómo identificar cuándo estás cobrando de menos",
            ]
        },
        {
            id: 2,
            title: "La Escalera de Valor",
            image: "/subdomains/liderexperto/pricing/ladderIcon.jpg",
            alt:"Ícono de escalera",
            bullets: [
                "Aprende a escalar desde productos gratuitos hasta premium",
                "Cómo aumentar el ticket promedio de cada cliente",
                "Estructura paso a paso para crear tu propia Value Ladder"
            ]
        },
        {
            id: 3,
            title: "Ofertas Irresistibles",
            image: "/subdomains/liderexperto/pricing/offerIcon.jpg",
            alt:"Ícono de oferta",
            bullets: [
                "La estructura de una oferta irresistible",
                "Urgencia y Escasez aplicada a diferentes tipos de productos",
                "Cómo hacer que el cliente sienta que la oferta es demasiado buena para rechazarla"
            ]
        },
        {
            id: 4,
            title: "Estrategias para Subir Precios sin Fricción",
            image: "/subdomains/liderexperto/pricing/priceIcon.jpg",
            alt:"Ícono de precio",
            bullets: [
                "3 métodos prácticos para aumentar precios",
                "Cómo testear el precio ideal en tu mercado",
                "Qué comunicar antes, durante y después del aumento"
            ]
        },
        {
            id: 5,
            title: "Presentación y Cierre Premium",
            image: "/subdomains/liderexperto/pricing/presentationIcon.jpg",
            alt:"Ícono de presentación",
            bullets: [
                "Cómo presentar tu precio con seguridad",
                "Técnicas de anclaje de precios y guiones de cierre",
                "Cómo responder a las objeciones mas comunes al vender High Ticket"
            ]
        },
];

const temas = [
    {
        id: 1,
        text: <><span className='font-bold'>Subir tus precios</span> sin perder ventas</>,
    },
    {
        id: 2,
        text: <>Justificar tu valor <span className='font-bold'>con estrategia</span>, no con descuentos</>,
    },
    {
        id: 3,
        text: <>Construir <span className='font-bold'>ofertas irresistibles</span></>,
    },
    {
        id: 4,
        text: <>Aplicar una <span className='font-bold'>escalera de valor</span> que multiplique tus ingresos</>,
    },
    {
        id: 5,
        text: <>Presentar precios <span className='font-bold'>con seguridad</span>, incluso si hoy dudas</>,
    },
    {
        id: 6,
        text: <>Dejar de competir por precio… y empezar a <span className='font-bold'>liderar con autoridad</span></>,
    },
]

export default function PricingPhases(){
    
    return (
        <div>
            {/* Temas que aprenderás */}
            <section className="bg-white text-black w-full max-w-[1000px] mx-auto py-10 flex flex-col items-center">
                {/* Titulo 1 */}
                <div className="flex w-[80%] h-0.5 bg-red-600 mx-auto"></div>
                <h2 className="font-inter font-extrabold text-3xl text-center md:text-4xl lg:text-5xl leading-[1] my-2 md:my-3">
                    Temas que aprenderás
                </h2>
                <div className="w-[80%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>

                {/* Bullets Points */}
                <div className="grid lg:grid-cols-2 pb-12 lg:gap-x-8 px-4 md:px-8 lg:pt-12 lg:pb-20">
                    {temas.map((tema) => (
                        <div key={tema.id} className="flex items-start justify-start text-left py-2">
                            <div className="min-w-6 min-h-6 mr-2 pt-[2px] bg-red-600 rounded-full border-4 border-gray-300 shadow-md"></div>
                            <p className="font-montserrat font-medium text-xl md:text-2xl leading-[1.2]">
                                {tema.text}
                            </p>
                        </div>
                    ))}
                </div>
                
                {/* Titulo 2 */}
                <div className="flex w-[80%] h-0.5 bg-red-600 mx-auto"></div>
                <h2 className="font-inter font-extrabold text-3xl text-center md:text-4xl lg:text-5xl leading-[1] my-2 md:my-3">
                    Contenido del Curso
                </h2>
                <div className="w-[80%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>
                
            </section>
            
            {/* Fases */}
            <section className='bg-white text-black flex flex-col max-w-[85%] mb-10 mx-auto lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-10 lg:mb-20'>
                {phases.map((phase) => (
                    <div key={phase.id} className={`relative p-4 pl-6 pb-12 border-l-2 border-l-red-500 ml-6 md:pb-16 lg:border-3 lg:border-red-500 lg:p-6 lg:ml-0 lg:rounded-xl`}> 

                        {/* Círculo rojo de conexión entre Fases (visible solo para móviles) */}
                        <div className="absolute left-[-12px] top-0 w-6 h-6 bg-red-600 rounded-full border-4 border-gray-300 shadow-md z-10 lg:hidden"></div>
                        
                        {/* Contenido de cada Fase */}
                        <div className='flex flex-col justify-center items-start mt-[-24px] lg:mt-0'>
                            <h3 className='font-barlow-condensed font-bold text-3xl leafing[1.2] text-[#E40200] pb-2'>
                                MODULO {phase.id}: <span className='text-black'>{phase.title}</span>
                            </h3>
                            <Image 
                                src={phase.image}
                                alt={phase.alt}
                                width={300}
                                height={300}
                                className='w-[90px] py-4 mx-auto md:w-[100px]'
                            />
                            <ul className='list-disc list-outside pl-6 space-y-4 text-black font-inter font-medium text-xl'>
                                {phase.bullets.map((bullet, index) => (
                                    <li key={index}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    </div>   
                ))}
            </section>
        </div>   
    );
};

