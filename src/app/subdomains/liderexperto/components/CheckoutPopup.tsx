// src/components/CheckoutPopup.tsx
"use client";

import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
  ReactNode,
} from "react";
import { FiLock, FiX } from "react-icons/fi";
import { CreditCard, Wallet, AlertCircle } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

// --- SECCIÓN 1: DATOS Y CONSTANTES ---
const identificationTypesPeru = [
  { code: "DNI", name: "DNI" },
  { code: "CE", name: "Carné de Extranjería" },
];

// --- SECCIÓN 2: INTERFACES DE TIPOS ---
interface PaymentResult {
  success: boolean;
  message: string;
  transactionId?: string;
  referenceCode?: string;
  state?: string;
}

interface FormData {
  identificationType: string;
  identificationNumber: string;
  cardHolderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  paymentMethod: string;
  yapeNumber: string;
  yapeCode: string[];
}

type FormErrors = Partial<Record<keyof FormData, string>>;

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

interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (result: PaymentResult) => void;
  productName: string;
  productImage: string;
  amount: number;
  shippingCost: number;
  currency?: string;
  installments?: number;
  offerDetails?: ReactNode;
  apiEndpoints: { signature: string; payment: string };
  userData?: UserData;
}

// --- SECCIÓN 3: HELPERS DE VALIDACIÓN Y FORMATO ---
const detectCardType = (n: string): string => {
  const c = n.replace(/\s+/g, "");
  if (/^4/.test(c)) return "VISA";
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/.test(c))
    return "MASTERCARD";
  if (/^3[47]/.test(c)) return "AMEX";
  if (/^3(0[0-5]|[689])/.test(c)) return "DINERS";
  return "";
};

const formatCardNumber = (v: string): string =>
  v
    .replace(/\s+/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .trim();

const validateCard = (n: string): boolean => {
  const c = n.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(c)) return false;
  let s = 0,
    e = false;
  for (let i = c.length - 1; i >= 0; i--) {
    let d = parseInt(c.charAt(i), 10);
    if (e) if ((d *= 2) > 9) d -= 9;
    s += d;
    e = !e;
  }
  return s % 10 === 0;
};

const validateCVV = (c: string): boolean => /^\d{3,4}$/.test(c);

const validateExpiry = (m: string, y: string): boolean => {
  if (!m || !y) return false;
  const n = new Date(),
    e = parseInt(y, 10),
    t = parseInt(m, 10),
    r = n.getFullYear(),
    o = n.getMonth() + 1;
  return e > r || (e === r && t >= o);
};

// --- SECCIÓN 4: SERVICIO DE PAGOS SIMPLIFICADO ---
class PayUService {
  static async processCardPayment(
    formData: FormData,
    totalPrice: number,
    installments: number,
    apiEndpoints: CheckoutPopupProps["apiEndpoints"]
  ): Promise<PaymentResult> {
    // This will be implemented with user data from database
    const response = await fetch(apiEndpoints.payment, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formData,
        totalPrice,
        installments,
        paymentType: "card"
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error processing payment");
    }

    return response.json();
  }

  static async processYapePayment(
    formData: FormData,
    totalPrice: number,
    apiEndpoints: CheckoutPopupProps["apiEndpoints"]
  ): Promise<PaymentResult> {
    // This will be implemented with user data from database
    const response = await fetch(apiEndpoints.payment, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formData,
        totalPrice,
        paymentType: "yape"
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error processing payment");
    }

    return response.json();
  }
}

// --- SECCIÓN 5: EL COMPONENTE REACT ---
export default function CheckoutPopup({
  isOpen,
  onClose,
  onPaymentSuccess,
  productName,
  productImage,
  amount,
  shippingCost,
  currency = "PEN",
  installments = 1,
  offerDetails,
  apiEndpoints,
  userData,
}: CheckoutPopupProps) {
  const [formData, setFormData] = useState<FormData>({
    identificationType: "DNI",
    identificationNumber: "",
    cardHolderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    paymentMethod: "",
    yapeNumber: "",
    yapeCode: new Array(6).fill(""),
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [cardNumberStatus, setCardNumberStatus] = useState<
    "empty" | "incomplete" | "invalid" | "valid"
  >("empty");
  const [isCardInputFocused, setIsCardInputFocused] = useState(false);

  const totalPrice = amount + shippingCost;
  const yapeInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      // Pre-llenar con datos del usuario si están disponibles
      const defaultCardHolderName = userData 
        ? `${userData.firstName} ${userData.lastName}`.trim()
        : "";
      
      const defaultIdentificationType = userData?.identificationType || "DNI";
      const defaultIdentificationNumber = userData?.identificationNumber || "";
      
      setFormData({
        identificationType: defaultIdentificationType,
        identificationNumber: defaultIdentificationNumber,
        cardHolderName: defaultCardHolderName,
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
        paymentMethod: "",
        yapeNumber: "",
        yapeCode: new Array(6).fill(""),
      });
      setErrors({});
      setPaymentResult(null);
      setIsProcessing(false);
      setSelectedPaymentMethod("card");
      setCardNumberStatus("empty");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, userData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.identificationNumber.trim())
      newErrors.identificationNumber = "Nro. de Documento es requerido.";

    if (selectedPaymentMethod === "card") {
      if (!validateCard(formData.cardNumber))
        newErrors.cardNumber = "Número de tarjeta inválido.";
      if (!validateExpiry(formData.expiryMonth, formData.expiryYear))
        newErrors.expiryMonth = "Fecha de vencimiento inválida.";
      if (!validateCVV(formData.cvv)) 
        newErrors.cvv = "CVV inválido.";
      if (!formData.cardHolderName.trim())
        newErrors.cardHolderName = "Nombre del titular requerido.";
      if (
        formData.identificationType === "DNI" &&
        formData.identificationNumber.length !== 8
      )
        newErrors.identificationNumber = "El DNI debe tener 8 dígitos.";
    }
    
    if (selectedPaymentMethod === "yape") {
      if (!/^\d{9}$/.test(formData.yapeNumber))
        newErrors.yapeNumber = "Celular Yape debe tener 9 dígitos.";
      if (formData.yapeCode.join("").length !== 6)
        newErrors.yapeCode = "Código de aprobación debe tener 6 dígitos.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log('handleChange called:', { name, value }); // Debug log
    
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));

    if (name === "cardNumber") {
      const cleaned = value.replace(/[^0-9]/g, "");
      const formatted = formatCardNumber(cleaned);
      setFormData((prev) => ({
        ...prev,
        cardNumber: formatted,
        paymentMethod: detectCardType(cleaned),
      }));
      if (!cleaned) setCardNumberStatus("empty");
      else if (cleaned.length < 13) setCardNumberStatus("incomplete");
      else if (validateCard(cleaned)) setCardNumberStatus("valid");
      else setCardNumberStatus("invalid");
      return;
    }

    let finalValue = value;
    if (
      [
        "identificationNumber",
        "cvv",
        "expiryMonth",
        "expiryYear",
        "yapeNumber",
      ].includes(name)
    )
      finalValue = value.replace(/[^0-9]/g, "");
    
    console.log('Setting formData:', { name, finalValue }); // Debug log
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleYapeCodeChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;
    const newCode = [...formData.yapeCode];
    newCode[index] = value;
    setFormData((prev) => ({ ...prev, yapeCode: newCode }));
    if (value && index < 5) yapeInputRefs.current[index + 1]?.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsProcessing(true);
    setPaymentResult(null);
    try {
      let result: PaymentResult;
      if (selectedPaymentMethod === "card") {
        result = await PayUService.processCardPayment(
          formData,
          totalPrice,
          installments,
          apiEndpoints
        );
      } else {
        result = await PayUService.processYapePayment(
          formData,
          totalPrice,
          apiEndpoints
        );
      }
      setPaymentResult(result);
      if (result.success) onPaymentSuccess(result);
    } catch (error) {
      setPaymentResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 bg-white p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-200 md:overflow-y-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Resumen de tu Orden
          </h2>
          <div className="flex items-center space-x-4 p-4 border rounded-lg mb-4">
            <Image
              src={productImage}
              alt={productName}
              width={60}
              height={60}
              className="rounded-md object-cover"
            />
            <div>
              <p className="font-semibold text-gray-800">{productName}</p>
            </div>
            <p className="ml-auto font-semibold text-gray-800">
              S/{amount.toFixed(2)}
            </p>
          </div>
          <div className="space-y-2 text-gray-600 mb-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>S/{amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>S/{shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t mt-2">
              <span>Total</span>
              <span>
                S/{totalPrice.toFixed(2)} {currency}
              </span>
            </div>
          </div>
          {offerDetails && (
            <div className="text-xs text-gray-500 mt-4">{offerDetails}</div>
          )}
          <div className="mt-6 text-center text-gray-500">
            <FiLock className="mx-auto mb-2 h-5 w-5" />
            <p className="text-xs font-semibold">Transacción Segura</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 disabled:opacity-50 z-10"
          >
            <FiX size={24} />
          </button>
          {paymentResult ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div
                className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${paymentResult.success
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
                  }`}
              >
                <span className="text-3xl font-bold">
                  {paymentResult.success ? "✓" : "✗"}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {paymentResult.success ? "¡Pago Exitoso!" : "Pago Fallido"}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {paymentResult.message}
              </p>
              <button
                onClick={onClose}
                className={`w-full max-w-xs text-white px-6 py-2 rounded-lg font-semibold transition-colors ${paymentResult.success
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                {paymentResult.success ? "Finalizar" : "Intentar de Nuevo"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Completa tu compra
              </h2>

              <section>
                <h3 className="text-base font-semibold text-gray-700 mt-4 mb-3 border-b pb-2">
                  Método de Pago
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod("card")}
                    disabled={isProcessing}
                    className={clsx(
                      "flex items-center justify-center p-2 border rounded-lg transition-colors text-sm",
                      {
                        "bg-blue-600 text-white border-blue-700":
                          selectedPaymentMethod === "card",
                        "bg-white hover:bg-gray-100":
                          selectedPaymentMethod !== "card",
                      }
                    )}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Tarjeta
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod("yape")}
                    disabled={isProcessing}
                    className={clsx(
                      "flex items-center justify-center p-2 border rounded-lg transition-colors text-sm",
                      {
                        "bg-purple-600 text-white border-purple-700":
                          selectedPaymentMethod === "yape",
                        "bg-white hover:bg-gray-100":
                          selectedPaymentMethod !== "yape",
                      }
                    )}
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Yape
                  </button>
                </div>

                {selectedPaymentMethod === "card" && (
                  <div className="border border-gray-200 bg-white p-4 rounded-lg space-y-3 animate-fade-in">
                    <div>
                      <label className="text-xs font-medium text-gray-700">
                        Nombre en la Tarjeta
                      </label>
                      <input
                        name="cardHolderName"
                        type="text"
                        value={formData.cardHolderName}
                        onChange={handleChange}
                        placeholder="Como aparece en la tarjeta"
                        className={`w-full mt-1 p-2 border rounded-md text-sm text-black placeholder:text-gray-400 ${
                          errors.cardHolderName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.cardHolderName && (
                        <p className="text-red-500 text-xs mt-1">{errors.cardHolderName}</p>
                      )}
                    </div>
                    
                    <div className="relative">
                      <label className="text-xs font-medium text-gray-700">
                        Número de Tarjeta
                      </label>
                      <input
                        name="cardNumber"
                        type="tel"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        onFocus={() => setIsCardInputFocused(true)}
                        onBlur={() => setIsCardInputFocused(false)}
                        placeholder="•••• •••• •••• ••••"
                        className={`w-full mt-1 p-2 border rounded-md text-sm text-black placeholder:text-gray-400 ${
                          errors.cardNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <div className="absolute top-8 right-2 flex items-center space-x-1 pointer-events-none">
                        {cardNumberStatus === "empty" && (
                          <>
                            <Image
                              src="/subdomains/liderexperto/venta/visaIcon.jpg"
                              alt="VISA"
                              width={24}
                              height={16}
                            />
                            <Image
                              src="/subdomains/liderexperto/venta/mastercardIcon.jpg"
                              alt="MasterCard"
                              width={24}
                              height={16}
                            />
                          </>
                        )}
                        {formData.paymentMethod === "VISA" && (
                          <Image
                            src="/subdomains/liderexperto/venta/visaIcon.jpg"
                            alt="VISA"
                            width={24}
                            height={16}
                          />
                        )}
                        {formData.paymentMethod === "MASTERCARD" && (
                          <Image
                            src="/subdomains/liderexperto/venta/mastercardIcon.jpg"
                            alt="MasterCard"
                            width={24}
                            height={16}
                          />
                        )}
                        {cardNumberStatus === "invalid" &&
                          !isCardInputFocused && (
                            <AlertCircle className="text-red-500" size={18} />
                          )}
                      </div>
                      {errors.cardNumber && !isCardInputFocused && (
                        <p className="text-red-500 text-xs mt-1">
                          Número de tarjeta inválido
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs font-medium">Mes</label>
                        <input
                          name="expiryMonth"
                          type="tel"
                          placeholder="MM"
                          maxLength={2}
                          value={formData.expiryMonth}
                          onChange={handleChange}
                          className={`w-full mt-1 p-2 border rounded-md text-sm text-black text-center placeholder:text-gray-400 ${
                            errors.expiryMonth
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium">Año</label>
                        <input
                          name="expiryYear"
                          type="tel"
                          placeholder="AAAA"
                          maxLength={4}
                          value={formData.expiryYear}
                          onChange={handleChange}
                          className={`w-full mt-1 p-2 border rounded-md text-sm text-black text-center placeholder:text-gray-400 ${
                            errors.expiryMonth
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium">CVV</label>
                        <input
                          name="cvv"
                          type="tel"
                          maxLength={4}
                          value={formData.cvv}
                          onChange={handleChange}
                          className={`w-full mt-1 p-2 border rounded-md text-sm text-black text-center placeholder:text-gray-400 ${
                            errors.cvv ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      </div>
                    </div>
                    {errors.expiryMonth && (
                      <p className="text-red-500 text-xs mt-1">{errors.expiryMonth}</p>
                    )}
                    {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div>
                        <label className="text-xs font-medium">Tipo Doc.</label>
                        <select
                          name="identificationType"
                          value={formData.identificationType}
                          onChange={handleChange}
                          disabled={isProcessing}
                          className={`w-full mt-1 p-2 border rounded-md text-sm text-black ${
                            errors.identificationType
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          {identificationTypesPeru.map((t) => (
                            <option key={t.code} value={t.code}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium">Nro. Doc.</label>
                        <input
                          name="identificationNumber"
                          type="tel"
                          value={formData.identificationNumber}
                          onChange={handleChange}
                          disabled={isProcessing}
                          placeholder="Ingrese su número de documento"
                          className={`w-full mt-1 p-2 border rounded-md text-sm text-black placeholder:text-gray-400 ${
                            errors.identificationNumber
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          maxLength={
                            formData.identificationType === "DNI" ? 8 : 12
                          }
                        />
                      </div>
                    </div>
                    {errors.identificationNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.identificationNumber}</p>
                    )}
                  </div>
                )}

                {selectedPaymentMethod === "yape" && (
                  <div className="border border-gray-200 bg-white p-4 rounded-lg space-y-4 animate-fade-in">
                    <div>
                      <label className="text-xs font-medium text-gray-700">
                        Celular con Yape
                      </label>
                      <input
                        name="yapeNumber"
                        type="tel"
                        placeholder="999 888 777"
                        maxLength={9}
                        value={formData.yapeNumber}
                        onChange={handleChange}
                        className={`w-full mt-1 p-2 border rounded-md text-sm text-black placeholder:text-gray-400 ${
                          errors.yapeNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.yapeNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.yapeNumber}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700">
                        Código de Aprobación
                      </label>
                      <div className="grid grid-cols-6 gap-2 mt-1">
                        {formData.yapeCode.map((data, index) => (
                          <input
                            key={index}
                            ref={el => {
                              if (yapeInputRefs.current) {
                                yapeInputRefs.current[index] = el;
                              }
                            }}
                            type="tel"
                            maxLength={1}
                            value={data}
                            onChange={(e) => handleYapeCodeChange(e, index)}
                            className={`w-full h-10 text-center border rounded-md text-lg text-black ${
                              errors.yapeCode ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      {errors.yapeCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.yapeCode}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Encuéntralo en el menú de Yape, en &ldquo;Código de
                        aprobación&rdquo;.
                      </p>
                    </div>
                  </div>
                )}
              </section>
              
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Procesando...
                  </>
                ) : (
                  `Pagar S/${totalPrice.toFixed(2)}`
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}