import { NextRequest, NextResponse } from 'next/server';
import { saveTokenToDB } from '@liderexperto/lib/db';
// --- Interfaces para tipar correctamente el payload ---

interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
}

interface BuyerOrPayer {
  merchantBuyerId: string;
  fullName: string;
  emailAddress: string;
  contactPhone: string;
  dniNumber: string;
  shippingAddress?: Address;
  billingAddress?: Address;
}

interface AdditionalValues {
  TX_VALUE: {
    value: number;
    currency: string;
  };
}

interface Order {
  accountId: string;
  referenceCode: string;
  description: string;
  language: string;
  signature: string;
  notifyUrl?: string;
  additionalValues: AdditionalValues;
  buyer: BuyerOrPayer;
  shippingAddress: Address;
}

interface CreditCard {
  number: string;
  securityCode: string;
  expirationDate: string;
  name: string;
}

interface Transaction {
  order: Order;
  payer: BuyerOrPayer;
  creditCard?: CreditCard;
  extraParameters?: Record<string, string>;
  type: 'AUTHORIZATION_AND_CAPTURE';
  paymentMethod: string;
  paymentCountry?: string;
  deviceSessionId: string;
  ipAddress: string;
  cookie: string;
  userAgent: string;
  expirationDate?: string;
  creditCardTokenId?: string;
}

interface PaymentDataRequest {
  language?: string;
  command?: string;
  transaction: Transaction;
  tokenToSave?: {
    creditCardTokenId: string;
    maskedNumber: string;
    paymentMethod: string;
    expirationDate: string;
  };
}

interface PayUPayload {
  language: string;
  command: string;
  merchant: {
    apiKey: string;
    apiLogin: string;
  };
  transaction: Transaction;
  test: boolean;
}

// -----------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    // 1. Parsear el body con la interfaz PaymentDataRequest
    const paymentData: PaymentDataRequest = await request.json();

    // 2. Verificar credenciales en .env
    const merchantId = process.env.PAYU_MERCHANT_ID;
    const apiKey = process.env.PAYU_API_KEY;
    const apiLogin = process.env.PAYU_API_LOGIN;
    const accountId = process.env.PAYU_ACCOUNT_ID;

    console.log('🔥 Verificando credenciales:', {
      hasMerchantId: !!merchantId,
      hasApiKey: !!apiKey,
      hasApiLogin: !!apiLogin,
      hasAccountId: !!accountId,
      merchantId: merchantId?.substring(0, 5) + '...',
      accountId: accountId?.substring(0, 5) + '...'
    });

    if (!merchantId || !apiKey || !apiLogin || !accountId) {
      console.error('❌ Faltan credenciales de PayU');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    // 3. Construir el payload base para PayU
    const payuPayload: PayUPayload = {
      language: paymentData.language || 'es',
      command: paymentData.command || 'SUBMIT_TRANSACTION',
      merchant: {
        apiKey: apiKey,
        apiLogin: apiLogin
      },
      transaction: {
        order: {
          accountId: accountId,
          referenceCode: paymentData.transaction.order.referenceCode,
          description: paymentData.transaction.order.description,
          language: paymentData.transaction.order.language || 'es',
          signature: paymentData.transaction.order.signature,
          notifyUrl: paymentData.transaction.order.notifyUrl,
          additionalValues: {
            TX_VALUE: {
              value: paymentData.transaction.order.additionalValues.TX_VALUE.value,
              currency: paymentData.transaction.order.additionalValues.TX_VALUE.currency
            }
          },
          buyer: paymentData.transaction.order.buyer,
          shippingAddress: paymentData.transaction.order.shippingAddress
        },
        payer: paymentData.transaction.payer,
        creditCardTokenId: paymentData.transaction.creditCardTokenId,
        creditCard: paymentData.transaction.creditCard,
        extraParameters: paymentData.transaction.extraParameters || {},
        type: 'AUTHORIZATION_AND_CAPTURE',
        paymentMethod: paymentData.transaction.paymentMethod,
        paymentCountry: paymentData.transaction.paymentCountry || 'PE',
        deviceSessionId: paymentData.transaction.deviceSessionId,
        ipAddress: paymentData.transaction.ipAddress,
        cookie: paymentData.transaction.cookie,
        userAgent: paymentData.transaction.userAgent,
        expirationDate: paymentData.transaction.expirationDate
      },
      test: false
    };

    // 4. Si es pago con Yape (paymentMethod = "YAPE" y extraParameters.OTP presente),
    //    removemos creditCard y reasignamos extraParameters con OTP.
    if (
      paymentData.transaction.paymentMethod === 'YAPE' &&
      paymentData.transaction.extraParameters?.OTP
    ) {
      // 4.1. Eliminar creditCard (no aplica para Yape)
      delete payuPayload.transaction.creditCard;

      // 4.2. Definir extraParameters únicamente con OTP
      payuPayload.transaction.extraParameters = {
        OTP: paymentData.transaction.extraParameters.OTP
      };
    }

    console.log('🔥 Datos que se enviarán a PayU:', JSON.stringify(payuPayload, null, 2));

    // 5. Enviar la petición a PayU Latam
    const payuUrl = 'https://api.payulatam.com/payments-api/4.0/service.cgi';
    const response = await fetch(payuUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': 'es'
      },
      body: JSON.stringify(payuPayload)
    });

    console.log('🔥 Status de respuesta de PayU:', response.status);

    // 6. Manejo de errores de PayU
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error de PayU:', JSON.stringify(errorData, null, 2));

      // 6.1. Si el error es por credenciales inválidas o permisos
      if (
        errorData.error === 'Invalid credentials' ||
        errorData.error?.includes('credentials') ||
        errorData.error?.includes('permission')
      ) {
        return NextResponse.json(
          {
            error: 'Error de autenticación con PayU',
            details: errorData.error
          },
          { status: 401 }
        );
      }

      // 6.2. Cualquier otro error de PayU
      return NextResponse.json(
        {
          error: errorData.error || 'Error procesando el pago',
          details: errorData
        },
        { status: response.status }
      );
    }

    // 7. Leer y devolver la respuesta exitosa de PayU
    const data = await response.json();
    console.log('✅ Respuesta exitosa de PayU:', JSON.stringify(data, null, 2));
    
    // 8. Si el pago fue exitoso y hay un token nuevo para guardar, guardarlo en la DB
    const isPaymentSuccessful = data?.transactionResponse?.state === 'APPROVED' || 
                                data?.transactionResponse?.state === 'PENDING';
    
    if (isPaymentSuccessful && paymentData.tokenToSave) {
      console.log('💾 Pago exitoso, guardando token en DB...');
      try {
        const cookieSession = request.cookies.get("session_id")?.value;
        const sessionId = cookieSession ?? crypto.randomUUID();
        
        await saveTokenToDB({
          sessionId,
          creditCardTokenId: paymentData.tokenToSave.creditCardTokenId,
          maskedNumber: paymentData.tokenToSave.maskedNumber,
          paymentMethod: paymentData.tokenToSave.paymentMethod,
          expirationDate: paymentData.tokenToSave.expirationDate,
        });
        console.log('✅ Token guardado exitosamente en DB');
      } catch (dbError) {
        console.warn('⚠️ Error al guardar token en DB (pago ya fue exitoso):', dbError);
      }
    } else if (paymentData.tokenToSave) {
      console.log('❌ Pago no fue exitoso, NO se guardará el token');
    }
    
    return NextResponse.json(data);

  } catch (error) {
    console.error('❌ Error en el servidor:', error);
    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
