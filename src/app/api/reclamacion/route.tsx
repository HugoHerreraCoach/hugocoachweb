// src/app/api/reclamacion/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { reclamoSchema, ReclamoFormData } from '@/lib/schemas';

// --- Importaciones para el PDF ---
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer, // <--- ESTA ES LA IMPORTACIÓN CORRECTA Y ÚNICA QUE NECESITAMOS
} from '@react-pdf/renderer';

// --- 1. PLANTILLA DEL PDF ---
// (Definimos los estilos para el PDF)
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
    border: '1px solid #333',
    padding: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 11,
    marginBottom: 4,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  label: {
    fontWeight: 'bold',
  },
});

// (Definimos el componente React que se convertirá en PDF)
const PdfTemplate = ({
  data,
  codigo,
}: {
  data: ReclamoFormData;
  codigo: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Hoja de Reclamación N°: {codigo}</Text>
      <Text style={styles.header}>
        Fecha: {new Date().toLocaleDateString('es-PE')}
      </Text>
      <Text style={styles.header}>Razón Social: Hugo Herrera Coach</Text>

      <View style={styles.section}>
        <Text style={styles.text}>
          <Text style={styles.label}>1. Identificación del Consumidor:</Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Nombres:</Text> {data.nombres}{' '}
          {data.apellidoPaterno} {data.apellidoMaterno}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Documento:</Text> {data.tipoDocumento}{' '}
          {data.numeroDocumento}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Email:</Text> {data.email}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Teléfono:</Text> {data.telefono}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Domicilio:</Text> {data.domicilio}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          <Text style={styles.label}>2. Identificación del Bien:</Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Tipo:</Text> {data.tipoBien}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Descripción:</Text> {data.descripcionBien}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Monto Reclamado:</Text>{' '}
          {data.montoReclamado ? `S/ ${data.montoReclamado.toFixed(2)}` : 'N/A'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          <Text style={styles.label}>3. Detalle de la Reclamación:</Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Tipo:</Text> {data.tipoReclamacion}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Detalle:</Text> {data.detalleReclamo}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Pedido:</Text> {data.pedidoConsumidor}
        </Text>
      </View>
    </Page>
  </Document>
);

// --- 2. FUNCIÓN AUXILIAR (Stream a Buffer) ---
// (Esta función YA NO ES NECESARIA, la eliminamos)

// --- 3. FUNCIÓN PRINCIPAL (POST) ---
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validar los datos con Zod
    const validation = reclamoSchema.safeParse(body);
    if (!validation.success) {
      console.warn('Error de validación de Zod:', validation.error.flatten());
      return NextResponse.json(
        {
          message: 'Datos inválidos.',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 2. Generar un código único
    const codigoReclamo = `REC-${Date.now()}`;

    // 3. TODO: Guardar en tu Base de Datos
    // (Este es el lugar donde deberías guardar 'data' y 'codigoReclamo' en tu DB)
    console.log('Guardando en DB (simulado):', codigoReclamo, data);

    // 4. Generar el PDF en Buffer
    // --- ESTA ES LA FORMA CORRECTA ---
    const pdfBuffer = await renderToBuffer(
      <PdfTemplate data={data} codigo={codigoReclamo} />
    );
    const pdfBase64 = pdfBuffer.toString('base64');
    // --- FIN DE LA CORRECCIÓN ---

    // 5. Enviar el email con Brevo (Transaccional)
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) {
      console.error('Error: Falta la variable de entorno BREVO_API_KEY.');
      return NextResponse.json(
        { message: 'La configuración del servidor es incompleta.' },
        { status: 500 }
      );
    }

    // ¡¡IMPORTANTE!! Cambia 'sender' y 'bcc' a tus correos verificados en Brevo
    const emailPayload = {
      sender: {
        email: 'noreply@hugoherreracoach.com', // <-- Email verificado en Brevo
        name: 'Hugo Herrera Coach',
      },
      to: [
        {
          email: data.email,
          name: `${data.nombres} ${data.apellidoPaterno}`,
        },
      ],
      bcc: [
        {
          email: 'hugoherreracoach@gmail.com', // <-- Tu email de notificación
          name: 'Admin Hugo Herrera',
        },
      ],
      subject: `Hoja de Reclamación Registrada: ${codigoReclamo}`,
      htmlContent: `
        <html>
          <body>
            <h1>Hoja de Reclamación Recibida</h1>
            <p>Hola ${data.nombres},</p>
            <p>Hemos registrado tu ${data.tipoReclamacion} con el código: <strong>${codigoReclamo}</strong>.</p>
            <p>Adjuntamos la copia de tu Hoja de Reclamación en formato PDF.</p>
            <p>Te daremos respuesta en el plazo legal establecido (15 días hábiles).</p>
            <br/>
            <p>Gracias,</p>
            <p>Equipo de Hugo Herrera Coach</p>
          </body>
        </html>
      `,
      attachment: [
        {
          content: pdfBase64,
          name: `Hoja_Reclamacion_${codigoReclamo}.pdf`,
        },
      ],
    };

    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
        accept: 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Error de la API de Brevo (SMTP):', errorData);
      return NextResponse.json(
        { message: 'Error al enviar el email de confirmación.' },
        { status: 500 }
      );
    }

    // 6. Responder al Frontend con éxito
    return NextResponse.json(
      { success: true, codigo: codigoReclamo },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Manejo de errores (type-safe)
    if (error instanceof z.ZodError) {
      console.warn('Error de validación de Zod:', error.flatten());
      return NextResponse.json(
        { message: 'Datos inválidos.', errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error('Error inesperado en /api/reclamacion:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
// Esta línea asegura que el archivo es un módulo de TypeScript,
// lo que soluciona el error 'Cannot redeclare block-scoped variable'.
export {};