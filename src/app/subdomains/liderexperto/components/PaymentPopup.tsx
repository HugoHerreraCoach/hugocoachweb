// src/components/PaymentRetryPopup.tsx
"use client";

import {
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
} from "react";
import { FiX, FiShield } from "react-icons/fi";
import { CreditCard, Wallet } from "lucide-react";
import Image from "next/image";

// Interfaces
interface PaymentRetryPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentSuccess: (result: PaymentResult) => void;
    productName: string;
    productPrice: number;
    userEmail?: string;
    prefillData?: UserData | null;
    currency?: string;
    installments?: number;
}

interface PaymentResult {
    success: boolean;
    message: string;
    transactionId?: string;
    referenceCode?: string;
    state?: string;
}

interface UserData {
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

interface FormData {
    // Datos de tarjeta (nuevos)
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardHolderName: string;
    paymentMethod: string;
    identificationType: string;
    identificationNumber: string;
    // Datos de usuario/envío
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    address: string;
    reference: string;
    country: string;
    department: string;
    city: string;
    postalCode: string;
    // Datos de Yape
    yapeNumber: string;
    yapeCode: string[];
}

interface FormErrors {
    cardNumber?: string;
    expiryMonth?: string;
    cvv?: string;
    cardHolderName?: string;
    identificationNumber?: string;
    yapeNumber?: string;
    yapeCode?: string;
}

// Constantes
const identificationTypesPeru = [
    { code: "DNI", name: "DNI" },
    { code: "CE", name: "Carné de Extranjería" },
];

const codigosPaisCelular = [
    { code: "+51", name: "Perú (+51)" },
    { code: "+1", name: "Estados Unidos (+1)" },
    { code: "+34", name: "España (+34)" },
    { code: "+52", name: "México (+52)" },
];

const departamentosPeru = [
    { name: "Lima" },
    { name: "Arequipa" },
    { name: "Cusco" },
    { name: "La Libertad" },
    { name: "Piura" },
    { name: "Lambayeque" },
    { name: "Junín" },
    { name: "Cajamarca" },
    { name: "Puno" },
    { name: "Ica" },
    { name: "Ancash" },
    { name: "Huánuco" },
    { name: "Ayacucho" },
    { name: "San Martín" },
    { name: "Loreto" },
    { name: "Ucayali" },
    { name: "Amazonas" },
    { name: "Tumbes" },
    { name: "Tacna" },
    { name: "Moquegua" },
    { name: "Pasco" },
    { name: "Apurímac" },
    { name: "Huancavelica" },
    { name: "Madre de Dios" },
];

const CARD_LOGOS = [
    { type: "VISA", path: "/subdomains/liderexperto/venta/visaIcon.jpg" },
    { type: "MASTERCARD", path: "/subdomains/liderexperto/venta/mastercardIcon.jpg" },
    { type: "AMEX", path: "/subdomains/liderexperto/venta/amexIcon.jpg" },
    { type: "DINERS", path: "/subdomains/liderexperto/venta/dinersIcon.jpg" },
];

// Funciones de validación mejoradas del TwoStepCheckout
const detectCardType = (number: string): { type: string; isValid: boolean } => {
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

const formatCardNumber = (value: string): string => {
    const cleanValue = value.replace(/\D/g, "");
    const cardType = detectCardType(cleanValue);

    if (cardType.type === "AMEX") {
        return cleanValue
            .replace(/(\d{4})/, "$1 ")
            .replace(/(\d{4}) (\d{6})/, "$1 $2 ")
            .trim();
    } else {
        return cleanValue.replace(/(\d{4})/g, "$1 ").trim();
    }
};

const validateCard = (number: string): boolean => {
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

const validateCVV = (cvv: string, cardType: string): boolean => {
    if (cardType === "AMEX") {
        return /^\d{4}$/.test(cvv);
    }
    return /^\d{3}$/.test(cvv);
};

const validateExpiry = (month: string, year: string): { isValid: boolean; error?: string } => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);

    const isValid = expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth);
    return {
        isValid,
        error: isValid ? undefined : "Tarjeta vencida.",
    };
};

const generateReference = (): string => {
    return `REF_RETRY_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

export default function PaymentPopup({
    isOpen,
    onClose,
    onPaymentSuccess,
    productName,
    productPrice,
    prefillData,
    currency = "PEN",
    installments = 1
}: PaymentRetryPopupProps) {
    const installmentAmount = installments > 1 ? productPrice / installments : productPrice;
    const isInstallmentPlan = installments > 1;

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [currentCardLogo, setCurrentCardLogo] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [expiryInput, setExpiryInput] = useState("");
    
    // Estado para el checkbox de usar datos guardados
    const [useSavedData, setUseSavedData] = useState(!!prefillData);
    
    // Estados para Yape
    const [yapeNumber, setYapeNumber] = useState("");
    const [yapeCode, setYapeCode] = useState(new Array(6).fill(""));

    const [formData, setFormData] = useState<FormData>({
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
        cardHolderName: prefillData ? `${prefillData.firstName} ${prefillData.lastName}` : "",
        paymentMethod: "",
        identificationType: prefillData?.identificationType || "DNI",
        identificationNumber: prefillData?.identificationNumber || "",
        // Datos de usuario/envío
        firstName: prefillData?.firstName || "",
        lastName: prefillData?.lastName || "",
        email: prefillData?.email || "",
        phoneCountryCode: prefillData?.phoneCountryCode || "+51",
        phoneNumber: prefillData?.phoneNumber || "",
        address: prefillData?.address || "",
        reference: prefillData?.reference || "",
        country: prefillData?.country || "PE",
        department: prefillData?.department || "",
        city: prefillData?.city || "",
        postalCode: prefillData?.postalCode || "",
        yapeNumber: "",
        yapeCode: new Array(6).fill(""),
    });

    // Efecto para limpiar formulario cuando se abre
    useEffect(() => {
        if (isOpen) {
            setFormData({
                cardNumber: "",
                expiryMonth: "",
                expiryYear: "",
                cvv: "",
                cardHolderName: prefillData ? `${prefillData.firstName} ${prefillData.lastName}` : "",
                paymentMethod: "",
                identificationType: prefillData?.identificationType || "DNI",
                identificationNumber: prefillData?.identificationNumber || "",
                // Datos de usuario/envío
                firstName: prefillData?.firstName || "",
                lastName: prefillData?.lastName || "",
                email: prefillData?.email || "",
                phoneCountryCode: prefillData?.phoneCountryCode || "+51",
                phoneNumber: prefillData?.phoneNumber || "",
                address: prefillData?.address || "",
                reference: prefillData?.reference || "",
                country: prefillData?.country || "PE",
                department: prefillData?.department || "",
                city: prefillData?.city || "",
                postalCode: prefillData?.postalCode || "",
                yapeNumber: "",
                yapeCode: new Array(6).fill(""),
            });
            setErrors({});
            setExpiryInput("");
            setYapeNumber("");
            setYapeCode(new Array(6).fill(""));
            setSelectedPaymentMethod("card");
            setUseSavedData(!!prefillData);
        }
    }, [isOpen, prefillData]);
    
    // Efecto para manejar el cambio del checkbox de usar datos guardados
    useEffect(() => {
        if (useSavedData && prefillData) {
            // Usar datos guardados - mantener todos los datos del usuario
            setFormData(prev => ({
                ...prev,
                firstName: prefillData.firstName,
                lastName: prefillData.lastName,
                email: prefillData.email,
                phoneCountryCode: prefillData.phoneCountryCode,
                phoneNumber: prefillData.phoneNumber,
                address: prefillData.address,
                reference: prefillData.reference || "",
                country: prefillData.country,
                department: prefillData.department,
                city: prefillData.city,
                postalCode: prefillData.postalCode,
                cardHolderName: `${prefillData.firstName} ${prefillData.lastName}`,
                identificationType: prefillData.identificationType,
                identificationNumber: prefillData.identificationNumber,
            }));
        } else if (!useSavedData && prefillData) {
            // Desmarcar checkbox - prellenar campos con datos guardados para edición
            setFormData(prev => ({
                ...prev,
                firstName: prefillData.firstName,
                lastName: prefillData.lastName,
                email: prefillData.email,
                phoneCountryCode: prefillData.phoneCountryCode,
                phoneNumber: prefillData.phoneNumber,
                address: prefillData.address,
                reference: prefillData.reference || "",
                country: prefillData.country,
                department: prefillData.department,
                city: prefillData.city,
                postalCode: prefillData.postalCode,
                cardHolderName: `${prefillData.firstName} ${prefillData.lastName}`,
                identificationType: prefillData.identificationType,
                identificationNumber: prefillData.identificationNumber,
            }));
        } else {
            // No hay datos guardados - limpiar formulario
            setFormData(prev => ({
                ...prev,
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
                cardHolderName: "",
                identificationType: "DNI",
                identificationNumber: "",
            }));
        }
    }, [useSavedData, prefillData]);

    // Efecto para fecha de expiración
    useEffect(() => {
        if (formData.expiryMonth && formData.expiryYear) {
            setExpiryInput(
                `${formData.expiryMonth.padStart(2, "0")}/${formData.expiryYear.length === 4
                    ? formData.expiryYear.slice(2)
                    : formData.expiryYear
                }`
            );
        } else {
            setExpiryInput("");
        }
    }, [formData.expiryMonth, formData.expiryYear]);

    // Efecto para transición de logos
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        const intervalId = setInterval(() => {
            setIsVisible(false);
            timeoutId = setTimeout(() => {
                setCurrentCardLogo((prevIndex) => (prevIndex + 1) % CARD_LOGOS.length);
                setIsVisible(true);
            }, 500);
        }, 3000);
        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, []);

    // Manejador genérico de cambios
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        switch (name) {
            case "cardNumber":
                handleCardNumberChange(value);
                break;
            case "cvv":
                handleCVVChange(value);
                break;
            case "identificationNumber":
                handleIdentificationChange(value);
                break;
            default:
                setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        // Limpiar errores al cambiar
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    // Manejador específico para número de tarjeta con validaciones mejoradas
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
                const expiryField = document.querySelector('input[placeholder="MM/AA"]') as HTMLInputElement;
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

    // Manejador específico para CVV con validaciones mejoradas
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
        }
        
        // Auto-focus al siguiente campo cuando CVV está completo
        if (cleanValue.length === maxLength) {
            const dniInput = document.querySelector('input[name="identificationNumber"]') as HTMLInputElement;
            if (dniInput) {
                setTimeout(() => dniInput.focus(), 100);
            }
        }
    };

    const handleIdentificationChange = (value: string) => {
        const cleanValue = value.replace(/\D/g, '');
        setFormData(prev => ({ ...prev, identificationNumber: cleanValue }));
        
        // Limpiar error si el campo está vacío
        if (cleanValue.length === 0) {
            setErrors(prev => ({ ...prev, identificationNumber: undefined }));
        }
    };

    // Manejador específico para fecha de expiración con validaciones mejoradas
    const handleExpiryChange = (value: string): string => {
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

        // Actualizar el input visual
        setExpiryInput(formatted);

        // Limpiar error si el campo queda vacío
        if (formatted.length === 0) {
            setFormData(prev => ({
                ...prev,
                expiryMonth: "",
                expiryYear: "",
            }));
            setErrors(prev => ({
                ...prev,
                expiryMonth: undefined
            }));
            return formatted;
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
                // Si no está completo, limpiar los datos del form pero mantener el error limpio
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

    // Funciones de validación onBlur
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
        // Si el campo tiene contenido pero está incompleto
        if (expiryInput.length > 0 && expiryInput.length < 5) {
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
        } else if (expiryInput.length === 0) {
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
        } else if (formData.cvv.length > 0 && validateCVV(formData.cvv, formData.paymentMethod)) {
            setErrors(prev => ({
                ...prev,
                cvv: undefined
            }));
        }
    };

    const handleYapeNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 0 && value[0] !== "9") {
            return;
        }
        if (value.length > 9) value = value.slice(0, 9);
        const formattedValue = value.replace(/(\d{3})(?=\d)/g, "$1 ");
        setYapeNumber(formattedValue);
        setFormData((prev) => ({
            ...prev,
            yapeNumber: value.replace(/\s+/g, ""),
        }));
        
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

    const handleYapeCodeChange = (element: HTMLInputElement, index: number): boolean => {
        const value = element.value;
        if (!/^[0-9]$/.test(value) && value !== "") {
            element.value = "";
            return false;
        }
        const newCode = [...yapeCode];
        newCode[index] = value;
        setYapeCode(newCode);
        setFormData((prev) => ({
            ...prev,
            yapeCode: newCode,
        }));

        // Limpiar error si algún campo se está llenando
        if (newCode.join("").length > 0 && errors.yapeCode) {
            setErrors(prev => ({ ...prev, yapeCode: undefined }));
        }

        if (element.nextSibling && value) {
            (element.nextSibling as HTMLInputElement).focus();
        }
        return true;
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (selectedPaymentMethod === "card") {
            if (!formData.cardHolderName.trim()) {
                newErrors.cardHolderName = "El nombre del titular es requerido.";
                isValid = false;
            }
            if (!validateCard(formData.cardNumber)) {
                newErrors.cardNumber = "Número de tarjeta inválido.";
                isValid = false;
            }
            if (!formData.expiryMonth || !formData.expiryYear) {
                newErrors.expiryMonth = "Fecha de vencimiento requerida.";
                isValid = false;
            } else {
                const expiryValidation = validateExpiry(formData.expiryMonth, formData.expiryYear);
                if (!expiryValidation.isValid) {
                    newErrors.expiryMonth = expiryValidation.error;
                    isValid = false;
                }
            }
            if (!validateCVV(formData.cvv, formData.paymentMethod)) {
                newErrors.cvv = "CVV inválido.";
                isValid = false;
            }
            if (!formData.identificationNumber.trim()) {
                newErrors.identificationNumber = "El número de documento es requerido.";
                isValid = false;
            }
        } else if (selectedPaymentMethod === "yape") {
            if (!/^\d{9}$/.test(formData.yapeNumber)) {
                newErrors.yapeNumber = "Celular Yape debe tener 9 dígitos.";
                isValid = false;
            }
            if (formData.yapeCode.join("").length !== 6) {
                newErrors.yapeCode = "Código de aprobación debe tener 6 dígitos.";
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);

        try {
            if (selectedPaymentMethod === "card") {
                // Actualizar datos del usuario en la base de datos
                await updateUserData();

                // Procesar pago directamente con Stripe
                const chargeRes = await fetch("/api/stripe/charge", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount: installmentAmount,
                        currency: currency,
                        email: formData.email,
                        name: formData.cardHolderName || `${formData.firstName} ${formData.lastName}`,
                        cardNumber: formData.cardNumber.replace(/\s+/g, ""),
                        expiryMonth: String(formData.expiryMonth).padStart(2, "0"),
                        expiryYear: String(formData.expiryYear),
                        cvc: formData.cvv,
                        description: isInstallmentPlan ? `Cuota 1 de ${installments} - ${productName}` : productName,
                    }),
                });

                const chargeJson = await chargeRes.json();

                if (chargeRes.ok && chargeJson.success) {
                    if (chargeJson.customerId && typeof window !== "undefined") {
                        localStorage.setItem("stripe_customer_id", chargeJson.customerId);
                    }
                    onPaymentSuccess(chargeJson);
                } else {
                    throw new Error(chargeJson.error || "Error procesando el pago con tarjeta.");
                }


            } else if (selectedPaymentMethod === "yape") {
                // Procesar pago con Yape usando los datos del formulario actual
                const yapeRes = await fetch("/api/payu/payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        language: "es",
                        command: "SUBMIT_TRANSACTION",
                        transaction: {
                            order: {
                                referenceCode: generateReference(),
                                description: isInstallmentPlan ? `Cuota 1 de ${installments} - ${productName}` : productName,
                                language: "es",
                                signature: "", // Se generará en el backend
                                additionalValues: {
                                    TX_VALUE: {
                                        value: installmentAmount,
                                        currency: "PEN",
                                    },
                                },
                                buyer: formData.firstName ? {
                                    merchantBuyerId: formData.email,
                                    fullName: `${formData.firstName} ${formData.lastName}`,
                                    emailAddress: formData.email,
                                    contactPhone: `${formData.phoneCountryCode}${formData.phoneNumber}`,
                                    dniNumber: formData.identificationNumber,
                                } : undefined,
                            },
                            extraParameters: {
                                OTP: formData.yapeCode.join(""),
                            },
                            type: "AUTHORIZATION_AND_CAPTURE",
                            paymentMethod: "YAPE",
                            paymentCountry: "PE",
                        },
                    }),
                });

                const yapeJson = await yapeRes.json();

                if (yapeRes.ok && yapeJson.transactionResponse?.state === 'APPROVED') {
                    onPaymentSuccess({
                        success: true,
                        message: "¡Pago con Yape exitoso!",
                        transactionId: yapeJson.transactionResponse.transactionId,
                    });
                } else {
                    throw new Error(yapeJson.message || "Error procesando pago con Yape");
                }
            }

        } catch (error) {
            console.error("Error en pago:", error);
            // Mostrar error pero no cerrar el popup para que puedan intentar de nuevo
            setErrors({
                cardNumber: error instanceof Error ? error.message : "Error procesando el pago"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const updateUserData = async () => {
        try {
            // Siempre usar los datos actuales del formulario
            // Si useSavedData está marcado, formData ya contiene los datos guardados
            // Si está desmarcado, formData contiene los datos editados por el usuario
            const dataToSave = {
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
                identificationType: formData.identificationType,
                identificationNumber: formData.identificationNumber,
            };

            // console.log('Enviando datos del usuario a PayU:', dataToSave);
            await fetch("/api/user/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSave),
            });
        } catch (error) {
            console.error("Error actualizando datos del usuario:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center text-left justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[95vh] overflow-hidden">
                {/* Header */}
                <div className="bg-green-600 text-white p-4 flex justify-between items-center text-center">
                    <h2 className="text-lg font-bold">Selecciona tu método de pago</h2>
                    <button
                        onClick={onClose}
                        disabled={isProcessing}
                        className="rounded-3xl hover:text-gray-700 hover:bg-white disabled:opacity-50"
                    >
                        <FiX size={24} className="cursor-pointer"/>
                    </button>
                </div>

                <div className="px-4 pb-6 md:p-6 md:p-6 pt-4 overflow-y-auto max-h-[calc(95vh-80px)]">
                    <div className="pb-4 pt-2">
                        <h3 className="font-bold text-black mb-2 text-center text-2xl">Resumen del Pedido</h3>
                        <div className="space-y-1 text-md text-black">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold leading-[1.3] mr-2">{productName}</span>
                                {isInstallmentPlan ? (
                                    <span className="font-semibold text-right">
                                        {installments} cuotas de {currency === "PEN" ? "S/" : "$"}{installmentAmount.toFixed(2)}
                                    </span>
                                ) : (
                                    <span className="font-semibold">
                                        {currency === "PEN" ? "S/" : "$"}{productPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            {isInstallmentPlan && (
                                <p className="text-sm text-gray-600 text-right">Total: S/{productPrice.toFixed(2)}</p>
                            )}
                        </div>
                    </div>

                    {/* Checkbox para usar datos guardados */}
                    {prefillData && (
                        <div className="mb-4 p-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={useSavedData}
                                    onChange={(e) => setUseSavedData(e.target.checked)}
                                    disabled={isProcessing}
                                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                />
                                <span className="text-sm font-medium text-blue-800 leading-[1.2]">
                                    Información de envío completa
                                </span>
                            </label>
                        </div>
                    )}

                    {/* Información de envío - aparece cuando se desmarca el checkbox o no hay datos guardados */}
                    {(!prefillData || (prefillData && !useSavedData)) && (
                        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <h4 className="text-md font-semibold text-gray-800 mb-4">Información de Envío</h4>
                            
                            {/* Nombres y Apellidos */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombres
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        disabled={isProcessing}
                                        className="w-full p-3 border rounded-lg text-black border-gray-300"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Apellidos
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        disabled={isProcessing}
                                        className="w-full p-3 border rounded-lg text-black border-gray-300"
                                        placeholder="Tu apellido"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isProcessing}
                                    className="w-full p-3 border rounded-lg text-black border-gray-300"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            {/* Teléfono */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        País
                                    </label>
                                    <select
                                        name="phoneCountryCode"
                                        value={formData.phoneCountryCode}
                                        onChange={handleChange}
                                        disabled={isProcessing}
                                        className="w-full p-3 border rounded-lg text-black border-gray-300"
                                    >
                                        {codigosPaisCelular.map((country) => (
                                            <option key={country.code} value={country.code}>
                                                {country.code}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        disabled={isProcessing}
                                        className="w-full p-3 border rounded-lg text-black border-gray-300"
                                        placeholder="999 888 777"
                                    />
                                </div>
                            </div>

                            {/* Dirección */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={isProcessing}
                                    className="w-full p-3 border rounded-lg text-black border-gray-300"
                                    placeholder="Tu dirección completa"
                                />
                            </div>

                            {/* Referencia */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Referencia (Opcional)
                                </label>
                                <input
                                    type="text"
                                    name="reference"
                                    value={formData.reference}
                                    onChange={handleChange}
                                    disabled={isProcessing}
                                    className="w-full p-3 border rounded-lg text-black border-gray-300"
                                    placeholder="Casa verde, segundo piso, etc."
                                />
                            </div>

                            {/* Ubicación */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Departamento
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        disabled={isProcessing}
                                        className="w-full p-3 border rounded-lg text-black border-gray-300"
                                    >
                                        <option value="">Seleccione</option>
                                        {departamentosPeru.map((dept) => (
                                            <option key={dept.name} value={dept.name}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ciudad
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        disabled={isProcessing}
                                        className="w-full p-3 border rounded-lg text-black border-gray-300"
                                        placeholder="Tu ciudad"
                                    />
                                </div>
                            </div>

                            {/* Código Postal */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Código Postal
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    disabled={isProcessing}
                                    className="w-full p-3 border rounded-lg text-black border-gray-300"
                                    placeholder="15001"
                                />
                            </div>
                        </div>
                    )}

                    {/* Métodos de pago */}
                    <div className="mb-4">
                        <h3 className="font-semibold text-gray-800 mb-3">
                            Selecciona tu método de pago
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedPaymentMethod("card")}
                                disabled={isProcessing}
                                className={`flex items-center justify-center p-3 border rounded-lg transition-colors text-sm cursor-pointer ${selectedPaymentMethod === "card"
                                        ? "bg-blue-600 text-white border-blue-700"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                <CreditCard className="mr-2 h-5 w-5" />
                                Tarjeta
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedPaymentMethod("yape")}
                                disabled={isProcessing}
                                className={`flex items-center justify-center p-3 border rounded-lg transition-colors text-sm cursor-pointer ${selectedPaymentMethod === "yape"
                                        ? "bg-purple-600 text-white border-purple-700"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                <Wallet className="mr-2 h-5 w-5" />
                                Yape
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Formulario de tarjeta */}
                        {selectedPaymentMethod === "card" && (
                            <div className="space-y-4">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <div className="flex items-center text-green-700">
                                    <FiShield className="w-4 h-4 mr-2" />
                                    <span className="text-sm font-medium">Pago 100% seguro</span>
                                    </div>
                                    <p className="text-green-600 text-xs mt-1">Utilizamos encriptación SSL de 256 bits para proteger tu información</p>
                                </div>

                                {/* Nombre del titular */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre en la Tarjeta
                                    </label>
                                    <input
                                        type="text"
                                        name="cardHolderName"
                                        value={formData.cardHolderName}
                                        onChange={handleChange}
                                        disabled={isProcessing}
                                        className={`w-full p-3 py-2 border rounded-lg text-black ${errors.cardHolderName ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {errors.cardHolderName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.cardHolderName}</p>
                                    )}
                                </div>

                                {/* Número de tarjeta */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Número de Tarjeta
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            onBlur={handleCardNumberBlur}
                                            placeholder="1234 1234 1234 1234"
                                            maxLength={formData.paymentMethod === "AMEX" ? 17 : 19}
                                            disabled={isProcessing}
                                            className={`w-full p-3 py-2 border rounded-lg text-black pr-12 ${errors.cardNumber ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {formData.paymentMethod ? (
                                                <Image
                                                    src={`/venta/${formData.paymentMethod.toLowerCase()}Icon.jpg`}
                                                    alt={formData.paymentMethod}
                                                    width={32}
                                                    height={20}
                                                    className="h-6 w-auto"
                                                />
                                            ) : (
                                                <Image
                                                    src={CARD_LOGOS[currentCardLogo].path}
                                                    alt={CARD_LOGOS[currentCardLogo].type}
                                                    width={32}
                                                    height={20}
                                                    className={`h-6 w-auto transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
                                                        }`}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    {errors.cardNumber && (
                                        <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                                    )}
                                </div>

                                {/* Fecha y CVV */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 leading-[1.2]">
                                            Fecha de caducidad
                                        </label>
                                        <input
                                            type="text"
                                            value={expiryInput}
                                            onChange={(e) => handleExpiryChange(e.target.value)}
                                            onBlur={handleExpiryBlur}
                                            maxLength={5}
                                            placeholder="MM/AA"
                                            disabled={isProcessing}
                                            className={`w-full p-3 py-2 border rounded-lg text-black ${errors.expiryMonth ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors.expiryMonth && (
                                            <p className="text-red-500 text-xs mt-1">{errors.expiryMonth}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 leading-[1.2]">
                                            Código de Seguridad
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleChange}
                                                onBlur={handleCVVBlur}
                                                maxLength={formData.paymentMethod === "AMEX" ? 4 : 3}
                                                placeholder="CVV"
                                                disabled={isProcessing}
                                                className={`w-full p-3 py-2 border rounded-lg text-black pr-12 ${errors.cvv ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <Image
                                                    src={formData.paymentMethod === "AMEX" ? "/subdomains/liderexperto/venta/cvc.png" : "/subdomains/liderexperto/venta/cvv.png"}
                                                    alt="CVV"
                                                    width={24}
                                                    height={18}
                                                    className="w-6"
                                                />
                                            </div>
                                        </div>
                                        {errors.cvv && (
                                            <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Datos de identificación */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tipo Doc.
                                        </label>
                                        <select
                                            name="identificationType"
                                            value={formData.identificationType}
                                            onChange={handleChange}
                                            disabled={isProcessing}
                                            className="w-full p-3 py-2 border rounded-lg text-black border-gray-300"
                                        >
                                            {identificationTypesPeru.map((type) => (
                                                <option key={type.code} value={type.code}>
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nro. Doc.
                                        </label>
                                        <input
                                            type="text"
                                            name="identificationNumber"
                                            value={formData.identificationNumber}
                                            onChange={handleChange}
                                            disabled={isProcessing}
                                            maxLength={formData.identificationType === "DNI" ? 8 : 12}
                                            placeholder="12345678"
                                            className={`w-full p-3 py-2 border rounded-lg text-black ${errors.identificationNumber ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors.identificationNumber && (
                                            <p className="text-red-500 text-xs mt-1">{errors.identificationNumber}</p>
                                        )}
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* Formulario de Yape */}
                        {selectedPaymentMethod === "yape" && (
                            <div className="space-y-4">
                                <div className="flex items-center mb-4">
                                    <Image
                                        src="/subdomains/liderexperto/venta/yape.png"
                                        alt="Yape Logo"
                                        className="h-12 w-12 mr-3 object-contain"
                                        width={150}
                                        height={150}
                                    />
                                    <h3 className="font-semibold text-lg text-gray-800">
                                        Pagar con Yape
                                    </h3>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Celular con Yape
                                    </label>
                                    <input
                                        type="tel"
                                        value={yapeNumber}
                                        onChange={handleYapeNumberChange}
                                        onBlur={handleYapeNumberBlur}
                                        placeholder="999 999 999"
                                        maxLength={11}
                                        disabled={isProcessing}
                                        className={`w-full p-3 border rounded-lg text-black ${errors.yapeNumber ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {errors.yapeNumber && (
                                        <p className="text-red-500 text-xs mt-1">{errors.yapeNumber}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Código de Aprobación
                                    </label>
                                    <div className="grid grid-cols-6 gap-2">
                                        {yapeCode.map((data, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={data}
                                                onChange={(e) => handleYapeCodeChange(e.target, index)}
                                                onFocus={(e) => e.target.select()}
                                                maxLength={1}
                                                disabled={isProcessing}
                                                className={`w-full h-12 text-center text-lg font-semibold border rounded-lg text-black ${errors.yapeCode ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    {errors.yapeCode && (
                                        <p className="text-red-500 text-xs mt-1">{errors.yapeCode}</p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        Encuéntralo en tu app Yape, sección &ldquo;Código de aprobación&rdquo;
                                    </p>
                                </div>
                            </div>
                        )}
                        
                        {/* Botón de pago */}
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full cursor-pointer mt-6 py-3 rounded-lg font-bold text-2xl transition-colors ${isProcessing
                                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            {isProcessing ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Procesando...
                                </div>
                            ) : (
                                `¡Obtener oferta!`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}