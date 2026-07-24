// src/components/ui/PaymentTabs.tsx
"use client";

import { useState } from "react";
import { StripePaymentForm } from './StripePaymentForm';
import { CardPaymentForm } from './CardPaymentForm';
import { YapePaymentForm } from './YapePaymentForm';
import { PayPalPaymentForm } from './PayPalPaymentForm';
import Image from "next/image";
import { CreditCard } from 'lucide-react';
import type { ProductID } from '@cerradorexperto/lib/pricing';

type OfferDetails = {
    amount: number;
    currency: 'PEN' | 'USD';
    usdAmount?: number;
    description?: string;
    installments?: number;
};

type PaymentTabsProps = {
    customerData?: { name: string; email: string; countryCode?: string } | null;
    offerDetails?: OfferDetails;
    showUpsell?: boolean;
    productId: ProductID;
    onSuccessRedirectTo: string;
};

type Tab = 'card' | 'yape' | 'paypal';

export function PaymentTabs({ customerData, offerDetails, showUpsell = true, productId, onSuccessRedirectTo }: PaymentTabsProps) {
    const [activeTab, setActiveTab] = useState<Tab>('card');

    const customerWithCountry: { name: string; email: string; countryCode: string } | undefined =
        customerData ? { name: customerData.name, email: customerData.email, countryCode: customerData.countryCode ?? 'PE' } : undefined;

    const canUseYape = Boolean(offerDetails && offerDetails.currency === 'PEN');
    const canUsePayPal = Boolean(offerDetails && (offerDetails.currency === 'USD' || typeof offerDetails.usdAmount === 'number'));

    const penOffer: { amount: number; currency: 'PEN' } | undefined =
        offerDetails?.currency === 'PEN' ? { amount: offerDetails.amount, currency: 'PEN' } : undefined;

    const paypalAmount = offerDetails
        ? (offerDetails.currency === 'USD' ? offerDetails.amount : offerDetails.usdAmount)
        : undefined;
    const paypalOffer: { amount: number; currency: 'USD' } | undefined =
        typeof paypalAmount === 'number' ? { amount: paypalAmount, currency: 'USD' } : undefined;

    const renderTabContent = () => {
        switch (activeTab) {
            case 'card':
                return <StripePaymentForm customerData={customerWithCountry} offerDetails={offerDetails} showUpsell={showUpsell} productId={productId} onSuccessRedirectTo={onSuccessRedirectTo} />;
            case 'yape':
                return <YapePaymentForm customerData={customerWithCountry} offerDetails={penOffer} showUpsell={showUpsell} productId={productId} onSuccessRedirectTo={onSuccessRedirectTo}  />;
            case 'paypal':
                return <PayPalPaymentForm customerData={customerWithCountry} offerDetails={paypalOffer} showUpsell={showUpsell} productId={productId} onSuccessRedirectTo={onSuccessRedirectTo}  />;
            default:
                return null;
        }
    };


    return (
        <div className="w-full bg-slate-100 rounded-lg p-1 sm:p-2">
            <div className="flex justify-around bg-slate-200 rounded-md p-1 mb-4">
                <button onClick={() => setActiveTab('card')} className={`px-4 py-2 text-sm sm:text-base flex justify-center items-center font-bold rounded-md flex-1 cursor-pointer transition-colors ${activeTab === 'card' ? 'bg-white text-primary-blue shadow' : 'text-slate-600'}`}>
                    <CreditCard size={20} className="mr-1" /><span>Tarjeta</span>
                </button>

                <button onClick={() => setActiveTab('yape')} disabled={!canUseYape} className={`px-4 py-2 text-sm sm:text-base flex justify-center items-center font-bold rounded-md flex-1 cursor-pointer transition-colors ${activeTab === 'yape' ? 'bg-white text-purple-700 shadow' : 'text-slate-600'} disabled:opacity-50 disabled:cursor-not-allowed`}>
                    <Image src="/subdomains/cerradorexperto/icons/yape.png" alt="Yape" width={30} height={30} className="mr-1 rounded-sm" /><span>Yape</span>
                </button>

                <button onClick={() => setActiveTab('paypal')} disabled={!canUsePayPal} className={`px-4 py-2 text-sm sm:text-base flex justify-center items-center font-bold rounded-md flex-1 cursor-pointer transition-colors ${activeTab === 'paypal' ? 'bg-white text-blue-800 shadow' : 'text-slate-600'} disabled:opacity-50 disabled:cursor-not-allowed`}>
                    <Image src="/subdomains/cerradorexperto/icons/paypal.png" alt="PayPal" width={70} height={20} />
                </button>
            </div>

            <div className="p-2 sm:p-4">
                {renderTabContent()}
            </div>
        </div>
    );
}
