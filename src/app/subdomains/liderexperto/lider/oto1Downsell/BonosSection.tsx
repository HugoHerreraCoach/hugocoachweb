import Image from "next/image"

export default function BonosSection() {
    return (
        <section className="bg-black p-4 text-white flex flex-col justify-center items-center text-center lg:py-14">    
            {/* Primera parte - Qué es el programa */}
            <div className="w-full py-10 flex flex-col items-center">
                {/* Titulo 2 */}
                <div className="flex w-[80%] h-0.5 bg-red-600 mx-auto"></div>
                <h2 className="w-full font-inter font-extrabold text-3xl text-center md:text-4xl lg:text-5xl leading-[1] my-2 md:my-3">
                    Bonos Incluidos
                </h2>
                <div className="w-[80%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>

                {/* Tarjetas bonos */}
                <div className="w-full grid justify-center gap-8 pt-4 grid-cols-[repeat(auto-fit,minmax(250px,300px))] lg:pt-16">
                    <div className={"border-2 flex flex-col justify-center border-dotted rounded-xl p-8 max-w-[300px]"}>
                        <Image 
                            src="/subdomains/liderexperto/lobosDownsell/libroCerradorExperto.jpg"
                            alt="Libro Cerrador Experto"
                            width={600}
                            height={848}
                            className="w-[150px] mx-auto pb-4"
                        />
                        <p className="font-montserrat font-semibold text-xl leading-[1.2] pb-2">
                            Libro digital Cerrador Experto
                        </p>
                    </div>
                    <div className={"border-2 flex flex-col justify-center border-dotted rounded-xl p-8 max-w-[300px]"}>
                        <Image 
                            src="/subdomains/liderexperto/lobosDownsell/comunidadLobos.jpg"
                            alt="Imagen comunidad privada"
                            width={400}
                            height={827}
                            className="w-[100px] mx-auto pb-4"
                        />
                        <p className="font-montserrat font-semibold text-xl leading-[1.2] pb-2">
                            Acceso a comunidad privada en WhatsApp
                        </p>
                    </div>
                    <div className={"border-2 flex flex-col justify-center border-dotted rounded-xl p-8 max-w-[300px]"}>
                        <Image 
                            src="/subdomains/liderexperto/lobosDownsell/certificate.jpg"
                            alt="Certificado Lobos de Ventas"
                            width={600}
                            height={457}
                            className="w-[220px] mx-auto pb-4"
                        />
                        <p className="font-montserrat font-semibold text-xl leading-[1.2] pb-2">
                            Certificado digital Lobos de Ventas
                        </p>
                    </div>
                    <div className={"border-2 flex flex-col justify-center border-dotted rounded-xl p-8 max-w-[300px]"}>
                        <Image 
                            src="/subdomains/liderexperto/lobosDownsell/updatesProgram.jpg"
                            alt="Certificado Lobos de Ventas"
                            width={600}
                            height={600}
                            className="w-[180px] mx-auto pb-4"
                        />
                        <p className="font-montserrat font-semibold text-xl leading-[1.2] pb-2">
                            Actualizaciones de por vida
                        </p>
                    </div>

                </div>
                
            </div>
        </section>
    )
}
