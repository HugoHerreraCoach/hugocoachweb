import { NextRequest, NextResponse } from "next/server";

const PAYU_TOKEN_URL = "https://api.payulatam.com/payments-api/4.0/service.cgi";

interface TokenizeRequest {
  payerId: string;
  name: string;
  identificationNumber: string;
  paymentMethod: string;
  number: string;
  expirationDate: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1) Log de inicio
    console.log("Iniciando proceso de tokenización");

    const cookieSession = request.cookies.get("session_id")?.value;
    const sessionId = cookieSession ?? crypto.randomUUID();
    console.log("Session ID:", sessionId);

    // 2) Validar body
    const body: TokenizeRequest = await request.json();
    // Add sessionId as payerId if not provided
    body.payerId = body.payerId || sessionId;
    
    console.log("Request body:", {
      ...body,
      number: body.number ? `****${body.number.slice(-4)}` : undefined
    });

    // Validación detallada de campos
    const requiredFields = {
      payerId: body.payerId,
      name: body.name,
      identificationNumber: body.identificationNumber,
      paymentMethod: body.paymentMethod,
      number: body.number,
      expirationDate: body.expirationDate
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.error("Campos faltantes:", missingFields);
      return NextResponse.json({
        error: "Faltan campos para tokenizar.",
        missingFields
      }, { status: 400 });
    }

    // 3) Validar credenciales
    const apiLogin = process.env.PAYU_API_LOGIN;
    const apiKey = process.env.PAYU_API_KEY;

    if (!apiLogin || !apiKey) {
      console.error("Credenciales de PayU no configuradas");
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    // 4) Construir y enviar payload
    const payuPayload = {
      language: "es",
      command: "CREATE_TOKEN",
      merchant: {
        apiLogin,
        apiKey,
      },
      creditCardToken: {
        payerId: sessionId,
        name: body.name,
        identificationNumber: body.identificationNumber,
        paymentMethod: body.paymentMethod,
        number: body.number.replace(/\s/g, ''),
        expirationDate: body.expirationDate,
      },
    };

    console.log("Enviando request a PayU:", {
      ...payuPayload,
      creditCardToken: {
        ...payuPayload.creditCardToken,
        number: "****" + body.number.slice(-4)
      }
    });

    const payuRes = await fetch(PAYU_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payuPayload),
    });

    // 5) Procesar respuesta
    const payuJson = await payuRes.json();
    console.log("Respuesta de PayU:", {
      status: payuRes.status,
      ok: payuRes.ok,
      body: payuJson
    });

    if (!payuRes.ok || payuJson.error) {
      console.error("Error de PayU:", payuJson);
      return NextResponse.json({
        error: "Tokenización en PayU falló.",
        details: payuJson
      }, { status: payuRes.status || 400 });
    }

    // 6) Procesar respuesta exitosa
    const {
      creditCardTokenId,
      maskedNumber,
      paymentMethod: pmFromPayU,
      //expirationDate: expDateFromPayU,
    } = payuJson.creditCardToken;

    const expDate = body.expirationDate;

    // 7) NO guardar token aquí - se guardará solo si el pago es exitoso
    console.log("Token creado exitosamente, NO se guardará hasta que el pago sea exitoso");

    // 8) Respuesta al cliente
    const res = NextResponse.json({
      creditCardTokenId,
      maskedNumber,
      paymentMethod: pmFromPayU,
      expirationDate: expDate,
    }, { status: 200 });

    if (!cookieSession) {
      res.cookies.set({
        name: "session_id",
        value: sessionId,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return res;

  } catch (error) {
    console.error("Error en tokenización:", error);
    return NextResponse.json({
      error: "Error interno del servidor al tokenizar.",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}