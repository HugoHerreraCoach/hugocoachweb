// src/app/lib/db.ts
import postgres from "postgres";
import { randomUUID } from "crypto";

// El cliente postgres leerá automáticamente POSTGRES_URL de tu entorno.
// Neon suele demandar { ssl: 'require' }.
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Función para inicializar la base de datos
async function initializeDatabase() {
  try {
    // Crear la tabla tokens si no existe
    await sql`
      CREATE TABLE IF NOT EXISTS tokens (
        id UUID PRIMARY KEY,
        "sessionId" TEXT NOT NULL,
        tokenId TEXT UNIQUE NOT NULL,
        "maskedNumber" TEXT NOT NULL,
        "paymentMethod" TEXT NOT NULL,
        "expirationDate" TEXT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Crear la tabla user_data si no existe (SEPARADA)
    await sql`
      CREATE TABLE IF NOT EXISTS user_data (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "sessionId" TEXT NOT NULL UNIQUE,
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        email TEXT NOT NULL,
        "phoneCountryCode" TEXT NOT NULL,
        "phoneNumber" TEXT NOT NULL,
        address TEXT NOT NULL,
        reference TEXT,
        country TEXT NOT NULL,
        department TEXT NOT NULL,
        city TEXT NOT NULL,
        "postalCode" TEXT NOT NULL,
        "identificationType" TEXT NOT NULL,
        "identificationNumber" TEXT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log("✅ Base de datos inicializada correctamente");
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
    throw error;
  }
}

let isInitialized = false;
let initPromise: Promise<void> | null = null;

export async function ensureDbInitialized() {
  if (isInitialized) return;
  if (!initPromise) {
    initPromise = initializeDatabase().then(() => {
      isInitialized = true;
    }).catch(err => {
      console.error("❌ Lazy DB Init error:", err);
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

/**
 * Inserta (o actualiza si ya existe) un token en la tabla `tokens`.
 * @param args.sessionId           Identificador de la sesión del usuario (cookie).
 * @param args.creditCardTokenId   El tokenId devuelto por PayU.
 * @param args.maskedNumber        El número enmascarado ("403799******1984").
 * @param args.paymentMethod       "VISA", "MASTERCARD", etc.
 * @param args.expirationDate      Fecha de expiración en formato "YYYY/MM".
 */
export async function saveTokenToDB(args: {
  sessionId: string;
  creditCardTokenId: string;
  maskedNumber: string;
  paymentMethod: string;
  expirationDate: string;
}) {
  await ensureDbInitialized();
  const {
    sessionId,
    creditCardTokenId,
    maskedNumber,
    paymentMethod,
    expirationDate,
  } = args;

  // Generamos un nuevo id para el registro (UUID v4).
  const id = randomUUID();

  // Usamos un solo INSERT ... ON CONFLICT para hacer upsert.
  await sql`
    INSERT INTO tokens(
      id,
      "sessionId",
      tokenId,
      "maskedNumber",
      "paymentMethod",
      "expirationDate"
    ) VALUES (
      ${id},
      ${sessionId},
      ${creditCardTokenId},
      ${maskedNumber},
      ${paymentMethod},
      ${expirationDate}
    )
    ON CONFLICT (tokenId) DO UPDATE
      SET
        "maskedNumber"   = EXCLUDED."maskedNumber",
        "paymentMethod"  = EXCLUDED."paymentMethod",
        "expirationDate" = EXCLUDED."expirationDate"
  `;
}

/**
 * Devuelve todos los tokens asociados a una sessionId, ordenados por `createdAt DESC`.
 * @param sessionId
 */
export async function getTokensBySession(sessionId: string) {
  await ensureDbInitialized();
  const rows = await sql<{
    tokenid: string;
    masked_number: string;
    payment_method: string;
    expiration_date: string;
  }[]>`
    SELECT
      tokenId as "tokenid",
      "maskedNumber" as "masked_number",
      "paymentMethod" as "payment_method",
      "expirationDate" as "expiration_date"
    FROM tokens
    WHERE "sessionId" = ${sessionId}
    ORDER BY "createdAt" DESC
  `;
  return rows;
}

export async function saveUserDataToDB(args: {
  sessionId: string;
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
  identificationType?: string;
  identificationNumber?: string;
}) {
  await ensureDbInitialized();
  const {
    sessionId,
    firstName,
    lastName,
    email,
    phoneCountryCode,
    phoneNumber,
    address,
    reference,
    country,
    department,
    city,
    postalCode,
    identificationType,
    identificationNumber,
  } = args;

  console.log("🗄️ saveUserDataToDB - Iniciando guardado para sessionId:", sessionId);
  console.log("🗄️ Datos de identificación recibidos:", {
    identificationType,
    identificationNumber,
    hasIdentificationType: !!identificationType,
    hasIdentificationNumber: !!identificationNumber,
    identificationNumberLength: identificationNumber?.length,
    identificationNumberType: typeof identificationNumber
  });

  // Determinar si es paso 1 o paso 2 basándose en la presencia de datos de identificación
  const isStep1 = !identificationType || !identificationNumber;
  const isStep2 = !!identificationType && !!identificationNumber;

  console.log("🔄 Detectando paso:", {
    isStep1,
    isStep2,
    step: isStep1 ? "PASO 1 (sin identificación)" : "PASO 2 (con identificación)"
  });

  // Validaciones solo para paso 2
  if (isStep2) {
    if (!identificationType || identificationType.trim() === '') {
      console.error("❌ identificationType está vacío en paso 2");
      throw new Error("identificationType es requerido en el paso 2");
    }

    if (!identificationNumber || identificationNumber.trim() === '') {
      console.error("❌ identificationNumber está vacío en paso 2");
      throw new Error("identificationNumber es requerido en el paso 2");
    }

    // Validación específica para DNI
    if (identificationType === "DNI" && identificationNumber.length !== 8) {
      console.error("❌ DNI debe tener 8 dígitos:", identificationNumber);
      throw new Error("El DNI debe tener 8 dígitos");
    }
  }

  try {
    // Preparar valores para la query
    const cleanValues = {
      sessionId: sessionId.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phoneCountryCode: phoneCountryCode.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      reference: (reference || '').trim(),
      country: country.trim(),
      department: department.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      // Para paso 1: usar valores por defecto, para paso 2: valores reales
      identificationType: (identificationType || 'DNI').trim(),
      identificationNumber: (identificationNumber || '').trim()
    };

    console.log("💾 Valores limpiados para guardar:", {
      sessionId: cleanValues.sessionId,
      firstName: cleanValues.firstName,
      lastName: cleanValues.lastName,
      identificationType: cleanValues.identificationType,
      identificationNumber: cleanValues.identificationNumber
    });

    // Ejecutar la query con logging - diferente lógica para paso 1 vs paso 2
    let result;
    
    if (isStep1) {
      // PASO 1: No actualizar campos de identificación, preservar los existentes
      console.log("💾 PASO 1: Preservando datos de identificación existentes");
      result = await sql`
        INSERT INTO user_data(
          "sessionId",
          "firstName",
          "lastName",
          email,
          "phoneCountryCode",
          "phoneNumber",
          address,
          reference,
          country,
          department,
          city,
          "postalCode",
          "identificationType",
          "identificationNumber"
        ) VALUES (
          ${cleanValues.sessionId},
          ${cleanValues.firstName},
          ${cleanValues.lastName},
          ${cleanValues.email},
          ${cleanValues.phoneCountryCode},
          ${cleanValues.phoneNumber},
          ${cleanValues.address},
          ${cleanValues.reference},
          ${cleanValues.country},
          ${cleanValues.department},
          ${cleanValues.city},
          ${cleanValues.postalCode},
          'DNI',
          ''
        )
        ON CONFLICT ("sessionId") DO UPDATE SET
          "firstName" = EXCLUDED."firstName",
          "lastName" = EXCLUDED."lastName",
          email = EXCLUDED.email,
          "phoneCountryCode" = EXCLUDED."phoneCountryCode",
          "phoneNumber" = EXCLUDED."phoneNumber",
          address = EXCLUDED.address,
          reference = EXCLUDED.reference,
          country = EXCLUDED.country,
          department = EXCLUDED.department,
          city = EXCLUDED.city,
          "postalCode" = EXCLUDED."postalCode",
          "updatedAt" = CURRENT_TIMESTAMP
        RETURNING "identificationType", "identificationNumber", "firstName", "lastName"
      `;
    } else {
      // PASO 2: Actualizar todos los campos incluyendo identificación
      console.log("💾 PASO 2: Actualizando todos los campos incluyendo identificación");
      result = await sql`
        INSERT INTO user_data(
          "sessionId",
          "firstName",
          "lastName",
          email,
          "phoneCountryCode",
          "phoneNumber",
          address,
          reference,
          country,
          department,
          city,
          "postalCode",
          "identificationType",
          "identificationNumber"
        ) VALUES (
          ${cleanValues.sessionId},
          ${cleanValues.firstName},
          ${cleanValues.lastName},
          ${cleanValues.email},
          ${cleanValues.phoneCountryCode},
          ${cleanValues.phoneNumber},
          ${cleanValues.address},
          ${cleanValues.reference},
          ${cleanValues.country},
          ${cleanValues.department},
          ${cleanValues.city},
          ${cleanValues.postalCode},
          ${cleanValues.identificationType},
          ${cleanValues.identificationNumber}
        )
        ON CONFLICT ("sessionId") DO UPDATE SET
          "firstName" = EXCLUDED."firstName",
          "lastName" = EXCLUDED."lastName",
          email = EXCLUDED.email,
          "phoneCountryCode" = EXCLUDED."phoneCountryCode",
          "phoneNumber" = EXCLUDED."phoneNumber",
          address = EXCLUDED.address,
          reference = EXCLUDED.reference,
          country = EXCLUDED.country,
          department = EXCLUDED.department,
          city = EXCLUDED.city,
          "postalCode" = EXCLUDED."postalCode",
          "identificationType" = EXCLUDED."identificationType",
          "identificationNumber" = EXCLUDED."identificationNumber",
          "updatedAt" = CURRENT_TIMESTAMP
        RETURNING "identificationType", "identificationNumber", "firstName", "lastName"
      `;
    }

    console.log("✅ Query ejecutada exitosamente. Resultado:", result);

    // Verificación adicional: leer los datos recién guardados
    const verification = await sql`
      SELECT 
        "identificationType", 
        "identificationNumber", 
        "firstName", 
        "lastName",
        "updatedAt"
      FROM user_data 
      WHERE "sessionId" = ${cleanValues.sessionId}
    `;

    console.log("🔍 Verificación post-guardado:", verification[0]);

    if (!verification[0]) {
      console.error("❌ No se pudo verificar el guardado de datos");
      throw new Error("Error verificando el guardado de datos");
    }

    // Solo verificar DNI si es paso 2 (cuando hay datos de identificación reales)
    if (isStep2 && verification[0].identificationNumber !== cleanValues.identificationNumber) {
      console.error("❌ El DNI guardado no coincide:", {
        enviado: cleanValues.identificationNumber,
        guardado: verification[0].identificationNumber
      });
      throw new Error("Error: DNI no se guardó correctamente");
    }

    console.log("✅ Datos guardados y verificados exitosamente");

  } catch (error) {
    console.error("❌ Error en saveUserDataToDB:", error);
    throw error;
  }
}

/**
 * Versión mejorada de getUserDataBySession con logging completo
 */
export async function getUserDataBySession(sessionId: string) {
  await ensureDbInitialized();
  console.log("🔍 getUserDataBySession - Buscando datos para sessionId:", sessionId);

  if (!sessionId || sessionId.trim() === '') {
    console.error("❌ sessionId está vacío");
    return null;
  }

  try {
    const rows = await sql<{
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
      identificationType: string;
      identificationNumber: string;
    }[]>`
      SELECT 
        "firstName",
        "lastName",
        email,
        "phoneCountryCode",
        "phoneNumber",
        address,
        reference,
        country,
        department,
        city,
        "postalCode",
        "identificationType",
        "identificationNumber"
      FROM user_data 
      WHERE "sessionId" = ${sessionId.trim()}
      LIMIT 1
    `;

    console.log("🔍 Query ejecutada. Filas encontradas:", rows.length);

    if (rows.length === 0) {
      console.log("❌ No se encontraron datos para sessionId:", sessionId);
      return null;
    }

    const userData = rows[0];
    console.log("✅ Datos encontrados:", {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      identificationType: userData.identificationType,
      identificationNumber: userData.identificationNumber,
      hasIdentificationType: !!userData.identificationType,
      hasIdentificationNumber: !!userData.identificationNumber
    });

    return userData;

  } catch (error) {
    console.error("❌ Error en getUserDataBySession:", error);
    throw error;
  }
}

/**
 * Función de utilidad para verificar la estructura de la tabla
 */
export async function verifyTableStructure() {
  await ensureDbInitialized();
  try {
    console.log("🔍 Verificando estructura de la tabla user_data...");
    
    const structure = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'user_data'
      ORDER BY ordinal_position
    `;

    console.log("📋 Estructura de la tabla user_data:", structure);

    // Verificar que las columnas críticas existen
    const criticalColumns = ['identificationType', 'identificationNumber'];
    const existingColumns = structure.map(col => col.column_name);
    
    for (const column of criticalColumns) {
      if (!existingColumns.includes(column)) {
        console.error(`❌ Columna faltante: ${column}`);
      } else {
        console.log(`✅ Columna encontrada: ${column}`);
      }
    }

  } catch (error) {
    console.error("❌ Error verificando estructura de tabla:", error);
  }
}

/**
 * Función de utilidad para limpiar y verificar datos
 */
export async function debugUserData(sessionId: string) {
  await ensureDbInitialized();
  try {
    console.log("🔧 DEBUG: Analizando datos para sessionId:", sessionId);

    // Obtener datos raw
    const rawData = await sql`
      SELECT * FROM user_data WHERE "sessionId" = ${sessionId}
    `;

    console.log("📊 Datos raw de la DB:", rawData[0]);

    if (rawData[0]) {
      console.log("🔍 Análisis de campos de identificación:", {
        identificationType_value: rawData[0].identificationType,
        identificationType_type: typeof rawData[0].identificationType,
        identificationType_length: rawData[0].identificationType?.length,
        identificationNumber_value: rawData[0].identificationNumber,
        identificationNumber_type: typeof rawData[0].identificationNumber,
        identificationNumber_length: rawData[0].identificationNumber?.length,
        raw_object_keys: Object.keys(rawData[0])
      });
    }

    return rawData[0];
  } catch (error) {
    console.error("❌ Error en debug:", error);
  }
}