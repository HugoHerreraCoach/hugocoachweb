"use client"
import Image from "next/image"
import Link from "next/link"

export default function Biography() {
    return (
        <section className="bg-[#fafafa] px-4 md:px-2 lg:px-2 py-8 pt-16">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Columna izquierda - Contenido */}
                    <div className="flex flex-col items-center space-y-6">
                        {/* Nombre */}
                        <div className="bg-gradient-to-r w-[90%] max-w-xl justify-self-center from-red-500 to-red-900 rounded-lg px-4 py-2 text-center">
                            <h3 className="text-lg md:text-xl font-inter font-medium text-white">Soy Hugo Herrera</h3>
                        </div>

                        {/* Foto - Solo en móvil */}
                        <div className="lg:hidden rounded-2xl flex justify-center">
                            <div className="relative rounded-xl overflow-hidden">
                                <Image
                                    src="/subdomains/liderexperto/preventa/hugo1.jpg"
                                    alt="Hugo Herrera"
                                    width={500}
                                    height={500}
                                    priority
                                    className="object-cover grayscale"
                                />
                            </div>
                        </div>

                        {/* Texto descriptivo */}
                        <div className="space-y-4 text-white">
                            <p className="font-montserrat font-medium text-xl leading-[1.3] text-black">
                                Y llevo más de{" "} <span className="font-bold">7 años</span> entrenando equipos comerciales en
                                distintas industrias: {" "} <span className="font-bold italic">inmobiliarias, redes de mercadeo, productos físicos, tiendas digitales, finanzas,
                                    tecnológicas y más.</span>
                            </p>

                            <div className="lg:hidden rounded-2xl flex justify-center">
                            <div className="relative rounded-xl overflow-hidden">
                                <Image
                                    src="/subdomains/liderexperto/preventa/hugo2.jpg"
                                    alt="Hugo Herrera"
                                    width={600}
                                    height={376}
                                    priority
                                />
                            </div>
                        </div>

                            <p className="font-montserrat font-medium text-xl leading-[1.3] text-black">
                                He trabajado con empresas en Perú, Latinoamérica y también en Estados Unidos. Y aunque cada lugar es
                                distinto, hay un patrón que se repite:{" "}
                                    dueños de negocio que saben que su equipo tiene potencial... pero {" "}<span className="font-bold"> las ventas siguen siendo
                                    inconsistentes.
                                </span>
                            </p>

                            <p className="font-montserrat font-medium text-xl leading-[1.3] text-black">
                                En ese camino, me encontré con una verdad que cambió por completo mi forma de trabajar.
                                Una pieza clave que la mayoría no ve y que marca la
                                diferencia entre un equipo que sobrevive... y uno que crece de forma constante.
                            </p>

                            <p className="font-montserrat font-medium text-xl leading-[1.3] text-black">
                                Justo eso es lo que te quiero mostrar en el video.
                            </p>
                        </div>

                        {/* Botón de llamada a la acción */}
                        <Link href="#descubre" className="flex items-center justify-center font-barlow-condensed font-bold text-2xl md:text-3xl p-4 px-8 md:px-10 bg-green-600 border-b-6 border-[#00960B] hover:bg-green-700 text-white rounded-lg cursor-pointer">
                            VER VIDEO AHORA MISMO
                            <Image 
                                src="/subdomains/liderexperto/preventa/arrowRightIcon.png"
                                alt="Icono derecha"
                                width={80}
                                height={80}
                                className="w-6 md:w-8 ml-2 mt-[2px]"
                            />
                        </Link>
                    </div>

                    {/* Columna derecha - Foto (solo en desktop y tablet) */}
                    <div className="hidden md:flex justify-center items-center w-full max-w-md mx-auto">
                        <div className="rounded-xl overflow-hidden">
                            <Image
                                src="/subdomains/liderexperto/preventa/hugo1.jpg"
                                width={500}
                                height={500}
                                alt="Hugo Herrera"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
