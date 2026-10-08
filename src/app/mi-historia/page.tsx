import { Metadata } from 'next';
import { HeroHistoria } from '@/components/historia/HeroHistoria';
import { FrustracionCompartida } from '@/components/historia/FrustracionCompartida';
import { LaBusquedaDelSecreto } from '@/components/historia/LaBusquedaDelSecreto';
import { PrimerosClientes } from '@/components/historia/PrimerosClientes';
import { PuntoDeInflexion } from '@/components/historia/PuntoDeInflexion';
import { DeLaTeoriaALaTrinchera } from '@/components/historia/DeLaTeoriaALaTrinchera';
import { Trayectoria } from '@/components/historia/Trayectoria';
import { Metodologia } from '@/components/historia/Metodologia';
import { CtaHistoria } from '@/components/historia/CtaHistoria';

// Metadatos para SEO
export const metadata: Metadata = {
    title: 'Mi historia | Hugo Herrera',
    description: 'Fracasé en cinco intentos antes de aprender a vender. Esta es mi historia, desde Cajamarca hasta eventos de miles de personas.',
};

const MiHistoriaPage = () => {
    return (
        <main>
            <HeroHistoria />
            <FrustracionCompartida />
            <LaBusquedaDelSecreto />
            <PrimerosClientes />
            <PuntoDeInflexion />
            <DeLaTeoriaALaTrinchera />
            <Trayectoria />
            <Metodologia />
            <CtaHistoria />
        </main>
    );
};

export default MiHistoriaPage;