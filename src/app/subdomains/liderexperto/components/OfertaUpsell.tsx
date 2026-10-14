// src/app/subdomains/liderexperto/components/OfertaUpsell.tsx
// Botón de compra de las ofertas que siguen al libro (Lobos de Ventas).
//
// Si el cliente ya pagó el libro, Stripe guardó su tarjeta: se cobra con un clic. Si no hay
// tarjeta guardada, o el banco la rechaza sin pedir confirmación, se abre el formulario seguro
// de Stripe (con nombre y correo ya prellenados cuando se conocen). El monto lo vuelve a
// calcular el servidor; el navegador solo lo muestra.
"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Modal } from "@cerradorexperto/components/ui/Modal";
import { StripePaymentForm } from "@cerradorexperto/components/ui/StripePaymentForm";
import { getPlanEnCuotas } from "@cerradorexperto/lib/pricing";
import { COMPRADOR_STORAGE_KEY } from "@liderexperto/constants/checkout";

type Mensaje = { tipo: "ok" | "error"; texto: string };

interface OfertaUpsellProps {
  /** Id del producto: debe existir en el catálogo (lib/productos.ts y cerradorexperto/lib/pricing.ts). */
  productId: string;
  /** Monto de cada cobro en soles; solo se muestra, el servidor calcula el real. */
  monto: number;
  /** Texto que verá el cliente en su estado de cuenta y en el aviso al administrador. */
  descripcion: string;
  textoBoton?: string;
  /** Contenido propio del botón; si se da, reemplaza a textoBoton. */
  children?: ReactNode;
  buttonClassName?: string;
  showIcon?: boolean;
  /** A dónde ir cuando el pago se confirma. */
  exitoUrl?: string;
}

export default function OfertaUpsell({
  productId,
  monto,
  descripcion,
  textoBoton = "¡Sí, quiero esta oferta!",
  children,
  buttonClassName = "bg-[#0FBA72] hover:bg-green-600 flex items-center px-4 py-4 rounded-lg mx-auto border-b-6 border-[#01A25E] font-barlow-condensed font-bold text-2xl md:text-3xl lg:text-4xl leading-[1.2] cursor-pointer",
  showIcon = true,
  exitoUrl = "/gracias",
}: OfertaUpsellProps) {
  const plan = getPlanEnCuotas(productId);
  const [estado, setEstado] = useState<"inactivo" | "cargando" | "listo">("inactivo");
  const [mensaje, setMensaje] = useState<Mensaje | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [comprador, setComprador] = useState<{ nombre: string; email: string }>({ nombre: "", email: "" });

  const abrirFormulario = () => {
    // Nombre y correo que dejó al pedir el libro, para que solo falte la tarjeta.
    try {
      const guardado = sessionStorage.getItem(COMPRADOR_STORAGE_KEY);
      if (guardado) {
        const { nombre, email } = JSON.parse(guardado);
        setComprador({ nombre: nombre || "", email: email || "" });
      }
    } catch {
      // Sin datos guardados el formulario los pide.
    }
    setModalAbierto(true);
  };

  const comprar = async () => {
    setEstado("cargando");
    setMensaje(null);

    const customerId = localStorage.getItem("stripe_customer_id");
    if (!customerId) {
      setEstado("inactivo");
      abrirFormulario();
      return;
    }

    try {
      const res = plan
        ? await fetch("/api/stripe/subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerId, productId, currency: "PEN" }),
          })
        : await fetch("/api/stripe/one-click-upsell", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerId, productId, amount: monto, currency: "PEN", description: descripcion }),
          });

      const data = await res.json();
      const cobrado = plan ? data.cobradoDeInmediato : data.success;

      if (res.ok && cobrado) {
        setEstado("listo");
        setMensaje({ tipo: "ok", texto: "¡Listo! Tu compra fue confirmada. Te llevamos a tu confirmación..." });
        setTimeout(() => {
          window.location.href = exitoUrl;
        }, 1200);
        return;
      }
    } catch (error) {
      console.error("Error en el cobro de 1 clic:", error);
    }

    // Sin tarjeta guardada que el banco acepte sin confirmación: se pide la tarjeta.
    setEstado("inactivo");
    setMensaje({
      tipo: "error",
      texto: "No pudimos cobrar tu tarjeta guardada. Ingresa los datos de tu tarjeta para completar tu compra.",
    });
    abrirFormulario();
  };

  const ocupado = estado !== "inactivo";

  return (
    <>
      <button className={`${buttonClassName} disabled:opacity-50 disabled:cursor-not-allowed`} onClick={comprar} disabled={ocupado}>
        {showIcon && (
          <Image
            src="/subdomains/liderexperto/lobos/cartIcon.png"
            alt="Icono de carrito"
            width={80}
            height={80}
            className="w-[35px] mr-2 md:w-[45px]"
          />
        )}
        {estado === "cargando" ? (
          <span className="text-white">Procesando pago...</span>
        ) : (
          children ?? <span className="text-white">{textoBoton}</span>
        )}
      </button>

      {plan && (
        <p className="mt-3 max-w-md mx-auto text-center text-sm text-gray-600 leading-snug">
          Al continuar autorizas <strong>{plan.cuotas} cobros mensuales</strong> de <strong>S/{monto.toFixed(2)}</strong> (S/
          {(monto * plan.cuotas).toFixed(2)} en total). El primero se cobra hoy y los {plan.cuotas - 1} restantes cada 30 días.
        </p>
      )}

      {mensaje && (
        <div
          className={`mt-4 p-3 rounded-lg max-w-md mx-auto text-center text-sm font-medium ${
            mensaje.tipo === "ok"
              ? "bg-green-100 border border-green-300 text-green-800"
              : "bg-red-100 border border-red-300 text-red-800"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} title="Completa tu compra segura">
        <StripePaymentForm
          customerData={{ name: comprador.nombre, email: comprador.email, countryCode: "PE" }}
          hideCountryField
          offerDetails={{ amount: monto, currency: "PEN" }}
          showUpsell={false}
          productId={productId}
          onSuccessRedirectTo={exitoUrl}
        />
      </Modal>
    </>
  );
}
