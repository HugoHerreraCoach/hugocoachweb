import Image from "next/image"

const temas = [
    {
        id: 1,
        text: "Conceptos básicos de ventas",
    },
    {
        id: 2,
        text: "Mentalidad y coaching financiero",
    },
    {
        id: 3,
        text: "Embudos y procesos de ventas",
    },
    {
        id: 4,
        text: "8 métodos de prospección para atraer clientes",
    },
    {
        id: 5,
        text: "104 maneras de resolver objeciones",
    },
    {
        id: 6,
        text: "35 estrategias para cerrar ventas con éxito",
    },
    {
        id: 7,
        text: "Maestría en ventas por WhatsApp, llamada, videollamada y presencial",
    },
    {
        id: 8,
        text: "Estrategias avanzadas de seguimiento",
    },
    {
        id: 9,
        text: "Oratoria, modulación de voz, lenguaje corporal y habilidades sociales.",
    },
]

export default function TopicsProgram() {
    return (
        <section className="bg-white p-4 text-black flex flex-col justify-center items-center text-center lg:py-14">
            
            {/* Primera parte - Qué es el programa */}
            <div className="w-full max-w-[1000px] py-10 flex flex-col items-center">
                {/* Titulo 1 */}
                <div className="flex w-[70%] h-0.5 bg-red-600 mx-auto"></div>
                <h2 className="font-inter font-extrabold text-3xl text-center md:text-4xl lg:text-5xl leading-[1] my-2 md:my-3">
                    Temas que aprenderás
                </h2>
                <div className="w-[70%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>

                {/* Bullets Points */}
                <div className="grid lg:grid-cols-2 pb-12 lg:gap-x-8 px-4 md:px-8 lg:pt-12">
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
                <div className="flex w-[90%] h-0.5 bg-red-600 mx-auto"></div>
                <h2 className="w-full font-inter font-extrabold text-3xl text-center md:text-4xl lg:text-5xl leading-[1] my-2 md:my-3">
                    Talleres en Vivo y Acompañamiento
                </h2>
                <div className="w-[90%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>

                {/* Tarjetas */}
                <div className="w-full grid justify-items-center gap-8 md:grid-cols-2 md:pt-4 lg:pt-12">
                    <div className={`border-1 rounded-xl p-8 max-w-[350px]`}>
                        <Image 
                            src="/subdomains/liderexperto/lobosDownsell/talleresIcon.jpg"
                            alt="Talleres Lobos de Ventas"
                            width={450}
                            height={450}
                            className="w-[100px] mx-auto pb-2"
                        />
                        <p className="font-montserrat font-bold text-xl leading-[1.2] pb-2">
                            Talleres grupales en vivo cada 15 días: 
                        </p>
                        <p className="font-montserrat font-medium text-xl leading-[1.2]">
                            Interactúa directamente conmigo y otros expertos para resolver dudas y practicar ventas reales.
                        </p>
                    </div>
                    <div className={`border-1 rounded-xl p-8 max-w-[350px]`}>
                        <Image 
                            src="/subdomains/liderexperto/lobosDownsell/accompanimentIcon.jpg"
                            alt="Acompañamiento por Whastapp"
                            width={450}
                            height={450}
                            className="w-[100px] mx-auto pb-2"
                        />
                        <p className="font-montserrat font-bold text-xl leading-[1.2] pb-2">
                            Acompañamiento por WhatsApp durante 30 días: 
                        </p>
                        <p className="font-montserrat font-medium text-xl leading-[1.2]">
                            Recibe soporte personalizado para implementar lo aprendido.
                        </p>
                    </div>
                </div>
                
            </div>
        </section>
    )
}
