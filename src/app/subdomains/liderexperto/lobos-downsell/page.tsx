import OtoDownsellStart from "@liderexperto/lider/oto1Downsell/OtoDownsellStart";
import DescriptionProgram from "@liderexperto/lider/oto1Downsell/DescriptionProgram";
import TopicsProgram from "@liderexperto/lider/oto1Downsell/TopicsProgram";
import BonosSection from "@liderexperto/lider/oto1Downsell/BonosSection";
import OfferSection from "@liderexperto/lider/oto1Downsell/OfferSection"



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