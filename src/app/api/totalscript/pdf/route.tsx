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
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.5,
  },
  header: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#6366f1',
    borderBottomStyle: 'solid',
    paddingBottom: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    width: 140,
  },
  logoImage: {
    width: 120,
    height: 'auto',
  },
  logoFallbackText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  tagline: {
    fontSize: 8,
    color: '#64748b',
    marginTop: 2,
  },
  docTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e1b4b',
    textAlign: 'center',
    marginBottom: 10,
  },
  metaContainer: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  metaLabel: {
    fontWeight: 'bold',
    width: 85,
    color: '#475569',
  },
  metaValue: {
    flex: 1,
    color: '#0f172a',
  },
  dialogContainer: {
    marginTop: 10,
  },
  advisorBlock: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
    borderLeftStyle: 'solid',
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
  },
  clientBlock: {
    backgroundColor: '#ecfdf5',
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
    borderLeftStyle: 'solid',
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
  },
  noteBlock: {
    backgroundColor: '#f1f5f9',
    borderLeftWidth: 3,
    borderLeftColor: '#94a3b8',
    borderLeftStyle: 'solid',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
    fontStyle: 'italic',
    fontSize: 9,
  },
  generalText: {
    marginBottom: 8,
    paddingLeft: 10,
  },
  roleLabel: {
    fontWeight: 'bold',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  roleLabelAdvisor: {
    color: '#2563eb',
  },
  roleLabelClient: {
    color: '#059669',
  },
  ctaContainer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#f5f3ff',
    borderWidth: 1,
    borderColor: '#ddd6fe',
    borderRadius: 8,
    alignItems: 'center',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6d28d9',
    marginBottom: 4,
  },
  ctaText: {
    fontSize: 8.5,
    color: '#4c1d95',
    marginBottom: 10,
    maxWidth: '90%',
    lineHeight: 1.4,
  },
  ctaButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 6,
    textDecoration: 'none',
  },
  ctaButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 9,
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10,
    fontSize: 8,
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
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 8, color: '#94a3b8' }}>
              Fecha: {new Date().toLocaleDateString('es-PE')}
            </Text>
            <Text style={{ fontSize: 8, color: '#94a3b8', marginTop: 2 }}>
              hugoherreracoach.com
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.docTitle}>Guion de Ventas Persuasivo</Text>

        {/* Metadata */}
        <View style={styles.metaContainer}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Empresa:</Text>
            <Text style={styles.metaValue}>{company || 'N/A'}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Producto/Serv:</Text>
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
              const content = cleanLine.substring(7).trim();
              return (
                <View key={idx} style={styles.advisorBlock} wrap={false}>
                  <Text style={[styles.roleLabel, styles.roleLabelAdvisor]}>Asesor</Text>
                  <Text>{content}</Text>
                </View>
              );
            } else if (cleanLine.startsWith('Cliente:')) {
              const content = cleanLine.substring(8).trim();
              return (
                <View key={idx} style={styles.clientBlock} wrap={false}>
                  <Text style={[styles.roleLabel, styles.roleLabelClient]}>Cliente</Text>
                  <Text>{content}</Text>
                </View>
              );
            } else if (
              cleanLine.startsWith('Asesor (si') ||
              cleanLine.startsWith('Asesor(') ||
              cleanLine.startsWith('Asesor (en')
            ) {
              return (
                <View key={idx} style={styles.noteBlock} wrap={false}>
                  <Text>{cleanLine}</Text>
                </View>
              );
            }

            return (
              <Text key={idx} style={styles.generalText}>
                {trimmed}
              </Text>
            );
          })}
        </View>

        {/* Call to Action for Training */}
        <View style={styles.ctaContainer} wrap={false}>
          <Text style={styles.ctaTitle}>¿Quieres aprender a cerrar el 80% de tus ventas?</Text>
          <Text style={styles.ctaText}>
            Accede a nuestro entrenamiento comercial gratuito y descubre la metodología exacta de prospección y cierre que Hugo Herrera utiliza para escalar negocios.
          </Text>
          <Link src="https://hugoherreracoach.com/recursos/capacitacion" style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Ver Clase Gratuita</Text>
          </Link>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Documento generado por TotalScript de Hugo Herrera Coach. Reservados todos los derechos.
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
