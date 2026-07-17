"use client"

import { useEffect } from "react";
import Image from "next/image"
import VideoPlayer from "@liderexperto/components/VideoPlayer"
import Link from "next/link"
import dynamic from 'next/dynamic';
import CVVConfirmationPopup from '@liderexperto/components/CVVConfirmationPopup';
import PaymentButton from '@liderexperto/components/PaymentButton';
import { usePaymentFlow } from '@liderexperto/hooks/usePaymentFlow';

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
    //   console.log(`🎯 Meta Pixel: Tracking ${eventName}`, data);
      window.fbq('track', eventName, data);
    } else {
    //   console.warn(`⚠️ Meta Pixel: fbq not available for ${eventName}`);
    }
  }
};

// Importar dinámicamente el componente de payment retry popup
const PaymentRetryPopup = dynamic(() => import('@liderexperto/components/PaymentPopup'), {
  loading: () => <div className="text-center py-8">Cargando formulario...</div>
});

export interface PaymentResult {
    success: boolean;
    message?: string;
    transactionId?: string;
    referenceCode?: string;
    state?: string;
    responseCode?: string;
}

export default function PricingStart() {

    // Usar el hook de pago centralizado
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
        productName: "Programa Pricing de Poder (Oferta especial)",
        productPrice: 750.0,
        currency: "PEN",
        installments: 1,
        redirectUrl: "/pricing"
    });

    // Track ViewContent when component mounts (only once)
    useEffect(() => {
        // 1. Browser pixel tracking
        trackEvent('ViewContent', {
            content_type: 'product',
            content_ids: ['pricing-power-program'],
            content_name: 'Programa Pricing de Poder (Oferta especial)',
            value: 750.0,
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
                            content_ids: ['pricing-power-program'],
                            content_name: 'Programa Pricing de Poder (Oferta especial)',
                            value: 750.0,
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
        <section className="flex flex-col bg-white">
            {/* Títulos */}
            <div className="bg-[#0E203A] text-white flex flex-col items-center text-center p-4 pt-8">
                <h1 className="font-barlow font-black text-4xl md:text-5xl lg:text-6xl pt-4 leading-[1.2]">
                    ¿LISTO PARA <span className="pb-1 pt-[-1] bg-gradient-to-b from-[#E40200] to-[#7E0100]">JUGAR</span> EN <span className="underline decoration-3">OTRA LIGA</span>?
                </h1>

                <p className="font-montserrat font-medium border-1 p-2 mt-6 mb-4 border-[#ED1C1C] rounded-xl text-xl md:text-2xl py-4 lg:py-6 leading-[1.2] md:mx-6 md:px-4 lg:px-8">
                    Domina el arte de subir tus precios, construir ofertas irresistibles y vender más que tu competencia.
                </p>
            </div>

            <div className="bg-[#0E203A] w-full flex flex-col items-center text-white mx-auto px-4 md:px-8">
                {/* Barra superior de video + Video */}
                <div className="bg-red-600 w-full flex max-w-6xl py-2 px-4 items-center justify-center rounded-t-lg">
                    <Image
                        src="/subdomains/liderexperto/lobos/playIcon.png"
                        alt="Icono de play"
                        width={80}
                        height={80}
                        className="w-[26px] mr-2"
                    />
                    <p className="text-xl text-white md:text-2xl lg:text-3xl font-barlow-condensed font-regular text-center leading-[1.2]">
                        Mira el video para más detalles
                    </p>
                </div>
                <VideoPlayer
                    src="https://stream.mux.com/2NJKG1roNafsrBRQRscB8LMv7150102kh2QxokQum9XNE.m3u8"
                    poster="/placeholder.svg?height=400&width=600"
                    className="mb-2 max-w-6xl"
                />

                {/* Botones de pago */}
                <div className="flex text-white pt-4 flex-col items-center justify-center text-center">
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
                    buttonText="Acceder al curso Pricing de Poder"
                    />
                    <p className="font-barlow font-bold underline text-2xl md:text-3xl pt-4 pb-2">
                        Accede ahora por solo S/750
                    </p>
                    <p className="font-montserrat font-regular text-center text-normal md:text-lg lg:text-xl leading-[1.2]">
                        🔒 Pago 100% seguro y encriptado. Tu información está protegida.
                    </p>
                    <Link
                        href="/gracias"
                        className="text-[#DAD8D8] font-barlow-condensed font-regular text-2xl lg:text-3xl mt-8 mb-2 md:mt-10 md:mb-4 lg:mt-12 lg:mb-8 underline decoration-1 cursor-pointer text-center">
                        No, gracias. Por ahora prefiero mantener mis precios actuales.
                    </Link>

                </div>


            </div>
            {/* Cuadro */}
            <div className="w-full h-[100px] bg-[#0E203A] mb-[-90px]"></div>
            <div className="flex flex-col items-center px-4 mb-8">
                <p className="bg-[#fafafa] shadow-lg font-montserrat font-medium text-xl lg:text-2xl max-w-[700px] text-black leading-[1.2] text-center p-6 md:p-8 mt-4 rounded-xl">
                    El entrenamiento<span className="font-bold"> estratégico </span>que todo emprendedor necesita <span className="underline">antes de subir sus precios.</span>
                </p>
            </div>

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
                productName="Programa Pricing de Poder (Oferta)"
                productPrice={750}
                currency="PEN"
                installments={1}
                isProcessing={isProcessing}
            />
            )}
    
            {/* PaymentRetryPopup con datos autocompletados */}
            {showPaymentPopup && (
            <PaymentRetryPopup
                isOpen={showPaymentPopup}
                onClose={handlePaymentClose}
                onPaymentSuccess={handlePaymentSuccess}
                productName="Programa Pricing de Poder (Oferta especial)"
                productPrice={750}
                userEmail={userData?.email}
                prefillData={userData}
                currency="PEN"
                installments={1}
            />
            )}

        </section>
    )
}
