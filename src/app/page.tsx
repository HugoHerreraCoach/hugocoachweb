import HeroHome from "@/components/home/HeroHome";
import LogosHome from "@/components/home/LogosHome";
import ProblemaHome from "@/components/home/ProblemaHome";
import ServiciosHome from "@/components/home/ServiciosHome";
import { VendedoresBand } from "@/components/servicios/VendedoresBand";
import { EventosMasivosSection } from "@/components/eventos/EventosMasivosSection";
import TestimoniosHome from "@/components/home/TestimoniosHome";
import ComoEmpezarHome from "@/components/home/ComoEmpezarHome";
import FaqHome from "@/components/home/FaqHome";
import { LlamadaGratisCta } from "@/components/servicios/LlamadaGratisCta";
import BarraLlamadaMovil from "@/components/home/BarraLlamadaMovil";

export default function Home() {
  return (
    <>
      <HeroHome />
      <LogosHome />
      <ProblemaHome />
      <ServiciosHome />
      <VendedoresBand fondo="black" />
      <EventosMasivosSection fondo="slate" />
      <TestimoniosHome />
      <ComoEmpezarHome />
      <FaqHome />
      <LlamadaGratisCta />
      <BarraLlamadaMovil />
    </>
  )
}
