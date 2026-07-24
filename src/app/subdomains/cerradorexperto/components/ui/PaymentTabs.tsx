// src/components/ui/PaymentTabs.tsx
"use client";

import { StripePaymentForm } from './StripePaymentForm';
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

export function PaymentTabs({ customerData, offerDetails, showUpsell = true, productId, onSuccessRedirectTo }: PaymentTabsProps) {
    const customerWithCountry: { name: string; email: string; countryCode: string } | undefined =
        customerData ? { name: customerData.name, email: customerData.email, countryCode: customerData.countryCode ?? 'PE' } : undefined;

    return (
        <div className="w-full">
            <StripePaymentForm 
                customerData={customerWithCountry} 
                offerDetails={offerDetails} 
                showUpsell={showUpsell} 
                productId={productId} 
                onSuccessRedirectTo={onSuccessRedirectTo} 
            />
        </div>
    );
}

