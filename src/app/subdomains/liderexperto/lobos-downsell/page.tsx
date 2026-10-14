import type { Metadata } from "next";
import OtoDownsellStart from "@liderexperto/lider/oto1Downsell/OtoDownsellStart";
import DescriptionProgram from "@liderexperto/lider/oto1Downsell/DescriptionProgram";
import TopicsProgram from "@liderexperto/lider/oto1Downsell/TopicsProgram";
import BonosSection from "@liderexperto/lider/oto1Downsell/BonosSection";
import OfferSection from "@liderexperto/lider/oto1Downsell/OfferSection"



// Páginas de oferta posteriores a la compra: no deben aparecer en buscadores.
export const metadata: Metadata = {
  title: "Facilidad de pago | Líder Experto",
  robots: { index: false, follow: false },
};

export default function PageLobosDownsell() {
  return (
    <>
      <div>
        <OtoDownsellStart/>
        <DescriptionProgram/>
        <TopicsProgram/>
        <BonosSection/>
        <OfferSection/>
      </div>
    </>
  );
}