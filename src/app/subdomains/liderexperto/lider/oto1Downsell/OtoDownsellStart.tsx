// src/components/OtoDownsellStart.tsx
"use client"

import { useEffect } from "react";
import Image from "next/image";
import VideoPlayer from "@liderexperto/components/VideoPlayer";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { usePaymentFlow } from '@liderexperto/hooks/usePaymentFlow';
import PaymentButton from '@liderexperto/components/PaymentButton';
import CVVConfirmationPopup from '@liderexperto/components/CVVConfirmationPopup';

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

// Importar dinámicamente el componente de payment retry popup
const PaymentRetryPopup = dynamic(() => import('@liderexperto/components/PaymentPopup'), {
  loading: () => <div className="text-center py-8">Cargando formulario...</div>
});

export default function OtoDownsellStart() {
  const {
    isProcessing,
    message,
    hasTokens,
    hasUserData,
    userData,
    showCVVInput,
    showCVVPopup,
    selectedToken,
    showPaymentPopup,
    handleOneClickPurchase,
    handleCVVPayment,
    handlePayWithOtherMethod,
    handlePaymentSuccess,
    handlePaymentClose,
    setShowCVVPopup,
    setMessage,
  } = usePaymentFlow({
    productName: "Programa Lobos de Ventas (Oferta en cuotas)",
    productPrice: 497,
    currency: "PEN",
    installments: 3, //Número de cuotas
    redirectUrl: "/pricing"
  });

  // Track ViewContent when component mounts (only once)
  useEffect(() => {
    // 1. Browser pixel tracking
    trackEvent('ViewContent', {
      content_type: 'product',
      content_ids: ['lobos-downsell-program'],
      content_name: 'Programa Lobos de Ventas (Oferta en cuotas)',
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
            userData: userData ? {
              fn: userData.firstName,
              ln: userData.lastName,
              em: userData.email,
              ph: userData.phoneNumber,
            } : {},
            customData: {
              content_type: 'product',
              content_ids: ['lobos-downsell-program'],
              content_name: 'Programa Lobos de Ventas (Oferta en cuotas)',
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
      <section className="">
        {/* Header with countdown - Full width */}
        <div className="flex justify-center items-center bg-gradient-to-b from-[#E40200] to-[#7E0100] py-4">
          <Image
            src="/subdomains/liderexperto/lobosDownsell/alertIcon.png"
            alt="Icono de alerta"
            width={100}
            height={100}
            className="w-[24px] mx-2"
          />
          <p className="font-barlow font-bold text-white text-3xl">¡Ahora o Nunca!</p>
          <Image
            src="/subdomains/liderexperto/lobosDownsell/alertIcon.png"
            alt="Icono de alerta"
            width={100}
            height={100}
            className="w-[24px] mx-2"
          />
        </div>

        {/* Títulos */}
        <div className="bg-white text-black flex flex-col items-center text-center p-4">
          <h1 className="font-dm-serif font-regular text-4xl md:text-5xl lg:text-6xl pt-4 leading-[1.2]">
            <span className="text-[#E40200] underline">Última oportunidad </span><br/>
            para acceder a LOBOS DE VENTAS
          </h1>
          <p className="font-montserrat font-medium text-xl md:text-2xl py-4 lg:py-6 leading-[1.2]">
            No cierres esta página… puedes acceder con una opción más accesible.
          </p>
          <p className="font-montserrat font-medium border-2 p-2 border-[#E40200] border-dashed text-xl md:text-2xl py-4 lg:py-6 leading-[1.2] md:mx-6 md:px-4 lg:px-8">
            Entrena a tu equipo como profesionales…
            <span className="font-bold"> pagando en cuotas pequeñas.</span>
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 pb-8">
          {/* Barra superior de video + Video */}
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
            src="https://stream.mux.com/y2hF00dDWrWatOWioDzwQNkIuxOQaLXkpx02f9f3BrQ01E.m3u8"
            poster="/placeholder.svg?height=400&width=600"
            thumbnailUrl="/subdomains/liderexperto/lobosDownsell/lobosMockup2.png"
            className="mb-2"
          />

          {/* Botones de pago */}
          <div className="bg-white flex pt-4 flex-col items-center justify-center text-center">
            {/* Componente de botón de pago reutilizable */}
            <PaymentButton
              onClick={handleOneClickPurchase}
              isProcessing={isProcessing}
              hasUserData={hasUserData}
              hasTokens={hasTokens}
              showCVVInput={showCVVInput}
              showCVVPopup={showCVVPopup}
              selectedToken={selectedToken}
              userData={userData}
              message={message}
              buttonText="¡Sí, quiero entrar a Lobos de Ventas en cuotas!"
            />
            
            <p className="font-barlow font-bold text-black underline text-2xl md:text-3xl pt-4 pb-2">
              Accede ahora por 3 cuotas de S/167
            </p>
            
            <p className="font-montserrat font-regular text-black text-center text-normal md:text-lg lg:text-xl leading-[1.2]">
              🔒 Pago 100% seguro y encriptado. Tu información está protegida.
            </p>
            
            <Link 
              href="/pricing"
              className="text-[#575757] font-barlow font-regular text-xl md:text-2xl mt-8 mb-2 md:mt-10 md:mb-4 lg:mt-12 lg:mb-8 underline cursor-pointer text-center">
              No, gracias. No quiero entrenar a mi equipo.
            </Link>
          </div>
        </div>
      </section>

      {/* CVV Confirmation Popup */}
      {showCVVPopup && selectedToken && (
        <CVVConfirmationPopup
          isOpen={showCVVPopup}
          onClose={() => {
            setShowCVVPopup(false);
            setMessage(null);
          }}
          onConfirmPayment={handleCVVPayment}
          onPayWithOtherMethod={handlePayWithOtherMethod}
          selectedToken={selectedToken}
          productName="Programa Lobos de Ventas (Oferta en cuotas)"
          productPrice={497}
          currency="PEN"
          installments={3}
          isProcessing={isProcessing}
        />
      )}

      {/* PaymentRetryPopup con datos autocompletados */}
      {showPaymentPopup && (
        <PaymentRetryPopup
          isOpen={showPaymentPopup}
          onClose={handlePaymentClose}
          onPaymentSuccess={handlePaymentSuccess}
          productName="Programa Lobos de Ventas (Oferta en cuotas)"
          productPrice={497}
          userEmail={userData?.email}
          prefillData={userData}
          currency="PEN"
          installments={3}
        />
      )}
    </>
  );
}