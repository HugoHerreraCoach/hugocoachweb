import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const CALENDLY_URL: string = 'https://calendly.com/hugoherrera-coach/agendar-videollamada';

export function HeroSection(): React.ReactElement {
    return (
        <section className="relative bg-black text-white flex justify-center items-center min-h-[91vh] text-center py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.2)] z-10" />
            <Image
                src="/images/empresas/empresasHeader.jpg" 
                alt="Hugo Herrera, fundador de Líder Experto"
                fill={true}
                className="object-cover opacity-50 object-[48%_50%] md:object-center"
                priority
            />

            <div className="max-w-7xl px-4 -mt-10 relative z-20">
                <h1 className="text-4xl font-bold tracking-tight leading-[1.2] text-white lg:text-6xl text-balance">
                    Deja de ser el mejor vendedor de tu empresa.
                </h1>
                <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-300 text-balance">
                    Te ayudo a instalar el sistema <span className='font-bold text-white'>Líder Experto</span>: un motor comercial a medida para que tu negocio escale sin depender de ti.
                </p>
                <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-x-6">
                    <Link
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 text-lg lg:text-xl font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
                    >
                        Agendar Diagnóstico Gratuito
                    </Link>
                    <Link href="#como-funciona" className="group text-lg lg:text-xl mt-6 md:mt-0 font-semibold leading-[1.2] text-slate-300 flex items-center gap-x-1">
                        Descubrir cómo <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}