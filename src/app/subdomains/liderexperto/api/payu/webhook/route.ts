import { NextRequest, NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const data = new URLSearchParams(body);
    
    // Validar firma de PayU
    const signature = data.get('signature');
    const merchantId = data.get('merchant_id');
    const referenceCode = data.get('reference_sale');
    const value = data.get('value');
    const currency = data.get('currency');
    const state = data.get('state_pol');
    
    const apiKey = process.env.PAYU_API_KEY;
    const expectedSignature = CryptoJS.MD5(
      `${apiKey}~${merchantId}~${referenceCode}~${value}~${currency}~${state}`
    ).toString();
    
    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    // Procesar notificación
    console.log('PayU Webhook received:', {
      referenceCode,
      state,
      value,
      currency
    });
    
    // Aquí implementar lógica de negocio:
    // - Actualizar base de datos
    // - Enviar emails
    // - Activar servicios
    // - etc.
    
    return NextResponse.json({ status: 'OK' });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}