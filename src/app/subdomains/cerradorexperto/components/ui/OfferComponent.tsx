//src/components/ui/OfferComponent.tsx

"use client";

import { useState } from 'react';
import { LoaderCircle, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Modal } from '@cerradorexperto/components/ui/Modal';
import { PaymentTabs } from '@cerradorexperto/components/ui/PaymentTabs';
import Link from 'next/link';
import type { ProductID } from '@cerradorexperto/lib/pricing';


type OfferProps = {
    details: {
        amount: number;
        currency: 'PEN' | 'USD';
        description: string;
        installments?: number;
        usdAmount?: number;
    };
    declineUrl: string;
    productId: ProductID;
    onSuccessRedirectTo: string;
};

export function OfferComponent({ details, declineUrl, productId, onSuccessRedirectTo }: OfferProps) {
    const [status, setStatus] = useState<'idle' | 'loading'>('idle');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const handlePurchaseClick = async () => {
        setStatus('loading');
        setStatusMessage(null);

        const customerId = typeof window !== 'undefined' ? localStorage.getItem('stripe_customer_id') : null;

        if (!customerId) {
            // No saved card, open the Stripe payment modal
            setStatus('idle');
            setIsModalOpen(true);
            return;
        }

        try {
            const res = await fetch('/api/stripe/one-click-upsell', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId,
                    productId,
                    amount: details.amount,
                    currency: details.currency,
                    description: details.description,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatusMessage({
                    type: 'success',
                    text: '¡Oferta añadida con éxito! Redirigiendo...',
                });
                setTimeout(() => {
                    window.location.href = onSuccessRedirectTo;
                }, 1200);
            } else {
                setStatusMessage({
                    type: 'error',
                    text: data.error || 'No se pudo procesar el pago de 1-clic con la tarjeta guardada. Por favor, introduce tus datos en el formulario.',
                });
                setStatus('idle');
                setIsModalOpen(true);
            }
        } catch (err) {
            console.error('Error en 1-Click Upsell Stripe:', err);
            setStatusMessage({
                type: 'error',
                text: 'Ocurrió un error inesperado al procesar la compra de 1-clic.',
            });
            setStatus('idle');
            setIsModalOpen(true);
        }
    };

    const isLoading = status === 'loading';
    const mainButtonText = isLoading ? 'PROCESANDO...' : 'SÍ, ¡QUIERO ESTA OFERTA!';

    return (
        <div className="flex flex-col items-center w-full max-w-xl mx-auto">
            {statusMessage && (
                <div
                    className={`mb-4 w-full p-3 rounded-lg flex items-center gap-2 text-sm ${
                        statusMessage.type === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : 'bg-red-50 text-red-700 border border-red-300'
                    }`}
                >
                    {statusMessage.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span>{statusMessage.text}</span>
                </div>
            )}

            {/* --- BOTÓN DE COMPRA PRINCIPAL --- */}
            <button
                onClick={handlePurchaseClick}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-blue to-secondary-blue cursor-pointer text-white font-bold text-2xl py-5 px-6 rounded-lg shadow-xl hover:scale-105 disabled:scale-100 disabled:opacity-70 transition-all duration-300 flex items-center justify-center gap-4"
            >
                {isLoading && <LoaderCircle className="animate-spin h-8 w-8" />}
                <span>{mainButtonText}</span>
            </button>

            <Link
                href={declineUrl}
                className="group inline-flex mt-6 items-center gap-x-2 text-base text-slate-500 transition-colors duration-300 hover:text-slate-400"
            >
                <AlertTriangle className="h-5 w-5 text-amber-500 transition-transform duration-300 group-hover:scale-110" />
                <span className="underline decoration-slate-400 decoration-1 underline-offset-4 group-hover:decoration-slate-600">
                    No, gracias. Renuncio para siempre al descuento de S/600.
                </span>
            </Link>

            {/* --- MODAL PARA PAGO COMPLETO --- */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Completa tu Compra Segura"
            >
                <PaymentTabs
                    offerDetails={details}
                    showUpsell={false}
                    productId={productId}
                    onSuccessRedirectTo={onSuccessRedirectTo}
                />
            </Modal>
        </div>
    );
}