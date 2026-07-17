// src/components/ui/PaymentForm.tsx

"use client";

import { useState } from 'react';
import Image from 'next/image';
import { CreditCard } from 'lucide-react';

import { CardPaymentForm } from './CardPaymentForm';
import { YapePaymentForm } from './YapePaymentForm';
import { PayPalPaymentForm } from './PayPalPaymentForm';

type PaymentMethod = 'card' | 'yape' | 'paypal';

type PaymentFormProps = {
    productId: 'libro-digital' | 'comunidad-lobos' | "comunidad-lobos-cuota-inicial";
    onSuccessRedirectTo: string;
};

export function PaymentForm({ productId, onSuccessRedirectTo }: PaymentFormProps) {
    const [activeMethod, setActiveMethod] = useState<PaymentMethod>('card');

    // NOTA: Toda la lógica de estado para 'selectedCountry' y 'addPhysicalBook' ha sido eliminada.
    // Este componente ahora solo gestiona qué pestaña está activa.

    const getTabClassName = (method: PaymentMethod) => {
        const baseClasses = 'flex-1 p-3 text-center font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 border-b-2';
        if (method === activeMethod) {
            return `${baseClasses} bg-white text-primary-blue shadow-sm border-primary-blue`;
        }
        return `${baseClasses} bg-slate-100 text-slate-500 hover:bg-slate-200 border-transparent`;
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg border border-slate-200">
            {/* PESTAÑAS DE PAGO */}
            <div className="flex bg-slate-100 rounded-t-lg overflow-hidden">
                <button className={getTabClassName('card')} onClick={() => setActiveMethod('card')}>
                    <CreditCard size={20} /><span>Tarjeta</span>
                </button>
                <div className="w-px bg-slate-200"></div>
                <button className={getTabClassName('yape')} onClick={() => setActiveMethod('yape')}>
                    <Image src="/subdomains/cerradorexperto/icons/yape.png" alt="Yape" width={30} height={30} /><span>Yape</span>
                </button>
                <div className="w-px bg-slate-200"></div>
                <button className={getTabClassName('paypal')} onClick={() => setActiveMethod('paypal')}>
                    <Image src="/subdomains/cerradorexperto/icons/paypal.png" alt="PayPal" width={70} height={20} />
                </button>
            </div>

            {/* CONTENIDO DEL FORMULARIO */}
            <div className="p-4 md:p-6">
                {activeMethod === 'card' && <CardPaymentForm productId={productId} onSuccessRedirectTo={onSuccessRedirectTo}/>}
                {activeMethod === 'yape' && <YapePaymentForm productId={productId} onSuccessRedirectTo={onSuccessRedirectTo}/>}
                {activeMethod === 'paypal' && <PayPalPaymentForm productId={productId} onSuccessRedirectTo={onSuccessRedirectTo} />}
            </div>
        </div>
    );
}