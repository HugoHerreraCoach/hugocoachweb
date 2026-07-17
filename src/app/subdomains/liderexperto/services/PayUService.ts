// src/services/PayUService.ts
import { 
  FormData, 
  PaymentResult, 
  FullPayUResponse, 
  PayUTransactionResponse 
} from "../types/checkout";
import { generateReference } from "../utils/validations";

// Interfaz para los datos del token que devuelve PayU
interface TokenData {
  creditCardTokenId: string;
  maskedNumber: string;
  paymentMethod: string;
  expirationDate: string;
}

export class PayUService {
  // Obtener IP del cliente
  private static async getClientIP(): Promise<string> {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch {
      return "127.0.0.1";
    }
  }

  // Sanitizar cookie
  private static sanitizeCookie(cookie: string): string {
    if (!cookie) return "session=checkout";
    if (cookie.length > 200) {
      return cookie.substring(0, 200);
    }
    return cookie;
  }

  // Sanitizar user agent
  private static sanitizeUserAgent(userAgent: string): string {
    if (!userAgent) return "Mozilla/5.0 (compatible; Checkout)";
    const cleaned = userAgent.replace(/[^\w\s\.\-\(\)\/;:,]/g, "");
    return cleaned.length > 100 ? cleaned.substring(0, 100) : cleaned;
  }

  // Obtener datos comunes para todas las transacciones
  private static async getCommonTransactionData(
    formData: FormData,
    totalAmount: number,
    referenceCode: string
  ) {
    const ipAddress = await this.getClientIP();
    const formattedAmount = Number(totalAmount.toFixed(2));

    // Generar signature
    const signatureResponse = await fetch("/api/payu/signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referenceCode,
        amount: formattedAmount,
        currency: "PEN",
      }),
    });

    if (!signatureResponse.ok) {
      throw new Error("Error generando signature");
    }

    const { signature } = await signatureResponse.json();

    // Obtener cookie y user agent
    const rawCookie = typeof document !== "undefined" ? document.cookie : "";
    const rawUserAgent = typeof navigator !== "undefined" ? navigator.userAgent : "Mozilla/5.0";
    const cleanCookie = this.sanitizeCookie(rawCookie);
    const cleanUserAgent = this.sanitizeUserAgent(rawUserAgent);

    return {
      ipAddress,
      formattedAmount,
      signature,
      cleanCookie,
      cleanUserAgent,
      deviceSessionId: `session_${Date.now()}`,
    };
  }

  // Construir datos del comprador/pagador
  private static buildBuyerPayerData(formData: FormData) {
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const phone = `${formData.phoneCountryCode}${formData.phoneNumber}`;
    
    const addressData = {
      street1: formData.address,
      street2: formData.reference || "",
      city: formData.city,
      state: formData.department,
      country: "PE",
      postalCode: formData.postalCode,
      phone,
    };

    return {
      buyer: {
        merchantBuyerId: formData.email,
        fullName,
        emailAddress: formData.email,
        contactPhone: phone,
        dniNumber: formData.identificationNumber,
        shippingAddress: addressData,
      },
      payer: {
        merchantPayerId: formData.email,
        fullName: formData.cardHolderName || fullName,
        emailAddress: formData.email,
        contactPhone: phone,
        dniNumber: formData.identificationNumber,
        billingAddress: addressData,
      },
    };
  }

  // Procesar pago con tarjeta directa
  static async processPayment(
    formData: FormData,
    totalAmount: number
  ): Promise<PaymentResult> {
    const referenceCode = generateReference();
    
    try {
      const commonData = await this.getCommonTransactionData(formData, totalAmount, referenceCode);
      const { buyer, payer } = this.buildBuyerPayerData(formData);

      const paymentData = {
        language: "es",
        command: "SUBMIT_TRANSACTION",
        transaction: {
          order: {
            referenceCode,
            description: "Compra Libro Líder Experto",
            language: "es",
            signature: commonData.signature,
            additionalValues: {
              TX_VALUE: {
                value: commonData.formattedAmount,
                currency: "PEN",
              },
            },
            buyer,
          },
          payer,
          creditCard: {
            number: formData.cardNumber.replace(/\s+/g, ""),
            securityCode: formData.cvv,
            expirationDate: `${formData.expiryYear}/${formData.expiryMonth.padStart(2, "0")}`,
            name: formData.cardHolderName,
          },
          extraParameters: {
            INSTALLMENTS_NUMBER: 1,
          },
          type: "AUTHORIZATION_AND_CAPTURE",
          paymentMethod: formData.paymentMethod,
          paymentCountry: "PE",
          deviceSessionId: commonData.deviceSessionId,
          ipAddress: commonData.ipAddress,
          cookie: commonData.cleanCookie,
          userAgent: commonData.cleanUserAgent,
        },
        test: false,
      };

      const response = await fetch("/api/payu/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const resultJson: FullPayUResponse = await response.json();
      const tr = resultJson.transactionResponse;
      const isSuccess = tr?.state === 'APPROVED' || tr?.state === 'PENDING';
      
      if (!isSuccess) {
        throw new Error(this.getResponseMessage(tr, resultJson));
      }
      
      return {
        success: true,
        transactionId: tr.transactionId,
        referenceCode,
        message: this.getResponseMessage(tr, resultJson),
        responseCode: tr.responseCode,
        state: tr.state,
      };
    } catch (error) {
      return {
        success: false,
        referenceCode,
        message: error instanceof Error ? error.message : "Error desconocido en el proceso.",
      };
    }
  }

  // Procesar pago con token de tarjeta
  static async processPaymentWithToken(
    formData: FormData,
    totalAmount: number,
    creditCardTokenId: string,
    tokenData?: TokenData
  ): Promise<PaymentResult> {
    const referenceCode = generateReference();
    
    try {
      const commonData = await this.getCommonTransactionData(formData, totalAmount, referenceCode);
      const { buyer, payer } = this.buildBuyerPayerData(formData);

      const paymentPayload = {
        language: "es",
        command: "SUBMIT_TRANSACTION",
        transaction: {
          order: {
            referenceCode,
            description: "Compra Libro Líder Experto",
            language: "es",
            signature: commonData.signature,
            additionalValues: {
              TX_VALUE: {
                value: commonData.formattedAmount,
                currency: "PEN",
              },
            },
            buyer,
          },
          payer,
          creditCardTokenId,
          creditCard: {
            securityCode: formData.cvv,
          },
          extraParameters: {
            INSTALLMENTS_NUMBER: 1,
          },
          type: "AUTHORIZATION_AND_CAPTURE",
          paymentMethod: formData.paymentMethod,
          paymentCountry: "PE",
          deviceSessionId: commonData.deviceSessionId,
          ipAddress: commonData.ipAddress,
          cookie: commonData.cleanCookie,
          userAgent: commonData.cleanUserAgent,
        },
        test: false,
        // Información adicional para guardar token si es nuevo
        ...(tokenData && { tokenToSave: tokenData })
      };

      const response = await fetch("/api/payu/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(paymentPayload),
      });

      const resultJson: FullPayUResponse = await response.json();
      const tr = resultJson.transactionResponse;
      const isSuccess = tr?.state === 'APPROVED' || tr?.state === 'PENDING';
      
      if (!isSuccess) {
        throw new Error(this.getResponseMessage(tr, resultJson));
      }
      
      return {
        success: true,
        transactionId: tr.transactionId,
        referenceCode,
        message: this.getResponseMessage(tr, resultJson),
        responseCode: tr.responseCode,
        state: tr.state,
      };
    } catch (error) {
      return {
        success: false,
        referenceCode,
        message: error instanceof Error ? error.message : "Error desconocido en el proceso.",
      };
    }
  }

  // Procesar pago con Yape
  static async processYape(
    formData: FormData,
    totalAmount: number,
    yapeNumber: string,
    yapeCodeArray: string[]
  ): Promise<PaymentResult> {
    const referenceCode = generateReference();
    
    try {
      const commonData = await this.getCommonTransactionData(formData, totalAmount, referenceCode);
      const { buyer } = this.buildBuyerPayerData(formData);
      
      const otp = yapeCodeArray.join("");
      const expirationDate = new Date(Date.now() + 20 * 60 * 1000).toISOString();

      const paymentData = {
        language: "es",
        command: "SUBMIT_TRANSACTION",
        transaction: {
          order: {
            referenceCode,
            description: "Compra Libro Líder Experto",
            language: "es",
            signature: commonData.signature,
            additionalValues: {
              TX_VALUE: {
                value: commonData.formattedAmount,
                currency: "PEN",
              },
            },
            buyer,
          },
          extraParameters: {
            OTP: otp,
          },
          payer: {
            merchantPayerId: formData.email,
            fullName: `${formData.firstName} ${formData.lastName}`,
            emailAddress: formData.email,
            contactPhone: yapeNumber.replace(/\s+/g, ""),
            dniNumber: formData.identificationNumber,
            billingAddress: buyer.shippingAddress,
          },
          type: "AUTHORIZATION_AND_CAPTURE",
          paymentMethod: "YAPE",
          paymentCountry: "PE",
          expirationDate,
          deviceSessionId: commonData.deviceSessionId,
          ipAddress: commonData.ipAddress,
          cookie: commonData.cleanCookie,
          userAgent: commonData.cleanUserAgent,
        },
        test: false,
      };

      const response = await fetch("/api/payu/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const resultJson: FullPayUResponse = await response.json();
      const tr = resultJson.transactionResponse;
      const isSuccess = tr?.state === 'APPROVED' || tr?.state === 'PENDING';
      
      if (!isSuccess) {
        throw new Error(this.getResponseMessage(tr, resultJson));
      }
      
      return {
        success: true,
        message: this.getResponseMessage(tr, resultJson),
        transactionId: tr.transactionId,
        referenceCode,
        state: tr.state,
      };
    } catch (error) {
      return {
        success: false,
        referenceCode,
        message: error instanceof Error ? error.message : "Error desconocido al procesar Yape.",
      };
    }
  }

  // Obtener mensaje de respuesta
  private static getResponseMessage(
    transactionResponse?: PayUTransactionResponse,
    fullResponse?: FullPayUResponse
  ): string {
    const messageMap: Record<string, string> = {
      // Estados de Éxito
      'APPROVED': "¡Tu pago ha sido aprobado exitosamente!",
      'PENDING': "Tu pago está pendiente de confirmación. Te notificaremos el resultado por correo.",
      
      // Errores Comunes
      'DECLINED': 'Tu banco ha declinado la transacción. Te recomendamos intentar con otro método de pago.',
      'INSUFFICIENT_FUNDS': 'Tu tarjeta no cuenta con fondos suficientes para completar la compra.',
      'INVALID_EXPIRATION_DATE_OR_SECURITY_CODE': 'La fecha de vencimiento o el código de seguridad son incorrectos.',
      'EXPIRED_CARD': 'La tarjeta que estás usando ha vencido.',
      'INVALID_CARD': 'El número de tarjeta que ingresaste no es válido.',
      'CONTACT_THE_ENTITY': 'Tu banco ha solicitado que te comuniques con ellos para autorizar esta compra.',
      'UNAUTHORIZED_TRANSACTION': 'Tu banco no ha autorizado esta transacción.',
      'RESTRICTED_CARD': 'Tu tarjeta tiene restricciones que impiden este tipo de compra.',
      'CARD_BLOCKED': 'Tu tarjeta se encuentra bloqueada por seguridad.',
      'ANTIFRAUD_REJECTED': 'La transacción fue rechazada por seguridad.',
      'PAYMENT_NETWORK_REJECTED': 'La transacción fue rechazada por la red de pagos.',
      'ENTITY_DECLINED': 'Tu banco ha declinado la transacción.',
      
      // Errores del Sistema
      'ERROR': 'Ocurrió un error al procesar el pago. Por favor, intenta nuevamente.',
      'INTERNAL_PAYMENT_PROVIDER_ERROR': 'El sistema de pagos presenta una intermitencia.',
      'INACTIVE_PAYMENT_PROVIDER': 'Este método de pago no está disponible temporalmente.',
      'ERROR_PROCESSING_TRANSACTION': 'Ocurrió un error inesperado al procesar tu pago.',
      'ERROR_CONVERTING_TRANSACTION_AMOUNTS': 'Ocurrió un error con el monto de la transacción.',
      'INVALID_TRANSACTION': 'Los datos de la transacción son inválidos.',
      
      // Mensajes Yape
      '410': "El código de aprobación de Yape es incorrecto. Por favor, verifica e intenta de nuevo.",
      'INVALID_OTP': "El código de aprobación de Yape es incorrecto.",
      'EXPIRED_OTP': "El código de aprobación de Yape ha expirado.",
      'YAPE_INSUFFICIENT_FUNDS': "No cuentas con fondos suficientes en tu cuenta Yape.",
      'YAPE_ACCOUNT_BLOCKED': "Tu cuenta Yape se encuentra bloqueada.",
      'YAPE_DAILY_LIMIT_EXCEEDED': "Has excedido el límite de compras diario de tu cuenta Yape.",
      'YAPE_SERVICE_UNAVAILABLE': "El servicio de Yape no está disponible en este momento.",
      'YAPE_TRANSACTION_TIMEOUT': "La transacción con Yape ha expirado por tiempo.",
      'INVALID_YAPE_NUMBER': "El número de celular asociado a Yape no es válido.",
    };

    // Prioridad de mensajes
    if (transactionResponse?.state && messageMap[transactionResponse.state]) {
      return messageMap[transactionResponse.state];
    }

    if (transactionResponse?.responseMessage?.includes("OTP Incorrecto")) {
      return messageMap['410'];
    }

    // Buscar en códigos de error
    const errorKeys = [
      transactionResponse?.responseCode,
      transactionResponse?.errorCode,
      transactionResponse?.paymentNetworkResponseCode
    ];

    for (const key of errorKeys) {
      if (key && messageMap[key]) {
        return messageMap[key];
      }
    }

    // Fallbacks
    if (transactionResponse?.paymentNetworkResponseErrorMessage) {
      return transactionResponse.paymentNetworkResponseErrorMessage;
    }

    if (transactionResponse?.additionalInfo?.responseNetworkMessage) {
      return transactionResponse.additionalInfo.responseNetworkMessage;
    }

    if (fullResponse?.error) {
      return fullResponse.error;
    }

    if (transactionResponse?.responseMessage) {
      return transactionResponse.responseMessage;
    }

    return "No se pudo procesar tu pago. Por favor, revisa tus datos o intenta con otro método de pago.";
  }
}