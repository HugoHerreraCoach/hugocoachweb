// src/components/ui/PayPalPaymentForm.tsx

"use client";

import { useState, useId, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createPayPalOrder, capturePayPalOrder } from "@cerradorexperto/actions";
import { UpsellOffer } from './UpsellOffer';
import { LoaderCircle, Check, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import type { ProductID } from '@cerradorexperto/lib/pricing';

type PayPalPaymentFormProps = {
    customerData?: { name: string; email: string; } | null;
    offerDetails?: { amount: number; currency: 'USD' } | undefined;
    showUpsell?: boolean;
    productId: ProductID;
    onSuccessRedirectTo: string;
};

const LS_CUSTOMER_KEY = "hx_customer";
function loadSavedCustomer(): { name: string; email: string; countryCode: string } | null {
    try {
        const raw = localStorage.getItem(LS_CUSTOMER_KEY);
        if (!raw) return null;
        const obj = JSON.parse(raw);
        if (obj && typeof obj.name === "string" && typeof obj.email === "string" && typeof obj.countryCode === "string") {
            return obj;
        }
        return null;
    } catch {
        return null;
    }
}
function saveCustomerLocal(name: string, email: string, countryCode: string) {
    try {
        localStorage.setItem(LS_CUSTOMER_KEY, JSON.stringify({ name, email, countryCode }));
    } catch { }
}



export function PayPalPaymentForm({ customerData, offerDetails, showUpsell = true, productId, onSuccessRedirectTo }: PayPalPaymentFormProps) {
    const id = useId();
    const [name, setName] = useState(customerData?.name ?? '');
    const [email, setEmail] = useState(customerData?.email ?? '');
    const [addPhysicalBook, setAddPhysicalBook] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!customerData) {
            const saved = loadSavedCustomer();
            if (saved) {
                setName(n => n || saved.name);
                setEmail(e => e || saved.email);
            }
        }
    }, [customerData]);

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    const PRECIO_DIGITAL_USD = 7.00;
    const PRECIO_BUMP_USD = 15.00;

    const totalAmount = offerDetails
        ? offerDetails.amount
        : (PRECIO_DIGITAL_USD + (showUpsell && addPhysicalBook ? PRECIO_BUMP_USD : 0));
    const displaySymbol = '$';

    const isFormInvalid = !name || !email || !/^\S+@\S+\.\S+$/.test(email);

    if (!clientId) {
        return <p className="text-red-500 text-center">Error de configuración de PayPal.</p>;
    }

    return (
        <div className="space-y-4 text-black text-left">
            <div className='flex justify-center items-center mb-4'>
                <h3 className='font-semibold text-xl mr-2'>Pagar con</h3>
                <Image
                    src='/subdomains/cerradorexperto/icons/paypal.png'
                    alt='yape'
                    width={500}
                    height={142}
                    className='max-w-[100px]'
                />
            </div>
            <div className="flex flex-col items-start bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className='flex'>
                    <ShieldCheck className="text-green-600 w-6 h-6" />
                    <p className="text-green-700 font-semibold ml-2">Pago 100% seguro</p>
                </div>
                <div>
                    <p className="text-green-700 text-sm mt-1">Utilizamos encriptación SSL de 256 bits para proteger tu información</p>
                </div>
            </div>

            {/* Campos de datos del usuario */}
            <div className="space-y-3">
                <div>
                    <label htmlFor={`${id}-name`} className="block text-base font-medium text-slate-700">Nombre Completo</label>
                    <input type="text" id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border-slate-300 p-2 shadow-sm focus:ring-primary-blue focus:border-primary-blue" placeholder="Ingresa tu nombre" required />
                </div>
                <div>
                    <label htmlFor={`${id}-email`} className="block text-base font-medium text-slate-700">Correo Electrónico</label>
                    <input type="email" id={`${id}-email`} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border-slate-300 p-2 shadow-sm focus:ring-primary-blue focus:border-primary-blue" placeholder="Ingresa tu correo" required />
                </div>
            </div>

            {/* Order Bump (siempre visible en la pestaña de PayPal) */}
            {showUpsell && (
                <UpsellOffer
                    offerId="paypalAddPhysicalBook"
                    offerHeadline="SÍ, añadir la versión impresa"
                    productTitle="El Libro Físico: El Sistema en tus Manos"
                    description="Añade la versión impresa por un precio especial."
                    price={PRECIO_BUMP_USD}
                    currencySymbol="$"
                    imageUrl="/subdomains/cerradorexperto/images/cerradorExperto.jpg"
                    imageAlt="Libro Físico Cerrador Experto"
                    checked={addPhysicalBook}
                    onChange={setAddPhysicalBook}
                >
                    <ul className="space-y-2 text-slate-800">
                        <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>
                                <span className="font-bold">Respuesta Rápida:</span> El guion que necesitas, a la mano en segundos.
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>
                                <span className="font-bold">Dominio Acelerado:</span> Subraya y anota. Lo que se escribe, se aprende y no se olvida.
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>
                                <span className="font-bold">Envío a Domicilio:</span> Recíbelo en la puerta de tu casa (válido para todo el Perú).
                            </span>
                        </li>
                    </ul>
                </UpsellOffer>
            )}


            {/* Total a Pagar */}
            <div className="!mt-6 flex justify-between font-bold text-slate-900 text-lg pt-4 border-t">
                <span>Total a pagar:</span>
                <span>{displaySymbol} {totalAmount.toFixed(2)}</span>
            </div>

            {error && <p className="text-sm text-red-600 font-bold text-center">{error}</p>}

            {/* Botones de PayPal */}
            <div className={`pt-2 transition-opacity ${isFormInvalid || isProcessing ? 'opacity-70 cursor-not-allowed' : 'opacity-100'}`}>
                {isProcessing && (
                    <div className="flex justify-center items-center py-4">
                        <LoaderCircle className="animate-spin h-8 w-8 text-primary-blue" />
                        <span className="ml-2 font-semibold">Procesando...</span>
                    </div>
                )}
                <div style={{ display: isProcessing ? 'none' : 'block' }}>
                    <PayPalScriptProvider options={{ clientId, currency: "USD" }}>
                        <PayPalButtons
                            style={{ layout: "vertical", label: "pay", color: "blue" }}
                            disabled={isFormInvalid || isProcessing}
                            forceReRender={[totalAmount]}
                            createOrder={async () => {
                                setError(null);
                                const description = offerDetails ? "Oferta Especial" : "Compra Libro Cerrador Experto";
                                const res = await createPayPalOrder(totalAmount, description);
                                if (res.success && res.orderId) return res.orderId;
                                setError(res.message || "Error al crear la orden.");
                                throw new Error(res.message);
                            }}
                            onApprove={async (data) => {
                                setIsProcessing(true);
                                setError(null);
                                if (name && email) {
                                    saveCustomerLocal(name.trim(), email.trim(), "INTL");
                                }

                                await capturePayPalOrder(data.orderID, name, email, onSuccessRedirectTo, productId);
                            }}
                            onError={(err) => {
                                console.error("PayPal Error:", err);
                                setError("Ocurrió un error con PayPal. Intenta de nuevo.");
                                setIsProcessing(false);
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>
    );
}