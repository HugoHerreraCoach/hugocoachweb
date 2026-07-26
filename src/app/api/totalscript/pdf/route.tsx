// src/app/api/totalscript/pdf/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
  renderToBuffer,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 45,
    paddingBottom: 60,
    paddingHorizontal: 45,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: '#334155',
    lineHeight: 1.6,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#4f46e5',
    borderBottomStyle: 'solid',
    paddingBottom: 15,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  logoContainer: {
    width: 160,
  },
  logoImage: {
    width: 140,
    height: 'auto',
  },
  logoFallbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f46e5',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 7.5,
    color: '#64748b',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerMeta: {
    alignItems: 'flex-end',
  },
  headerDate: {
    fontSize: 8,
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  headerUrl: {
    fontSize: 8,
    color: '#4f46e5',
    marginTop: 2,
    textDecoration: 'none',
  },
  docTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e1b4b',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  docSubtitle: {
    fontSize: 9,
    color: '#6366f1',
    textAlign: 'center',
    marginBottom: 25,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: 'bold',
  },
  metaContainer: {
    backgroundColor: '#faf5ff',
    borderWidth: 1,
    borderColor: '#e9d5ff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 25,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  metaLabel: {
    fontWeight: 'bold',
    width: 90,
    color: '#6b21a8',
    fontSize: 9,
  },
  metaValue: {
    flex: 1,
    color: '#1e1b4b',
    fontSize: 9,
  },
  introText: {
    fontSize: 10,
    color: '#475569',
    fontStyle: 'italic',
    marginBottom: 20,
    paddingHorizontal: 5,
    lineHeight: 1.5,
  },
  dialogContainer: {
    marginTop: 10,
  },
  advisorBlock: {
    backgroundColor: '#f0f9ff',
    borderLeftWidth: 4,
    borderLeftColor: '#0284c7',
    borderLeftStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginBottom: 14,
  },
  clientBlock: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
    borderLeftStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginBottom: 14,
  },
  noteBlock: {
    backgroundColor: '#fafaf9',
    borderLeftWidth: 4,
    borderLeftColor: '#78716c',
    borderLeftStyle: 'solid',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 14,
    fontStyle: 'italic',
    fontSize: 8.5,
    color: '#57534e',
  },
  generalText: {
    marginBottom: 12,
    paddingHorizontal: 5,
    fontSize: 9.5,
    color: '#475569',
  },
  roleLabel: {
    fontWeight: 'bold',
    fontSize: 8.5,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  roleLabelAdvisor: {
    color: '#0369a1',
  },
  roleLabelClient: {
    color: '#15803d',
  },
  dialogContent: {
    fontSize: 9.5,
    color: '#1e293b',
    lineHeight: 1.5,
  },
  ctaContainer: {
    marginTop: 35,
    padding: 20,
    backgroundColor: '#e0e7ff',
    borderWidth: 2,
    borderColor: '#c7d2fe',
    borderStyle: 'dashed',
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3730a3',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  ctaText: {
    fontSize: 9,
    color: '#4338ca',
    marginBottom: 12,
    maxWidth: '90%',
    lineHeight: 1.5,
  },
  ctaButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 6,
    textDecoration: 'none',
  },
  ctaButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 9.5,
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 45,
    right: 45,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
    fontSize: 7.5,
    color: '#94a3b8',
  },
});

const ScriptPdfDocument = ({
  scriptText,
  company,
  product,
  logoPath,
}: {
  scriptText: string;
  company: string;
  product: string;
  logoPath: string | null;
}) => {
  const lines = scriptText.split('\n');

  // Determinar si una línea es parte de la introducción antes del primer diálogo
  let hasDialogStarted = false;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {logoPath ? (
              <Image src={logoPath} style={styles.logoImage} />
            ) : (
              <Text style={styles.logoFallbackText}>Hugo Herrera</Text>
            )}
            <Text style={styles.tagline}>TotalScript &bull; Mentor de Ventas</Text>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerDate}>
              FECHA: {new Date().toLocaleDateString('es-PE')}
            </Text>
            <Link src="https://hugoherreracoach.com" style={styles.headerUrl}>
              hugoherreracoach.com
            </Link>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.docTitle}>Guion de Ventas de Alto Impacto</Text>
        <Text style={styles.docSubtitle}>Workbook de Prospección y Cierre</Text>

        {/* Metadata */}
        <View style={styles.metaContainer}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Empresa:</Text>
            <Text style={styles.metaValue}>{company || 'N/A'}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Producto/Servicio:</Text>
            <Text style={styles.metaValue}>{product || 'N/A'}</Text>
          </View>
        </View>

        {/* Dialog / Script Lines */}
        <View style={styles.dialogContainer}>
          {lines.map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            // Limpiar de asteriscos para el chequeo del rol en PDF
            const cleanLine = trimmed.replace(/\*/g, '').trim();

            if (cleanLine.startsWith('Asesor:')) {
              hasDialogStarted = true;
              const content = cleanLine.substring(7).trim();
              return (
                <View key={idx} style={styles.advisorBlock} wrap={false}>
                  <Text style={[styles.roleLabel, styles.roleLabelAdvisor]}>Asesor</Text>
                  <Text style={styles.dialogContent}>{content}</Text>
                </View>
              );
            } else if (cleanLine.startsWith('Cliente:')) {
              hasDialogStarted = true;
              const content = cleanLine.substring(8).trim();
              return (
                <View key={idx} style={styles.clientBlock} wrap={false}>
                  <Text style={[styles.roleLabel, styles.roleLabelClient]}>Cliente</Text>
                  <Text style={styles.dialogContent}>{content}</Text>
                </View>
              );
            } else if (
              cleanLine.startsWith('Asesor (si') ||
              cleanLine.startsWith('Asesor(') ||
              cleanLine.startsWith('Asesor (en')
            ) {
              hasDialogStarted = true;
              return (
                <View key={idx} style={styles.noteBlock} wrap={false}>
                  <Text style={styles.dialogContent}>{cleanLine}</Text>
                </View>
              );
            }

            // Si es texto antes del diálogo, darle formato de introducción
            return (
              <Text key={idx} style={hasDialogStarted ? styles.generalText : styles.introText}>
                {cleanLine}
              </Text>
            );
          })}
        </View>

        {/* Call to Action for Cerrador Experto Book */}
        <View style={styles.ctaContainer} wrap={false}>
          <Text style={styles.ctaTitle}>¿Quieres dominar objeciones y cerrar el 80% de tus ventas?</Text>
          <Text style={styles.ctaText}>
            Consigue nuestro libro digital "Cerrador Experto" por solo $7 USD. Aprende las 139 respuestas exactas y probadas ante objeciones difíciles como "Está caro", "Déjame pensarlo" o "No tengo tiempo".
          </Text>
          <Link src="https://cerradorexperto.hugoherreracoach.com/" style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Obtener Libro por Solo $7 USD</Text>
          </Link>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Documento exclusivo para clientes de Hugo Herrera Coach. Prohibida su reproducción.
        </Text>
      </Page>
    </Document>
  );
};

export async function POST(req: NextRequest) {
  try {
    const { scriptText, company, product } = await req.json();

    if (!scriptText) {
      return NextResponse.json(
        { error: 'El texto del guion es requerido.' },
        { status: 400 }
      );
    }

    // Ubicar el logo de la firma
    const logoFile = path.join(process.cwd(), 'public/images/firma-logo.png');
    const logoExists = fs.existsSync(logoFile);
    const logoPath = logoExists ? logoFile : null;

    const pdfBuffer = await renderToBuffer(
      <ScriptPdfDocument
        scriptText={scriptText}
        company={company}
        product={product}
        logoPath={logoPath}
      />
    );

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="guion_ventas_${(company || 'TotalScript').replace(/\s+/g, '_')}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error('Error generando PDF de TotalScript:', error);
    return NextResponse.json(
      { error: error.message || 'Error al generar el PDF.' },
      { status: 500 }
    );
  }
}
