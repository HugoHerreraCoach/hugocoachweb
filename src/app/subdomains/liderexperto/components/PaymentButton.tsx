// src/components/PaymentButton.tsx
"use client"

import React from 'react';
import Image from "next/image";
import { SavedToken, UserData } from "@liderexperto/hooks/usePaymentFlow";

interface PaymentButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  hasUserData: boolean | null;
  hasTokens: boolean | null;
  showCVVInput: boolean;
  showCVVPopup: boolean;
  selectedToken: SavedToken | null;
  userData: UserData | null;
  message: string | null;
  buttonText?: string;
  children?: React.ReactNode; // Para contenido personalizado
  iconPath?: string;
  showIcon?: boolean;
  buttonClassName?: string;
}

export default function PaymentButton({
  onClick,
  isProcessing,
  hasUserData,
  hasTokens,
  showCVVInput,
  showCVVPopup,
  selectedToken,
  userData,
  message,
  buttonText,
  children,
  iconPath = "/subdomains/liderexperto/lobos/cartIcon.png",
  showIcon = true,
  buttonClassName = "bg-[#0FBA72] hover:bg-green-600 flex items-center px-4 py-4 rounded-lg mx-auto border-b-6 border-[#01A25E] font-barlow-condensed font-bold text-2xl md:text-3xl lg:text-4xl leading-[1.2] cursor-pointer"
}: PaymentButtonProps) {
  return (
    <>
      {/* Indicador de procesamiento con CVV */}
      {showCVVInput && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg max-w-md">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <span className="text-blue-800 text-sm">Procesando pago con tu tarjeta guardada...</span>
          </div>
        </div>
      )}

      {/* Botón principal */}
      <button
        className={`${buttonClassName} disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={onClick}
        disabled={isProcessing}
      >
        {showIcon && iconPath && (
          <Image
            src={iconPath}
            alt="Icono de carrito"
            width={80}
            height={80}
            className="w-[35px] mr-2 md:w-[45px]"
          />
        )}
        {hasUserData === null || hasTokens === null ? (
          <span className="text-white">Cargando...</span>
        ) : showCVVInput ? (
          <span className="text-white">Procesando pago...</span>
        ) : children ? (
          children
        ) : (
          <span className="text-white">{buttonText}</span>
        )}
      </button>

      {/* Información de tarjeta guardada */}
      {hasUserData && hasTokens && selectedToken && !showCVVInput && !showCVVPopup && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg max-w-md">
          <div className="flex items-center justify-center">
            <Image
              src={`/venta/${selectedToken.payment_method.toLowerCase()}Icon.jpg`}
              alt={selectedToken.payment_method}
              width={32}
              height={20}
              className="h-6 w-auto mr-2"
            />
            <span className="text-green-800 font-medium text-sm">
              Pagar con {selectedToken.masked_number}
            </span>
          </div>
          {userData && (
            <div className="text-center mt-2">
              <span className="text-green-700 text-xs">
                Envío a: {userData.firstName} {userData.lastName}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Mensaje dinámico */}
      {message && (
        <div className={`mt-4 p-3 rounded-lg max-w-md text-center ${
          message.includes("exitoso") || message.includes("Gracias") 
            ? "bg-green-100 border border-green-300 text-green-800"
            : message.includes("Error") || message.includes("error") || message.includes("problema") || message.includes("fondos")
            ? "bg-red-100 border border-red-300 text-red-800"
            : "bg-blue-100 border border-blue-300 text-blue-800"
        }`}>
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
    </>
  );
}