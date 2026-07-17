
import BookContentSection from "@liderexperto/lider/venta/BookContentSection";
import CompleteSystemSection from "@liderexperto/lider/venta/CompleteSystemSection";
import LeaderExpertSection from "@liderexperto/lider/venta/LeaderExpertSection";
import PhasesSection from "@liderexperto/lider/venta/PhasesSection";
import TestimonialComponent from "@liderexperto/lider/venta/TestimonialSection"
import BonosSection from "@liderexperto/lider/venta/BonosSection";
import BookPromoComponent from "@liderexperto/lider/venta/BonusMaterialsComponent";
import WhyComponent from "@liderexperto/lider/venta/WhyComponent";
import WarrantySection from "@liderexperto/lider/venta/WarrantySection";
import StackSection from "@liderexperto/lider/venta/StackSection"
import LogicSellSection from "@liderexperto/lider/venta/LogicSellSection";
import QuestionsSection from "@liderexperto/lider/venta/QuestionsSection"



export default function PageVenta() {
  return (
    <div className="bg-white">
      <LeaderExpertSection/>
      <TestimonialComponent/>
      <BookContentSection/>
      <PhasesSection/>
      <CompleteSystemSection/>
      <BonosSection/>
      <BookPromoComponent/>
      <WhyComponent/>
      <WarrantySection/>
      <StackSection/>
      <LogicSellSection/>
      <QuestionsSection/>
    </div>
  );
}