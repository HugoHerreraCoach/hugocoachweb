// src/components/ui/PaymentForm.tsx

"use client";

import { StripePaymentForm } from './StripePaymentForm';
import type { ProductID } from '@cerradorexperto/lib/pricing';

type PaymentFormProps = {
    productId: ProductID;
    onSuccessRedirectTo: string;
};

export function PaymentForm({ productId, onSuccessRedirectTo }: PaymentFormProps) {
    return (
        <div className="w-full">
            <StripePaymentForm
                productId={productId}
                onSuccessRedirectTo={onSuccessRedirectTo}
                showUpsell={true}
            />
        </div>
    );
}