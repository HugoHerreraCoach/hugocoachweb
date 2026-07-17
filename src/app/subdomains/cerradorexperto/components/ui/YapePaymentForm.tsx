// src/components/ui/YapePaymentForm.tsx
"use client";

import { useActionState, useId, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { processYapePayment, type YapeState } from '@cerradorexperto/actions';
import { LoaderCircle, CheckCircle2, ShieldCheck, XCircle, Check } from 'lucide-react';
import { UpsellOffer } from "./UpsellOffer";
import Image from 'next/image';
import type { ProductID } from '@cerradorexperto/lib/pricing';

type YapePaymentFormProps = {
    customerData?: { name: string; email: string; } | null;
    offerDetails?: { amount: number; currency: 'PEN' };
    showUpsell?: boolean;
    productId: ProductID;
    onSuccessRedirectTo: string;
};

// CAMBIO: helpers mínimos de localStorage (sin archivos extra)
const LS_CUSTOMER_KEY = "hx_customer";
function loadSavedCustomer(): { name: string; email: string; countryCode: string } | null {
    try {
        const raw = localStorage.getItem(LS_CUSTOMER_KEY);
        if (!raw) return null;
        const obj = JSON.parse(raw);
        if (obj && typeof obj.name === "string" && typeof obj.email === "string" && typeof obj.countryCode === "string") {
            return obj;
        }
        return null;
    } catch {
        return null;
    }
}
function saveCustomerLocal(name: string, email: string, countryCode: string) {
    try {
        localStorage.setItem(LS_CUSTOMER_KEY, JSON.stringify({ name, email, countryCode }));
    } catch { }
}

export function YapePaymentForm({ customerData, offerDetails, showUpsell = true, productId, onSuccessRedirectTo }: YapePaymentFormProps) {
    const id = useId();
    const router = useRouter();
    const initialState: YapeState = { message: null, errors: {}, success: false, redirectTo: undefined };
    const [state, formAction, isPending] = useActionState(processYapePayment, initialState);


    const [name, setName] = useState(customerData?.name ?? "");
    const [email, setEmail] = useState(customerData?.email ?? "");
    const [phoneDisplay, setPhoneDisplay] = useState("");
    const [phoneDigits, setPhoneDigits] = useState("");
    const [otpArr, setOtpArr] = useState<string[]>(Array(6).fill(""));
    const [docType, setDocType] = useState<"DNI" | "CE">("DNI");
    const [docNumber, setDocNumber] = useState("");

    // Refs para autofoco
    const phoneRef = useRef<HTMLInputElement>(null);
    const otpRefs = useRef<HTMLInputElement[]>([]);

    const [touched, setTouched] = useState<{ [k: string]: boolean }>({
        name: !!customerData?.name,
        email: !!customerData?.email,
    });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (!customerData) {
            const saved = loadSavedCustomer();
            if (saved) {
                setName(n => n || saved.name);
                setEmail(e => e || saved.email);
            }
        }
    }, [customerData]);

    useEffect(() => {
        if (state.success && state.redirectTo) {
            if (name && email) {
                saveCustomerLocal(name.trim(), email.trim(), "PE");
            }
            setShowSuccess(true);
            const t = setTimeout(() => router.push(state.redirectTo!), 900);
            return () => clearTimeout(t);
        }
    }, [state, router, name, email]);

    // Precios en Soles (centralizados aquí)
    const [addPhysicalBook, setAddPhysicalBook] = useState(false);

    // Cálculo del total (S/) — actualizado en tiempo real
    const totalAmount = offerDetails
        ? offerDetails.amount
        : (25.00 + (showUpsell && addPhysicalBook ? 50.00 : 0));

    const validateName = (v: string) => v.trim().length > 1;
    const validateEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);
    const validateDni = (v: string) => /^\d{8}$/.test(v);
    const validateCE = (v: string) => /^[A-Za-z0-9]{9,12}$/.test(v);
    const validatePhone = (v: string) => v.length === 9 && /^9\d{8}$/.test(v);
    const validateOtp = (arr: string[]) => arr.every(d => /^\d$/.test(d));

    const validateDocument = () => {
        if (docType === "DNI") return validateDni(docNumber);
        if (docType === "CE") return validateCE(docNumber);
        return false;
    };

    const phoneOnChange = (raw: string) => {
        const digits = raw.replace(/\D/g, "").slice(0, 9);
        setPhoneDigits(digits);
        let formatted = digits;
        if (digits.length > 3 && digits.length <= 6) formatted = `${digits.slice(0, 3)} ${digits.slice(3)}`;
        if (digits.length > 6) formatted = `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
        setPhoneDisplay(formatted);

        // Si completó 9 dígitos → enfocar OTP
        if (digits.length === 9) {
            otpRefs.current[0]?.focus();
        }
    };

    const onOtpChange = (idx: number, v: string) => {
        if (!/^\d?$/.test(v)) return;
        const next = [...otpArr];
        next[idx] = v;
        setOtpArr(next);
        if (v && idx < 5) otpRefs.current[idx + 1]?.focus();
        if (!v && idx > 0) otpRefs.current[idx - 1]?.focus();
    };

    const onOtpKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && otpArr[idx] === "" && idx > 0) {
            otpRefs.current[idx - 1]?.focus();
        }
        if (e.key === "ArrowLeft" && idx > 0) otpRefs.current[idx - 1]?.focus();
        if (e.key === "ArrowRight" && idx < 5) otpRefs.current[idx + 1]?.focus();
    };

    const onOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pasted.length === 0) return;
        const arr = Array(6).fill("");
        for (let i = 0; i < pasted.length; i++) arr[i] = pasted[i];
        setOtpArr(arr);
        const nextIndex = Math.min(pasted.length, 5);
        setTimeout(() => otpRefs.current[nextIndex]?.focus(), 0);
        e.preventDefault();
    };

    const allValid =
        validateName(name) &&
        validateEmail(email) &&
        validateDocument() &&
        validatePhone(phoneDigits) &&
        validateOtp(otpArr);

    return (
        <div className="text-black text-left">
            <div className='flex justify-center items-center mb-4'>
                <Image
                    src='/subdomains/cerradorexperto/icons/yape.png'
                    alt='yape'
                    width={200}
                    height={200}
                    className='max-w-[50px]'
                />
                <h3 className='font-semibold text-xl ml-2'>Pagar con Yape</h3>
            </div>
            <div className="flex flex-col items-start bg-green-50 border border-green-200 rounded-lg mb-4 p-3">
                <div className='flex'>
                    <ShieldCheck className="text-green-600 w-6 h-6" />
                    <p className="text-green-700 font-semibold ml-2">Pago 100% seguro</p>
                </div>
                <div>
                    <p className="text-green-700 text-sm mt-1">Utilizamos encriptación SSL de 256 bits para proteger tu información</p>
                </div>
            </div>

            {showSuccess && (
                <div className="flex items-center justify-center gap-2 bg-green-100 text-green-700 py-2 px-4 rounded-lg">
                    <CheckCircle2 /> Pago aprobado
                </div>
            )}

            <form
                action={formAction}
                className="space-y-3"
                aria-live="polite"
                onSubmit={() => {
                    if (name && email) {
                        saveCustomerLocal(name.trim(), email.trim(), "PE");
                    }
                }}
            >
                <div>
                    <label htmlFor={`${id}-name-yape`} className="block text-base font-medium text-slate-700">Nombre completo</label>
                    <input
                        id={`${id}-name-yape`}
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched(t => ({ ...t, name: true }))}
                        className={`mt-1 w-full rounded-lg p-2 border ${touched.name && !validateName(name) ? "border-red-500" : "border-slate-300"}`}
                        required
                        autoComplete="name"
                        placeholder='Ingresa tu nombre completo'
                    />
                    {touched.name && !validateName(name) && <p className="mt-1 text-sm text-red-600">Ingresa tu nombre completo.</p>}
                </div>

                <div>
                    <label htmlFor={`${id}-email-yape`} className="block text-base font-medium text-slate-700">Correo electrónico</label>
                    <input
                        id={`${id}-email-yape`}
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched(t => ({ ...t, email: true }))}
                        className={`mt-1 w-full rounded-lg p-2 border ${touched.email && !validateEmail(email) ? "border-red-500" : "border-slate-300"}`}
                        required
                        autoComplete="email"
                        placeholder='Ingresa tu correo'
                    />
                    {touched.email && !validateEmail(email) && <p className="mt-1 text-sm text-red-600">Correo inválido.</p>}
                </div>

                <div>
                    <label className="block text-base font-medium text-slate-700 mb-1">
                        Documento de identidad
                    </label>
                    <div className="flex gap-2">
                        <select
                            name="doc_type"
                            value={docType}
                            onChange={(e) => {
                                setDocType(e.target.value as "DNI" | "CE");
                                setDocNumber("");
                            }}
                            className="rounded-lg border border-slate-300 p-2 w-[50%]"
                        >
                            <option value="DNI">DNI</option>
                            <option value="CE">Carné de Extranjería</option>
                        </select>

                        <input
                            name="doc_number"
                            value={docNumber}
                            onChange={(e) => {
                                let value = e.target.value;

                                if (docType === "DNI") {
                                    value = value.replace(/\D/g, "").slice(0, 8);
                                    setDocNumber(value);

                                    if (value.length === 8) {
                                        phoneRef.current?.focus();
                                    }
                                } else if (docType === "CE") {
                                    value = value.replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
                                    setDocNumber(value);
                                }
                            }}
                            onBlur={() => setTouched(t => ({ ...t, docNumber: true }))}
                            className={`flex-1 rounded-lg p-2 border ${touched.docNumber && !validateDocument()
                                ? "border-red-500"
                                : "border-slate-300"
                                }`}
                            placeholder={docType === "DNI" ? "12345678" : "ABC123456"}
                            required
                        />
                    </div>
                    {touched.docNumber && !validateDocument() && (
                        <p className="mt-1 text-sm text-red-600">
                            {docType === "DNI"
                                ? "El DNI debe tener 8 dígitos numéricos."
                                : "El CE debe tener entre 9 y 12 caracteres alfanuméricos."}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor={`${id}-phone-yape`} className="block text-base font-semibold text-slate-700 mb-1">Ingresa tu celular Yape:</label>
                    <input
                        id={`${id}-phone-yape`}
                        name="phone_display"
                        value={phoneDisplay}
                        onChange={(e) => phoneOnChange(e.target.value)}
                        onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                        className={`w-full text-xl text-center font-mono rounded-lg border p-3 ${touched.phone && !validatePhone(phoneDigits) ? "border-red-500" : "border-slate-300"}`}
                        placeholder="999 999 999"
                        inputMode="numeric"
                        required
                        ref={phoneRef}
                    />
                    {touched.phone && !validatePhone(phoneDigits) && <p className="mt-1 text-sm text-red-600">Número inválido.</p>}
                    <input type="hidden" name="phone" value={phoneDigits} />
                </div>

                <div>
                    <label className="block text-base font-semibold text-slate-700 mb-2">Código de aprobación:</label>
                    <div className="flex gap-2 justify-center max-w-full">
                        {otpArr.map((d, i) => (
                            <input
                                key={i}
                                ref={(el) => { if (el) otpRefs.current[i] = el }}
                                inputMode="numeric"
                                value={d}
                                onChange={(e) => onOtpChange(i, e.target.value)}
                                onKeyDown={(e) => onOtpKeyDown(i, e)}
                                onFocus={(e) => e.currentTarget.select()}
                                onPaste={onOtpPaste}
                                className="flex-1 min-w-[36px] max-w-[48px] min-h-12 text-center text-lg font-semibold rounded-lg border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                            />
                        ))}
                    </div>
                    <p className="text-slate-500 text-center text-base mt-2">Encuéntralo en el menú de Yape, en la sección “Aprobar compras”.</p>
                    <input type="hidden" name="otp" value={otpArr.join("")} />
                </div>

                {/* Upsell: siempre visible (solo Perú en tu flujo) */}
                {showUpsell && (
                    <UpsellOffer
                        offerId="addPhysicalBook"
                        offerHeadline="SÍ, añadir la versión impresa"
                        productTitle="El Libro Físico: El Sistema en tus Manos"
                        description="Acceso inmediato. Cero distracciones."
                        price={50}
                        currencySymbol="S/"
                        imageUrl="/subdomains/cerradorexperto/images/cerradorExperto.jpg"
                        imageAlt="Edición impresa del libro Cerrador Experto"
                        checked={addPhysicalBook}
                        onChange={setAddPhysicalBook}
                    >
                        <ul className="space-y-2 text-slate-800">
                            <li className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>
                                    <span className="font-bold">Respuesta Rápida:</span> El guion que necesitas, a la mano en segundos.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>
                                    <span className="font-bold">Dominio Acelerado:</span> Subraya y anota. Lo que se escribe, se aprende y no se olvida.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>
                                    <span className="font-bold">Envío a Domicilio:</span> Recíbelo en la puerta de tu casa (válido para todo el Perú).
                                </span>
                            </li>
                        </ul>
                    </UpsellOffer>
                )}

                {/* Total a pagar — aria-live para lectores de pantalla y transición visual */}
                <div className="!mt-6 flex justify-between font-bold text-slate-900 text-lg pt-4 border-t" aria-live="polite">
                    <span>Total a pagar:</span>
                    <span className="transition-all duration-200" data-amount={totalAmount}>
                        S/ {totalAmount.toFixed(2)}
                    </span>
                </div>

                {state.message && !state.success && (
                    <div className="flex items-center justify-center gap-2 bg-red-100 text-red-700 py-2 px-4 rounded-lg">
                        <XCircle /> {state.message}
                    </div>
                )}

                {/* Campos ocultos para el backend */}
                <input type="hidden" name="productId" value={productId} />
                <input type="hidden" name="doc_type" value={docType} />
                <input type="hidden" name="doc_number" value={docNumber} />
                <input type="hidden" name="addPhysicalBook" value={addPhysicalBook ? "1" : "0"} />
                <input type="hidden" name="amount" value={totalAmount.toFixed(2)} />
                <input type="hidden" name="onSuccessRedirectTo" value={onSuccessRedirectTo} />

                <div>
                    <button
                        type="submit"
                        disabled={isPending || !allValid}
                        className="w-full bg-[#7d3e98] text-white font-bold text-xl py-3 rounded-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                    >
                        {isPending ? <LoaderCircle className="animate-spin h-5 w-5" /> : null}
                        <span>{isPending ? "VERIFICANDO..." : "PAGAR CON YAPE"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
