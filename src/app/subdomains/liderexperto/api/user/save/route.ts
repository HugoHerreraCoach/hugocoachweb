// src/app/api/user/save/route.ts 
import { NextRequest, NextResponse } from "next/server";
import { saveUserDataToDB, getUserDataBySession } from "@liderexperto/lib/db";

export async function POST(request: NextRequest) {
    try {
        const cookieSession = request.cookies.get("session_id")?.value;
        const sessionId = cookieSession ?? crypto.randomUUID();

        console.log("🍪 Session cookie recibida:", cookieSession);
        console.log("🆔 Session ID a usar:", sessionId);

        const userData = await request.json();

        // 🔍 DEBUG: Verificar todos los datos recibidos
        console.log("📋 Datos completos recibidos:", {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            identificationType: userData.identificationType,
            identificationNumber: userData.identificationNumber,
            hasIdentificationType: !!userData.identificationType,
            hasIdentificationNumber: !!userData.identificationNumber,
            allKeys: Object.keys(userData)
        });

        // ✅ DETERMINAR SI ES PASO 1 O PASO 2
        const isStep1 = !userData.identificationType || !userData.identificationNumber;
        const isStep2 = userData.identificationType && userData.identificationNumber;

        console.log("🔄 Detectando paso:", {
            isStep1,
            isStep2,
            step: isStep1 ? "PASO 1 (sin identificación)" : "PASO 2 (con identificación)"
        });

        // 📝 VALIDACIONES BÁSICAS (siempre requeridas)
        const requiredFields = ['firstName', 'lastName', 'email', 'phoneCountryCode', 'phoneNumber', 'address', 'country', 'department', 'city', 'postalCode'];
        const missingFields = requiredFields.filter(field => !userData[field] || userData[field].trim() === '');

        if (missingFields.length > 0) {
            console.error("❌ Faltan campos básicos:", missingFields);
            return NextResponse.json(
                { error: `Faltan campos requeridos: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // 📝 VALIDACIONES DEL PASO 2 (solo si es paso 2)
        if (isStep2) {
            if (!userData.identificationType.trim()) {
                console.error("❌ identificationType está vacío en paso 2");
                return NextResponse.json(
                    { error: "El tipo de identificación es requerido en el paso 2" },
                    { status: 400 }
                );
            }

            if (!userData.identificationNumber.trim()) {
                console.error("❌ identificationNumber está vacío en paso 2");
                return NextResponse.json(
                    { error: "El número de identificación es requerido en el paso 2" },
                    { status: 400 }
                );
            }

            // Validación específica para DNI
            if (userData.identificationType === "DNI" && userData.identificationNumber.length !== 8) {
                console.error("❌ DNI debe tener 8 dígitos:", userData.identificationNumber);
                return NextResponse.json(
                    { error: "El DNI debe tener 8 dígitos" },
                    { status: 400 }
                );
            }
        }

        // 🔍 DEBUG: Datos que se enviarán a la DB
        const dataToSave = {
            sessionId, // ✅ YA CORRECTO
            firstName: userData.firstName?.trim() || "",
            lastName: userData.lastName?.trim() || "",
            email: userData.email?.trim()?.toLowerCase() || "",
            phoneCountryCode: userData.phoneCountryCode?.trim() || "",
            phoneNumber: userData.phoneNumber?.trim() || "",
            address: userData.address?.trim() || "",
            reference: userData.reference?.trim() || "",
            country: userData.country?.trim() || "",
            department: userData.department?.trim() || "",
            city: userData.city?.trim() || "",
            postalCode: userData.postalCode?.trim() || "",
            // Solo enviar datos de identificación si están presentes (paso 2)
            ...(isStep2 && {
                identificationType: userData.identificationType?.trim(),
                identificationNumber: userData.identificationNumber?.trim()
            })
        };

        console.log("💾 Datos que se enviarán a saveUserDataToDB:", {
            sessionId: dataToSave.sessionId,
            firstName: dataToSave.firstName,
            lastName: dataToSave.lastName,
            email: dataToSave.email,
            identificationType: dataToSave.identificationType,
            identificationNumber: dataToSave.identificationNumber,
            isEmptyIdentification: !dataToSave.identificationNumber
        });

        // 💾 GUARDAR EN BASE DE DATOS
        await saveUserDataToDB(dataToSave);

        console.log("✅ Datos del usuario guardados exitosamente en la DB");

        // 🔍 VERIFICACIÓN: Leer de vuelta los datos para confirmar
        try {
            // ✅ CAMBIAR: usar sessionId en lugar de cookieSession
            const savedData = await getUserDataBySession(sessionId);

            console.log("🔍 Datos verificados desde la DB:", {
                firstName: savedData?.firstName,
                lastName: savedData?.lastName,
                email: savedData?.email,
                identificationType: savedData?.identificationType,
                identificationNumber: savedData?.identificationNumber,
                hasIdentificationNumber: !!savedData?.identificationNumber
            });

            // ✅ CREAR RESPUESTA
            const response = NextResponse.json(
                {
                    message: "Datos del usuario guardados exitosamente",
                    step: isStep1 ? 1 : 2,
                    sessionId, // 👈 AGREGAR PARA DEBUG
                    saved: {
                        firstName: savedData?.firstName,
                        lastName: savedData?.lastName,
                        email: savedData?.email,
                        identificationType: savedData?.identificationType,
                        identificationNumber: savedData?.identificationNumber
                    }
                },
                { status: 200 }
            );

            // 🍪 ESTABLECER COOKIE SI NO EXISTÍA (NUEVO)
            if (!cookieSession) {
                response.cookies.set({
                    name: "session_id",
                    value: sessionId,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/",
                    maxAge: 60 * 60 * 24 * 30,
                });
                console.log("🍪 Cookie session_id establecida:", sessionId);
            }

            return response;

        } catch (verificationError) {
            console.error("⚠️ Error en verificación, pero datos guardados:", verificationError);
            
            // ✅ CREAR RESPUESTA CON COOKIE TAMBIÉN EN EL CATCH
            const response = NextResponse.json(
                {
                    message: "Datos guardados exitosamente (verificación falló)",
                    step: isStep1 ? 1 : 2,
                    sessionId
                },
                { status: 200 }
            );

            // 🍪 ESTABLECER COOKIE SI NO EXISTÍA
            if (!cookieSession) {
                response.cookies.set({
                    name: "session_id",
                    value: sessionId,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/",
                    maxAge: 60 * 60 * 24 * 30,
                });
                console.log("🍪 Cookie session_id establecida (catch):", sessionId);
            }

            return response;
        }

    } catch (error) {
        console.error("❌ Error guardando datos del usuario:", error);
        console.error("Stack trace:", error instanceof Error ? error.stack : error);

        return NextResponse.json(
            {
                error: "Error interno del servidor",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}