import { z } from 'zod';

// Algoritmo de Luhn para validar tarjetas
function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

// Schema de validación para datos de pago
export const PaymentDataSchema = z.object({
  cardNumber: z
    .string()
    .min(13, 'Número de tarjeta debe tener al menos 13 dígitos')
    .max(19, 'Número de tarjeta no puede tener más de 19 dígitos')
    .regex(/^\d+$/, 'Número de tarjeta solo puede contener dígitos')
    .refine(luhnCheck, 'Número de tarjeta inválido'),
    
  expiryMonth: z
    .string()
    .regex(/^(0[1-9]|1[0-2])$/, 'Mes de expiración inválido (01-12)'),
    
  expiryYear: z
    .string()
    .regex(/^\d{4}$/, 'Año de expiración debe tener 4 dígitos')
    .refine(year => {
      const currentYear = new Date().getFullYear();
      const expYear = parseInt(year, 10);
      return expYear >= currentYear && expYear <= currentYear + 20;
    }, 'Año de expiración inválido'),
    
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, 'CVV debe tener 3 o 4 dígitos'),
    
  holderName: z
    .string()
    .min(2, 'Nombre del titular muy corto')
    .max(100, 'Nombre del titular muy largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, 'Nombre solo puede contener letras y espacios')
    .refine(name => name.trim().split(' ').length >= 2, 'Debe incluir nombre y apellido'),
    
  amount: z
    .number()
    .positive('El monto debe ser positivo')
    .min(1, 'Monto mínimo es S/1.00')
    .max(50000, 'Monto máximo es S/50,000.00')
    .multipleOf(0.01, 'Monto debe tener máximo 2 decimales'),
    
  currency: z
    .enum(['PEN', 'USD', 'COP'], {
      message: 'Moneda no soportada'
    }),
    
  description: z
    .string()
    .min(1, 'Descripción es requerida')
    .max(255, 'Descripción muy larga')
    .regex(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-_.,]+$/, 'Descripción contiene caracteres inválidos')
}).refine(data => {
  // Validar fecha de expiración no sea pasada
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  const expYear = parseInt(data.expiryYear, 10);
  const expMonth = parseInt(data.expiryMonth, 10);
  
  return expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth);
}, {
  message: 'La tarjeta está vencida',
  path: ['expiryYear']
});

// Schema para datos de firma
export const SignatureDataSchema = z.object({
  referenceCode: z
    .string()
    .min(1, 'Código de referencia requerido')
    .max(255, 'Código de referencia muy largo')
    .regex(/^[a-zA-Z0-9_\-]+$/, 'Código de referencia inválido'),
    
  amount: z
    .number()
    .positive()
    .max(50000),
    
  currency: z
    .enum(['PEN', 'USD', 'COP'])
});

// Schema para webhook de PayU
export const WebhookDataSchema = z.object({
  merchant_id: z.string(),
  reference_sale: z.string(),
  value: z.string(),
  currency: z.string(),
  state_pol: z.string(),
  signature: z.string(),
  response_code_pol: z.string().optional(),
  response_message_pol: z.string().optional(),
  transaction_id: z.string().optional(),
  transaction_date: z.string().optional()
});

// Función helper para validar datos de pago
export function validatePaymentData(data: unknown) {
  const result = PaymentDataSchema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.issues.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    
    return {
      success: false,
      errors,
      data: null
    };
  }
  
  return {
    success: true,
    errors: null,
    data: result.data
  };
}

// Función helper para validar datos de firma
export function validateSignatureData(data: unknown) {
  const result = SignatureDataSchema.safeParse(data);
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues,
      data: null
    };
  }
  
  return {
    success: true,
    errors: null,
    data: result.data
  };
}

// Función helper para validar webhook
export function validateWebhookData(data: unknown) {
  const result = WebhookDataSchema.safeParse(data);
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues,
      data: null
    };
  }
  
  return {
    success: true,
    errors: null,
    data: result.data
  };
}

// Detectar tipo de tarjeta
export function detectCardType(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  // Visa
  if (/^4/.test(cleaned)) return 'VISA';
  
  // Mastercard
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return 'MASTERCARD';
  
  // American Express
  if (/^3[47]/.test(cleaned)) return 'AMEX';
  
  // Diners Club
  if (/^3[0689]/.test(cleaned)) return 'DINERS';
  
  // Default
  return 'VISA';
}

// Sanitizar datos de entrada
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>'"&]/g, '') // Remover caracteres peligrosos
    .substring(0, 255); // Limitar longitud
}

// Enmascarar número de tarjeta para logs
export function maskCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length < 8) return '****';
  
  const first4 = cleaned.substring(0, 4);
  const last4 = cleaned.substring(cleaned.length - 4);
  const middle = '*'.repeat(cleaned.length - 8);
  
  return `${first4}${middle}${last4}`;
}