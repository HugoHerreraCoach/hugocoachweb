// src/hooks/usePaymentFlow.ts
"use client"

import { useState, useEffect, useCallback } from 'react';

// Meta Ads tracking
declare global {
  interface Window {
    fbq: (action: string, event: string, data?: Record<string, unknown>) => void;
  }
}

// Helper function to safely call fbq
const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    if (window.fbq && typeof window.fbq === 'function') {
      // console.log(`🎯 Meta Pixel: Tracking ${eventName}`, data);
      window.fbq('track', eventName, data);
    } else {
      // console.warn(`⚠️ Meta Pixel: fbq not available for ${eventName}`);
    }
  }
};

export interface PaymentError extends Error {
  code?: string;
  details?: string;
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
}

export interface SavedToken {
  tokenid: string;
  masked_number: string;
  payment_method: string;
  expiration_date: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  address: string;
  reference?: string;
  country: string;
  department: string;
  city: string;
  postalCode: string;
  identificationType: string;
  identificationNumber: string;
}

export interface PaymentResult {
  success: boolean;
  message: string;
  transactionId?: string;
  referenceCode?: string;
  state?: string;
}

interface UsePaymentFlowProps {
  productName: string;
  productPrice: number;
  currency: string;
  installments?: number;
  onSuccess?: (transactionId?: string) => void;
  redirectUrl?: string;
}

export const usePaymentFlow = ({
  productName,
  productPrice,
  currency,
  installments = 1,
  onSuccess,
  redirectUrl = '/pricing'
}: UsePaymentFlowProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [hasTokens] = useState<boolean>(false);
  const [hasUserData, setHasUserData] = useState<boolean | null>(null);
  const [savedTokens] = useState<SavedToken[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showCVVInput] = useState(false);
  const [showCVVPopup, setShowCVVPopup] = useState(false);
  const [cvv] = useState("");
  const [selectedToken] = useState<SavedToken | null>(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  // Cargar datos del usuario al montar
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Cargar datos del usuario
      const userDataRes = await fetch("/api/user/data");
      if (userDataRes.ok) {
        const userData = await userDataRes.json();
        setUserData(userData);
        setHasUserData(true);
        console.log("✅ Datos del usuario cargados:", userData);
      } else {
        console.log("❌ No se encontraron datos del usuario");
        setHasUserData(false);
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
      setHasUserData(false);
    }
  };

  // Manejar pago exitoso
  const handleSuccessfulPayment = useCallback(async (transactionId?: string) => {
    const successMessage = installments > 1
      ? `¡Pago exitoso! Tu compra de ${installments} cuotas ha sido procesada. Serás redirigido al área de miembros...`
      : "¡Pago exitoso! Gracias por tu compra. Serás redirigido al área de miembros...";
    setMessage(successMessage);
    
    // Guardar información de la compra exitosa
    sessionStorage.setItem("purchase_success", JSON.stringify({
      transactionId: transactionId,
      amount: productPrice,
      product: productName,
      installments: installments
    }));

    // Track Purchase event in Meta Ads
    try {
      // 1. Browser pixel tracking
      trackEvent('Purchase', {
        value: productPrice,
        currency: currency,
        content_ids: [productName.toLowerCase().replace(/\s+/g, '-')],
        content_name: productName,
        num_items: 1
      });

      // 2. Server-side API tracking
      await fetch('/api/meta/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'Purchase',
          userData: userData ? {
            fn: userData.firstName,
            ln: userData.lastName,
            em: userData.email,
            ph: userData.phoneNumber,
          } : {},
          customData: {
            value: productPrice,
            currency: currency,
            content_ids: [productName.toLowerCase().replace(/\s+/g, '-')],
            content_name: productName,
            num_items: 1
          }
        }),
      });
    } catch (error) {
      console.error("Error sending Purchase event to Meta:", error);
    }

    // Callback personalizado si existe
    if (onSuccess) {
      onSuccess(transactionId);
    }

    // Redirigir después de 3 segundos
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 3000);
  }, [productName, productPrice, currency, redirectUrl, onSuccess, installments, userData]);

  // Manejar CVV del popup (Legacy / No-op)
  const handleCVVPayment = async (cvvValue: string) => {
    setShowCVVPopup(false);
  };

  // Manejar pago con otro método (Legacy / No-op)
  const handlePayWithOtherMethod = () => {
    setShowCVVPopup(false);
    setShowPaymentPopup(true);
  };

  // Función principal que maneja el flujo de pago
  const handleOneClickPurchase = async () => {
    if (isProcessing) return;
    
    // Abrir popup de pago con Stripe
    setShowPaymentPopup(true);
  };

  // Manejar éxito del popup de pago
  const handlePaymentSuccess = async (result: PaymentResult) => {
    setShowPaymentPopup(false);
    await loadUserData();
    handleSuccessfulPayment(result.transactionId);
  };

  // Cerrar popup de pago
  const handlePaymentClose = () => {
    setShowPaymentPopup(false);
    setMessage(null);
  };

  return {
    // Estados
    isProcessing,
    message,
    hasTokens,
    hasUserData,
    savedTokens,
    userData,
    showCVVInput,
    showCVVPopup,
    selectedToken,
    showPaymentPopup,
    installments,
    
    // Funciones
    handleOneClickPurchase,
    handleCVVPayment,
    handlePayWithOtherMethod,
    handlePaymentSuccess,
    handlePaymentClose,
    setShowCVVPopup,
    setMessage,
  };
};