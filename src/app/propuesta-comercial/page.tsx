import { DossierClient } from '@/components/dossier/DossierClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Propuesta Comercial | Hugo Herrera',
  description: 'Propuesta de Aceleración Comercial — Documento confidencial.',
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ empresa?: string }>;
}

export default async function PropuestaComercialPage({ searchParams }: Props) {
  const params = await searchParams;
  const empresa = params.empresa || '';

  return <DossierClient empresa={empresa} />;
}
