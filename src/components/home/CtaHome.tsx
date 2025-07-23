import Link from "next/link";


export default function CtaHome() {
    return (
        <section
            // Contenedor principal con posicionamiento relativo y contexto de apilamiento
            className="relative isolate py-20 
                 bg-[url('/images/ctaBackground.jpg')] bg-cover bg-top bg-fixed"
        >
            <div
                className="absolute inset-0 bg-black/75 -z-10"
                aria-hidden="true"
            />

            <div className="container mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-white">
                    Es hora de construir un motor que venda por ti.
                </h2>
                <p className="mt-6 text-lg sm:text-xl text-white font-[var(--font-barlow-condensed)] max-w-3xl mx-auto">
                    La diferencia entre un negocio estancado y uno que escala es la decisión de implementar un sistema.<br/><br/> En 45 minutos, te damos el plan para lograrlo.
                </p>
                <Link
                    href="https://calendly.com/hugoherrera-coach/agendar-videollamada"
                    target="_blank"
                    className="mt-8 inline-block bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] text-white font-[700] py-4 px-10 rounded-full hover:bg-gradient-to-r hover:from-[#0F172A] hover:to-[#1E3A8A] hover:scale-105 transition-all duration-300 shadow-lg"
                >
                    SÍ, QUIERO SER UN CASO DE ÉXITO
                </Link>
            </div>
        </section>
    );
}