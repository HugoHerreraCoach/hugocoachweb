import { NextRequest, NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

interface SignatureRequest {
  referenceCode: string;
  amount: number;
  currency: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SignatureRequest = await request.json();
    const { referenceCode, amount, currency } = body;
    
    // Validación de parámetros
    if (!referenceCode || !amount || !currency) {
      console.error('❌ Parámetros faltantes:', { referenceCode: !!referenceCode, amount: !!amount, currency: !!currency });
      return NextResponse.json(
        { error: 'Parámetros requeridos: referenceCode, amount, currency' },
        { status: 400 }
      );
    }

    const apiKey = process.env.PAYU_API_KEY;
    const merchantId = process.env.PAYU_MERCHANT_ID;

    if (!apiKey || !merchantId) {
      console.error('❌ Credenciales faltantes para la firma');
      return NextResponse.json(
        { error: 'Error de configuración del servidor para la firma.' },
        { status: 500 }
      );
    }

    const formattedAmount = Number(amount).toFixed(2);
    
    // Construir la cadena de firma exactamente como PayU la espera
    const signatureString = `${apiKey}~${merchantId}~${referenceCode}~${formattedAmount}~${currency}`;
    const signature = CryptoJS.MD5(signatureString).toString();
    console.log('✅ Signature generada exitosamente');

    return NextResponse.json({ 
      signature,
      // Para debug (solo en desarrollo)
      ...(process.env.NODE_ENV !== 'production' && {
        debug: {
          merchantId,
          referenceCode,
          formattedAmount,
          currency,
          signatureString: `***~${merchantId}~${referenceCode}~${formattedAmount}~${currency}`
        }
      })
    });

  } catch (error) {
    console.error('❌ Error in signature generation:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}