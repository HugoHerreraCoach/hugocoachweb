// src/components/ui/CardPaymentForm.tsx

"use client";

import { useActionState, useId, useEffect, useState, useRef, ChangeEvent, FocusEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { processPayment, type State } from '@cerradorexperto/actions';
import { ArrowRight, LoaderCircle, Calendar, Lock, CheckCircle2, XCircle, ShieldCheck, Check } from 'lucide-react';
import payment from 'payment';
import { UpsellOffer } from './UpsellOffer';
import type { ProductID } from '@cerradorexperto/lib/pricing';


// --- DEFINICIÓN DE TIPOS ---
type FormFieldName = 'number' | 'name' | 'expiry' | 'cvc';
type CardIssuer = 'visa' | 'mastercard' | 'amex' | 'dinersclub' | 'unknown' | string;

interface FormField {
    value: string;
    error: string | null;
    isDirty: boolean;
}

type AppFormState = {
    [key in FormFieldName]: FormField;
} & {
    issuer: CardIssuer;
};

type CardPaymentFormProps = {
    customerData?: { name: string; email: string; countryCode: string; } | null;
    productId: ProductID;
    offerDetails?: { amount: number; currency: 'PEN' | 'USD' };
    showUpsell?: boolean;
    onSuccessRedirectTo: string;
};

// --- FUNCIONES DE AYUDA ---
const clearNumber = (value = '') => value.replace(/\D+/g, '');

const formatCreditCardNumber = (value: string) => {
    const clearValue = clearNumber(value);
    const issuer = payment.fns.cardType(clearValue);
    let nextValue;
    switch (issuer) {
        case 'amex':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 15)}`;
            break;
        case 'dinersclub':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 14)}`;
            break;
        default:
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
            break;
    }
    return nextValue.trim();
};

const formatCVC = (value: string, issuer: CardIssuer) => {
    const clearValue = clearNumber(value);
    const maxLength = issuer === 'amex' ? 4 : 3;
    return clearValue.slice(0, maxLength);
};

const formatExpirationDate = (value: string) => {
    const clearValue = clearNumber(value);

    if (clearValue.length === 0) {
        return "";
    }
    if (clearValue.length === 1 && parseInt(clearValue, 10) > 1) {
        return `0${clearValue}/`;
    }
    if (clearValue.length > 2) {
        return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }
    return clearValue;
};

const CARD_ISSUER_LOGOS = [
    { type: 'visa', path: '/subdomains/cerradorexperto/icons/visaIcon.jpg' },
    { type: 'mastercard', path: '/subdomains/cerradorexperto/icons/mastercardIcon.jpg' },
    { type: 'amex', path: '/subdomains/cerradorexperto/icons/amexIcon.jpg' },
    { type: 'dinersclub', path: '/subdomains/cerradorexperto/icons/dinersclubIcon.jpg' },
];

const getPayuPaymentMethod = (issuer: CardIssuer): string => {
    if (issuer === 'dinersclub') {
        return 'DINERS';
    }
    return issuer.toUpperCase();
};

// CAMBIO: clave única para guardar/leer el cliente en localStorage
const LS_CUSTOMER_KEY = "hx_customer";

// CAMBIO: helpers locales súper simples para localStorage
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


// --- COMPONENTE PRINCIPAL ---
export function CardPaymentForm({ customerData, offerDetails, showUpsell = true, productId = 'libro-digital', onSuccessRedirectTo }: CardPaymentFormProps) {
    const initialState: State = { message: null, errors: {}, success: false };
    const [serverState, formAction, isPending] = useActionState(processPayment, initialState);
    const router = useRouter();
    const id = useId();

    const numberInputRef = useRef<HTMLInputElement>(null);
    const expiryInputRef = useRef<HTMLInputElement>(null);
    const cvcInputRef = useRef<HTMLInputElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const initialFormState: AppFormState = {
        number: { value: '', error: null, isDirty: false },
        name: { value: customerData?.name ?? '', error: null, isDirty: !!customerData?.name },
        expiry: { value: '', error: null, isDirty: false },
        cvc: { value: '', error: null, isDirty: false },
        issuer: 'unknown',
    };
    const [formState, setFormState] = useState<AppFormState>(initialFormState);
    const [email, setEmail] = useState(customerData?.email ?? "");

    const [identityDocument, setIdentityDocument] = useState({ value: '', error: null as string | null, isDirty: false });
    const [addPhysicalBook, setAddPhysicalBook] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(customerData?.countryCode ?? 'PE');


    const isPeruvianCustomer = selectedCountry === 'PE';
    const currency = isPeruvianCustomer ? 'S/' : '$';

    const amount = offerDetails?.amount ?? (
        isPeruvianCustomer
            ? 25.00 + (showUpsell && addPhysicalBook ? 50.00 : 0)
            : 7.00
    );

    const identityDocumentConfig = {
        PE: { label: "DNI", placeholder: "12345678", required: true },
        CO: { label: "Cédula de Ciudadanía", placeholder: "Ingresa tu cédula", required: true },
        AR: { label: "DNI", placeholder: "Ingresa tu DNI", required: true },
        CL: { label: "RUT", placeholder: "Ingresa tu RUT", required: true },
        MX: { label: "CURP (Opcional)", placeholder: "Ingresa tu CURP", required: false },
        BR: { label: "CPF", placeholder: "Ingresa tu CPF", required: true },
        US: { label: "SSN (Opcional)", placeholder: "Ingresa tu SSN", required: false },
        OTROS: { label: "Documento de Identidad (Opcional)", placeholder: "Ingresa tu documento", required: false },
    };
    const docConfig = identityDocumentConfig[selectedCountry as keyof typeof identityDocumentConfig];

    const validateField = (name: FormFieldName, value: string, issuer: CardIssuer): string | null => {
        switch (name) {
            case 'number':
                return payment.fns.validateCardNumber(value) ? null : 'Número de tarjeta inválido.';
            case 'name':
                return value.trim().length > 2 ? null : 'El nombre es requerido.';
            case 'expiry':
                return payment.fns.validateCardExpiry(value) ? null : 'Fecha inválida.';
            case 'cvc':
                return payment.fns.validateCardCVC(value, issuer) ? null : 'CVC inválido.';
            default:
                return null;
        }
    };

    const validateIdentityDocument = (country: string, value: string): string | null => {
        if (!docConfig?.required) return null;
        if (value.trim().length < 5) return 'Documento inválido.';
        return null;
    };

    const handleIdentityDocChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setIdentityDocument(prev => ({ ...prev, value, error: validateIdentityDocument(selectedCountry, value) }));
    };

    const handleIdentityDocBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIdentityDocument(prev => ({ ...prev, isDirty: true, error: validateIdentityDocument(selectedCountry, e.target.value) }));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fieldName = name as FormFieldName;
        let formattedValue = value;
        let newIssuer: CardIssuer = formState.issuer;

        if (fieldName === 'number') {
            formattedValue = formatCreditCardNumber(value);
            newIssuer = payment.fns.cardType(value) || 'unknown';
            if (payment.fns.validateCardNumber(formattedValue)) {
                expiryInputRef.current?.focus();
            }
        } else if (fieldName === 'expiry') {
            formattedValue = formatExpirationDate(value);
            if (payment.fns.validateCardExpiry(formattedValue)) {
                cvcInputRef.current?.focus();
            }
        } else if (fieldName === 'cvc') {
            formattedValue = formatCVC(value, formState.issuer);
        }
        setFormState(prev => {
            const currentIssuer = fieldName === 'number' ? newIssuer : prev.issuer;
            const error = validateField(fieldName, formattedValue, currentIssuer);

            return {
                ...prev,
                issuer: currentIssuer,
                [fieldName]: {
                    ...prev[fieldName],
                    value: formattedValue,
                    error
                }
            };
        });
    };

    const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fieldName = name as FormFieldName;

        setFormState(prev => {
            const error = validateField(fieldName, value, prev.issuer);

            return {
                ...prev,
                [fieldName]: {
                    ...prev[fieldName],
                    isDirty: true,
                    error: error,
                }
            };
        });
    };

    const getBorderClass = (field: FormFieldName) => {
        if (!formState[field].isDirty) return 'border-slate-300 focus:ring-primary-blue focus:border-primary-blue';
        return formState[field].error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-green-500 focus:ring-green-500 focus:border-green-500';
    };

    const ValidationIcon = ({ field }: { field: FormFieldName }) => {
        if (!formState[field].isDirty) return null;
        return formState[field].error
            ? <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
            : <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
    };

    useEffect(() => {
        if (!customerData) {
            const saved = loadSavedCustomer();
            if (saved) {
                setFormState(prev => ({
                    ...prev,
                    name: { ...prev.name, value: saved.name, isDirty: true, error: null },
                }));
                setSelectedCountry(saved.countryCode || "PE");
                setEmail(e => e || saved.email);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (serverState.success && serverState.transactionId && serverState.redirectTo) {
            // CAMBIO: guardamos datos básicos para upsells / siguientes páginas
            saveCustomerLocal(
                formState.name.value.trim(),
                email.trim(),
                selectedCountry || "PE"
            );

            localStorage.setItem('sessionTransactionId', serverState.transactionId);
            router.push(serverState.redirectTo);
        }
    }, [serverState, router, email, formState.name.value, selectedCountry]);

    const formattedExpiryForPayU = () => {
        if (formState.expiry.value.length === 5) {
            const [month, year] = formState.expiry.value.split('/');
            return `20${year}/${month}`;
        }
        return '';
    };

    const isFormInvalid = Object.values(formState).some(field => typeof field === 'object' && (field.error !== null || field.value === ''))
        || (docConfig?.required && (identityDocument.error !== null || identityDocument.value === ''));

    return (
        <>
            <div className="flex flex-col items-start bg-green-50 border border-green-200 text-black rounded-lg p-3 mb-4">
                <div className='flex'>
                    <ShieldCheck className="text-green-600 w-6 h-6" />
                    <p className="text-green-700 font-semibold ml-2">Pago 100% seguro</p>
                </div>
                <div>
                    <p className="text-green-700 text-sm mt-1">Utilizamos encriptación SSL de 256 bits para proteger tu información</p>
                </div>
            </div>

            <form action={formAction} className="space-y-4 text-black text-left">
                <input type="hidden" name="productId" value={offerDetails ? productId : 'libro-digital'} />
                <input type="hidden" name="amount" value={amount.toFixed(2)} />
                <input type="hidden" name="cardBrand" value={getPayuPaymentMethod(formState.issuer)} />
                <input type="hidden" name="installmentsNumber" value="1" />
                <input type="hidden" name="creditCardNumber" value={clearNumber(formState.number.value)} />
                <input type="hidden" name="creditCardExpirationDate" value={formattedExpiryForPayU()} />
                <input type="hidden" name="securityCode" value={formState.cvc.value} />
                <input type="hidden" name="addPhysicalBook" value={addPhysicalBook ? "1" : "0"} />
                <input type="hidden" name="onSuccessRedirectTo" value={onSuccessRedirectTo} />

                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-800">Tus Datos</h3>
                    <div>
                        <label htmlFor={`${id}-email`} className="block text-base font-medium text-slate-700">Correo Electrónico</label>
                        <input
                            type="email"
                            id={`${id}-email`}
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            className="w-full rounded-md border-slate-300 p-2 shadow-sm focus:ring-primary-blue focus:border-primary-blue"
                            placeholder="Ingresa tu correo"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor={`${id}-country`} className="block text-base font-medium text-slate-700">País</label>
                        <select id={`${id}-country`} name="country" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); if (e.target.value !== 'PE') { setAddPhysicalBook(false); } }} className="w-full rounded-md border-slate-300 p-2 shadow-sm focus:ring-primary-blue focus:border-primary-blue">
                            <option value="PE">Perú</option>
                            <option value="US">Estados Unidos</option>
                            <option value="CO">Colombia</option>
                            <option value="CL">Chile</option>
                            <option value="AR">Argentina</option>
                            <option value="MX">México</option>
                            <option value="BR">Brasil</option>
                            <option value="OTROS">Otro País</option>
                        </select>
                    </div>
                    {docConfig && (
                        <div>
                            <label htmlFor={`${id}-identity-doc`} className="block text-base font-medium text-slate-700">{docConfig.label}</label>
                            <div className="relative">
                                <input type="text" id={`${id}-identity-doc`} name="identityDocument" value={identityDocument.value} onChange={handleIdentityDocChange} onBlur={handleIdentityDocBlur} className={`w-full pr-10 rounded-md p-2 shadow-sm ${!identityDocument.isDirty ? 'border-slate-300' : identityDocument.error ? 'border-red-500' : 'border-green-500'}`} placeholder={docConfig.placeholder} required={docConfig.required} aria-invalid={!!(identityDocument.isDirty && identityDocument.error)} aria-describedby={`${id}-doc-error`} />
                                {identityDocument.isDirty && (identityDocument.error ? <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" /> : <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />)}
                            </div>
                            {identityDocument.isDirty && identityDocument.error && <p id={`${id}-doc-error`} className="mt-1 text-sm text-red-600">{identityDocument.error}</p>}
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Datos de la Tarjeta</h3>
                    <div>
                        <label htmlFor={`${id}-name`} className="block text-base font-medium text-slate-700">Nombre en la tarjeta</label>
                        <div className="relative">
                            <input type="text" id={`${id}-name`} name="name" placeholder='Nombre como aparece en la tarjeta' value={formState.name.value} onChange={handleInputChange} onBlur={handleInputBlur} className={`w-full p-2 rounded-md shadow-sm ${getBorderClass('name')}`} required autoComplete="cc-name" />
                            <ValidationIcon field="name" />
                        </div>
                        {formState.name.isDirty && formState.name.error && <p id={`${id}-name-error`} className="mt-1 text-sm text-red-600">{formState.name.error}</p>}
                    </div>
                    <div>
                        <label htmlFor={`${id}-number`} className="block text-base font-medium text-slate-700">Número de Tarjeta</label>
                        <div className="relative">
                            <input
                                ref={numberInputRef}
                                type="tel"
                                id={`${id}-number`}
                                name="number"
                                value={formState.number.value}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                // -> MODIFICACIÓN CLAVE: Padding dinámico
                                className={`w-full p-2 rounded-md shadow-sm ${getBorderClass('number')} ${formState.issuer === 'unknown' ? 'pr-28 md:pr-32' : 'pr-12'}`}
                                placeholder='1234 1234 1234 1234'
                                required
                                autoComplete="cc-number"
                            />

                            {/* -> NUEVO: Contenedor absoluto para alinear los logos a la derecha */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                {formState.issuer !== 'unknown' ? (
                                    // -> Muestra el logo ÚNICO identificado
                                    <Image
                                        src={`/subdomains/cerradorexperto/icons/${formState.issuer}Icon.jpg`}
                                        alt={formState.issuer}
                                        width={32}
                                        height={20}
                                        className="transition-opacity duration-300"
                                    />
                                ) : (
                                    // -> Muestra TODOS los logos si no hay un emisor detectado
                                    <div className="flex items-center space-x-1">
                                        {CARD_ISSUER_LOGOS.map((logo) => (
                                            <Image
                                                key={logo.type}
                                                src={logo.path}
                                                alt={logo.type}
                                                width={128}
                                                height={80}
                                                className="max-w-[24px]"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {formState.number.isDirty && formState.number.error && <p id={`${id}-number-error`} className="mt-1 text-sm text-red-600">{formState.number.error}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={`${id}-expiry`} className="block text-base font-medium text-slate-700">Expiración</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                <input ref={expiryInputRef} type="tel" id={`${id}-expiry`} name="expiry" value={formState.expiry.value} onChange={handleInputChange} onBlur={handleInputBlur} className={`w-full pl-10 pr-10 p-2 rounded-md shadow-sm ${getBorderClass('expiry')}`} placeholder="MM/AA" required autoComplete="cc-exp" />
                                <ValidationIcon field="expiry" />
                            </div>
                            {formState.expiry.isDirty && formState.expiry.error && <p id={`${id}-expiry-error`} className="mt-1 text-sm text-red-600">{formState.expiry.error}</p>}
                        </div>
                        <div>
                            <label htmlFor={`${id}-cvc`} className="block text-base font-medium text-slate-700">CVC</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                <input ref={cvcInputRef} type="tel" id={`${id}-cvc`} name="cvc" value={formState.cvc.value} onChange={handleInputChange} onBlur={handleInputBlur} className={`w-full pl-10 pr-10 p-2 rounded-md shadow-sm ${getBorderClass('cvc')}`} placeholder="123" required autoComplete="cc-csc" />
                                <ValidationIcon field="cvc" />
                            </div>
                            {formState.cvc.isDirty && formState.cvc.error && <p id={`${id}-cvc-error`} className="mt-1 text-sm text-red-600">{formState.cvc.error}</p>}
                        </div>
                    </div>
                </div>

                {showUpsell && selectedCountry === 'PE' && (
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

                <div className="!mt-6 flex justify-between font-bold text-slate-900 text-lg pt-4 border-t">
                    <span>Total a pagar:</span>
                    <span>{currency} {amount.toFixed(2)}</span>
                </div>

                {serverState.message && !serverState.success && <p className="pt-2 text-sm text-red-600 font-bold text-center">{serverState.message}</p>}

                <div className="pt-2">
                    <button ref={submitButtonRef} type="submit" disabled={isPending || isFormInvalid} className="w-full bg-gradient-to-r from-primary-blue to-secondary-blue text-white font-bold text-xl py-4 px-4 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100">
                        <div className="flex justify-center items-center gap-3">
                            {isPending ? <LoaderCircle className="animate-spin h-7 w-7" /> : <ArrowRight className="h-7 w-7" />}
                            <span>{isPending ? 'PROCESANDO...' : 'SÍ, QUIERO MI ACCESO'}</span>
                        </div>
                    </button>
                </div>
            </form>
        </>
    );
}