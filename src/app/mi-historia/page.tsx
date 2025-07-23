import { Metadata } from 'next';
import { HeroHistoria } from '@/components/historia/HeroHistoria';
import { FrustracionCompartida } from '@/components/historia/FrustracionCompartida';
import { LaBusquedaDelSecreto } from '@/components/historia/LaBusquedaDelSecreto';
import { PrimerosClientes } from '@/components/historia/PrimerosClientes';
import { PuntoDeInflexion } from '@/components/historia/PuntoDeInflexion';
import { DeLaTeoriaALaTrinchera } from '@/components/historia/DeLaTeoriaALaTrinchera';
import { Metodologia } from '@/components/historia/Metodologia';
import { CtaHistoria } from '@/components/historia/CtaHistoria';

// Metadatos para SEO
export const metadata: Metadata = {
    title: 'Mi Historia | Hugo Herrera Coach',
    description: 'De emprendedor frustrado a creador de sistemas de ventas. Conoce la historia que forjó mi metodología para escalar negocios.',
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
            <Metodologia />
            <CtaHistoria />
        </main>
    );
};

export default MiHistoriaPage;