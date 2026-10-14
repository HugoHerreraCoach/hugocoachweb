// src/components/LobosPageWithPopup.tsx
"use client"

import { useEffect } from "react";
import Image from "next/image";
import VideoPlayer from "@liderexperto/components/VideoPlayer";
import Link from "next/link";
import { useCountdownTimer, CountdownDisplay } from '@liderexperto/hooks/useCountdownTimer';
import { PRODUCTOS_LE } from "@liderexperto/lib/productos";
import OfertaUpsell from "@liderexperto/components/OfertaUpsell";

// Meta Ads tracking
declare global {
  interface Window {
    fbq: (action: string, event: string, data?: Record<string, unknown>) => void;
  }
}

// Helper function to safely call fbq
const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    if (window.fbq && typeof window.fbq === 'function') {
      // console.log(`🎯 Meta Pixel: Tracking ${eventName}`, data);
      window.fbq('track', eventName, data);
    } else {
      // console.warn(`⚠️ Meta Pixel: fbq not available for ${eventName}`);
    }
  }
};

export default function LobosPageWithPopup() {
  // Usar el hook del timer
  const { timeLeft, formatTime } = useCountdownTimer({
    initialHours: 0,
    initialMinutes: 15,
    initialSeconds: 0
  });

  // Track ViewContent when component mounts (only once)
  useEffect(() => {
    // 1. Browser pixel tracking
    trackEvent('ViewContent', {
      content_type: 'product',
      content_ids: ['lobos-oto-program'],
      content_name: 'Programa Lobos de Ventas (Oferta)',
      value: 497.0,
      currency: 'PEN'
    });

    // 2. Server-side API tracking
    const trackViewContent = async () => {
      try {
        await fetch('/api/meta/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'ViewContent',
            userData: {},
            customData: {
              content_type: 'product',
              content_ids: ['lobos-oto-program'],
              content_name: 'Programa Lobos de Ventas (Oferta)',
              value: 497.0,
              currency: 'PEN'
            }
          }),
        });
      } catch (error) {
        console.error("Error sending ViewContent event to CAPI:", error);
      }
    };

    trackViewContent();
  }, []); // Empty dependency array to run only once

  return (
    <>
      <div className="text-white">
        {/* Header with countdown */}
        <CountdownDisplay
          hours={timeLeft.hours}
          minutes={timeLeft.minutes}
          seconds={timeLeft.seconds}
          formatTime={formatTime}
        />

        {/* Main content */}
        <div className="flex flex-col bg-black items-center">
          <div className="lg:max-w-6xl lg:w-full p-4">
            {/* Text content */}
            <div className="flex flex-col justify-center items-center mb-6 lg:py-0 space-y-6">
              <h1 className="text-3xl pt-6 md:text-4xl lg:text-5xl text-center text-white font-dm-serif">
                <span className="text-4xl md:text-5xl">⚠️</span>¡ESPERA! Oferta Especial por Única Vez
              </h1>
              <p className="bg-[#FFEDED] md:w-[80%] text-black p-2 text-center text-xl md:text-2xl lg:text-3xl md:mt-4 md:mb-8 font-barlow font-semibold leading-[1.2]">
                No cierres esta página... Tu pedido aún no está completo...
              </p>
              <p className="text-center font-montserrat font-medium text-lg md:text-xl lg:text-2xl leading-r[1.2]">
                Ya tienes la estructura...<br />
                Ahora <span className="font-bold text-white">entrena a tu equipo como verdaderos profesionales,</span> sin tener que hacerlo tú mismo.
              </p>
            </div>

            {/* Video */}
            <div className="bg-red-600 flex py-2 px-4 items-center justify-center rounded-t-lg">
              <Image
                src="/subdomains/liderexperto/lobos/playIcon.png"
                alt="Icono de play"
                width={80}
                height={80}
                className="w-[26px] mr-2"
              />
              <p className="text-xl text-white md:text-2xl lg:text-3xl font-barlow-condensed font-regular text-center leading-[1.2]">
                Una vez que abandones esta página, esta oportunidad desaparecerá para siempre.
              </p>
            </div>
            <VideoPlayer
              src="https://stream.mux.com/00qRXY3c401INgTeZgbyvjC7SmyAJMlJtGeBRqHfePclc.m3u8"
              thumbnailUrl="/subdomains/liderexperto/lobosDownsell/updatesProgram.jpg"
              poster="/placeholder.svg?height=400&width=600"
              className="w-full -mb-[25vh]"
            />
          </div>
        </div>

        <div className="bg-white pt-[27vh] p-4 flex flex-col items-center">
          {/* Cobro con 1 clic (tarjeta guardada al pagar el libro) o formulario seguro de Stripe */}
          <OfertaUpsell
            productId={PRODUCTOS_LE.LOBOS}
            monto={497}
            descripcion="Programa Lobos de Ventas (oferta Líder Experto)"
            textoBoton="¡Sí, quiero entrenar a mi equipo como profesionales!"
            exitoUrl="/gracias"
          />

          <p className="font-barlow font-bold text-black text-center underline text-2xl md:text-3xl pt-4 pb-2">
            Accede ahora por solo S/497
          </p>
          
          <p className="font-montserrat font-regular text-black text-center text-normal md:text-lg lg:text-xl leading-[1.2]">
            🔒 Pago 100% seguro y encriptado. Tu información está protegida.
          </p>

          <Link
            href="/lobos-downsell"
            className="text-[#575757] font-barlow font-regular text-xl md:text-2xl my-8 md:my-10 lg:my-12 underline cursor-pointer text-center"
          >
            No, gracias. Seguiré explicándoles todo yo.
          </Link>
        </div>
      </div>

    </>
  );
}