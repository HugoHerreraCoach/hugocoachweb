// src/app/actions.ts

"use server";

import { pool } from "@cerradorexperto/lib/db";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import crypto from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getVerifiedPrice, getProductDetails } from "@cerradorexperto/lib/pricing";
import * as Brevo from "@getbrevo/brevo";

const brevoApiClient = new Brevo.TransactionalEmailsApi();
brevoApiClient.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY!
);

type BrevoApiErrorResponse = {
  response?: {
    data?: {
      code?: string;
      message?: string;
    };
  };
};

async function addContactToBrevo(
  email: string,
  firstName: string,
  listId: number
): Promise<void> {
  try {
    const contactsApi = new Brevo.ContactsApi();
    contactsApi.setApiKey(
      Brevo.ContactsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY!
    );

    const createContact = new Brevo.CreateContact();
    createContact.email = email;
    createContact.attributes = { NOMBRE: firstName };
    createContact.listIds = [listId];
    createContact.updateEnabled = true;

    await contactsApi.createContact(createContact);
    console.log(
      `Contacto ${email} añadido/actualizado en la lista ${listId} de Brevo.`
    );
  } catch (error: unknown) {
    console.error(
      `Error al intentar añadir contacto a Brevo: ${email}. Lista: ${listId}.`
    );
    const brevoError = error as BrevoApiErrorResponse;
    if (brevoError.response?.data) {
      console.error(
        "Cuerpo de la respuesta de error de Brevo:",
        brevoError.response.data
      );
    } else {
      console.error("Error no identificado de Brevo:", error);
    }
  }
}

const PaymentSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  country: z.string(),
  identityDocument: z.string().optional(),
});

const YapeSchema = z.object({
  name: z.string().min(3, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "El email es inválido." }),
  doc_type: z.enum(["DNI", "CE"], { message: "Tipo de documento inválido." }),
  doc_number: z.string().min(8, { message: "Número de documento inválido." }),
  phone: z.string().length(9, { message: "El celular debe tener 9 dígitos." }),
  otp: z.string().length(6, { message: "El código debe tener 6 dígitos." }),
});

const OneClickSchema = z.object({
  sessionTransactionId: z.string().uuid("ID de sesión inválido."),
  amount: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), { message: "Monto inválido." }),
  currency: z.string().length(3, "Moneda inválida."),
  description: z.string().min(5, "Descripción muy corta."),
  installments: z.string().optional().default("1"),
  onSuccessRedirectTo: z
    .string()
    .startsWith("/", {
      message: "La URL de redirección debe ser una ruta válida.",
    })
    .default("/gracias"),
});

const isTest = process.env.PAYU_TEST_MODE === "TRUE";
const payuApiUrl =
  process.env.PAYU_API_URL ??
  (isTest
    ? "https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi"
    : "https://api.payulatam.com/payments-api/4.0/service.cgi");

export type State = {
  errors?: Record<string, string[] | undefined>;
  message?: string | null;
  success?: boolean;
  transactionId?: string;
  redirectTo?: string;
};

export type OneClickState = {
  message?: string | null;
};

export type YapeState = {
  message?: string | null;
  errors?: Record<string, string[] | undefined>;
  success?: boolean;
  redirectTo?: string;
};

export type OfferContext = {
  customer: {
    name: string;
    email: string;
    countryCode: string;
  };
  paymentToken?: {
    payuTokenId: string;
    cardInfo: string;
    cardBrand: string;
  };
};

type PayUTransactionResponse = {
  state: "APPROVED" | "DECLINED" | "EXPIRED" | "PENDING" | "ERROR";
  responseCode: string;
  responseMessage?: string;
  paymentNetworkResponseCode?: string | null;
  paymentNetworkResponseErrorMessage?: string | null;
  transactionId?: string;
  authorizationCode?: string;
  trazabilityCode?: string;
  additionalInfo?: Record<string, unknown> | null;
  extraParameters?: Record<string, unknown> | null;
};

type PayUApiResponse = {
  code?: "SUCCESS" | "ERROR";
  error?: string | null;
  transactionResponse?: PayUTransactionResponse;
  creditCardToken?: {
    creditCardTokenId: string;
    maskedNumber?: string;
    paymentMethod?: string;
    payerId?: string;
    identificationNumber?: string;
    name?: string;
  };
};

export async function getOfferContext(
  sessionTransactionId: string | null
): Promise<OfferContext | null> {
  if (!sessionTransactionId) {
    return null;
  }

  try {
    // Buscamos un token asociado a la transacción inicial
    const tokenResult = await pool.query<{
      name: string;
      email: string;
      country_code: string;
      payu_token_id: string;
      card_info: string;
      card_brand: string;
    }>(
      `SELECT c.name, c.email, c.country_code, pt.payu_token_id, pt.card_info, pt.card_brand
       FROM payment_tokens pt
       JOIN customers c ON pt.customer_id = c.id
       WHERE pt.payu_transaction_id = $1`,
      [sessionTransactionId]
    );

    if (tokenResult.rows.length > 0) {
      const data = tokenResult.rows[0];
      // ¡Éxito! El usuario pagó con tarjeta y tenemos token.
      return {
        customer: {
          name: data.name,
          email: data.email,
          countryCode: data.country_code,
        },
        paymentToken: {
          payuTokenId: data.payu_token_id,
          cardInfo: data.card_info,
          cardBrand: data.card_brand,
        },
      };
    }

    return null;
  } catch (error) {
    console.error("Error al obtener el contexto de la oferta:", error);
    return null;
  }
}

const payUErrorMessages: Record<string, string> = {
  // Estados Generales
  DECLINED:
    "Tu banco ha declinado la transacción. Por favor, intenta con otra tarjeta o método de pago.",
  EXPIRED:
    "La transacción ha expirado. Por favor, intenta realizar el pago de nuevo.",

  // Rechazos del Banco/Entidad
  INSUFFICIENT_FUNDS:
    "Fondos insuficientes. Tu tarjeta no tiene saldo suficiente para esta compra.",
  CREDIT_CARD_NOT_AUTHORIZED_FOR_INTERNET_TRANSACTIONS:
    "Tu tarjeta no está habilitada para compras por internet. Contacta a tu banco.",
  CONTACT_THE_ENTITY:
    "Tu banco solicita que te comuniques con ellos para autorizar la compra.",
  ENTITY_DECLINED: "La transacción fue declinada por tu banco.",
  BANK_ACCOUNT_ACTIVATION_ERROR:
    "Error de activación de cuenta. Contacta a tu banco.",
  BANK_ACCOUNT_NOT_AUTHORIZED_FOR_AUTOMATIC_DEBIT:
    "Cuenta no autorizada para débito. Contacta a tu banco.",

  // Errores de Datos de Tarjeta
  INVALID_CARD: "El número de tarjeta es inválido. Por favor, revísalo.",
  INVALID_EXPIRATION_DATE_OR_SECURITY_CODE:
    "La fecha de vencimiento o el código de seguridad (CVC) son incorrectos.",
  EXPIRED_CARD: "La tarjeta que estás usando ha vencido.",
  INVALID_SECURITY_CODE: "El código de seguridad (CVC) es incorrecto.",

  // Restricciones y Seguridad
  RESTRICTED_CARD:
    "Tu tarjeta tiene restricciones que impiden este tipo de compra. Contacta a tu banco.",
  CARD_BLOCKED:
    "Tu tarjeta se encuentra bloqueada por seguridad. Contacta a tu banco.",
  ANTIFRAUD_REJECTED:
    "La transacción fue rechazada por nuestro sistema de seguridad para protegerte.",
  PAYMENT_NETWORK_REJECTED: "La red de pagos ha rechazado la transacción.",

  // Errores de Yape (basados en códigos comunes)
  INVALID_OTP:
    "El código de aprobación de Yape es incorrecto o ha expirado. Por favor, genera uno nuevo e intenta de nuevo.",
  YAPE_INSUFFICIENT_FUNDS:
    "No cuentas con fondos suficientes en tu cuenta Yape.",
  YAPE_ACCOUNT_BLOCKED: "Tu cuenta Yape se encuentra bloqueada.",
  YAPE_DAILY_LIMIT_EXCEEDED:
    "Has excedido el límite de compras diario de tu cuenta Yape.",

  // Errores del Sistema
  INTERNAL_PAYMENT_PROVIDER_ERROR:
    "El sistema de pagos presenta una intermitencia. Por favor, intenta más tarde.",
  ERROR:
    "Ocurrió un error al procesar el pago. Inténtalo de nuevo en unos minutos.",
};

const getPayUResponseMessage = (
  txResponse?: PayUTransactionResponse,
  fullResponse?: PayUApiResponse
): string => {
  // 1. Usar el código de respuesta específico si existe en nuestro mapa. Es el más preciso.
  if (txResponse?.responseCode && payUErrorMessages[txResponse.responseCode]) {
    return payUErrorMessages[txResponse.responseCode];
  }
  // 2. Si no, usar el estado de la transacción (ej. 'DECLINED') si está en el mapa.
  if (txResponse?.state && payUErrorMessages[txResponse.state]) {
    return payUErrorMessages[txResponse.state];
  }
  // 3. Casos especiales para Yape por mensaje de texto.
  if (txResponse?.responseMessage?.includes("OTP Incorrecto")) {
    return payUErrorMessages["INVALID_OTP"];
  }
  // 4. Como fallback, si PayU nos da un mensaje de error legible.
  if (txResponse?.paymentNetworkResponseErrorMessage) {
    return txResponse.paymentNetworkResponseErrorMessage;
  }
  // 5. Fallback para errores de red o formato en la solicitud.
  if (fullResponse?.error) {
    return `Error de comunicación con PayU: ${fullResponse.error}`;
  }
  // 6. Mensaje genérico de último recurso si nada de lo anterior funciona.
  return "No se pudo procesar tu pago. Por favor, revisa tus datos o intenta con otro método de pago.";
};

function resolvePeruDniType(
  identity?: string | null
): "DNI" | "CE" | "RUC" | "PP" | "DE" {
  if (!identity) return "DNI";
  const clean = identity.replace(/\D+/g, "");
  if (/^\d{11}$/.test(clean)) return "RUC";
  if (/^\d{8}$/.test(clean)) return "DNI";
  return "CE"; // fallback razonable si no es DNI/RUC
}

async function createPayUToken(params: {
  payerId: string; // usa tu customerId o un id estable
  name: string; // nombre en la tarjeta
  identificationNumber?: string; // opcional
  paymentMethod: string; // VISA | MASTERCARD | AMEX | etc
  number: string; // PAN
  expirationDate: string; // YYYY/MM
}) {
  const body = {
    language: "es",
    command: "CREATE_TOKEN",
    merchant: {
      apiLogin: process.env.PAYU_API_LOGIN!,
      apiKey: process.env.PAYU_API_KEY!,
    },
    creditCardToken: {
      payerId: params.payerId,
      name: params.name,
      identificationNumber: params.identificationNumber,
      paymentMethod: params.paymentMethod,
      number: params.number,
      expirationDate: params.expirationDate, // Debe ser YYYY/MM
    },
  };

  const res = await fetch(payuApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: PayUApiResponse = await res.json();
  if (data?.code === "SUCCESS" && data?.creditCardToken?.creditCardTokenId) {
    return {
      tokenId: data.creditCardToken.creditCardTokenId,
      masked: data.creditCardToken.maskedNumber,
      brand: data.creditCardToken.paymentMethod,
    };
  }

  throw new Error(
    `CREATE_TOKEN no devolvió token. code=${data?.code ?? "?"} error=${
      data?.error ?? "desconocido"
    }`
  );
}

export async function processPayment(
  prevState: State,
  formData: FormData
): Promise<State> {
  const PaymentSchemaWithProduct = PaymentSchema.extend({
    productId: z.enum([
      "libro-digital",
      "libro-fisico",
      "comunidad-lobos",
      "comunidad-lobos-cuota-inicial",
    ]),
    onSuccessRedirectTo: z
      .string()
      .startsWith("/", {
        message: "La URL de redirección debe ser una ruta válida.",
      })
      .default("/lobos"),
  });

  const validatedFields = PaymentSchemaWithProduct.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    country: formData.get("country"),
    identityDocument: formData.get("identityDocument"),
    productId: formData.get("productId"),
    onSuccessRedirectTo: formData.get("onSuccessRedirectTo"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos o hay errores.",
    };
  }

  try {
    const {
      name,
      email,
      country,
      identityDocument,
      productId,
      onSuccessRedirectTo,
    } = validatedFields.data;

    const addPhysicalBook = formData.get("addPhysicalBook") === "1";
    const currency = country === "PE" ? "PEN" : "USD";
    const mainProductPrice = getVerifiedPrice(productId, currency);

    if (mainProductPrice === undefined) {
      return { message: "Oferta no disponible en tu región." };
    }

    let totalAmount = mainProductPrice;
    let description = getProductDetails(productId)?.description ?? "Compra";

    // Si es el libro digital Y se añade el físico (order bump)
    if (productId === "libro-digital" && addPhysicalBook && country === "PE") {
      const physicalBookPrice = getVerifiedPrice("libro-fisico", "PEN") ?? 0;
      totalAmount += physicalBookPrice;
      description += " + Libro Físico";
    }

    const price = { amount: totalAmount.toFixed(2), currency };

    const creditCardNumber = String(formData.get("creditCardNumber") ?? "");
    const creditCardExpirationDate = String(
      formData.get("creditCardExpirationDate") ?? ""
    ); // YYYY/MM
    const securityCode = String(formData.get("securityCode") ?? "");
    const installmentsNumber = String(
      formData.get("installmentsNumber") ?? "1"
    );
    const cardBrand = String(formData.get("cardBrand") ?? "VISA");

    // Firma
    const referenceCode = randomUUID();
    const apiKey = process.env.PAYU_API_KEY!;
    const merchantId = process.env.PAYU_MERCHANT_ID!;
    const signatureString = `${apiKey}~${merchantId}~${referenceCode}~${price.amount}~${price.currency}`;
    const signature = crypto
      .createHash("md5")
      .update(signatureString)
      .digest("hex");

    // Obtención de datos antifraude
    const headersList = await headers();
    const ipAddress = headersList.get("x-forwarded-for") ?? "127.0.0.1";
    const userAgent = headersList.get("user-agent") ?? "Unknown";
    const cookie = `session_${randomUUID()}`;
    const deviceSessionId = `dev_${randomUUID()}`;

    // Requisitos específicos de Perú
    const dniType = resolvePeruDniType(identityDocument);
    const paymentCountry = "PE"; // SIEMPRE PE para la cuenta de Perú

    // Construcción del cuerpo de la solicitud a PayU
    const payuRequestBody = {
      test: process.env.PAYU_TEST_MODE === "TRUE",
      language: "es",
      command: "SUBMIT_TRANSACTION",
      merchant: {
        apiKey: apiKey,
        apiLogin: process.env.PAYU_API_LOGIN!,
      },
      transaction: {
        order: {
          accountId: process.env.PAYU_ACCOUNT_ID!,
          referenceCode,
          description: `${description} - ${email}`,
          language: "es",
          signature,
          notifyUrl: "http://www.payu.com/notify",
          additionalValues: {
            TX_VALUE: {
              value: parseFloat(price.amount),
              currency: price.currency,
            },
            TX_TAX: { value: 0, currency: price.currency },
            TX_TAX_RETURN_BASE: { value: 0, currency: price.currency },
          },
          buyer: {
            fullName: name,
            emailAddress: email,
            contactPhone: "0000000",
            dniNumber: identityDocument,
            shippingAddress: {
              street1: "No aplica",
              city: "Lima",
              state: "Lima",
              country,
              postalCode: "07001",
              phone: "0000000",
            },
          },
        },
        payer: {
          fullName: name,
          emailAddress: email,
          contactPhone: "0000000",
          dniNumber: identityDocument,
          dniType,
          billingAddress: {
            street1: "N/A",
            city: "Lima",
            state: "Lima",
            country: "PE",
            postalCode: "07001",
            phone: "0000000",
          },
        },
        creditCard: {
          number: creditCardNumber,
          securityCode: securityCode,
          expirationDate: creditCardExpirationDate,
          name: name,
        },
        extraParameters: {
          INSTALLMENTS_NUMBER: parseInt(installmentsNumber || "1", 10),
          CREATE_TOKEN: true,
        },
        type: "AUTHORIZATION_AND_CAPTURE",
        paymentMethod: cardBrand,
        paymentCountry,
        deviceSessionId,
        ipAddress,
        cookie,
        userAgent,
      },
    };

    // Llamada a la API de PayU
    const response = await fetch(payuApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
      body: JSON.stringify(payuRequestBody),
    });

    const result: PayUApiResponse = await response.json();
    console.log("Respuesta completa de PayU:", JSON.stringify(result, null, 2));
    const tx = result.transactionResponse;

    if (tx && tx.state === "APPROVED") {
      const transactionId = tx.transactionId;

      // Upsert cliente
      const customerResult = await pool.query(
        `INSERT INTO customers (email, name, country_code)
         VALUES ($1, $2, $3)
         ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, country_code = EXCLUDED.country_code
         RETURNING id`,
        [email, name, country]
      );
      const customerId = customerResult.rows[0].id;

      if (productId === "libro-digital") {
        await addContactToBrevo(email, name, 13);
      }

      // Intentamos tokenizar tras el aprobado (no bloquea la UX si falla)
      try {
        const tokenRes = await createPayUToken({
          payerId: String(customerId),
          name,
          identificationNumber: identityDocument ?? undefined,
          paymentMethod: cardBrand,
          number: creditCardNumber,
          expirationDate: creditCardExpirationDate, // YYYY/MM
        });

        await pool.query(
          `INSERT INTO payment_tokens (customer_id, payu_token_id, card_info, payu_transaction_id, card_brand)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            customerId,
            tokenRes.tokenId,
            `${cardBrand} **** ${creditCardNumber.slice(-4)}`,
            transactionId,
            cardBrand,
          ]
        );
      } catch (e) {
        console.error(
          `Tokenización falló para transacción ${transactionId}:`,
          e
        );
      }

      return { success: true, transactionId, redirectTo: onSuccessRedirectTo };
    }

    const userFriendlyMessage = getPayUResponseMessage(tx, result);
    return { message: userFriendlyMessage };
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT"))
      throw error;
    console.error("Error al procesar el pago:", error);
    return {
      message: "Ocurrió un error en el servidor. Por favor, intenta de nuevo.",
    };
  }
}

export async function processOneClickPurchase(
  prevState: OneClickState | null,
  formData: FormData
) {
  const validatedFields = OneClickSchema.safeParse({
    sessionTransactionId: formData.get("sessionTransactionId"),
    amount: formData.get("amount"),
    currency: formData.get("currency"),
    description: formData.get("description"),
    installments: formData.get("installments"),
    onSuccessRedirectTo: formData.get("onSuccessRedirectTo"),
  });

  if (!validatedFields.success) {
    // Este error es para el desarrollador, no debería ocurrir en producción
    return {
      message: "Error en los parámetros de la oferta. Contacte a soporte.",
    };
  }

  const {
    sessionTransactionId,
    amount,
    currency,
    description,
    installments,
    onSuccessRedirectTo,
  } = validatedFields.data;

  let token: string;
  let customerEmail: string;
  let customerName: string;
  let cardBrand: string;
  const paymentCountry = "PE";

  try {
    const tokenInfoResult = await pool.query<{
      payu_token_id: string;
      card_brand: string;
      email: string;
      name: string;
      country_code: string;
    }>(
      `SELECT pt.payu_token_id, pt.card_brand, c.email, c.name, c.country_code 
       FROM payment_tokens pt
       JOIN customers c ON pt.customer_id = c.id
       WHERE pt.payu_transaction_id = $1`,
      [sessionTransactionId]
    );

    if (tokenInfoResult.rows.length === 0) {
      return {
        message:
          "No se encontró un método de pago válido para esta sesión. Por favor, intenta de nuevo.",
      };
    }

    const tokenInfo = tokenInfoResult.rows[0];
    token = tokenInfo.payu_token_id;
    customerEmail = tokenInfo.email;
    customerName = tokenInfo.name;
    cardBrand = tokenInfo.card_brand;
  } catch (dbError) {
    console.error("Error de DB al buscar token:", dbError);
    return { message: "Error al recuperar la información de pago." };
  }

  // Firma
  const referenceCode = `upsell_${randomUUID()}`;
  const apiKey = process.env.PAYU_API_KEY!;
  const merchantId = process.env.PAYU_MERCHANT_ID!;
  const signature = crypto
    .createHash("md5")
    .update(`${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`)
    .digest("hex");

  // Antifraude
  const headersList = await headers();
  const ipAddress = headersList.get("x-forwarded-for") ?? "127.0.0.1";
  const userAgent = headersList.get("user-agent") ?? "Unknown";
  const cookie = `session_upsell_${randomUUID()}`;
  const deviceSessionId = `dev_upsell_${randomUUID()}`;

  try {
    const payuRequestBody = {
      test: process.env.PAYU_TEST_MODE === "TRUE",
      language: "es",
      command: "SUBMIT_TRANSACTION",
      merchant: { apiKey, apiLogin: process.env.PAYU_API_LOGIN! },
      transaction: {
        order: {
          accountId: process.env.PAYU_ACCOUNT_ID!,
          referenceCode,
          description: `${description} - ${customerEmail}`,
          language: "es",
          signature,
          additionalValues: {
            TX_VALUE: { value: parseFloat(String(amount)), currency },
            TX_TAX: { value: 0, currency },
            TX_TAX_RETURN_BASE: { value: 0, currency },
          },
        },
        payer: {
          fullName: customerName,
          emailAddress: customerEmail,
          dniType: "DNI", // requerido por Perú; ajusta si guardas el tipo en DB
          billingAddress: {
            street1: "N/A",
            city: "Lima",
            state: "Lima",
            country: "PE",
            postalCode: "07001",
            phone: "0000000",
          },
        },
        creditCardTokenId: token,
        creditCard: {
          processWithoutCvv2: true, // pago sin CVV habilitado por PayU
        },
        extraParameters: {
          INSTALLMENTS_NUMBER: parseInt(String(installments || "1"), 10),
        },
        type: "AUTHORIZATION_AND_CAPTURE",
        paymentMethod: cardBrand,
        paymentCountry, // "PE"
        deviceSessionId,
        ipAddress,
        cookie,
        userAgent,
      },
    };

    const response = await fetch(payuApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
      body: JSON.stringify(payuRequestBody),
    });

    const result: PayUApiResponse = await response.json();
    console.log("Respuesta PayU (One-Click):", JSON.stringify(result, null, 2));
    const tx = result.transactionResponse;

    if (tx && tx.state === "APPROVED") {
      redirect(onSuccessRedirectTo);
    } else {
      const userFriendlyMessage = getPayUResponseMessage(tx, result);
      return { message: userFriendlyMessage };
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT"))
      throw error;
    console.error("Error en pago de un clic:", error);
    return {
      message: "Ocurrió un error en el servidor. Por favor, intenta de nuevo.",
    };
  }
}

export async function processYapePayment(
  prevState: YapeState,
  formData: FormData
): Promise<YapeState> {
  const YapeSchemaWithProduct = YapeSchema.extend({
    productId: z.enum([
      "libro-digital",
      "libro-fisico",
      "comunidad-lobos",
      "comunidad-lobos-cuota-inicial",
    ]),
    onSuccessRedirectTo: z
      .string()
      .startsWith("/", {
        message: "La URL de redirección debe ser una ruta válida.",
      })
      .default("/lobos"),
  });

  const validatedFields = YapeSchemaWithProduct.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    doc_type: formData.get("doc_type"),
    doc_number: formData.get("doc_number"),
    phone: formData.get("phone"),
    otp: formData.get("otp"),
    productId: formData.get("productId"),
    onSuccessRedirectTo: formData.get("onSuccessRedirectTo"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, corrige los errores.",
    };
  }

  try {
    const {
      name,
      email,
      doc_number,
      phone,
      otp,
      productId,
      onSuccessRedirectTo,
    } = validatedFields.data;

    const addPhysicalBook = formData.get("addPhysicalBook") === "1";

    // Obtenemos el precio del producto principal desde nuestro catálogo
    const mainProductPrice = getVerifiedPrice(productId, "PEN");

    if (mainProductPrice === undefined) {
      return { message: "Esta oferta no está disponible para Yape." };
    }

    let totalAmount = mainProductPrice;
    let description =
      getProductDetails(productId)?.description ?? "Compra con Yape";

    // Si es el libro digital Y se añade el físico (order bump)
    if (productId === "libro-digital" && addPhysicalBook) {
      const physicalBookPrice = getVerifiedPrice("libro-fisico", "PEN") ?? 0;
      totalAmount += physicalBookPrice;
      description += " + Libro Físico";
    }

    const price = { amount: totalAmount.toFixed(2), currency: "PEN" }; // Yape siempre es PEN

    // Firma
    const referenceCode = `yape_${randomUUID()}`;
    const apiKey = process.env.PAYU_API_KEY!;
    const merchantId = process.env.PAYU_MERCHANT_ID!;
    const signatureString = `${apiKey}~${merchantId}~${referenceCode}~${price.amount}~${price.currency}`;
    const signature = crypto
      .createHash("md5")
      .update(signatureString)
      .digest("hex");

    // Antifraude
    const headersList = await headers();
    const ipAddress = headersList.get("x-forwarded-for") ?? "127.0.0.1";
    const userAgent = headersList.get("user-agent") ?? "Unknown";
    const cookie = `session_${randomUUID()}`;
    const deviceSessionId = `dev_${randomUUID()}`;
    const notifyUrl =
      process.env.PAYU_NOTIFY_URL ?? "https://tu-dominio.com/api/payu/notify";

    const payuRequestBody = {
      test: process.env.PAYU_TEST_MODE === "TRUE",
      language: "es",
      command: "SUBMIT_TRANSACTION",
      merchant: { apiKey, apiLogin: process.env.PAYU_API_LOGIN! },
      transaction: {
        order: {
          accountId: process.env.PAYU_ACCOUNT_ID!,
          referenceCode,
          description: `${description} - ${email}`,
          language: "es",
          signature,
          notifyUrl,
          additionalValues: {
            TX_VALUE: {
              value: parseFloat(price.amount),
              currency: price.currency,
            },
            TX_TAX: { value: 0, currency: price.currency },
            TX_TAX_RETURN_BASE: { value: 0, currency: price.currency },
          },
          buyer: {
            merchantBuyerId: "1",
            fullName: name,
            emailAddress: email,
            contactPhone: phone,
            dniNumber: doc_number,
            shippingAddress: {
              street1: "N/A",
              city: "Lima",
              state: "Lima",
              country: "PE",
              postalCode: "070001",
              phone: phone,
            },
          },
          shippingAddress: {
            street1: "N/A",
            city: "Lima",
            state: "Lima",
            country: "PE",
            postalCode: "07001",
            phone: phone,
          },
        },
        extraParameters: { OTP: otp },
        payer: {
          merchantPayerId: "1",
          fullName: name,
          emailAddress: email,
          contactPhone: phone,
          dniNumber: doc_number,
          billingAddress: {
            street1: "N/A",
            city: "Lima",
            state: "Lima",
            country: "PE",
            postalCode: "07001",
            phone: phone,
          },
        },
        type: "AUTHORIZATION_AND_CAPTURE",
        paymentMethod: "YAPE",
        expirationDate: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        paymentCountry: "PE",
        ipAddress,
        deviceSessionId,
        cookie,
        userAgent,
      },
    };

    const response = await fetch(payuApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
      body: JSON.stringify(payuRequestBody),
    });

    // 1. Asumimos una respuesta JSON y la parseamos.
    const result: PayUApiResponse = await response.json();

    // 2. Mantenemos el log para depuración. Es una buena práctica.
    console.log("Respuesta de PayU (Yape):", JSON.stringify(result, null, 2));
    const txResponse = result.transactionResponse;

    // 3. Verificamos el estado de la transacción.
    if (txResponse && txResponse.state === "APPROVED") {
      // Lógica de éxito: Guardar en la base de datos y redirigir.
      await pool.query(
        `INSERT INTO customers (email, name, country_code) VALUES ($1, $2, 'PE')
         ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, country_code = 'PE'`,
        [validatedFields.data.email, validatedFields.data.name]
      );

      if (productId === "libro-digital") {
        await addContactToBrevo(email, name, 13);
      }

      redirect(onSuccessRedirectTo);
    } else {
      const userFriendlyMessage = getPayUResponseMessage(txResponse, result);
      return { message: userFriendlyMessage };
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Error al procesar pago con Yape:", error);
    return {
      message: "Ocurrió un error en el servidor. Por favor, intenta de nuevo.",
    };
  }
}

async function getPayPalAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(
    `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    }
  );

  const data = await response.json();
  return data.access_token;
}

export async function createPayPalOrder(amount: number, description: string) {
  if (amount <= 0) {
    return {
      success: false,
      message: "El monto de la orden debe ser positivo.",
    };
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const url = `${process.env.PAYPAL_API_URL}/v2/checkout/orders`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD", // Moneda siempre en USD
              value: amount.toFixed(2),
            },
            description: description,
          },
        ],
        application_context: {
          brand_name: "Cerrador Experto",
          landing_page: "LOGIN",
          user_action: "PAY_NOW",
        },
      }),
    });

    const data = await response.json();
    if (response.ok && data.id) {
      return { success: true, orderId: data.id };
    } else {
      console.error(
        "Error creating PayPal order:",
        JSON.stringify(data, null, 2)
      );
      const errorMessage =
        data?.details?.[0]?.description ||
        "No se pudo crear la orden de PayPal.";
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    console.error("Error de red o sistema al crear orden de PayPal:", error);
    return {
      success: false,
      message: "Error de comunicación con el servicio de PayPal.",
    };
  }
}

export async function capturePayPalOrder(
  orderId: string,
  name: string,
  email: string,
  onSuccessRedirectTo: string,
  productId:
    | "libro-digital"
    | "libro-fisico"
    | "comunidad-lobos"
    | "comunidad-lobos-cuota-inicial"
) {
  const accessToken = await getPayPalAccessToken();
  const url = `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (response.ok && data.status === "COMPLETED") {
    const transactionId = data.purchase_units[0].payments.captures[0].id;
    const countryCode =
      data.purchase_units[0].shipping?.address?.country_code || "INTL";

    try {
      await pool.query(
        `INSERT INTO customers (email, name, country_code) VALUES ($1, $2, $3)
         ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, country_code = EXCLUDED.country_code`,
        [email, name, countryCode]
      );

      if (productId === "libro-digital") {
        await addContactToBrevo(email, name, 13);
      }

      console.log(`Cliente y transacción de PayPal guardados.`);
    } catch (dbError) {
      console.error(
        "Error guardando la transacción de PayPal en la DB:",
        dbError
      );
    }
    redirect(`${onSuccessRedirectTo}?sessionTransactionId=${transactionId}`);
  } else {
    console.error("Error capturing PayPal order:", data);
    return {
      success: false,
      message: "No se pudo completar el pago con PayPal.",
    };
  }
}
