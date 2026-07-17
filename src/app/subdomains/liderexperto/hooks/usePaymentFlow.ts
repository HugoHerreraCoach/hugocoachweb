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
  const [hasTokens, setHasTokens] = useState<boolean | null>(null);
  const [hasUserData, setHasUserData] = useState<boolean | null>(null);
  const [savedTokens, setSavedTokens] = useState<SavedToken[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showCVVInput, setShowCVVInput] = useState(false);
  const [showCVVPopup, setShowCVVPopup] = useState(false);
  const [cvv, setCvv] = useState("");
  const [selectedToken, setSelectedToken] = useState<SavedToken | null>(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  // Cargar datos del usuario y tokens al montar
  useEffect(() => {
    loadUserDataAndTokens();
  }, []);

  const loadUserDataAndTokens = async () => {
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

      // Cargar tokens guardados
      const tokensRes = await fetch("/api/tokens");
      if (tokensRes.ok) {
        const tokens = await tokensRes.json();
        if (Array.isArray(tokens) && tokens.length > 0) {
          setSavedTokens(tokens);
          setSelectedToken(tokens[0]);
          setHasTokens(true);
          console.log("✅ Tokens cargados:", tokens);
        } else {
          setHasTokens(false);
        }
      } else {
        setHasTokens(false);
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
      setHasUserData(false);
      setHasTokens(false);
    }
  };

  const validateCVV = (cvv: string, cardType: string): boolean => {
    if (cardType === "AMEX") {
      return /^\d{4}$/.test(cvv);
    }
    return /^\d{3}$/.test(cvv);
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

  // Procesar el pago con token
  const processTokenPayment = async (cvvValue: string) => {
    if (!selectedToken) return;
    
    setIsProcessing(true);
    const paymentMessage = installments > 1 
      ? `Procesando tu pago en ${installments} cuotas...`
      : "Procesando tu pago...";
    setMessage(paymentMessage);
    
    try {
      const chargeRes = await fetch("/api/payu/charge-with-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creditCardTokenId: selectedToken.tokenid,
          amount: productPrice,
          currency: currency,
          description: productName,
          cvv: cvvValue,
          installments: installments
        }),
      });
      
      const chargeJson = await chargeRes.json();
      
      if (!chargeRes.ok) {
        const isInsufficientFunds = 
          chargeJson.error?.includes("INSUFFICIENT_FUNDS") || 
          chargeJson.message?.includes("fondos insuficientes") ||
          chargeJson.error?.includes("DECLINED") ||
          chargeJson.code === "INSUFFICIENT_FUNDS" ||
          chargeRes.status === 400;

        if (isInsufficientFunds) {
          setShowCVVPopup(false);
          setShowCVVInput(false);
          setCvv("");
          setMessage("Tu tarjeta no tiene fondos suficientes. Te ayudamos con otro método de pago.");
          
          setTimeout(() => {
            setShowPaymentPopup(true);
          }, 2000);
          return;
        }
        
        const errMsg = chargeJson.error || chargeJson.message || "Error al procesar el pago.";
        setMessage(errMsg);
        return;
      }
      
      if (chargeJson.success) {
        handleSuccessfulPayment(chargeJson.transactionId);
      } else {
        setMessage(chargeJson.message || "El pago no pudo completarse.");
      }
    } catch (err) {
      console.error("Error en pago con token:", err);
      const error = err as PaymentError;
      setMessage(
        error.message ||
        error.response?.data?.message ||
        "Error inesperado al intentar el pago."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Manejar CVV del popup
  const handleCVVPayment = async (cvvValue: string) => {
    setCvv(cvvValue);
    setShowCVVPopup(false);
    setShowCVVInput(true);
    await processTokenPayment(cvvValue);
  };

  // Manejar pago con otro método
  const handlePayWithOtherMethod = () => {
    setShowCVVPopup(false);
    setShowCVVInput(false);
    setCvv("");
    setMessage("Configurando otro método de pago...");
    setShowPaymentPopup(true);
  };

  // Intentar pago con token guardado
  const attemptTokenPayment = async () => {
    if (!selectedToken) return;
    
    if (!showCVVInput) {
      setShowCVVPopup(true);
      setMessage("Por seguridad, confirma el código CVV de tu tarjeta para continuar.");
      return;
    }
    
    if (cvv && validateCVV(cvv, selectedToken.payment_method)) {
      await processTokenPayment(cvv);
    }
  };

  // Función principal que maneja el flujo de pago
  const handleOneClickPurchase = async () => {
    if (isProcessing) return;
    
    // FLUJO 1: Si hay tokens guardados Y datos de usuario
    if (hasTokens && savedTokens.length > 0 && hasUserData) {
      console.log("🔄 Flujo: Pago directo con token guardado");
      await attemptTokenPayment();
      return;
    }
    
    // FLUJO 2: Si hay datos de usuario pero NO tokens
    if (hasUserData && !hasTokens) {
      console.log("🔄 Flujo: Datos guardados + nueva tarjeta");
      setMessage("Configurando tu método de pago...");
      setShowPaymentPopup(true);
      return;
    }
    
    // FLUJO 3: Si NO hay datos ni tokens
    if (!hasUserData && !hasTokens) {
      console.log("🔄 Flujo: Usuario nuevo");
      setMessage("Completando información de pago...");
      setShowPaymentPopup(true);
      return;
    }
    
    // FLUJO 4: Si solo hay tokens pero NO datos de usuario
    if (hasTokens && !hasUserData) {
      console.log("🔄 Flujo: Tokens sin datos de usuario");
      setMessage("Completando información de envío...");
      setShowPaymentPopup(true);
      return;
    }
    
    setShowPaymentPopup(true);
  };

  // Manejar éxito del popup de pago
  const handlePaymentSuccess = async (result: PaymentResult) => {
    setShowPaymentPopup(false);
    await loadUserDataAndTokens();
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