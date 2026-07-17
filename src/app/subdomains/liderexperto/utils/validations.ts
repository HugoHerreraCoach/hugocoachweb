// src/utils/validations.ts
import { FormErrors } from "../types/checkout";

// Detectar tipo de tarjeta
export const detectCardType = (number: string): { type: string; isValid: boolean } => {
  const cleanNumber = number.replace(/\D/g, "");
  
  const patterns = {
    VISA: /^4/,
    MASTERCARD: /^5[1-5]/,
    AMEX: /^3[47]/,
    DINERS: /^3(?:0[0-5]|[68])/,
  };
  
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cleanNumber)) {
      return { type, isValid: true };
    }
  }
  
  return { type: "", isValid: false };
};

// Formatear número de tarjeta
export const formatCardNumber = (value: string): string => {
  const cleanValue = value.replace(/\D/g, "");
  const cardType = detectCardType(cleanValue);
  
  if (cardType.type === "AMEX") {
    // AMEX: XXXX XXXXXX XXXXX
    return cleanValue
      .replace(/(\d{4})/, "$1 ")
      .replace(/(\d{4}) (\d{6})/, "$1 $2 ")
      .trim();
  } else {
    // VISA, MasterCard, Diners: XXXX XXXX XXXX XXXX
    return cleanValue.replace(/(\d{4})/g, "$1 ").trim();
  }
};

// Validar tarjeta con algoritmo de Luhn
export const validateCard = (number: string): boolean => {
  const cleaned = number.replace(/\D/g, "");
  
  if (!/^\d{13,19}$/.test(cleaned)) {
    return false;
  }
  
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

// Validar CVV
export const validateCVV = (cvv: string, cardType: string): boolean => {
  if (cardType === "AMEX") {
    return /^\d{4}$/.test(cvv);
  }
  return /^\d{3}$/.test(cvv);
};

// Validar fecha de expiración
export const validateExpiry = (
  month: string,
  year: string
): { isValid: boolean; error?: string } => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const maxYear = currentYear + 20;
  
  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);
  
  if (expYear > maxYear) {
    return {
      isValid: false,
      error: "El año de caducidad de la tarjeta no es válido.",
    };
  }
  
  const isValid =
    expYear > currentYear ||
    (expYear === currentYear && expMonth >= currentMonth);
    
  return {
    isValid,
    error: isValid ? undefined : "Tarjeta vencida.",
  };
};

// Validar Yape
export const validateYape = (
  yapeNumber: string,
  yapeCode: string[],
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
): boolean => {
  const newErrors: FormErrors = {};
  let isValid = true;
  
  // Validar número de Yape
  const cleanYapeNumber = yapeNumber.replace(/\s+/g, "");
  
  if (!cleanYapeNumber) {
    newErrors.yapeNumber = "El celular de Yape es requerido.";
    isValid = false;
  } else if (!/^9\d{8}$/.test(cleanYapeNumber)) {
    newErrors.yapeNumber = "El celular de Yape debe comenzar con 9 y tener 9 dígitos.";
    isValid = false;
  }
  
  // Validar código OTP
  const fullOtp = yapeCode.join("");
  
  if (!fullOtp || fullOtp.length !== 6) {
    newErrors.yapeCode = "Debes ingresar los 6 dígitos del código de Yape.";
    isValid = false;
  } else if (!/^[0-9]{6}$/.test(fullOtp)) {
    newErrors.yapeCode = "El código de Yape debe contener solo dígitos del 0 al 9.";
    isValid = false;
  }
  
  setErrors(newErrors);
  return isValid;
};

// Generar referencia de pago
export const generateReference = (): string => {
  return `REF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};