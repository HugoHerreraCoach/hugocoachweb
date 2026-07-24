// src/app/subdomains/cerradorexperto/components/ui/StripePaymentForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Lock, ShieldCheck, CreditCard, Sparkles } from "lucide-react";
import type { ProductID } from "@cerradorexperto/lib/pricing";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

type StripePaymentFormProps = {
  customerData?: { name: string; email: string; countryCode?: string };
  offerDetails?: {
    amount: number;
    currency: "PEN" | "USD";
    usdAmount?: number;
    description?: string;
  };
  showUpsell?: boolean;
  productId: ProductID;
  onSuccessRedirectTo: string;
};

function CheckoutForm({
  customerName,
  customerEmail,
  totalAmount,
  currency,
  productId,
  onSuccessRedirectTo,
  includeBump,
}: {
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  currency: string;
  productId: ProductID;
  onSuccessRedirectTo: string;
  includeBump: boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}${onSuccessRedirectTo}`,
          receipt_email: customerEmail,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "Error procesando el pago.");
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Guardar Customer ID si existe en metadata o response para 1-Click Upsell posterior
        if (typeof window !== "undefined") {
          localStorage.setItem("last_payment_intent", paymentIntent.id);
          const customerId = (paymentIntent as any).customer;
          if (customerId) {
            localStorage.setItem("stripe_customer_id", String(customerId));
          }
        }


        window.location.href = onSuccessRedirectTo;
      }
    } catch (err: any) {
      console.error("Error confirmando pago con Stripe:", err);
      setErrorMessage("Ocurrió un error inesperado al procesar tu tarjeta.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Lock size={18} />
        <span>
          {isProcessing
            ? "Procesando pago seguro..."
            : `PAGAR AHORA (${currency === "USD" ? "$" : "S/"}${totalAmount.toFixed(2)})`}
        </span>
      </button>

      <div className="flex justify-center items-center gap-2 text-xs text-slate-500 mt-2">
        <ShieldCheck size={14} className="text-emerald-600" />
        <span>Pago encriptado SSL de 256-bits por Stripe</span>
      </div>
    </form>
  );
}

export function StripePaymentForm({
  customerData,
  offerDetails,
  showUpsell = true,
  productId,
  onSuccessRedirectTo,
}: StripePaymentFormProps) {
  const [name, setName] = useState(customerData?.name || "");
  const [email, setEmail] = useState(customerData?.email || "");
  const [includeBump, setIncludeBump] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoadingSecret, setIsLoadingSecret] = useState(false);

  const basePrice = offerDetails?.amount || (offerDetails?.currency === "USD" ? 7 : 25);
  const bumpPrice = offerDetails?.currency === "USD" ? 15 : 50;
  const currency = offerDetails?.currency || "USD";
  const totalAmount = includeBump ? basePrice + bumpPrice : basePrice;

  // Crear PaymentIntent al cargar o al cambiar de datos
  useEffect(() => {
    if (!email || !name || name.trim().length < 3 || !email.includes("@")) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoadingSecret(true);
      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalAmount,
            currency,
            email,
            name,
            productId: includeBump ? `${productId}+libro-fisico` : productId,
            description: includeBump
              ? `Compra de ${productId} + Order Bump Libro Físico`
              : `Compra de ${productId}`,
          }),
        });

        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          if (data.customerId && typeof window !== "undefined") {
            localStorage.setItem("stripe_customer_id", data.customerId);
          }
        }
      } catch (err) {
        console.error("Error obteniendo clientSecret de Stripe:", err);
      } finally {
        setIsLoadingSecret(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [name, email, totalAmount, currency, productId, includeBump]);

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="mb-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Nombre Completo
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Pérez"
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="juan@ejemplo.com"
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Order Bump Option */}
      {showUpsell && (
        <div className="mb-4 p-3 bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeBump}
              onChange={(e) => setIncludeBump(e.target.checked)}
              className="mt-1 h-4 w-4 text-emerald-600 rounded focus:ring-amber-500"
            />
            <div className="text-xs">
              <span className="font-bold text-amber-900 flex items-center gap-1">
                <Sparkles size={14} className="text-amber-600" />
                ¡OFERTA ESPECIAL!: Agregar Libro Físico (+
                {currency === "USD" ? `$${bumpPrice}` : `S/${bumpPrice}`})
              </span>
              <p className="text-amber-800 mt-0.5">
                Recibe el libro impreso directamente en tu domicilio con envío
                prioritario.
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Stripe Payment Element container */}
      {clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#10b981",
              },
            },
          }}
        >
          <CheckoutForm
            customerName={name}
            customerEmail={email}
            totalAmount={totalAmount}
            currency={currency}
            productId={productId}
            onSuccessRedirectTo={onSuccessRedirectTo}
            includeBump={includeBump}
          />
        </Elements>
      ) : (
        <div className="text-center py-6">
          {isLoadingSecret ? (
            <div className="flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
              <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Preparando pasarela de pago Stripe...</span>
            </div>
          ) : (
            <p className="text-xs text-slate-500">
              Ingresa tu nombre y correo para cargar las opciones de pago con
              tarjeta, Apple Pay o Google Pay.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
