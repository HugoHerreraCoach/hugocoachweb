"use client"

import Link from "next/link";
import dynamic from 'next/dynamic';
import CVVConfirmationPopup from '@liderexperto/components/CVVConfirmationPopup';
import PaymentButton from '@liderexperto/components/PaymentButton';
import { usePaymentFlow } from '@liderexperto/hooks/usePaymentFlow';

// Importar dinámicamente el componente de payment retry popup.
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

export default function PricingCallToAction() {
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
      productName: "Programa Pricing de poder (Oferta)",
      productPrice: 750.0,
      currency: "PEN",
      installments: 1,
      redirectUrl: "/gracias"
  });

  return (
    <section className="flex flex-col justify-center items-center text-center pb-16">

      <div className="px-4 pt-8">
        {/* Cuerpo de Stack - Parte ploma*/}
        <div className="bg-[#fafafa] shadow-xl rounded-2xl w-full max-w-[920px] mx-auto px-4 py-8 md:px-20">
          <div className="flex flex-col">
              
            <p className="font-montserrat font-medium text-center text-xl md:text-2xl pt-4 text-black">
              Precio regular: <span className="line-through italic">S/2,000</span>
            </p>
            <p className="font-montserrat font-medium text-center text-xl md:text-2xl pt-4 text-black">
              Hoy:
            </p>
            <p className="font-montserrat font-black text-center pt-2 pb-0 text-7xl md:text-8xl text-[#04B40F]">
              S/750
            </p>
            <p className="font-montserrat font-semibold text-center text-xl md:text-2xl pt-0 text-black">
              (acceso inmediato y de por vida)
            </p>
            <p className="font-montserrat font-semibold py-2 text-center text-xl md:text-2xl pt-0 text-[#E40200] leading-[1.2]">
              Oferta disponible solo en esta página y por única vez.
            </p>

            {/* Botones de pago */}
            <div className="flex text-black pt-4 flex-col items-center justify-center text-center">
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
                  showIcon={false}
                  buttonText="Sí, quiero acceder a Pricing de Poder"
                />
                <p className="font-montserrat font-regular pt-4 text-center text-normal md:text-lg lg:text-xl leading-[1.2]">
                    🔒 Pago 100% seguro y encriptado.
                    <span className="font-bold"> Garantía de satisfacción por 7 días.</span>
                </p>
                <Link 
                    href="/gracias"
                    className="text-[#696969] font-barlow-condensed font-regular text-2xl lg:text-3xl mt-8 mb-2 md:mt-10 md:mb-4 lg:mt-12 lg:mb-8 underline decoration-1 cursor-pointer text-center leading-[1.2]">
                    No, gracias. No quiero agregar este curso.
                </Link>
            </div>

            
          </div>
        </div>
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
          productName="Programa Pricing de poder (Oferta especial)"
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
          productName="Programa Pricing de poder (Oferta especial)"
          productPrice={750}
          userEmail={userData?.email}
          prefillData={userData}
          currency="PEN"
          installments={1}
      />
      )}
    </section>
  );
}
