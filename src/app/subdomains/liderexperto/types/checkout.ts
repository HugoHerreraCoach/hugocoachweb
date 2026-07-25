// src/types/checkout.ts

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  referenceCode?: string;
  message: string;
  responseCode?: string;
  state?: string;
  redirectUrl?: string;
}

// --- Form Data Interface ---
export interface FormData {
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
  billingSameAsShipping: boolean;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;

export interface SelectedBumps {
  audiolibro: boolean;
  claseKit: boolean;
  [key: string]: boolean;
}

export interface CountryOption {
  code: string;
  name: string;
}

export interface PhoneCountryOption {
  code: string;
  name: string;
  countryAcronym: string;
}

export interface IdentificationTypeOption {
  code: string;
  name: string;
}

export interface CardLogo {
  type: string;
  path: string;
}

export interface CardTypeResult {
  type: string;
  isValid: boolean;
}

export interface Step1FormProps {
  formData: FormData;
  errors: FormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
  codigosPaisCelular: PhoneCountryOption[];
  paisesDireccion: CountryOption[];
  departamentosPeru: CountryOption[];
  showShippingInfo: boolean;
}

export interface Step2FormProps {
  formData: FormData;
  errors: FormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handlePrevStep: () => void;
  isProcessingPayment: boolean;
  selectedBumps: SelectedBumps;
  setSelectedBumps: React.Dispatch<React.SetStateAction<SelectedBumps>>;
  totalPrice: number;
  containerWidth: number;
}

export interface InputFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
  [key: string]: unknown;
}