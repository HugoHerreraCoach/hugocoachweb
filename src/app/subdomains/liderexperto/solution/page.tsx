import HomeStart from "@liderexperto/lider/preventa/HomeStart";
import DiscoverySection from "@liderexperto/lider/preventa/DiscoverySection";
import Biography from "@liderexperto/lider/preventa/Biography";
import EmpathySection from "@liderexperto/lider/preventa/EmpathySection";
import ProblemsSection from "@liderexperto/lider/preventa/ProblemsSection";
import BookSection from "@liderexperto/lider/preventa/BookSection"
import CallToActionMobile from "@liderexperto/lider/preventa/CallToAction";

export default function PageSolution() {
  return (
    <>
      <div>
        <HomeStart />
        <DiscoverySection />
        <Biography />
        <EmpathySection />
        <ProblemsSection />
        <BookSection/>
        <CallToActionMobile />
      </div>
      {/* Footer */}
      <div className="bg-black pt-6 border-t-3 border-red-700 pb-6">
        <p className="text-center text-gray-500 text-sm">© 2025. Todos los derechos reservados a Conexipema</p>
      </div>
    </>
  );
}