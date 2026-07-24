// src/components/TwoStepCheckoutForm.tsx
"use client";
import { useRouter } from 'next/navigation';


import {
  useState,
  useEffect,
  useLayoutEffect,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import { FiChevronLeft, FiCreditCard, FiShield } from "react-icons/fi";
import { CreditCard} from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import BumpItem from "./BumpItem";
import { StripePaymentForm } from "../../cerradorexperto/components/ui/StripePaymentForm";

import {
  PaymentResult,
  FormData,
  FormErrors,
  SelectedBumps,
  SavedToken,
  Step1FormProps,
  Step2FormProps,
  CardPaymentFormProps,
  YapePaymentFormProps,
  InputFieldProps
} from "../types/checkout";
import {
  bumpPrices,
  shippingCost,
  baseBookPrice,
  paisesDireccion,
  departamentosPeru,
  codigosPaisCelular,
  identificationTypesPeru,
  CARD_LOGOS
} from "../constants/checkout";
import { PayUService } from "../services/PayUService";
import {
  detectCardType,
  formatCardNumber,
  validateCard,
  validateCVV,
  validateExpiry,
  validateYape
} from "../utils/validations";


//Trakeo de Facebook (Meta)
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


// Estados iniciales
const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneCountryCode: "+51",
  phoneNumber: "",
  address: "",
  reference: "",
  country: "PE",
  department: "",
  city: "",
  postalCode: "",
  billingSameAsShipping: true,
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
  cardHolderName: "",
  paymentMethod: "",
  identificationType: identificationTypesPeru[0]?.code || "",
  identificationNumber: "",
  yapeNumber: "",
  yapeCode: new Array(6).fill(""),
};

const initialSelectedBumps: SelectedBumps = {
  audiolibro: false,
  claseKit: false,
};

export default function TwoStepCheckoutForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedBumps, setSelectedBumps] = useState<SelectedBumps>(initialSelectedBumps);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentCardLogo, setCurrentCardLogo] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [savedTokens, setSavedTokens] = useState<SavedToken[]>([]);
  const [useSavedToken, setUseSavedToken] = useState(false);
  const [chosenTokenId, setChosenTokenId] = useState<string | null>(null);
  const router = useRouter();

  // Estados específicos de Yape
  const [yapeNumber, setYapeNumber] = useState("");
  const [yapeCode, setYapeCode] = useState(new Array(6).fill(""));

  const formRef = useRef<HTMLFormElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Calcular precio total
  const totalPrice = baseBookPrice + shippingCost +
    (selectedBumps.audiolibro ? bumpPrices.audiolibro : 0) +
    (selectedBumps.claseKit ? bumpPrices.claseKit : 0);

  // Detectar el ancho del formulario
  useLayoutEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const observer = new ResizeObserver(() => {
      setContainerWidth(form.offsetWidth);
    });

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  // Efecto para rotar logos de tarjetas
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentCardLogo((prev) => (prev + 1) % CARD_LOGOS.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Efecto para hacer scroll al cambiar al paso 2
  useEffect(() => {
    if (currentStep === 2) {
      mainContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStep]);

  // Cargar tokens guardados.
  useEffect(() => {
    if (currentStep === 2 && selectedPaymentMethod === "card") {
      fetch("/api/tokens")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setSavedTokens(data);
            setChosenTokenId(data[0].tokenid);
          }
        })
        .catch(console.error);
    }
  }, [currentStep, selectedPaymentMethod]);

  // Manejador de cambios genérico
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "cardNumber":
        handleCardNumberChange(value);
        break;
      case "cvv":
        handleCVVChange(value);
        break;
      case "expiry":
        handleExpiryChange(value);
        break;
      case "identificationNumber":
        handleIdentificationChange(value);
        break;
      default:
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Manejadores específicos
  const handleCardNumberChange = (value: string) => {
    const formattedValue = formatCardNumber(value);
    const cleanValue = value.replace(/\s+/g, "");
    const cardType = detectCardType(cleanValue);

    setFormData(prev => ({
      ...prev,
      cardNumber: formattedValue,
      paymentMethod: cardType.type,
    }));

    // Limpiar error si el campo queda vacío
    if (cleanValue.length === 0) {
      setErrors(prev => ({
        ...prev,
        cardNumber: undefined
      }));
      return;
    }

    // Definir longitudes esperadas para cada tipo de tarjeta
    const expectedLengths: { [key: string]: number } = {
      VISA: 16,
      MASTERCARD: 16,
      AMEX: 15,
      DINERS: 14
    };

    const expectedLength = expectedLengths[cardType.type];

    // Validación cuando se alcanza la longitud esperada para el tipo de tarjeta
    if (expectedLength && cleanValue.length === expectedLength) {
      if (validateCard(cleanValue)) {
        // Si es válida, limpiar error y hacer auto-focus
        setErrors(prev => ({
          ...prev,
          cardNumber: undefined
        }));
        const expiryField = document.querySelector('input[name="expiry"]') as HTMLInputElement;
        if (expiryField) {
          setTimeout(() => expiryField.focus(), 0);
        }
      } else {
        // Si tiene la longitud correcta pero no es válida, mostrar error
        setErrors(prev => ({
          ...prev,
          cardNumber: "Número de tarjeta inválido"
        }));
      }
    } else {
      // Si no ha alcanzado la longitud esperada, limpiar cualquier error previo
      setErrors(prev => ({
        ...prev,
        cardNumber: undefined
      }));
    }
  };

  const handleCVVChange = (value: string) => {
    const cardType = detectCardType(formData.cardNumber.replace(/\s+/g, ""));
    const maxLength = cardType.type === "AMEX" ? 4 : 3;
    const cleanValue = value.replace(/\D/g, "");

    if (cleanValue.length <= maxLength) {
      setFormData(prev => ({ ...prev, cvv: cleanValue }));

      // Limpiar error si el campo queda vacío
      if (cleanValue.length === 0) {
        setErrors(prev => ({
          ...prev,
          cvv: undefined
        }));
      }

      // Auto-focus al campo de número de documento cuando CVV está completo
      if (cleanValue.length === maxLength) {
        // Limpiar error cuando CVV está completo con la longitud correcta
        setErrors(prev => ({
          ...prev,
          cvv: undefined
        }));
        
        const identificationField = document.querySelector('input[name="identificationNumber"]') as HTMLInputElement;
        if (identificationField) {
          setTimeout(() => identificationField.focus(), 0);
        }
      }
    }
  };

  const handleExpiryChange = (value: string): string => {
    // Si el valor está vacío, permitir que se borre completamente
    if (value === "") {
      setFormData(prev => ({
        ...prev,
        expiryMonth: "",
        expiryYear: "",
      }));
      return "";
    }

    // Solo permitir dígitos y /
    const input = value.replace(/[^\d\/]/g, "");

    // Remover cualquier / existente para procesar solo los dígitos
    let digits = input.replace(/\//g, "");

    // Limitar a máximo 4 dígitos
    if (digits.length > 4) {
      digits = digits.slice(0, 4);
    }

    let formatted = "";

    // Lógica especial para auto-formateo del mes
    if (digits.length === 1) {
      const digit = parseInt(digits);
      if (digit >= 3) {
        // Si es 3-9, auto-completar con 0 y agregar /
        formatted = "0" + digits + "/";
      } else {
        // Si es 0, 1 o 2, solo mostrar el dígito
        formatted = digits;
      }
    } else if (digits.length === 2) {
      const month = parseInt(digits);
      if (month > 12) {
        // Si el mes es mayor a 12, tomar el segundo dígito como primer dígito del año
        formatted = "01/" + digits.charAt(1);
      } else {
        // Mes válido, agregar /
        formatted = digits + "/";
      }
    } else if (digits.length >= 3) {
      // Ya tiene más de 2 dígitos, formatear con /
      const monthPart = digits.slice(0, 2);
      const yearPart = digits.slice(2, 4);
      formatted = monthPart + "/" + yearPart;
    } else {
      formatted = digits;
    }

    // Actualizar el estado del formData cuando tenemos un formato completo
    if (formatted.length <= 5) {
      const match = formatted.match(/^(\d{2})\/(\d{2})$/);
      if (match) {
        const month = match[1];
        const year = `20${match[2]}`;
        setFormData(prev => ({
          ...prev,
          expiryMonth: month,
          expiryYear: year,
        }));

        const validation = validateExpiry(month, year);
        setErrors(prev => ({
          ...prev,
          expiryMonth: validation.isValid ? undefined : validation.error
        }));

        // Auto-focus al campo CVV si la fecha es válida y completa
        if (validation.isValid && formatted.length === 5) {
          const cvvField = document.querySelector('input[name="cvv"]') as HTMLInputElement;
          if (cvvField) {
            setTimeout(() => cvvField.focus(), 0);
          }
        }
      } else {
        // Si no está completo, limpiar los datos del form
        setFormData(prev => ({
          ...prev,
          expiryMonth: "",
          expiryYear: "",
        }));
        setErrors(prev => ({
          ...prev,
          expiryMonth: undefined
        }));
      }
    }

    return formatted;
  };

  const handleIdentificationChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, identificationNumber: cleanValue }));

    // Limpiar error si el campo queda vacío
    if (cleanValue.length === 0) {
      setErrors(prev => ({
        ...prev,
        identificationNumber: undefined
      }));
    }
  };

  // Funciones de validación onBlur
  const handleCardHolderNameBlur = () => {
    const name = formData.cardHolderName.trim();
    if (name.length > 0 && name.length < 3) {
      setErrors(prev => ({
        ...prev,
        cardHolderName: "Nombre del titular debe tener al menos 3 caracteres"
      }));
    } else if (name.length === 0) {
      setErrors(prev => ({
        ...prev,
        cardHolderName: undefined
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        cardHolderName: undefined
      }));
    }
  };

  // Manejador de cambio para el nombre del titular
  const handleCardHolderNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, cardHolderName: value }));

    // Limpiar error si el campo queda vacío
    if (value.trim().length === 0) {
      setErrors(prev => ({
        ...prev,
        cardHolderName: undefined
      }));
    }
  };

  const handleCardNumberBlur = () => {
    const cleanValue = formData.cardNumber.replace(/\s+/g, "");

    if (cleanValue.length > 0 && !validateCard(cleanValue)) {
      setErrors(prev => ({
        ...prev,
        cardNumber: "Número de tarjeta inválido"
      }));
    } else if (cleanValue.length > 0 && validateCard(cleanValue)) {
      // Limpiar error si la tarjeta es válida
      setErrors(prev => ({
        ...prev,
        cardNumber: undefined
      }));
    }
  };

  const handleExpiryBlur = () => {
    const expiryInput = document.querySelector('input[name="expiry"]') as HTMLInputElement;
    const inputValue = expiryInput?.value || "";

    // Si el campo tiene contenido pero está incompleto
    if (inputValue.length > 0 && inputValue.length < 5) {
      setErrors(prev => ({
        ...prev,
        expiryMonth: "Fecha incompleta (formato: MM/AA)"
      }));
    } else if (formData.expiryMonth && formData.expiryYear) {
      const validation = validateExpiry(formData.expiryMonth, formData.expiryYear);
      if (!validation.isValid) {
        setErrors(prev => ({
          ...prev,
          expiryMonth: validation.error
        }));
      } else {
        // Limpiar error si la fecha es válida
        setErrors(prev => ({
          ...prev,
          expiryMonth: undefined
        }));
      }
    } else if (inputValue.length === 0) {
      // Limpiar error si el campo está vacío
      setErrors(prev => ({
        ...prev,
        expiryMonth: undefined
      }));
    }
  };

  const handleCVVBlur = () => {
    if (formData.cvv.length > 0 && !validateCVV(formData.cvv, formData.paymentMethod)) {
      setErrors(prev => ({
        ...prev,
        cvv: "CVV inválido"
      }));
    }
  };

  const handleIdentificationBlur = () => {
    const value = formData.identificationNumber.trim();
    if (value.length > 0) {
      if (formData.identificationType === "DNI" && value.length !== 8) {
        setErrors(prev => ({
          ...prev,
          identificationNumber: 'El DNI debe tener 8 dígitos'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          identificationNumber: undefined
        }));
      }
    }
  };

  const handleYapeNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 0 && value[0] !== "9") return;
    if (value.length > 9) value = value.slice(0, 9);

    const formattedValue = value.replace(/(\d{3})(?=\d)/g, "$1 ");
    setYapeNumber(formattedValue);
    setFormData(prev => ({ ...prev, yapeNumber: value }));

    // Limpiar error si el campo está vacío
    if (value.length === 0) {
      setErrors(prev => ({ ...prev, yapeNumber: undefined }));
    }

    // Auto-focus al código de aprobación cuando tiene 9 dígitos
    if (value.length === 9) {
      setErrors(prev => ({ ...prev, yapeNumber: undefined }));
      const firstCodeInput = document.querySelector('input[inputMode="numeric"]') as HTMLInputElement;
      if (firstCodeInput) {
        setTimeout(() => firstCodeInput.focus(), 100);
      }
    }
  };

  const handleYapeNumberBlur = () => {
    const cleanValue = formData.yapeNumber.replace(/\s+/g, "");

    if (cleanValue.length > 0 && cleanValue.length < 9) {
      setErrors(prev => ({
        ...prev,
        yapeNumber: "Número incompleto. Debe tener 9 dígitos."
      }));
    } else if (cleanValue.length === 9) {
      setErrors(prev => ({
        ...prev,
        yapeNumber: undefined
      }));
    } else if (cleanValue.length === 0) {
      setErrors(prev => ({
        ...prev,
        yapeNumber: undefined
      }));
    }
  };

  const handleYapeCodeChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;

    if (!/^[0-9]$/.test(value) && value !== "") {
      element.value = "";
      return false;
    }

    const newCode = [...yapeCode];
    newCode[index] = value;
    setYapeCode(newCode);
    setFormData(prev => ({ ...prev, yapeCode: newCode }));

    // Limpiar error si algún campo se está llenando
    if (newCode.join("").length > 0 && errors.yapeCode) {
      setErrors(prev => ({ ...prev, yapeCode: undefined }));
    }

    // Auto-focus siguiente
    if (element.nextSibling && value) {
      (element.nextSibling as HTMLInputElement).focus();
    }

    return true;
  };

  const handleYapeCodeBlur = () => {
    // No validar en tiempo real para evitar distraer al usuario
    // La validación se hará solo al intentar enviar el formulario
  };

  // Validaciones unificadas
  const validateForm = (step: number, section?: 'basic' | 'shipping'): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!showShippingInfo || section === 'basic') {
        // Validaciones de información básica
        const basicFields = {
          firstName: { min: 2, message: "El nombre debe tener al menos 2 letras." },
          lastName: { min: 2, message: "El apellido debe tener al menos 2 letras." },
          email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido." },
          phoneNumber: { pattern: /^\d+$/, length: 9, message: "Celular inválido." }
        };

        Object.entries(basicFields).forEach(([field, validation]) => {
          const value = formData[field as keyof FormData]?.toString().trim() || "";

          if (!value) {
            newErrors[field as keyof FormData] = `${field.charAt(0).toUpperCase() + field.slice(1)} requerido.`;
            isValid = false;
          } else if ('min' in validation && validation.min && value.length < validation.min) {
            newErrors[field as keyof FormData] = validation.message;
            isValid = false;
          } else if ('pattern' in validation && validation.pattern && !validation.pattern.test(value)) {
            newErrors[field as keyof FormData] = validation.message;
            isValid = false;
          } else if (field === "phoneNumber" && formData.phoneCountryCode === "+51" && value.length !== 9) {
            newErrors[field] = "El celular peruano debe tener 9 dígitos.";
            isValid = false;
          }
        });
      } else {
        // Validaciones completas del paso 1 (información básica + envío)
        const requiredFields = {
          firstName: { min: 2, message: "El nombre debe tener al menos 2 letras." },
          lastName: { min: 2, message: "El apellido debe tener al menos 2 letras." },
          email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido." },
          phoneNumber: { pattern: /^\d+$/, length: 9, message: "Celular inválido." },
          address: { min: 5, message: "Dirección muy corta." },
          department: { message: "Seleccione departamento." },
          city: { min: 3, message: "Ciudad muy corta." },
          postalCode: { pattern: /^\d+$/, message: "Solo números." }
        };

        Object.entries(requiredFields).forEach(([field, validation]) => {
          const value = formData[field as keyof FormData]?.toString().trim() || "";

          if (!value) {
            newErrors[field as keyof FormData] = `${field.charAt(0).toUpperCase() + field.slice(1)} requerido.`;
            isValid = false;
          } else if ('min' in validation && validation.min && value.length < validation.min) {
            newErrors[field as keyof FormData] = validation.message;
            isValid = false;
          } else if ('pattern' in validation && validation.pattern && !validation.pattern.test(value)) {
            newErrors[field as keyof FormData] = validation.message;
            isValid = false;
          } else if (field === "phoneNumber" && formData.phoneCountryCode === "+51" && value.length !== 9) {
            newErrors[field] = "El celular peruano debe tener 9 dígitos.";
            isValid = false;
          }
        });
      }
    } else if (step === 2) {
      if (selectedPaymentMethod === "card" && !useSavedToken) {
        // Validaciones de tarjeta
        if (!formData.cardHolderName.trim() || formData.cardHolderName.trim().length < 3) {
          newErrors.cardHolderName = "Nombre del titular inválido.";
          isValid = false;
        }
        if (!validateCard(formData.cardNumber)) {
          newErrors.cardNumber = "Número de tarjeta inválido.";
          isValid = false;
        }
        const expiryValidation = validateExpiry(formData.expiryMonth, formData.expiryYear);
        if (!expiryValidation.isValid) {
          newErrors.expiryMonth = expiryValidation.error;
          isValid = false;
        }
        if (!validateCVV(formData.cvv, formData.paymentMethod)) {
          newErrors.cvv = "CVV inválido.";
          isValid = false;
        }
      } else if (selectedPaymentMethod === "yape") {
        isValid = validateYape(yapeNumber, yapeCode, setErrors);
        return isValid;
      }

      // Validación de documento
      if (!formData.identificationNumber.trim()) {
        newErrors.identificationNumber = "Documento requerido.";
        isValid = false;
      } else if (formData.identificationType === "DNI" && formData.identificationNumber.length !== 8) {
        newErrors.identificationNumber = "DNI debe tener 8 dígitos.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Guardar datos del usuario
  const saveUserData = async (step: number) => {
    try {
      let dataToSend;
      if (step === 1) {
        // Paso 1: Datos completos incluyendo información de envío
        dataToSend = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneCountryCode: formData.phoneCountryCode,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          reference: formData.reference,
          country: formData.country,
          department: formData.department,
          city: formData.city,
          postalCode: formData.postalCode,
          billingSameAsShipping: formData.billingSameAsShipping,
          cardNumber: formData.cardNumber,
          expiryMonth: formData.expiryMonth,
          expiryYear: formData.expiryYear,
          cvv: formData.cvv,
          cardHolderName: formData.cardHolderName,
          paymentMethod: formData.paymentMethod,
          yapeNumber: formData.yapeNumber,
          yapeCode: formData.yapeCode,
        };
      } else {
        // Paso 2: Incluir todos los datos
        dataToSend = {
          ...formData,
          phoneNumber: formData.phoneNumber,
        };
      }
      // console.log(`Guardando datos del paso ${step}:`, dataToSend);
      const response = await fetch("/api/user/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al guardar datos");
      }
      const result = await response.json();
      // console.log(`Datos del paso ${step} guardados exitosamente:`, result);
      return result;
    } catch (error) {
      console.error(`Error guardando datos del paso ${step}:`, error);
      throw error;
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentStep === 1 && !showShippingInfo) {
      // Primera fase del paso 1: validar solo información básica y enviar a Brevo/Meta
      if (!validateForm(currentStep, 'basic')) return;
      
      setIsProcessingPayment(true);
      try {
        // Enviar datos básicos a Brevo
        try {
          await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: `${formData.phoneCountryCode}${formData.phoneNumber}`,
              isBasicData: true, // Flag para indicar que es solo información básica
            }),
          });
        } catch (error) {
          console.error("Error al enviar a Brevo:", error);
          // No detener la lógica si falla
        }

        // Enviar eventos a Meta Ads
        try {
          // 1. Píxel de Meta (lead cuando completa datos básicos)
          trackEvent('Lead', {
            content_name: 'Libro Líder Experto - Formulario Lead',
            value: totalPrice,
            currency: 'PEN'
          });
          // 2. API de Conversiones de Meta
          await fetch('/api/meta/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventName: 'Lead',
              userData: {
                fn: formData.firstName,
                ln: formData.lastName,
                em: formData.email,
                ph: formData.phoneNumber,
              }
            }),
          });
        } catch (error) {
          console.error("Error al enviar eventos a Meta:", error);
          // No detener la lógica si falla
        }

        // Mostrar campos de envío
        setShowShippingInfo(true);
      } catch (error) {
        console.error("Error en primera fase:", error);
        // Aún así mostrar los campos de envío
        setShowShippingInfo(true);
      } finally {
        setIsProcessingPayment(false);
      }
      return;
    }

    if (!validateForm(currentStep)) return;

    if (currentStep === 1) {
      // Segunda fase del paso 1: guardar datos completos en base de datos
      setIsProcessingPayment(true);
      try {
        // Guardar datos completos en la base de datos
        try {
          await saveUserData(1);
        } catch (error) {
          console.error("Error al guardar en base de datos:", error);
          // No detener la lógica si falla
        }

        // Enviar datos completos a Brevo (SIN DNI)
        try {
          await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: `${formData.phoneCountryCode}${formData.phoneNumber}`,
              address: formData.address,
              apartment: formData.reference,
              country: formData.country,
              state: formData.department,
              city: formData.city,
              postalCode: formData.postalCode,
              isBasicData: false, // Datos completos pero sin DNI
            }),
          });
        } catch (error) {
          console.error("Error al enviar datos completos a Brevo:", error);
        }

        // Enviar evento AddToCart a Meta
        try {
          // 1. Píxel de Meta
          trackEvent('AddToCart', {
            content_name: 'Libro Líder Experto - Información de Envío',
            value: totalPrice,
            currency: 'PEN'
          });
          
          // 2. API de Conversiones de Meta
          await fetch('/api/meta/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventName: 'AddToCart',
              userData: {
                fn: formData.firstName,
                ln: formData.lastName,
                em: formData.email,
                ph: formData.phoneNumber,
              },
              customData: {
                value: totalPrice,
                currency: 'PEN',
              },
              eventSourceUrl: window.location.href,
              fbp: document.cookie.match(/fbp=([^;]*)/)?.[1] || null,
              fbc: document.cookie.match(/fbc=([^;]*)/)?.[1] || null,
            }),
          });
        } catch (error) {
          console.error("Error al enviar evento AddToCart a Meta:", error);
        }

        // Configurar nombre del titular de tarjeta
        setFormData(prev => ({
          ...prev,
          cardHolderName: prev.cardHolderName || `${prev.firstName} ${prev.lastName}`.trim(),
        }));
        
        // Avanzar al paso 2
        setCurrentStep(2);
      } catch (error) {
        console.error("Error en segunda fase:", error);
        // Aún así avanzar al paso 2
        setCurrentStep(2);
      } finally {
        setIsProcessingPayment(false);
      }
    } else {
      // Paso 2: Procesar pago
      setIsProcessingPayment(true);
      try {
        await saveUserData(2);

        let result: PaymentResult;

        if (selectedPaymentMethod === "card") {
          const chargeRes = await fetch("/api/stripe/charge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: totalPrice,
              currency: "USD",
              email: formData.email,
              name: formData.cardHolderName || `${formData.firstName} ${formData.lastName}`,
              cardNumber: formData.cardNumber.replace(/\s+/g, ""),
              expiryMonth: formData.expiryMonth.padStart(2, "0"),
              expiryYear: formData.expiryYear,
              cvc: formData.cvv,
              description: "Programa Líder Experto",
            }),
          });

          const chargeData = await chargeRes.json();
          if (chargeRes.ok && chargeData.success) {
            if (chargeData.customerId && typeof window !== "undefined") {
              localStorage.setItem("stripe_customer_id", chargeData.customerId);
            }
            result = { success: true, transactionId: chargeData.transactionId, message: "¡Pago procesado exitosamente con Stripe!" };
          } else {
            result = { success: false, message: chargeData.error || "Error al procesar el pago con tarjeta." };
          }

        }
 else {
          result = await PayUService.processYape(formData, totalPrice, yapeNumber, yapeCode);
        }

        setPaymentResult(result);
      } catch (error) {
        setPaymentResult({
          success: false,
          message: error instanceof Error ? error.message : "Error desconocido",
        });
      } finally {
        setIsProcessingPayment(false);
      }
    }
  };

  // Efecto para manejar el resultado del pago
  useEffect(() => {
    if (paymentResult?.success) {
      // Enviar evento de compra a Meta
      const trackPurchase = async () => {
        try {
          // 1. Píxel de Meta
          trackEvent('Purchase', {
            content_name: 'Compra Libro Líder Experto',
            value: totalPrice,
            currency: 'PEN',
            transaction_id: paymentResult.transactionId,
          });

          // 2. API de Conversiones de Meta
          await fetch('/api/meta/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventName: 'Purchase',
              userData: {
                fn: formData.firstName,
                ln: formData.lastName,
                em: formData.email,
                ph: formData.phoneNumber,
              },
              customData: {
                value: totalPrice,
                currency: 'PEN',
              },
              eventSourceUrl: window.location.href,
              fbp: document.cookie.match(/fbp=([^;]*)/)?.[1] || null,
              fbc: document.cookie.match(/fbc=([^;]*)/)?.[1] || null,
            }),
          });
        } catch (error) {
          console.error("Error al enviar evento Purchase a Meta:", error);
        }
      };

      trackPurchase();

      // 1. Mover a la lista de compradores en Brevo
      const moveToBuyerList = async () => {
        try {
          await fetch('/api/convert-to-buyer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              dni: formData.identificationNumber,
            }),
          });
        } catch (conversionError) {
          console.error('Error al intentar mover al contacto a la lista de compradores:', conversionError);
        }
      };
      moveToBuyerList();

      // 2. Redirigir a la página de gracias
      router.push('/lobos');
    }
  }, [paymentResult, router, formData, totalPrice]);

  // Resultado del pago
  if (paymentResult) {
    return (
      <div className="bg-gray-100 min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className={`text-center ${paymentResult.success ? "text-green-600" : "text-red-600"}`}>
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${paymentResult.success ? "bg-green-100" : "bg-red-100"
              }`}>
              <span className="text-2xl font-bold">{paymentResult.success ? "✓" : "✗"}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {paymentResult.success ? "¡Pago Exitoso!" : "Pago Fallido"}
            </h3>
            <p className="text-gray-600 mb-4">{paymentResult.message}</p>
            <button
              onClick={() => setPaymentResult(null)}
              className={`px-6 py-2 rounded transition-colors ${paymentResult.success
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-red-600 text-white hover:bg-red-700"
                }`}
            >
              {paymentResult.success ? "Nueva Compra" : "Intentar Nuevamente"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Formulario principal
  return (
    <div className="bg-white w-full" ref={mainContainerRef}>
      {/* Progress Steps */}
      <div className="flex w-full h-14 bg-white">
        <div className={clsx("flex w-[50%] items-center justify-center px-4", {
          "bg-[#E40200] text-white [clip-path:polygon(0%_0%,_90%_0%,_100%_50%,_90%_100%,_0%_100%)]": currentStep === 1,
          "bg-transparent text-black": currentStep !== 1,
        })}>
          <div className="flex items-center">
            <span className={clsx("text-base w-7 h-7 mr-2 flex items-center justify-center rounded-full font-semibold", {
              "bg-[#580706] text-white": currentStep === 1,
              "bg-[#E40200] text-white": currentStep !== 1,
            })}>
              1
            </span>
            <span className="font-semibold pr-4">DATOS</span>
          </div>
        </div>

        <div className={clsx("flex w-[50%] items-center justify-center h-14 px-4", {
          "bg-[#E40200] text-white [clip-path:polygon(10%_0,_100%_0,_100%_100%,_10%_100%,_0_50%)]": currentStep === 2,
          "bg-transparent text-black": currentStep !== 2,
        })}>
          <div className="flex items-center text-center font-semibold">
            <span className={clsx("text-base w-7 h-7 mr-2 flex items-center justify-center rounded-full font-semibold", {
              "bg-[#580706] text-white": currentStep === 2,
              "bg-[#E40200] text-white": currentStep !== 2,
            })}>
              2
            </span>
            <span className="font-semibold">ENVÍO</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-b-lg">
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="max-w-2xl mx-auto p-0 bg-white rounded-lg shadow-lg">
          {currentStep === 1 ? (
            <Step1Form
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              isSubmitting={isProcessingPayment}
              codigosPaisCelular={codigosPaisCelular}
              paisesDireccion={paisesDireccion}
              departamentosPeru={departamentosPeru}
              showShippingInfo={showShippingInfo}
            />
          ) : (
            <Step2Form
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleExpiryChange={handleExpiryChange}
              handlePrevStep={() => setCurrentStep(1)}
              isProcessingPayment={isProcessingPayment}
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              savedTokens={savedTokens}
              useSavedToken={useSavedToken}
              setUseSavedToken={setUseSavedToken}
              chosenTokenId={chosenTokenId}
              setChosenTokenId={setChosenTokenId}
              yapeNumber={yapeNumber}
              yapeCode={yapeCode}
              handleYapeNumberChange={handleYapeNumberChange}
              handleYapeNumberBlur={handleYapeNumberBlur}
              handleYapeCodeChange={handleYapeCodeChange}
              handleYapeCodeBlur={handleYapeCodeBlur}
              selectedBumps={selectedBumps}
              setSelectedBumps={setSelectedBumps}
              totalPrice={totalPrice}
              containerWidth={containerWidth}
              currentCardLogo={currentCardLogo}
              isVisible={isVisible}
              identificationTypesPeru={identificationTypesPeru}
              handleCardHolderNameChange={handleCardHolderNameChange}
              handleCardHolderNameBlur={handleCardHolderNameBlur}
              handleCardNumberBlur={handleCardNumberBlur}
              handleExpiryBlur={handleExpiryBlur}
              handleCVVBlur={handleCVVBlur}
              handleIdentificationBlur={handleIdentificationBlur}
              
            />
          )}
        </form>
      </div>
    </div>
  );
}

// Componente Step 1
function Step1Form({ formData, errors, handleChange, isSubmitting, codigosPaisCelular, paisesDireccion, departamentosPeru, showShippingInfo }: Step1FormProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
        <InputField
          name="firstName"
          label="Nombres"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          disabled={isSubmitting}
        />
        <InputField
          name="lastName"
          label="Apellidos"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          disabled={isSubmitting}
        />
      </div>

      <InputField
        type="email"
        name="email"
        label="Correo Electrónico"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        disabled={isSubmitting}
        className="mb-6"
      />

      <div className="mb-6 group">
        <label className="block text-xs font-medium text-gray-700 mb-1">Celular</label>
        <div className="flex">
          <select
            name="phoneCountryCode"
            value={formData.phoneCountryCode}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`py-2.5 border-0 border-b-2 ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } text-sm text-gray-900 bg-transparent focus:outline-none focus:ring-0 rounded-none pr-7`}
          >
            {codigosPaisCelular.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name.split("(")[1].replace(")", "")}
              </option>
            ))}
          </select>
          <InputField
            type="tel"
            name="phoneNumber"
            label="999 888 777"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
            disabled={isSubmitting}
            className="flex-grow ml-2"
          />
        </div>
      </div>

      {showShippingInfo && (
        <div className="animate-fade-in">
          <p className="text-lg text-lg font-semibold text-gray-800 mt-8 mb-4 border-b pb-1">
            INFORMACIÓN DE ENVÍO
          </p>

          <InputField
            name="address"
            label="Dirección"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            disabled={isSubmitting}
            className="mb-6"
          />

          <InputField
            name="reference"
            label="Referencia (Ej: Casa verde, segundo piso)"
            value={formData.reference}
            onChange={handleChange}
            disabled={isSubmitting}
            className="mb-6"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div className="relative z-0 w-full group">
              <label htmlFor="country" className="block text-xs font-medium text-gray-400 mb-0">País</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300"
                disabled
              >
                {paisesDireccion.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="relative z-0 w-full group">
              <label htmlFor="department" className="block text-xs font-medium text-gray-700 mb-0">Departamento</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${errors.department ? "border-red-500" : "border-gray-300"
                  }`}
                disabled={isSubmitting}
              >
                <option value="">Seleccione departamento</option>
                {departamentosPeru.map((d) => (
                  <option key={d.code} value={d.name}>{d.name}</option>
                ))}
              </select>
              {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <InputField
              name="city"
              label="Distrito"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              disabled={isSubmitting}
            />
            <InputField
              type="tel"
              name="postalCode"
              label="Código Postal"
              value={formData.postalCode}
              onChange={handleChange}
              error={errors.postalCode}
              disabled={isSubmitting}
              pattern="[0-9]*"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 cursor-pointer rounded-md text-2xl leading-[1.2] mt-4 disabled:opacity-70"
      >
        {isSubmitting ? (
          !showShippingInfo 
            ? "Procesando..." 
            : "Verificando Stock..."
        ) : (
          <>
            {!showShippingInfo ? (
              <>
                ¡Obtener Oferta!<br />
                <span className="text-base font-normal leading-none">¡SÍ! ¡Quiero este libro GRATIS!</span>
              </>
            ) : (
              <>
                ¡Obtener Oferta!<br />
                <span className="text-base font-normal leading-none">¡Sí! ¡Quiero este Libro GRATIS!</span>
              </>
            )}
          </>
        )}
      </button>

      <p className="text-sm text-gray-500 mt-3 text-center leading-[1.1]">
        *Líder Experto se vende por 24.95 USD, pero hoy es gratis para ti. Solo cubres S/19 de envío y recibes el sistema completo que ha transformado empresas en todo Latinoamérica.
        Tu información está 100% protegida.
      </p>
    </div>
  );
}

// Componente Step 2
function Step2Form(props: Step2FormProps) {
  const {
    formData, errors, handleChange, handleExpiryChange, handlePrevStep, isProcessingPayment,
    selectedPaymentMethod, setSelectedPaymentMethod, savedTokens,
    useSavedToken, setUseSavedToken, chosenTokenId, setChosenTokenId,
    yapeNumber, yapeCode, handleYapeNumberChange, handleYapeNumberBlur, handleYapeCodeChange, handleYapeCodeBlur,
    selectedBumps, setSelectedBumps, totalPrice, containerWidth,
    currentCardLogo, isVisible, identificationTypesPeru
  } = props;

  const [expiryInput, setExpiryInput] = useState("");
  const [showGuaranteeTooltip, setShowGuaranteeTooltip] = useState(false);

  useEffect(() => {
    if (formData.expiryMonth && formData.expiryYear) {
      setExpiryInput(
        `${formData.expiryMonth.padStart(2, "0")}/${formData.expiryYear.length === 4 ? formData.expiryYear.slice(2) : formData.expiryYear
        }`
      );
    } else if (!formData.expiryMonth && !formData.expiryYear) {
      setExpiryInput("");
    }
  }, [formData.expiryMonth, formData.expiryYear]);

  return (
    <div className="p-4 md:p-8">
      <button
        type="button"
        onClick={handlePrevStep}
        className="text-blue-600 hover:text-blue-800 text-sm mb-4 flex items-center cursor-pointer disabled:opacity-50"
        disabled={isProcessingPayment}
      >
        <FiChevronLeft className="mr-1" /> Regresar
      </button>

      <div className="pt-4 rounded-md mb-6">
        <h3 className="font-semibold text-gray-800">SELECCIONA EL PRODUCTO</h3>
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <input type="radio" defaultChecked className="h-4 w-4 text-blue-600" />
          <div className="flex justify-between items-center w-full">
            <label className="ml-2 text-base text-gray-700">Libro Líder Experto</label>
            <span className="font-semibold text-black">Gratis</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">INFORMACIÓN DE ENVÍO</h3>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
          <span className="text-base text-gray-700">Tarifa de envío</span>
          <span className="font-semibold text-black">S/{shippingCost.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-6">
        <StripePaymentForm
          customerData={{
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            countryCode: formData.address ? "PE" : "PE",
          }}
          offerDetails={{
            amount: totalPrice,
            currency: "PEN",
          }}
          showUpsell={false}
          productId="liderexperto"
          onSuccessRedirectTo="/subdomains/liderexperto/gracias"
        />
      </div>


      <div className="space-y-4 mb-6">
        <BumpItem
          id="audiolibro"
          name="audiolibro"
          offerHeadline="Oferta especial:"
          productTitle="Audiolibro Líder Experto"
          price={bumpPrices.audiolibro}
          isChecked={selectedBumps.audiolibro}
          onChange={(e) => setSelectedBumps((prev) => ({ ...prev, audiolibro: e.target.checked }))}
          isDisabled={isProcessingPayment}
          imageUrl="/subdomains/liderexperto/venta/audiolibro.png"
          imageWidth={125}
          imageHeight={200}
          shortDescription="¿No tienes tiempo para leer? Escúchalo en tu auto, gimnasio o mientras viajas."
        >
          <ul className="space-y-1 list-inside mb-2 text-black">
            <li>✅ <span className="font-semibold">Cero Excusas:</span> Aprende el sistema sin robar tiempo a tu agenda.</li>
            <li>✅ <span className="font-semibold">Doble Impacto:</span> Audio + Libro físico = absorción completa del método.</li>
            <li>✅ <span className="font-semibold">Acceso Inmediato:</span> Empieza antes de que llegue tu libro.</li>
          </ul>
        </BumpItem>

        <BumpItem
          id="claseKit"
          name="claseKit"
          offerHeadline="Upgrade Exclusivo:"
          productTitle="Masterclass en Video + Herramientas IA"
          price={bumpPrices.claseKit}
          isChecked={selectedBumps.claseKit}
          onChange={(e) => setSelectedBumps((prev) => ({ ...prev, claseKit: e.target.checked }))}
          isDisabled={isProcessingPayment}
          imageUrl="/subdomains/liderexperto/venta/kitDeImplementacion.png"
          imageWidth={155}
          imageHeight={200}
          shortDescription="Consigue resultados 10x más rápido y con menos esfuerzo."
        >
          <ul className="space-y-1 list-inside mb-2 text-black">
            <li>✅ <span className="font-semibold">Velocidad Empresarial:</span> Implementa en 24 horas lo que otros hacen en meses.</li>
            <li>✅ <span className="font-semibold">IA que Facilita Todo:</span> Herramientas que automatizan la creación de documentos.</li>
            <li>✅ <span className="font-semibold">Plantillas Listas:</span> Para que no empieces desde cero.</li>
            <li>✅ <span className="font-semibold">Masterclass Exclusiva:</span> La implementación más eficiente que he desarrollado.</li>
          </ul>
        </BumpItem>
      </div>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <div className="flex justify-between items-center text-lg font-bold text-gray-800">
          <span>Total</span>
          <span>S/{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="relative">
        <button
          type="submit"
          disabled={isProcessingPayment}
          onMouseEnter={() => window.innerWidth >= 1024 && setShowGuaranteeTooltip(true)}
          onMouseLeave={() => setShowGuaranteeTooltip(false)}
          className={`w-full py-4 rounded-lg font-bold text-2xl lg:text-3xl cursor-pointer text-white leading-[1] transition-colors ${isProcessingPayment ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isProcessingPayment ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Procesando Pago...
            </div>
          ) : (
            <>
              ¡Obtener Oferta!<br />
              <span className="text-base font-normal leading-none">¡Sí! ¡Quiero Hacer Crecer mi Negocio!</span>
            </>
          )}
        </button>

        {/* Tooltip de Garantía */}
        {showGuaranteeTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-full max-w-[100%] bg-white border-2 border-blue-600 rounded-lg shadow-xl z-50 animate-fade-in">
            {/* Flecha apuntando hacia abajo */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-blue-600"></div>
            
            <div className="p-4">
              {/* Header rojo */}
              <div className="bg-blue-600 text-white text-center py-2 px-4 rounded-t-md -mx-4 -mt-4 mb-3">
                <h3 className="font-bold text-lg leading-[1.2]">Tendrás acceso a todo lo que necesitas</h3>
              </div>
              
              {/* Contenido */}
              <div className="text-center">
                <p className="text-black text-lg mb-3 leading-[1.2]">
                  Genera ventas<span className="font-bold"> PREDECIBLES </span>y construye un equipo que funcione sin ti, usando la metodología que ha transformado empresas en toda Latinoamérica.
                </p>
                
                <p className="text-black font-semibold bg-gray-300 text-lg leading-[1.2] p-1">
                  Respaldado por una garantía de devolución de dinero de 30 días
                </p>
              </div>
            </div>
          </div>
        )}
      </div>


      <p className="text-sm text-gray-500 mt-3 text-center leading-[1.3]">
        *Líder Experto se vende por 24.95 USD, pero hoy es gratis para ti. Solo cubres S/19 de envío y recibes el sistema completo que ha transformado empresas en todo Latinoamérica.
        Tu información está 100% protegida.
      </p>
    </div>
  );
}

// Componente de tarjeta
function CardPaymentForm(props: CardPaymentFormProps) {
  const { formData, errors, handleChange, handleExpiryChange, isProcessingPayment, savedTokens,
    useSavedToken, setUseSavedToken, chosenTokenId, setChosenTokenId,
    expiryInput, setExpiryInput, containerWidth, currentCardLogo,
    isVisible, identificationTypesPeru, handleCardHolderNameChange,
    handleCardHolderNameBlur, handleCardNumberBlur, handleExpiryBlur,
    handleCVVBlur, handleIdentificationBlur } = props;

  const handleExpiryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const cursorPosition = input.selectionStart || 0;
    const currentValue = input.value;

    // Solo manejar la tecla backspace
    if (e.key === 'Backspace') {
      // Si el cursor está justo después de "/" (posición 3)
      if (cursorPosition === 3 && currentValue.includes('/')) {
        e.preventDefault();
        // Borrar todo hasta la barra (incluyéndola)
        const newValue = currentValue.slice(0, 2);
        const formattedValue = props.handleExpiryChange(newValue);
        props.setExpiryInput(formattedValue);
        // Posicionar el cursor al final del nuevo valor
        setTimeout(() => {
          input.setSelectionRange(2, 2);
        }, 0);
      }
      // Si el cursor está en la posición de la "/" (posición 2)
      else if (cursorPosition === 2 && currentValue[2] === '/') {
        e.preventDefault();
        // Borrar el último dígito del mes
        const newValue = currentValue.slice(0, 1) + currentValue.slice(3);
        const formattedValue = props.handleExpiryChange(newValue);
        props.setExpiryInput(formattedValue);
        // Posicionar el cursor después del primer dígito
        setTimeout(() => {
          input.setSelectionRange(1, 1);
        }, 0);
      }
    }
  };

  return (
    <div className="mb-6 animate-fade-in">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg flex items-center">
            <FiCreditCard className="mr-2" />Pago Seguro
          </h3>
          <FiShield className="w-6 h-6" />
        </div>
        <p className="text-teal-100 text-sm mt-1">Tus datos están protegidos con encriptación SSL</p>
      </div>

      {savedTokens.length > 0 && (
        <div className="mb-4 p-4 border rounded-md bg-gray-50">
          <h4 className="font-semibold">Usar tarjeta guardada</h4>
          <label className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={useSavedToken}
              onChange={(e) => {
                setUseSavedToken(e.target.checked);
                if (!e.target.checked) setChosenTokenId(null);
              }}
              className="mr-2"
            />
            Prefiero pagar con una tarjeta que ya guardé
          </label>
          {useSavedToken && (
            <select
              value={chosenTokenId ?? ""}
              onChange={(e) => setChosenTokenId(e.target.value)}
              className="border rounded-md p-2 w-full text-sm mt-2"
            >
              <option value="" disabled>-- Elige una tarjeta --</option>
              {savedTokens.map((tok) => (
                <option key={tok.tokenid} value={tok.tokenid}>
                  {tok.masked_number} ({tok.payment_method} — exp: {tok.expiration_date})
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {!useSavedToken && (
        <div className="bg-white border border-gray-200 rounded-b-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre en la Tarjeta</label>
            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleCardHolderNameChange}
              onBlur={handleCardHolderNameBlur}
              placeholder="Nombre completo como aparece en la tarjeta"
              disabled={isProcessingPayment}
              className={`w-full p-3 border rounded-lg text-black ${errors.cardHolderName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
            {errors.cardHolderName && <p className="text-red-500 text-xs mt-1">{errors.cardHolderName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                onBlur={handleCardNumberBlur}
                placeholder="1234 1234 1234 1234"
                maxLength={formData.paymentMethod === "AMEX" ? 17 : 19}
                className={`w-full px-3 py-2 text-black border rounded-md ${errors.cardNumber ? "border-red-300" : "border-gray-300"
                  }`}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {formData.paymentMethod ? (
                  <Image
                    src={`/venta/${formData.paymentMethod.toLowerCase()}Icon.jpg`}
                    alt={formData.paymentMethod}
                    width={32}
                    height={20}
                    className="h-6 w-auto"
                  />
                ) : containerWidth >= 460 ? (
                  <div className="flex gap-1 justify-end">
                    {CARD_LOGOS.map((logo, index: number) => (
                      <Image
                        key={index}
                        src={logo.path}
                        alt={logo.type}
                        width={32}
                        height={20}
                        className="h-6 w-auto"
                      />
                    ))}
                  </div>
                ) : (
                  <Image
                    key={currentCardLogo}
                    src={CARD_LOGOS[currentCardLogo].path}
                    alt={CARD_LOGOS[currentCardLogo].type}
                    width={32}
                    height={20}
                    className={`h-6 w-auto transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
                  />
                )}
              </div>
            </div>
            {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de caducidad</label>
              <input
                type="text"
                name="expiry"
                value={expiryInput}
                onChange={(e) => {
                  const formattedValue = handleExpiryChange(e.target.value);
                  setExpiryInput(formattedValue);
                }}
                onKeyDown={handleExpiryKeyDown}
                onBlur={handleExpiryBlur}
                maxLength={5}
                placeholder="MM/AA"
                className={`w-full px-3 py-2 border text-black rounded-md ${errors.expiryMonth ? "border-red-300" : "border-gray-300"
                  }`}
              />
              {errors.expiryMonth && <p className="mt-1 text-sm text-red-600">{errors.expiryMonth}</p>}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Código de seguridad</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                onBlur={handleCVVBlur}
                maxLength={formData.paymentMethod === "AMEX" ? 4 : 3}
                placeholder="CVC"
                className={`w-full px-3 py-2 border text-black rounded-md pr-12 ${errors.cvv ? "border-red-300" : "border-gray-300"
                  }`}
              />
              <div className="absolute right-1 bottom-[8px] pointer-events-none">
                <Image
                  src={formData.paymentMethod === "AMEX" ? "/subdomains/liderexperto/venta/cvc.png" : "/subdomains/liderexperto/venta/cvv.png"}
                  alt="CVV Icon"
                  width={36}
                  height={27}
                  className="w-[36px]"
                />
              </div>
              {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
              <select
                name="identificationType"
                value={formData.identificationType}
                onChange={handleChange}
                disabled={isProcessingPayment}
                className={`w-full p-3 border rounded-lg text-black ${errors.identificationType ? "border-red-500" : "border-gray-300"
                  }`}
              >
                {identificationTypesPeru.map((type) => (
                  <option key={type.code} value={type.code}>{type.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número de Documento</label>
              <input
                type="text"
                name="identificationNumber"
                value={formData.identificationNumber}
                onChange={handleChange}
                onBlur={handleIdentificationBlur}
                placeholder={formData.identificationType === "DNI" ? "12345678" : "Número de documento"}
                disabled={isProcessingPayment}
                maxLength={formData.identificationType === "DNI" ? 8 : 12}
                className={`w-full p-3 border rounded-lg text-black ${errors.identificationNumber ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.identificationNumber && <p className="text-red-500 text-xs mt-1">{errors.identificationNumber}</p>}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center text-green-700">
              <FiShield className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Pago 100% seguro</span>
            </div>
            <p className="text-green-600 text-xs mt-1">Utilizamos encriptación SSL de 256 bits para proteger tu información</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente de Yape
function YapePaymentForm({ yapeNumber, yapeCode, handleYapeNumberChange, handleYapeCodeChange, handleYapeNumberBlur, handleYapeCodeBlur, isProcessingPayment, errors }: YapePaymentFormProps) {
  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 animate-fade-in">
      <div className="flex items-center mb-4">
        <Image
          src="/subdomains/liderexperto/venta/yape.png"
          alt="Yape Logo"
          className="h-12 w-12 mr-3 object-contain"
          width={48}
          height={48}
        />
        <h3 className="font-semibold text-lg text-gray-800">Pagar con Yape</h3>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3 my-4">
        <div className="flex items-center text-green-700">
          <FiShield className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Pago 100% seguro</span>
        </div>
        <p className="text-green-600 text-xs mt-1">Utilizamos encriptación SSL de 256 bits para proteger tu información</p>
      </div>

      <div className="mb-6">
        <label className="block text-base font-medium text-black mb-1">Ingresa tu celular Yape</label>
        <input
          type="tel"
          value={yapeNumber}
          onChange={handleYapeNumberChange}
          onBlur={handleYapeNumberBlur} 
          placeholder="999 999 999"
          maxLength={11}
          disabled={isProcessingPayment}
          className={`w-full p-3 border rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.yapeNumber ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.yapeNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.yapeNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-base font-medium text-black mb-2">Código de aprobación</label>
        <div className="grid grid-cols-6 gap-2">
          {yapeCode.map((data: string, index: number) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={data}
              onChange={(e) => handleYapeCodeChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              onBlur={handleYapeCodeBlur}
              maxLength={1}
              disabled={isProcessingPayment}
              className={`w-full h-12 md:h-14 text-center text-lg font-semibold border rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.yapeCode ? "border-red-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>
        {errors.yapeCode && (
          <p className="text-red-500 text-xs mt-1">{errors.yapeCode}</p>
        )}
        <p className="text-base text-gray-500 mt-2 text-center">
          Encuéntralo en el menú de Yape, en la sección &ldquo;Código de aprobación&rdquo;.
        </p>
      </div>
    </div>
  );
}

// Componente Input reutilizable
function InputField({ name, label, value, onChange, error, disabled, type = "text", className = "", ...props }: InputFieldProps) {
  return (
    <div className={`relative z-0 w-full group ${className}`}>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${error ? "border-red-500 focus:border-red-600" : "border-gray-300 focus:border-blue-600"
          } appearance-none focus:outline-none focus:ring-0 peer`}
        placeholder=" "
        disabled={disabled}
        {...props}
      />
      <label
        htmlFor={name}
        className={`absolute text-sm ${error ? "text-red-500" : "text-gray-500"
          } duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}