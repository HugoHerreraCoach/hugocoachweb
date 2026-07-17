// src/types/checkout.ts

// --- PayU Types ---
export interface PayUTransactionResponse {
  orderId: number;
  transactionId: string;
  state: "APPROVED" | "DECLINED" | "PENDING" | "ERROR";
  paymentNetworkResponseCode?: string;
  paymentNetworkResponseErrorMessage?: string;
  trazabilityCode?: string;
  authorizationCode?: string;
  pendingReason?: string;
  responseCode: string;
  errorCode?: string;
  responseMessage?: string;
  transactionDate?: string;
  transactionTime?: string;
  operationDate: number;
  referenceQuestionnaire?: string;
  extraParameters?: Record<string, string | number | boolean>;
  additionalInfo?: {
    paymentNetwork?: string;
    rejectionType?: string;
    responseNetworkMessage?: string;
    trazabilityCode?: string;
    authorizationCode?: string;
    [key: string]: string | undefined;
  };
}

export interface FullPayUResponse {
  code?: 'SUCCESS' | 'ERROR';
  error?: string;
  transactionResponse?: PayUTransactionResponse;
}

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
  // PayU Payment Fields
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardHolderName: string;
  paymentMethod: string;
  identificationType: string;
  identificationNumber: string;
  // --- Nuevos campos para Yape ---
  yapeNumber: string;
  yapeCode: string[];
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

export interface SavedToken {
  tokenid: string;
  masked_number: string;
  payment_method: string;
  expiration_date: string;
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
  handleExpiryChange: (value: string) => string;
  handlePrevStep: () => void;
  isProcessingPayment: boolean;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
  savedTokens: SavedToken[];
  useSavedToken: boolean;
  setUseSavedToken: (use: boolean) => void;
  chosenTokenId: string | null;
  setChosenTokenId: (id: string | null) => void;
  yapeNumber: string;
  yapeCode: string[];
  handleYapeNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleYapeNumberBlur: () => void;
  handleYapeCodeChange: (element: HTMLInputElement, index: number) => boolean;
  handleYapeCodeBlur: () => void;
  selectedBumps: SelectedBumps;
  setSelectedBumps: React.Dispatch<React.SetStateAction<SelectedBumps>>;
  totalPrice: number;
  containerWidth: number;
  currentCardLogo: number;
  isVisible: boolean;
  identificationTypesPeru: IdentificationTypeOption[];
  handleCardHolderNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCardHolderNameBlur: () => void;
  handleCardNumberBlur: () => void;
  handleExpiryBlur: () => void;
  handleCVVBlur: () => void;
  handleIdentificationBlur: () => void;
}

export interface CardPaymentFormProps {
  formData: FormData;
  errors: FormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleExpiryChange: (value: string) => string;
  isProcessingPayment: boolean;
  savedTokens: SavedToken[];
  useSavedToken: boolean;
  setUseSavedToken: (use: boolean) => void;
  chosenTokenId: string | null;
  setChosenTokenId: (id: string | null) => void;
  expiryInput: string;
  setExpiryInput: (value: string) => void;
  containerWidth: number;
  currentCardLogo: number;
  isVisible: boolean;
  identificationTypesPeru: IdentificationTypeOption[];
  handleCardHolderNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCardHolderNameBlur: () => void;
  handleCardNumberBlur: () => void;
  handleExpiryBlur: () => void;
  handleCVVBlur: () => void;
  handleIdentificationBlur: () => void;
}

export interface YapePaymentFormProps {
  yapeNumber: string;
  yapeCode: string[];
  handleYapeNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleYapeCodeChange: (element: HTMLInputElement, index: number) => boolean;
  handleYapeNumberBlur: () => void;
  handleYapeCodeBlur: () => void;
  isProcessingPayment: boolean;
  errors: FormErrors;
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