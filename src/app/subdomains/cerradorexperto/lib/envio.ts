// src/app/subdomains/cerradorexperto/lib/envio.ts
// Datos de envío del libro físico.

export const DEPARTAMENTOS_PERU = [
  "Amazonas", "Ancash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca",
  "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín",
  "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua",
  "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali",
] as const;

export interface DatosEnvio {
  nombre: string;
  telefono: string;
  dni: string;
  departamento: string;
  distrito: string;
  direccion: string;
  referencia?: string;
}

/** Campos sin los cuales el courier no puede entregar. */
export const CAMPOS_OBLIGATORIOS: (keyof DatosEnvio)[] = [
  "nombre", "telefono", "dni", "departamento", "distrito", "direccion",
];

export function validarEnvio(d: Partial<DatosEnvio>): string | null {
  for (const campo of CAMPOS_OBLIGATORIOS) {
    if (!d[campo] || String(d[campo]).trim().length < 2) {
      return `Falta completar: ${campo}`;
    }
  }
  if (!/^\d{8}$/.test(String(d.dni).trim())) return "El DNI debe tener 8 dígitos.";
  if (String(d.telefono).replace(/\D/g, "").length < 9) return "El teléfono debe tener al menos 9 dígitos.";
  return null;
}
