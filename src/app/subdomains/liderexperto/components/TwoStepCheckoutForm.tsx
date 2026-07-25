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
import { FiChevronLeft } from "react-icons/fi";
import clsx from "clsx";
import BumpItem from "./BumpItem";
import { StripePaymentForm } from "../../cerradorexperto/components/ui/StripePaymentForm";

import {
  PaymentResult,
  FormData,
  FormErrors,
  SelectedBumps,
  Step1FormProps,
  Step2FormProps,
  InputFieldProps
} from "../types/checkout";
import {
  bumpPrices,
  shippingCost,
  baseBookPrice,
  paisesDireccion,
  departamentosPeru,
  codigosPaisCelular,
} from "../constants/checkout";


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
};

const initialSelectedBumps: SelectedBumps = {
  audiolibro: false,
  claseKit: false,
};

export default function TwoStepCheckoutForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedBumps, setSelectedBumps] = useState<SelectedBumps>(initialSelectedBumps);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const router = useRouter();

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

  // Efecto para hacer scroll al cambiar al paso 2
  useEffect(() => {
    if (currentStep === 2) {
      mainContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStep]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    }

    setErrors(newErrors);
    return isValid;
  };

  // Guardar datos del usuario
  const saveUserData = async () => {
    try {
      const dataToSend = {
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
      };
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
      return result;
    } catch (error) {
      console.error("Error guardando datos:", error);
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
          await saveUserData();
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
 
        // Avanzar al paso 2
        setCurrentStep(2);
      } catch (error) {
        console.error("Error en segunda fase:", error);
        // Aún así avanzar al paso 2
        setCurrentStep(2);
      } finally {
        setIsProcessingPayment(false);
      }
    }
  };

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
              handlePrevStep={() => setCurrentStep(1)}
              isProcessingPayment={isProcessingPayment}
              selectedBumps={selectedBumps}
              setSelectedBumps={setSelectedBumps}
              totalPrice={totalPrice}
              containerWidth={containerWidth}
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
    formData, errors, handleChange, handlePrevStep, isProcessingPayment,
    selectedBumps, setSelectedBumps, totalPrice, containerWidth
  } = props;

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

      <p className="text-sm text-gray-500 mt-3 text-center leading-[1.3]">
        *Líder Experto se vende por 24.95 USD, pero hoy es gratis para ti. Solo cubres S/19 de envío y recibes el sistema completo que ha transformado empresas en todo Latinoamérica.
        Tu información está 100% protegida.
      </p>
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