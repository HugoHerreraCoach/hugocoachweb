"use client"
import { Volume2, Star } from "lucide-react"
import YoutubePlayer from "@liderexperto/components/YoutubePlayer"
import Image from "next/image"
import TwoStepCheckoutForm from "@liderexperto/components/TwoStepCheckoutForm"
import WaitingListForm from "@liderexperto/components/WaitingListForm"

// --- CONTROL DE STOCK ---
// Cambia este valor a `false` cuando se agote el stock de libros.
// `true` = Muestra el formulario de compra.
// `false` = Muestra el formulario de lista de espera.
const hasStock = false
export default function LeaderExpertSection() {
    return (
        <section className="bg-white">
            <div className="flex flex-col justify-center">

                {/* Cabecera */}
                <div className={`bg-black text-white px-4 py-4 border-b-6 ${hasStock ? 'border-red-700' : 'border-gray-800'} md:px-24`}>
                    <div className="flex justify-between items-center max-w-[1340px] mx-auto">
                        <Image
                            src="/subdomains/liderexperto/venta/logoLiderExperto.jpg"
                            alt="Líder Experto Logo"
                            width={200}
                            height={117}
                            className="w-20"
                        />
                        <span className="font-monsterrat text-lg font-normal md:text-xl">
                            {hasStock ? '¡Pocas copias disponibles!' : '¡Stock Agotado!'}
                        </span>
                    </div>
                </div>

                {/* Titulos */}
                <div className="flex flex-col items-center mt-4 p-2 text-center space-y-6 justify-center max-w-[1280px] mx-auto">
                    <p className="font-montserrat font-semibold text-lg mb-4 p-2 text-black leading-[1.2] bg-[#FFEDED] max-w-250 md:text-3xl">
                        Tu copia <span className="underline ">GRATUITA </span> de &quot;Líder Experto&quot; te espera.
                    </p>
                    <h1 className="font-monserrat text-3xl font-black text-black leading-[1.2] mb-2 md:text-5xl md:mb-8">
                        &quot;¡Genera ventas predecibles y constantes... sin que todo <span className="underline">dependa de ti</span>!&quot;
                    </h1>
                </div>


                <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto md:gap-4">
                    {/* Contenido principal Izquierda */}
                    <div className="w-full lg:w-[65%] p-4">
                        <div className="flex items-center text-center justify-center mb-2">
                            <div className="flex justify-center items-center mb-0 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="font-barlow text-lg font-medium md:text-2xl leading-[1.1] text-black">
                                4.9 - 187 Calificaciones
                            </p>
                        </div>

                        {/* Referencia de sonido */}
                        <div className="bg-red-600 text-white px-4 py-2 flex justify-center items-center">
                            <Volume2 className="w-7 h-7 flex-shrink-0 mr-2" />
                            <p className="font-barlow-condensed text-lg font-semibold leading-[1.2] text-center md:text-2xl">
                                Asegúrate que el sonido esté activado
                            </p>
                        </div>


                        {/* Video Section */}
                        <YoutubePlayer
                            videoId="OJVj7boMXIw"  
                            thumbnailUrl="/subdomains/liderexperto/venta/bonusMockup3.png" 
                        />


                        <div 
                            style={{
                                clipPath: 'polygon(0% 0%, calc(100% - 40px) 0%, 100% 50%, calc(100% - 40px) 100%, 0% 100%)',
                            }}
                            className="bg-[#2375ED] hidden lg:flex rounded-tl-3xl rounded-bl-3xl items-center justify-center pr-6 py-6 mt-6">
                            <Image
                                src="/subdomains/liderexperto/venta/bonusMockup3.png"
                                alt="Mockup Libro"
                                width={700}
                                height={298}
                                className="ml-2 mr-2 w-[30%]"
                            />
                            <p className="text-white font-barlow font-semibold text-4xl text-center leading-[1]">
                                ¡Pide Tu<span className="font-extrabold"> LIBRO GRATIS </span>Hoy!<br/>
                                <span className="font-medium text-xl">Solo cubre el envío: S/19 en todo el Perú</span>
                            </p>  
                        </div>

                        <div className="pt-4 pb-0 text-center">
                            <p className="font-barlow-condensed text-xl leading-[1.2] md:text-3xl text-black">
                                Líder Experto te enseña a construir un sistema comercial<span className="font-bold underline"> que genere resultados predecibles </span>— incluso cuando tú no estés presionando, incluso cuando tu equipo no esté motivado, incluso cuando el mercado esté difícil.
                            </p>
                        </div>
                    </div>


                    {/* Formulario Derecha*/}
                    <div className="w-full max-w-[700px] mx-auto lg:w-[35%] p-4 lg:p-0">
                        {/* Etiqueta encima del formulario*/}
                        {hasStock ? (
                            <>
                                <div className="relative inline-block mb-4 w-full" id="form">
                                    <p className="font-montserrat font-semibold text-white py-4 px-2 text-2xl bg-gradient-to-r from-[#E40200] to-[#7E0100] text-center leading-[1.1]">
                                        ¡RECLAMA TU <span className="font-extrabold underline decoration-2">LIBRO GRATIS!</span><br />
                                        <span className="font-medium text-base pt-2 leading-[1.1] inline-block">+ 5 Bonos valorados en <span className="line-through">S/315</span> ¡GRATIS!</span>
                                    </p>
                                    <div className={`absolute w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#E40200] left-[20px] top-[100%]`}></div>
                                </div>
                                <TwoStepCheckoutForm />
                            </>
                        ) : (
                            <>
                                <div className="relative inline-block mb-4 w-full" id="form">
                                    <p className="font-montserrat font-semibold text-white py-4 px-2 text-2xl bg-gray-800 text-center leading-[1.1]">
                                        <span className="font-extrabold">¡STOCK AGOTADO!</span><br />
                                        <span className="font-medium text-base pt-2 leading-[1.1] inline-block">Únete a la lista de espera y sé el primero en saber cuándo volverá.</span>
                                    </p>
                                    <div className={`absolute w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-gray-800 left-[20px] top-[100%]`}></div>
                                </div>
                                <WaitingListForm />
                            </>
                        )}
                    </div>


                </div>

            </div>
        </section>
    )
}