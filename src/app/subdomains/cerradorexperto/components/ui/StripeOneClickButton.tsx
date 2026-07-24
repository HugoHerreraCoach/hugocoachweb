// src/app/subdomains/cerradorexperto/components/ui/StripeOneClickButton.tsx
"use client";

import React, { useState } from "react";
import { LoaderCircle, Zap, Lock, CheckCircle, AlertCircle } from "lucide-react";
import type { ProductID } from "@cerradorexperto/lib/pricing";

type StripeOneClickButtonProps = {
  productId: ProductID;
  amount: number;
  currency?: "USD" | "PEN";
  description: string;
  onSuccessRedirectTo: string;
};

export function StripeOneClickButton({
  productId,
  amount,
  currency = "USD",
  description,
  onSuccessRedirectTo,
}: StripeOneClickButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleOneClickBuy = async () => {
    setIsProcessing(true);
    setStatusMessage(null);

    const customerId =
      typeof window !== "undefined"
        ? localStorage.getItem("stripe_customer_id")
        : null;

    if (!customerId) {
      setStatusMessage({
        type: "error",
        text: "Por favor, ingresa los datos de tu tarjeta para completar esta oferta.",
      });
      setIsProcessing(false);
      return;
    }

    try {
      const res = await fetch("/api/stripe/one-click-upsell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          productId,
          amount,
          currency,
          description,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({
          type: "success",
          text: "¡Oferta añadida con éxito! Redirigiendo...",
        });
        setTimeout(() => {
          window.location.href = onSuccessRedirectTo;
        }, 1200);
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "No se pudo procesar el pago de 1-clic.",
        });
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Error en 1-Click Upsell Stripe:", err);
      setStatusMessage({
        type: "error",
        text: "Ocurrió un error inesperado al procesar la compra.",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      {statusMessage && (
        <div
          className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
              : "bg-red-50 text-red-700 border border-red-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <button
        onClick={handleOneClickBuy}
        disabled={isProcessing}
        className="group w-full cursor-pointer rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed p-4"
      >
        <div className="flex flex-col items-center justify-center text-center">
          {isProcessing ? (
            <div className="flex items-center justify-center gap-3">
              <LoaderCircle className="h-7 w-7 animate-spin" />
              <span className="text-xl font-bold tracking-wide">
                PROCESANDO PAGO CON 1-CLIC...
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Zap className="h-7 w-7 text-yellow-300 group-hover:scale-125 transition-transform" />
                <span className="text-xl sm:text-2xl font-black tracking-wide">
                  SÍ, ¡AÑADIR A MI PEDIDO CON 1-CLIC!
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-xs font-semibold text-emerald-100">
                <Lock className="h-3.5 w-3.5" />
                <span>
                  Cobro instantáneo de {currency === "USD" ? "$" : "S/"}
                  {amount.toFixed(2)} a tu tarjeta guardada
                </span>
              </div>
            </>
          )}
        </div>
      </button>
    </div>
  );
}
