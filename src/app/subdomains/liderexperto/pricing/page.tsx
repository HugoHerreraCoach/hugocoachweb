import PricingStart from "@liderexperto/lider/oto2/PricingStart";
import PricingPhases from "@liderexperto/lider/oto2/PricingPhases"
import BonosSection from "@liderexperto/lider/oto2/BonosSection";
import PricingCallToAction from "@liderexperto/lider/oto2/PricingCallToAction";

export default function PageLobosDownsell() {
  return (
    <>
      <div className="bg-white">
        <PricingStart/>
        <PricingPhases/>
        <BonosSection/>
        <PricingCallToAction/>
      </div>
    </>
  );
}