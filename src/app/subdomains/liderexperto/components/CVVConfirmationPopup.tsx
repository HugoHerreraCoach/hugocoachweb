// src/components/CVVConfirmationPopup.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface CVVConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (cvv: string) => void;
  onPayWithOtherMethod: () => void;
  selectedToken: {
    tokenid: string;
    masked_number: string;
    payment_method: string;
    expiration_date: string;
  };
  productName: string;
  productPrice: number;
  currency?: string;
  installments?: number;
  isProcessing?: boolean;
}

export default function CVVConfirmationPopup({
  isOpen,
  onClose,
  onConfirmPayment,
  onPayWithOtherMethod,
  selectedToken,
  productName,
  productPrice,
  currency = "PEN",
  installments = 1,
  isProcessing = false,
}: CVVConfirmationPopupProps) {
  const [cvv, setCvv] = useState("");

  const validateCVV = (cvv: string, cardType: string): boolean => {
    if (cardType === "AMEX") {
      return /^\d{4}$/.test(cvv);
    }
    return /^\d{3}$/.test(cvv);
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const maxLength = selectedToken.payment_method === "AMEX" ? 4 : 3;
    if (value.length <= maxLength) {
      setCvv(value);
    }
  };

  const handleConfirmPayment = () => {
    if (validateCVV(cvv, selectedToken.payment_method)) {
      onConfirmPayment(cvv);
    }
  };

  const handleClose = () => {
    setCvv("");
    onClose();
  };

  const handlePayWithOtherMethod = () => {
    setCvv("");
    onPayWithOtherMethod();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        {/* Header con resumen de compra */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <h3 className="text-lg font-semibold text-center mb-3">
            Resumen de tu compra
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">{productName}</span>
              <span className="font-semibold">
                {currency === "PEN" ? "S/" : "$"}{productPrice.toFixed(2)}
              </span>
            </div>
            {installments > 1 && (
              <div className="flex justify-between items-center text-sm">
                <span>Cuotas:</span>
                <span>{installments}x</span>
              </div>
            )}
            <div className="border-t border-blue-400 pt-2 flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">
                {currency === "PEN" ? "S/" : "$"}{productPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido del popup */}
        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Confirma tu pago seguro
          </h4>
          
          <div className="flex items-center mb-4 p-3 bg-gray-50 border rounded">
            <Image
              src={`/venta/${selectedToken.payment_method.toLowerCase()}Icon.jpg`}
              alt={selectedToken.payment_method}
              width={32}
              height={20}
              className="h-6 w-auto mr-3"
            />
            <span className="text-gray-700 font-medium">
              {selectedToken.masked_number}
            </span>
          </div>
          
          <div className="mb-6">
            <label htmlFor="cvv-popup" className="block text-sm font-medium text-gray-700 mb-2">
              Código de seguridad (CVV)
            </label>
            <input
              type="text"
              id="cvv-popup"
              value={cvv}
              onChange={handleCVVChange}
              maxLength={selectedToken.payment_method === "AMEX" ? 4 : 3}
              placeholder={selectedToken.payment_method === "AMEX" ? "1234" : "123"}
              className="w-full px-3 py-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleConfirmPayment}
              disabled={isProcessing || !cvv || !validateCVV(cvv, selectedToken.payment_method)}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Procesando..." : `Confirmar Pago ${currency === "PEN" ? "S/" : "$"}${productPrice.toFixed(2)}`}
            </button>
            
            <button
              onClick={handlePayWithOtherMethod}
              disabled={isProcessing}
              className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 disabled:opacity-50"
            >
              Pagar con otro método
            </button>
            
            <button
              onClick={handleClose}
              disabled={isProcessing}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            🔒 Tu información está protegida con encriptación SSL
          </p>
        </div>
      </div>
    </div>
  );
}