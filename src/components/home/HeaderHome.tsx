import Image from 'next/image';
import Link from 'next/link';


export default function HeaderHome() {

    return (
        <section className="relative min-h-[91vh] bg-gradient-to-tr from-[#01081b] to-[#113699] overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/hugoHeader.png"
                    alt="Hugo Herrera"
                    width={1000}
                    height={1500}
                    className="object-contain w-[100vw] max-w-[700px] mx-auto"
                    priority
                    quality={80}
                />
            </div>
            <div className="absolute bottom-8 left-0 right-0 ml-4 mr-4 md:mx-auto text-center px-4 lg:px-6 z-10 max-w-5xl bg-[white]/10 backdrop-blur-[12px] rounded-xl py-6">
                <h1 className="text-3xl md:text-5xl font-bold leading-[1] tracking-tight text-white">
                    Tus ventas no necesitan más esfuerzo. <br /> Necesitan un sistema.
                </h1>
                <p className='text-white text-xl lg:text-2xl py-4'>En una sesión gratuita, creamos una estrategia a medida para que tu negocio crezca.</p>
                <Link
                    href="https://calendly.com/hugoherrera-coach/agendar-videollamada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] text-white font-bold py-4 px-10 rounded-full hover:bg-gradient-to-r hover:from-[#0F172A] hover:to-[#1E3A8A] hover:scale-105 transition-all duration-300 shadow-lg"
                >
                    QUIERO MI PLAN DE ACCIÓN
                </Link>
            </div>
        </section>
    )
}