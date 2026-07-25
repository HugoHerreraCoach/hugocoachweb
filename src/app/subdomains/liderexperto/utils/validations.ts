// src/utils/validations.ts

// Generar referencia de pago
export const generateReference = (): string => {
  return `REF_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};