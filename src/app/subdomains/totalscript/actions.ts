'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface DataPromptInput {
  Email: string;
  ProductOrService: string;
  Description: string;
  Price: string;
  offer: string;
  Company: string;
}

export async function savePromptAndGenerateScript(input: DataPromptInput, ticket: string, recommendation: string) {
  try {
    // 1. Save data to Supabase
    const { error: supabaseError } = await supabase
      .from('DataPromt')
      .insert([
        {
          Email: input.Email,
          ProductOrService: input.ProductOrService,
          Description: input.Description,
          Price: input.Price,
          offer: input.offer,
          Company: input.Company,
          created_at: new Date().toISOString()
        }
      ]);

    if (supabaseError) {
      console.error('Error inserting to Supabase:', supabaseError);
    }
  } catch (err) {
    console.error('Supabase connection failed:', err);
  }

  // 2. Generate with Gemini API
  const geminiApiKey = process.env.GEMINI_API_KEY || '';
  if (!geminiApiKey) {
    console.error('GEMINI_API_KEY is not defined in environment variables.');
    return 'Error: API key for AI script generator is missing.';
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const models = [
    'gemini-2.0-flash',
    'gemini-2.5-flash',
    'gemini-flash-latest'
  ];

  // Build the prompt using the same logic as the original app
  let textguia = '';
  if (recommendation.includes('Whatsapp')) {
    textguia = `
Crea un guion de ventas para whatsapp respetando el modelo:
Cliente: Hola, más información. 
Asesor: Hola 😊, te saluda Hugo Herrera, asesor de [Empresa] ¿Cuál es tu nombre?
Cliente: Juan
Asesor: Mucho gusto Juan😊. Este producto tiene [beneficio], y su precio es [Precio]
(imagen/video del producto)
¿Cuántas unidades deseas? para comentarte nuestra promoción🎁
Cliente: Sólo una 
Asesor: Perfecto, la promoción consiste en [Promoción] 
¿Te gustaría aprovechar esta promoción? 🤩
Cliente: Sí 
Asesor: Bien, aceptamos métodos de pago como:
1️⃣   Tarjeta de crédito 💳
2️⃣   Transferencia bancaria
¿Cuál opción sería más sencillo para ti?
Cliente: Tarjeta de crédito
Asesor: Ok, aquí te envío el link del pago: (link) 🔗
Los próximos pasos serían que me envíes:
✔️Captura de pantalla del pago
✔️Nombre completo
✔️Dirección de entrega

Debes completar lo que está entre [] con la información:
`;
  } else if (recommendation.includes('Telefono')) {
    textguia = `
Crea un guion de ventas respetando el siguiente modelo:
Asesor: Hola ¿Con Juan?
Cliente: Sí, él habla
Asesor: ¡Mucho gusto Juan! te saluda Hugo Herrera, asesor de [Empresa] ¿Cómo estás? 
Cliente: bien 
Asesor: ¡Genial! Si lo recuerdas, nos dejaste tus datos en un formulario, interesado en [Producto] ¿Te suena? 
Cliente: Sí, lo recuerdo
Asesor: Perfecto, la razón de mi llamada es para brindarte la información ¿Tienes un minuto?
Cliente: Sí, claro 
Asesor: Bien, el nombre de nuestra compañía es [Empresa] y ya tiene más de 3 años de experiencia en el mercado. Nuestro producto consiste en [Descripción]
Cuéntame Juan:
Asesor: ¿Qué características buscas en este producto?
Cliente: me interesan a y b características del producto
Asesor: Ok ¿Qué resultado te gustaría ver si usas este producto?
Cliente: me gustaría ver n resultado
Asesor: Bien. Y ¿Cuál es tu presupuesto aproximado para este producto?
Cliente:  Mi presupuesto es de n dólares
Asesor: Genial, este producto se adapta perfectamente a lo que buscas. Te ayudará en [beneficio 1], además podrás [beneficio 2], y conseguirás [beneficio 3] ¿Tienes alguna duda que no haya resuelto? 
Cliente: Sí/ ¿Cuál es el precio? / ¿Dónde están ubicados?
Asesor (si hay dudas resolverlas y continuar con el guion): Ok, te comento que el precio de este producto es de [Precio], pero esta semana estamos en promoción, la promoción consiste en [Promoción] ¿Qué te parece?
Cliente: Buena
Asesor: ¿Te gustaría aprovechar esta promoción?
Cliente: Sí
Asesor: Genial. El próximo paso sería hacer el pago y así aprovechas la promoción. Aceptamos métodos de pago como tarjeta de crédito y transferencia bancaria ¿Cuál es más sencillo para ti? 
Cliente: tarjeta de crédito
Asesor: Bien, te estoy enviando los datos del pago a tu Whatsapp. 

Debes completar lo que está entre [] con la información:
`;
  } else {
    textguia = `
Crea un guion de ventas respetando el siguiente modelo:
Asesor: Hola ¿Con Juan?
Cliente: Sí, él habla
Asesor: ¡Mucho gusto Juan! te saluda Hugo Herrera, asesor de [Empresa] ¿Cómo estás? 
Cliente: bien 
Asesor: ¡Genial! Si lo recuerdas, nos dejaste tus datos en un formulario, interesado en [Producto] ¿Te suena? 
Cliente: Sí, lo recuerdo
Asesor: Perfecto, la razón de mi llamada es para brindarte la información ¿Tienes un minuto?
Cliente: Sí, claro 
Asesor: Bien, el nombre de nuestra compañía es [Empresa] y ya tiene más de 3 años de experiencia en el mercado. Nuestro producto consiste en [Descripción]
Cuéntame Juan:
Asesor: ¿Qué características buscas en este producto?
Cliente: me interesan a y b características del producto
Asesor: Ok ¿Qué resultado te gustaría ver si usas este producto?
Cliente: me gustaría ver n resultado
Asesor: Bien. Y ¿Cuál es tu presupuesto aproximado para este producto?
Cliente:  Mi presupuesto es de n dólares
Asesor: Genial, este producto se adapta perfectamente a lo que buscas. Te ayudará en [beneficio 1], además podrás [beneficio 2], y conseguirás [beneficio 3] ¿Tienes alguna duda que no haya resuelto? 
Cliente: Sí/ ¿Cuál es el precio? / ¿Dónde están ubicados?
Asesor (si hay dudas resolverlas y continuar con el guion): Ok, te comento que el precio de este producto es de [Precio], pero esta semana estamos en promoción, la promoción consiste en [Promoción] Entonces ¿Te parece bien si agendamos una videollamada de 20min, donde pueda explicarte todos los beneficios del producto, con imágenes? 
Cliente: Claro

Debes completar lo que está entre [] con la información:
`;
  }

  const query = `
Recomendación de venta: ${recommendation}
Producto: ${input.ProductOrService}
Descripción: ${input.Description}
Precio: ${input.Price} Dolar(es)
Oferta: ${input.offer}
Empresa: ${input.Company}
Usa el siguiente texto para crear los guiones: ${textguia}
`;

  // Fallback loop over models
  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: `Eres un experto en ventas con más de 20 años de experiencia creando guiones de ventas efectivos. 
Tu trabajo es crear guiones de ventas profesionales y persuasivos.

REGLAS IMPORTANTES:
- Debes respetar EXACTAMENTE la estructura del guion que el usuario te proporcione como modelo.
- Reemplaza SOLAMENTE lo que está entre corchetes [] con la información proporcionada.
- Mantén el formato de diálogo: "Cliente:" y "Asesor:" en líneas separadas.
- Usa emojis tal como aparecen en el modelo.
- No agregues pasos extras ni elimines pasos del modelo original.
- El guion debe ser natural y persuasivo.`
      });

      const result = await model.generateContent(query);
      return result.response.text();
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.warn(`Model ${modelName} failed:`, errorMsg);
      // Continue to next model in loop
      continue;
    }
  }

  return 'Lo sentimos, el servicio de Inteligencia Artificial está experimentando alta demanda. Por favor intenta de nuevo en unos segundos.';
}
