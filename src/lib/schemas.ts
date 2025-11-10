// src/lib/schemas.ts
import { z } from 'zod';

// Esquema de validación para el Libro de Reclamaciones
export const reclamoSchema = z.object({
  // 1. Identificación del Consumidor
  tipoDocumento: z
    .string()
    .refine(
      (val) => val !== '' && ['DNI', 'CE', 'RUC', 'Pasaporte'].includes(val),
      { message: 'Debes seleccionar un tipo de documento.' }
    ),
  
  numeroDocumento: z
    .string()
    .refine((val) => val.length >= 8 && val.length <= 15, {
      message: 'El número de documento debe tener entre 8 y 15 caracteres.',
    }),
  
  nombres: z
    .string()
    .refine((val) => val.length >= 3, {
      message: 'Tu nombre debe tener al menos 3 caracteres.',
    }),
  
  apellidoPaterno: z
    .string()
    .refine((val) => val.length >= 3, {
      message: 'Tu apellido paterno debe tener al menos 3 caracteres.',
    }),
  
  apellidoMaterno: z
    .string()
    .refine((val) => val.length >= 3, {
      message: 'Tu apellido materno debe tener al menos 3 caracteres.',
    }),
  
  email: z
    .string()
    .min(1, 'Tu email es requerido.')
    .email('Tu email no es válido.'),
  
  telefono: z
    .string()
    .refine((val) => val.length >= 7 && val.length <= 15, {
      message: 'Tu teléfono debe tener entre 7 y 15 dígitos.',
    }),
  
  domicilio: z
    .string()
    .refine((val) => val.length >= 5, {
      message: 'Tu domicilio debe tener al menos 5 caracteres.',
    }),

  // 2. Identificación del Bien o Servicio
  tipoBien: z
    .string()
    .refine(
      (val) => val !== '' && ['Producto', 'Servicio'].includes(val),
      { message: 'Debes seleccionar si es un producto o servicio.' }
    ),
  
  montoReclamado: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) {
        return undefined;
      }
      const parsed = parseFloat(String(val));
      return isNaN(parsed) ? undefined : parsed;
    },
    z.number().min(0).optional()
  ),
  
  descripcionBien: z
    .string()
    .refine((val) => val.length >= 1, {
      message: 'La descripción del producto/servicio es requerida.',
    }),

  // 3. Detalle de la Reclamación
  tipoReclamacion: z
    .string()
    .refine(
      (val) => val !== '' && ['Reclamo', 'Queja'].includes(val),
      { message: 'Debes seleccionar si es un reclamo o una queja.' }
    ),
  
  detalleReclamo: z
    .string()
    .refine((val) => val.length >= 10, {
      message: 'El detalle del reclamo debe tener al menos 10 caracteres.',
    }),
  
  pedidoConsumidor: z
    .string()
    .refine((val) => val.length >= 10, {
      message: 'El pedido del consumidor debe tener al menos 10 caracteres.',
    }),
});

// Extraemos el tipo de TypeScript para usarlo en nuestros componentes
export type ReclamoFormData = z.infer<typeof reclamoSchema>;