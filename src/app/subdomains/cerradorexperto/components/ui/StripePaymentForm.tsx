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
import { Lock, ShieldCheck, CreditCard, Sparkles, Check } from "lucide-react";
import { UpsellOffer } from "./UpsellOffer";
import { esPlanEnCuotas, getPlanEnCuotas, type ProductID } from "@cerradorexperto/lib/pricing";


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

/** Dirección de envío tal como la guarda Stripe en el cobro (campo `shipping`). */
type EnvioDelPedido = {
  name?: string;
  phone?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
};

type StripePaymentFormProps = {
  customerData?: { name: string; email: string; countryCode?: string };
  /** Datos del pedido que quedan en el cobro: teléfono y dirección de envío. */
  customerExtra?: { phone?: string; address?: string; shipping?: EnvioDelPedido };
  /** Oculta nombre, correo y país cuando ya se pidieron en un paso anterior. */
  hideCustomerFields?: boolean;
  /** Oculta solo el país (la venta es únicamente en soles, para Perú). */
  hideCountryField?: boolean;
  /** Se llama con el id del cobro cuando el pago se confirma, justo antes de redirigir. */
  onPaid?: (paymentIntentId: string) => void;
  offerDetails?: {
    amount: number;
    currency: "PEN" | "USD";
    usdAmount?: number;
    description?: string;
  };
  showUpsell?: boolean;
  productId: string;

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
  onPaid,
}: {
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  currency: string;
  productId: string;

  onSuccessRedirectTo: string;
  includeBump: boolean;
  onPaid?: (paymentIntentId: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const plan = getPlanEnCuotas(productId);
  const simbolo = currency === "USD" ? "$" : "S/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Si algún día este formulario queda dentro de otro, que el envío no suba hasta él.
    e.stopPropagation();

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


        try {
          onPaid?.(paymentIntent.id);
        } catch (err) {
          console.error("Error en onPaid:", err); // El seguimiento nunca debe frenar la redirección.
        }

        window.location.href = onSuccessRedirectTo;
      } else {
        // Ni error ni pago confirmado (p. ej. el banco aún está confirmando).
        // Sin este aviso el botón se quedaba en "Procesando" para siempre.
        setErrorMessage(
          "Tu banco aún está confirmando el pago. No vuelvas a pagar: si se aprueba, te llegará un correo de confirmación."
        );
        setIsProcessing(false);
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
            : plan
              ? `PAGAR PRIMERA CUOTA (${simbolo}${totalAmount.toFixed(2)})`
              : `PAGAR AHORA (${simbolo}${totalAmount.toFixed(2)})`}
        </span>
      </button>

      {plan && (
        <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-md p-3 leading-relaxed">
          Al pagar autorizas <strong>{plan.cuotas} cobros mensuales</strong> de{" "}
          <strong>
            {simbolo}
            {totalAmount.toFixed(2)}
          </strong>{" "}
          ({simbolo}
          {(totalAmount * plan.cuotas).toFixed(2)} en total). El primero se cobra hoy y los{" "}
          {plan.cuotas - 1} restantes cada 30 días. El cobro se detiene solo al completar la
          última cuota.
        </p>
      )}

      <div className="flex justify-center items-center gap-2 text-xs text-slate-500 mt-2">
        <ShieldCheck size={14} className="text-emerald-600" />
        <span>Pago encriptado SSL de 256-bits por Stripe</span>
      </div>
    </form>
  );
}

export function StripePaymentForm({
  customerData,
  customerExtra,
  hideCustomerFields = false,
  hideCountryField = false,
  onPaid,
  offerDetails,
  showUpsell = true,
  productId,
  onSuccessRedirectTo,
}: StripePaymentFormProps) {
  const [name, setName] = useState(customerData?.name || "");
  const [email, setEmail] = useState(customerData?.email || "");
  const [selectedCountry, setSelectedCountry] = useState(
    customerData?.countryCode || "PE"
  );
  const [includeBump, setIncludeBump] = useState(false);
  // El cobro (PaymentIntent) viaja junto con la "firma" de los datos con que se creó.
  // Stripe no permite cambiar el cobro de un formulario ya montado: si el monto, el
  // producto o el correo cambian, hay que pagar sobre un cobro NUEVO, nunca sobre el viejo.
  const [intent, setIntent] = useState<{ secret: string; firma: string } | null>(null);
  const [secretError, setSecretError] = useState<string | null>(null);

  // Lógica de país y moneda:
  // Si el país es Perú (PE): Moneda Soles (PEN - S/), Libro Digital S/ 25, Libro Físico Bump S/ 50.
  // Si es otro país: Moneda Dólares (USD - $), Libro Digital $7 USD, Order Bump oculto.
  const isPeru = selectedCountry === "PE";
  const currency = isPeru ? "PEN" : "USD";
  const currencySymbol = isPeru ? "S/" : "$";

  const basePrice = offerDetails?.amount || (isPeru ? 25 : 7);
  const bumpPrice = 50; // S/ 50 para Perú

  // El Order Bump de libro físico SOLO SE MUESTRA si el país seleccionado es Perú
  const shouldShowBump = showUpsell && isPeru;
  const effectiveIncludeBump = shouldShowBump ? includeBump : false;
  const totalAmount = effectiveIncludeBump ? basePrice + bumpPrice : basePrice;

  const enCuotas = esPlanEnCuotas(productId);
  const plan = getPlanEnCuotas(productId);

  // Objeto nuevo en cada render del padre: se compara por contenido para no recrear el cobro sin motivo.
  const extraJson = JSON.stringify(customerExtra ?? null);
  const datosCompletos = !!email && name.trim().length >= 3 && email.includes("@");
  const firmaActual = JSON.stringify([
    name,
    email,
    selectedCountry,
    totalAmount,
    currency,
    productId,
    effectiveIncludeBump,
    enCuotas,
    extraJson,
  ]);
  const intentVigente = intent && intent.firma === firmaActual ? intent : null;

  // Crear PaymentIntent (o suscripción) al cargar o al cambiar de datos/país/bump
  useEffect(() => {
    if (!datosCompletos) {
      return;
    }

    let cancelado = false;
    setSecretError(null);

    const timer = setTimeout(async () => {
      try {
        const extra = JSON.parse(extraJson) as StripePaymentFormProps["customerExtra"];
        // Los planes en cuotas crean una suscripción, no un cobro suelto:
        // así Stripe cobra las siguientes cuotas solo.
        const res = enCuotas
          ? await fetch("/api/stripe/subscription", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productId, currency, email, name, country: selectedCountry }),
            })
          : await fetch("/api/stripe/create-payment-intent", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                amount: totalAmount,
                currency,
                email,
                name,
                phone: extra?.phone,
                address: extra?.address,
                shipping: extra?.shipping,
                country: selectedCountry,
                productId: effectiveIncludeBump ? `${productId}+libro-fisico` : productId,
                description: effectiveIncludeBump
                  ? `Compra de ${productId} + Order Bump Libro Físico (Perú)`
                  : `Compra de ${productId} (${currency})`,
              }),
            });

        const data = await res.json();
        if (cancelado) return; // Llegó tarde: ya hay datos más nuevos.
        if (data.clientSecret) {
          setIntent({ secret: data.clientSecret, firma: firmaActual });
          if (data.customerId && typeof window !== "undefined") {
            localStorage.setItem("stripe_customer_id", data.customerId);
          }
        } else {
          setSecretError(
            data.error || "No pudimos preparar el pago. Recarga la página e inténtalo de nuevo."
          );
        }
      } catch (err) {
        console.error("Error obteniendo clientSecret de Stripe:", err);
        if (!cancelado) {
          setSecretError("No pudimos preparar el pago. Revisa tu conexión e inténtalo de nuevo.");
        }
      }
    }, 400);

    return () => {
      cancelado = true;
      clearTimeout(timer);
    };
  }, [datosCompletos, firmaActual, extraJson, name, email, selectedCountry, totalAmount, currency, productId, effectiveIncludeBump, enCuotas]);

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
      {!hideCustomerFields && (
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

          {!hideCountryField && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                País de Residencia
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  if (e.target.value !== "PE") {
                    setIncludeBump(false);
                  }
                }}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              >
                <option value="PE">Perú 🇵🇪 (Soles - S/)</option>
                <option value="US">Estados Unidos 🇺🇸 (USD - $)</option>
                <option value="MX">México 🇲🇽 (USD - $)</option>
                <option value="CO">Colombia 🇨🇴 (USD - $)</option>
                <option value="CL">Chile 🇨🇱 (USD - $)</option>
                <option value="AR">Argentina 🇦🇷 (USD - $)</option>
                <option value="ES">España 🇪🇸 (USD - $)</option>
                <option value="EC">Ecuador 🇪🇨 (USD - $)</option>
                <option value="BO">Bolivia 🇧🇴 (USD - $)</option>
                <option value="OTHER">Otro País 🌐 (USD - $)</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Order Bump Option (Solo visible si el país es Perú) */}
      {shouldShowBump && (
        <div className="mb-4">
          <UpsellOffer
            offerId="addPhysicalBook"
            offerHeadline="SÍ, añadir la versión impresa"
            productTitle="El Libro Físico: El Sistema en tus Manos"
            description="Acceso inmediato. Cero distracciones."
            price={bumpPrice}
            currencySymbol={currencySymbol}
            imageUrl="/subdomains/cerradorexperto/images/cerradorExperto.jpg"
            imageAlt="Edición impresa del libro Cerrador Experto"
            checked={includeBump}
            onChange={setIncludeBump}
          >
            <ul className="space-y-2 text-slate-800 text-xs mt-3 bg-white p-3 rounded-lg border border-slate-200">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <span className="font-bold">Respuesta Rápida:</span> El guion que necesitas, a la mano en segundos.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <span className="font-bold">Dominio Acelerado:</span> Subraya y anota. Lo que se escribe, se aprende y no se olvida.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <span className="font-bold">Herramienta de Equipo:</span> Compártela en llamadas de venta o reuniones presenciales.
                </span>
              </li>
            </ul>
          </UpsellOffer>
        </div>
      )}



      {/* Stripe Payment Element container */}
      {intentVigente ? (
        // key: si cambia el cobro, el formulario se vuelve a montar con el cobro nuevo.
        <Elements
          key={intentVigente.secret}
          stripe={stripePromise}
          options={{
            clientSecret: intentVigente.secret,
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
            onPaid={onPaid}
          />
        </Elements>
      ) : (
        <div className="text-center py-6">
          {secretError ? (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
              {secretError}
            </div>
          ) : datosCompletos ? (
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
