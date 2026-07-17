// src/constants/checkout.ts
import { CountryOption, PhoneCountryOption, IdentificationTypeOption, CardLogo } from '../types/checkout';

export const bumpPrices = {
  audiolibro: 12.0,
  claseKit: 27.0,
};

export const shippingCost = 19.0;
export const baseBookPrice = 0.0;

export const paisesDireccion: CountryOption[] = [
  { code: "PE", name: "Perú" }
];

export const departamentosPeru: CountryOption[] = [
  { code: "AMA", name: "Amazonas" },
  { code: "ANC", name: "Ancash" },
  { code: "APU", name: "Apurímac" },
  { code: "ARE", name: "Arequipa" },
  { code: "AYA", name: "Ayacucho" },
  { code: "CAJ", name: "Cajamarca" },
  { code: "CAL", name: "Callao" },
  { code: "CUS", name: "Cusco" },
  { code: "HUV", name: "Huancavelica" },
  { code: "HUC", name: "Huánuco" },
  { code: "ICA", name: "Ica" },
  { code: "JUN", name: "Junín" },
  { code: "LAL", name: "La Libertad" },
  { code: "LAM", name: "Lambayeque" },
  { code: "LIM", name: "Lima" },
  { code: "LOR", name: "Loreto" },
  { code: "MDD", name: "Madre de Dios" },
  { code: "MOQ", name: "Moquegua" },
  { code: "PAS", name: "Pasco" },
  { code: "PIU", name: "Piura" },
  { code: "PUN", name: "Puno" },
  { code: "SAM", name: "San Martín" },
  { code: "TAC", name: "Tacna" },
  { code: "TUM", name: "Tumbes" },
  { code: "UCA", name: "Ucayali" },
];

export const codigosPaisCelular: PhoneCountryOption[] = [
  { code: "+51", name: "Perú (🇵🇪 +51)", countryAcronym: "PE" },
  { code: "+57", name: "Colombia (🇨🇴 +57)", countryAcronym: "CO" },
  { code: "+1", name: "EE.UU. (🇺🇸 +1)", countryAcronym: "US" },
  { code: "+52", name: "México (🇲🇽 +52)", countryAcronym: "MX" },
  { code: "+34", name: "España (🇪🇸 +34)", countryAcronym: "ES" },
];

export const identificationTypesPeru: IdentificationTypeOption[] = [
  { code: "DNI", name: "DNI" },
  { code: "CE", name: "Carné de Extranjería" },
];

export const CARD_LOGOS: CardLogo[] = [
  { type: "VISA", path: "/subdomains/liderexperto/venta/visaIcon.jpg" },
  { type: "AMEX", path: "/subdomains/liderexperto/venta/amexIcon.jpg" },
  { type: "MASTERCARD", path: "/subdomains/liderexperto/venta/mastercardIcon.jpg" },
  { type: "DINERS", path: "/subdomains/liderexperto/venta/dinersIcon.jpg" },
];