// src/app/api/payu/charge-with-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getTokensBySession, getUserDataBySession } from "@liderexperto/lib/db";

const PAYU_URL = "https://api.payulatam.com/payments-api/4.0/service.cgi";

interface ChargeWithTokenRequest {
  creditCardTokenId: string;
  amount: number;
  currency: string;
  description: string;
  cvv?: string; // Opcional para validación adicional
  installments?: number; // Número de cuotas
}
interface PayUTransactionResponse {
  state: 'APPROVED' | 'PENDING' | 'DECLINED' | 'ERROR';
  responseCode?: string;
  responseMessage?: string;
  transactionId?: string;
  paymentNetworkResponseCode?: string;
  paymentNetworkResponseErrorMessage?: string;
  trazabilityCode?: string;
  authorizationCode?: string;
  pendingReason?: string;
  errorCode?: string;
}

interface PayUFullResponse {
  code?: string;
  error?: string;
  transactionResponse?: PayUTransactionResponse;
}

// Función para obtener IP del cliente
async function getClientIP(): Promise<string> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch {
    return "127.0.0.1";
  }
}

// Función para limpiar cookie
function sanitizeCookie(cookie: string): string {
  if (!cookie) return "session=checkout";
  if (cookie.length > 200) {
    return cookie.substring(0, 200);
  }
  return cookie;
}

// Función para limpiar user agent
function sanitizeUserAgent(userAgent: string): string {
  if (!userAgent) return "Mozilla/5.0 (compatible; Checkout)";
  const cleaned = userAgent.replace(/[^\w\s\.\-\(\)\/;:,]/g, "");
  return cleaned.length > 100 ? cleaned.substring(0, 100) : cleaned;
}

// Generar referencia única
function generateReference(): string {
  return `REF_TOKEN_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export async function POST(req: NextRequest) {
  try {
    console.log("🔥 Iniciando cargo con token guardado");
    
    const body: ChargeWithTokenRequest = await req.json();
    const { creditCardTokenId, amount, currency, description, cvv, installments } = body;

    // Validar parámetros requeridos
    if (!creditCardTokenId || !amount || !currency || !description) {
      return NextResponse.json({
        error: "Parámetros requeridos: creditCardTokenId, amount, currency, description"
      }, { status: 400 });
    }

    // Obtener sessionId de las cookies
    const cookieSession = req.cookies.get("session_id")?.value;
    if (!cookieSession) {
      return NextResponse.json({
        error: "No se encontró sesión de usuario"
      }, { status: 401 });
    }

    // Verificar que el token pertenece a la sesión actual
    const userTokens = await getTokensBySession(cookieSession);
    const tokenExists = userTokens.find(token => token.tokenid === creditCardTokenId);
    
    if (!tokenExists) {
      return NextResponse.json({
        error: "Token no válido para esta sesión"
      }, { status: 403 });
    }

    // Obtener datos del usuario persistidos
    const userData = await getUserDataBySession(cookieSession);
    if (!userData) {
      return NextResponse.json({
        error: "No se encontraron datos del usuario. Debe completar el formulario primero."
      }, { status: 404 });
    }

    // Validar credenciales de PayU
    const merchantId = process.env.PAYU_MERCHANT_ID;
    const apiKey = process.env.PAYU_API_KEY;
    const apiLogin = process.env.PAYU_API_LOGIN;
    const accountId = process.env.PAYU_ACCOUNT_ID;

    if (!merchantId || !apiKey || !apiLogin || !accountId) {
      console.error('❌ Faltan credenciales de PayU');
      return NextResponse.json({
        error: 'Error de configuración del servidor'
      }, { status: 500 });
    }

    // Generar referencia y signature
    const referenceCode = generateReference();
    const formattedAmount = Number(amount).toFixed(2);
    
    // 1) Generar signature
    const sigRes = await fetch(`${req.nextUrl.origin}/api/payu/signature`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referenceCode,
        amount: formattedAmount,
        currency,
      }),
    });

    if (!sigRes.ok) {
      const err = await sigRes.json();
      return NextResponse.json({ 
        error: "No se pudo generar la firma", 
        details: err 
      }, { status: 500 });
    }

    const { signature } = await sigRes.json();
    console.log("✅ Firma generada correctamente");

    // Obtener datos adicionales
    const ipAddress = await getClientIP();
    const rawCookie = req.headers.get("cookie") || "";
    const rawUserAgent = req.headers.get("user-agent") || "Mozilla/5.0";
    const cleanCookie = sanitizeCookie(rawCookie);
    const cleanUserAgent = sanitizeUserAgent(rawUserAgent);

    // 2) Construir payload para PayU usando datos persistidos
    const payload = {
      language: "es",
      command: "SUBMIT_TRANSACTION",
      merchant: {
        apiKey: apiKey,
        apiLogin: apiLogin,
      },
      transaction: {
        order: {
          accountId: accountId,
          referenceCode,
          description: description,
          language: "es",
          signature,
          additionalValues: {
            TX_VALUE: {
              value: parseFloat(formattedAmount),
              currency: currency
            }
          },
          buyer: {
            merchantBuyerId: userData.email,
            fullName: `${userData.firstName} ${userData.lastName}`,
            emailAddress: userData.email,
            contactPhone: `${userData.phoneCountryCode}${userData.phoneNumber}`,
            dniNumber: userData.identificationNumber,
            shippingAddress: {
              street1: userData.address,
              street2: userData.reference || "",
              city: userData.city,
              state: userData.department,
              country: userData.country,
              postalCode: userData.postalCode,
              phone: `${userData.phoneCountryCode}${userData.phoneNumber}`,
            }
          },
          shippingAddress: {
            street1: userData.address,
            street2: userData.reference || "",
            city: userData.city,
            state: userData.department,
            country: userData.country,
            postalCode: userData.postalCode,
            phone: `${userData.phoneCountryCode}${userData.phoneNumber}`,
          },
        },
        payer: {
          merchantPayerId: userData.email,
          fullName: `${userData.firstName} ${userData.lastName}`,
          emailAddress: userData.email,
          contactPhone: `${userData.phoneCountryCode}${userData.phoneNumber}`,
          dniNumber: userData.identificationNumber,
          billingAddress: {
            street1: userData.address,
            street2: userData.reference || "",
            city: userData.city,
            state: userData.department,
            country: userData.country,
            postalCode: userData.postalCode,
            phone: `${userData.phoneCountryCode}${userData.phoneNumber}`,
          },
        },
        creditCardTokenId: tokenExists.tokenid,
        creditCard: {
          securityCode: cvv,
        },
        extraParameters: {
          INSTALLMENTS_NUMBER: installments || 1
        },
        type: "AUTHORIZATION_AND_CAPTURE",
        paymentMethod: tokenExists.payment_method,
        paymentCountry: "PE",
        deviceSessionId: `session_${Date.now()}`,
        ipAddress,
        cookie: cleanCookie,
        userAgent: cleanUserAgent,
      },
      test: false,
    };

    console.log("📤 Enviando pago con token a PayU:", {
      ...payload,
      merchant: { ...payload.merchant, apiKey: "***" }
    });

    // 3) Envío a PayU
    const payuRes = await fetch(PAYU_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Accept": "application/json" 
      },
      body: JSON.stringify(payload),
    });

    const responseText = await payuRes.text();
    console.log("← PAYU RESPONSE", payuRes.status, responseText);

    if (!payuRes.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { error: "Respuesta inválida de PayU", rawResponse: responseText };
      }
      
      console.error('❌ Error de PayU:', errorData);
      return NextResponse.json({
        error: errorData.error || 'Error procesando el pago',
        details: errorData
      }, { status: payuRes.status });
    }

    const resultJson = JSON.parse(responseText);
    const tr = resultJson.transactionResponse;
    const isSuccess = tr?.state === 'APPROVED' || tr?.state === 'PENDING';

    if (!isSuccess) {
      const errorMessage = getResponseMessage(tr, resultJson);
      return NextResponse.json({
        success: false,
        message: errorMessage,
        transactionResponse: tr
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      transactionId: tr.transactionId,
      referenceCode,
      message: getResponseMessage(tr, resultJson),
      responseCode: tr.responseCode,
      state: tr.state
    });

  } catch (error) {
    console.error("❌ Error en cargo con token:", error);
    return NextResponse.json({
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// Función para obtener mensajes de respuesta
function getResponseMessage(
  transactionResponse?: PayUTransactionResponse,
  fullResponse?: PayUFullResponse
): string {
  const messageMap: Record<string, string> = {
    'APPROVED': "¡Tu pago ha sido aprobado exitosamente!",
    'PENDING': "Tu pago está pendiente de confirmación. Te notificaremos el resultado por correo.",
    'DECLINED': 'Tu banco ha declinado la transacción. Te recomendamos intentar con otro método de pago o contactar a tu banco.',
    'INSUFFICIENT_FUNDS': 'Tu tarjeta no cuenta con fondos suficientes para completar la compra.',
    'INVALID_EXPIRATION_DATE_OR_SECURITY_CODE': 'La fecha de vencimiento o el código de seguridad (CVV) son incorrectos. Por favor, revísalos.',
    'EXPIRED_CARD': 'La tarjeta que estás usando ha vencido. Por favor, intenta con otra tarjeta.',
    'INVALID_CARD': 'El número de tarjeta que ingresaste no es válido. Por favor, verifícalo.',
    'CONTACT_THE_ENTITY': 'Tu banco ha solicitado que te comuniques con ellos para autorizar esta compra.',
    'UNAUTHORIZED_TRANSACTION': 'Tu banco no ha autorizado esta transacción. Te recomendamos contactarlos para habilitar las compras en línea.',
    'RESTRICTED_CARD': 'Tu tarjeta tiene restricciones que impiden este tipo de compra. Por favor, contacta a tu banco.',
    'CARD_BLOCKED': 'Tu tarjeta se encuentra bloqueada por seguridad. Por favor, contacta a tu banco para resolverlo.',
    'ANTIFRAUD_REJECTED': 'Para tu seguridad, la transacción fue rechazada. Por favor, verifica que los datos sean correctos o contacta a tu banco.',
    'ERROR': 'Ocurrió un error al procesar el pago. Por favor, intenta nuevamente en unos minutos.',
  };

  if (transactionResponse?.state === 'APPROVED' || transactionResponse?.state === 'PENDING') {
    if (messageMap[transactionResponse.state]) {
      return messageMap[transactionResponse.state];
    }
  }

  if (transactionResponse?.state && messageMap[transactionResponse.state]) {
    return messageMap[transactionResponse.state];
  }

  if (transactionResponse?.responseMessage) {
    return transactionResponse.responseMessage;
  }

  if (fullResponse?.error) {
    return fullResponse.error;
  }

  return "No se pudo procesar tu pago. Por favor, revisa tus datos o intenta con otro método de pago.";
}