//src/components/ui/OfferComponent.tsx

"use client";

import { useActionState, useEffect, useRef, useState } from 'react';
import { getOfferContext, processOneClickPurchase, type OfferContext, type OneClickState } from '@cerradorexperto/actions';
import { LoaderCircle, AlertTriangle } from 'lucide-react';
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
    const [customerContext, setCustomerContext] = useState<OfferContext | null>(null);

    const oneClickFormRef = useRef<HTMLFormElement>(null);
    const [oneClickResult, oneClickAction, isOneClickPending] = useActionState<OneClickState | null, FormData>(processOneClickPurchase, null);

    const [sessionTransactionId, setSessionTransactionId] = useState('');

    useEffect(() => {
        const storedId = localStorage.getItem('sessionTransactionId') ?? '';
        setSessionTransactionId(storedId);
    }, []);

    useEffect(() => {
        if (oneClickResult?.message) {
            setStatus('idle');
            setIsModalOpen(true);
        }
    }, [oneClickResult]);

    useEffect(() => {
        if (!isOneClickPending) {
            setStatus('idle');
        }
    }, [isOneClickPending])

    const handlePurchaseClick = async () => {
        setStatus('loading');
        const sessionId = localStorage.getItem('sessionTransactionId');

        if (!sessionId) {
            // No hay sesión, abrimos el modal directamente.
            setStatus('idle');
            setIsModalOpen(true);
            return;
        }

        const context = await getOfferContext(sessionId);
        setCustomerContext(context);

        if (context?.paymentToken) {
            setTimeout(() => {
                oneClickFormRef.current?.requestSubmit();
            }, 100);
        } else {
            setStatus('idle');
            setIsModalOpen(true);
        }
    };

    const isLoading = status === 'loading' || isOneClickPending;
    const mainButtonText = isLoading ? 'PROCESANDO...' : 'SÍ, ¡QUIERO ESTA OFERTA!';

    return (
        <div className="flex flex-col items-center w-full max-w-xl mx-auto">
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
                {/* Ícono de advertencia para reforzar la consecuencia de la acción. */}
                <AlertTriangle className="h-5 w-5 text-amber-500 transition-transform duration-300 group-hover:scale-110" />
                <span className="underline decoration-slate-400 decoration-1 underline-offset-4 group-hover:decoration-slate-600">
                    No, gracias. Renuncio para siempre al descuento de S/600.
                </span>
            </Link>

            {/* --- FORMULARIO OCULTO PARA EL PAGO CON UN CLIC --- */}
            <form ref={oneClickFormRef} action={oneClickAction} className="hidden">
                <input type="hidden" name="sessionTransactionId" value={sessionTransactionId} />
                <input type="hidden" name="amount" value={details.amount.toFixed(2)} />
                <input type="hidden" name="currency" value={details.currency} />
                <input type="hidden" name="description" value={details.description} />
                <input type="hidden" name="installments" value={details.installments ?? 1} />
                <input type="hidden" name="onSuccessRedirectTo" value={onSuccessRedirectTo} />
                <input type="hidden" name="productId" value={productId} />
            </form>

            {/* --- MODAL PARA PAGO COMPLETO --- */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Completa tu Compra Segura"
            >
                {oneClickResult?.message && (
                    <p className="w-full mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-center font-medium">
                        {oneClickResult.message}
                    </p>
                )}
                <PaymentTabs
                    customerData={customerContext?.customer}
                    offerDetails={details}
                    showUpsell={false}
                    productId={productId}
                    onSuccessRedirectTo={onSuccessRedirectTo}
                />
            </Modal>
        </div>
    );
}