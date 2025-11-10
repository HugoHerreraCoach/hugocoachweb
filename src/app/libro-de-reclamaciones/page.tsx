//src/app/libro-de-reclamaciones/page.tsx

'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reclamoSchema, ReclamoFormData } from '@/lib/schemas';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// ============ Form Controls Components ============
type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: FieldError | undefined;
};

type FormSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  error?: FieldError | undefined;
};

type FormTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  error?: FieldError | undefined;
};

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, error, className, ...props }, ref) => (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        ref={ref}
        {...props}
        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-2' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1'
        } ${className || ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-600 mt-1 flex items-center gap-1">
          <span>⚠️</span>
          <span>{error.message}</span>
        </p>
      )}
    </div>
  )
);
FormInput.displayName = 'FormInput';

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, name, error, children, className, ...props }, ref) => (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select 
        id={name} 
        name={name} 
        ref={ref} 
        {...props} 
        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-2' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1'
        } ${className || ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {children}
      </select>
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-600 mt-1 flex items-center gap-1">
          <span>⚠️</span>
          <span>{error.message}</span>
        </p>
      )}
    </div>
  )
);
FormSelect.displayName = 'FormSelect';

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, name, error, className, ...props }, ref) => (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        ref={ref}
        {...props}
        rows={4}
        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border resize-none ${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-2' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1'
        } ${className || ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-600 mt-1 flex items-center gap-1">
          <span>⚠️</span>
          <span>{error.message}</span>
        </p>
      )}
    </div>
  )
);
FormTextarea.displayName = 'FormTextarea';

// ============ Main Page Component ============
export default function LibroReclamacionesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [reclamoCode, setReclamoCode] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ReclamoFormData>({
        resolver: zodResolver(reclamoSchema),
        mode: 'onSubmit',
    });

    // Debug completo de errores
    React.useEffect(() => {
        console.log('📋 Estado de errores actualizado:', errors);
        console.log('📋 Cantidad de errores:', Object.keys(errors).length);
        if (Object.keys(errors).length > 0) {
            console.log('🔴 ERRORES DETECTADOS:');
            Object.entries(errors).forEach(([field, error]) => {
                console.log(`  - Campo: ${field}`, error);
            });
        }
    }, [errors]);

    type ApiSuccessResponse = {
        success: true;
        codigo: string;
    };

    type ApiErrorResponse = {
        message: string;
        errors?: unknown;
    };

    const onSubmit: SubmitHandler<ReclamoFormData> = async (data) => {
        setIsLoading(true);
        setIsSuccess(false);
        setServerError(null);
        setReclamoCode(null);

        try {
            const response = await fetch('/api/reclamacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result: ApiSuccessResponse | ApiErrorResponse = await response.json();

            if (!response.ok) {
                throw new Error((result as ApiErrorResponse).message || 'Error al enviar el reclamo.');
            }

            setIsSuccess(true);
            setReclamoCode((result as ApiSuccessResponse).codigo);
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError('Ocurrió un error inesperado.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="container mx-auto max-w-2xl px-6 py-16 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">Reclamo Registrado</h1>
                <p className="text-lg text-gray-700">Hemos recibido tu reclamo exitosamente.</p>
                <p className="text-lg mt-2 text-gray-900">
                    Tu código de seguimiento es: <strong>{reclamoCode}</strong>
                </p>
                <p className="mt-4 text-gray-600">
                    En breve, recibirás una copia de la Hoja de Reclamación en tu correo electrónico. Te daremos respuesta en el plazo legal correspondiente (15 días hábiles).
                </p>
                <Link href="/" className="mt-8 inline-block text-blue-600 hover:underline">
                    Volver al inicio
                </Link>
            </div>
        );
    }

    // Debug: Mostrar errores en consola
    if (Object.keys(errors).length > 0) {
        console.log('⚠️ Errores de validación activos:', Object.keys(errors).length);
    }

    return (
        <div className="bg-gray-50 py-12 min-h-screen">
            <div className="container mx-auto max-w-3xl px-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Libro de Reclamaciones</h1>
                <p className="mt-3 text-lg text-gray-600">
                    Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, esta institución cuenta con un Libro de Reclamaciones a tu disposición.
                </p>

                {/* Mostrar resumen de errores si existen */}
                {Object.keys(errors).length > 0 && (
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                                <h3 className="text-sm font-medium text-red-800">
                                    Por favor, corrige los siguientes errores:
                                </h3>
                                <ul className="mt-2 text-sm text-red-700 list-disc list-inside space-y-1">
                                    {Object.entries(errors).map(([key, error]) => (
                                        <li key={key}>{error?.message}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8" noValidate>
                    <fieldset className="bg-white p-6 shadow-sm rounded-md">
                        <legend className="text-xl font-semibold text-gray-900 mb-4">1. Identificación del Consumidor</legend>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                            <FormInput
                                label="Nombres"
                                {...register("nombres")}
                                error={errors.nombres}
                                autoComplete="given-name"
                            />
                            <FormInput
                                label="Apellido Paterno"
                                {...register("apellidoPaterno")}
                                error={errors.apellidoPaterno}
                                autoComplete="family-name"
                            />
                            <FormInput
                                label="Apellido Materno"
                                {...register("apellidoMaterno")}
                                error={errors.apellidoMaterno}
                                autoComplete="additional-name"
                            />
                            <FormInput
                                label="Email"
                                type="email"
                                {...register("email")}
                                error={errors.email}
                                autoComplete="email"
                            />
                            <FormSelect
                                label="Tipo de Documento"
                                {...register("tipoDocumento")}
                                error={errors.tipoDocumento}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="DNI">DNI</option>
                                <option value="CE">Carné de Extranjería</option>
                                <option value="RUC">RUC</option>
                                <option value="Pasaporte">Pasaporte</option>
                            </FormSelect>
                            <FormInput
                                label="Número de Documento"
                                {...register("numeroDocumento")}
                                error={errors.numeroDocumento}
                            />
                            <FormInput
                                label="Teléfono / Celular"
                                type="tel"
                                {...register("telefono")}
                                error={errors.telefono}
                                autoComplete="tel"
                            />
                            <div className="md:col-span-2">
                                <FormInput
                                    label="Domicilio"
                                    {...register("domicilio")}
                                    error={errors.domicilio}
                                    autoComplete="street-address"
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="bg-white p-6 shadow-sm rounded-md">
                        <legend className="text-xl font-semibold text-gray-900 mb-4">2. Identificación del Bien Contratado</legend>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                            <FormSelect
                                label="Tipo"
                                {...register("tipoBien")}
                                error={errors.tipoBien}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Producto">Producto (Libro, curso, etc.)</option>
                                <option value="Servicio">Servicio (Asesoría, etc.)</option>
                            </FormSelect>
                            <FormInput
                                label="Monto Reclamado (S/.) (Opcional)"
                                type="number"
                                step="0.01"
                                min="0"
                                {...register("montoReclamado")}
                                error={errors.montoReclamado}
                                placeholder="0.00"
                            />
                            <div className="md:col-span-2">
                                <FormInput
                                    label="Descripción del Producto o Servicio"
                                    {...register("descripcionBien")}
                                    error={errors.descripcionBien}
                                    placeholder="Ej: Asesoría comercial para empresas"
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="bg-white p-6 shadow-sm rounded-md">
                        <legend className="text-xl font-semibold text-gray-900 mb-4">3. Detalle de la Reclamación</legend>
                        <div className="mt-6 grid grid-cols-1 gap-y-5">
                            <FormSelect
                                label="Tipo de Reclamación"
                                {...register("tipoReclamacion")}
                                error={errors.tipoReclamacion}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Reclamo">Reclamo (Disconformidad con el producto o servicio)</option>
                                <option value="Queja">Queja (Malestar o descontento con la atención al público)</option>
                            </FormSelect>
                            <FormTextarea
                                label="Detalle del Reclamo o Queja"
                                {...register("detalleReclamo")}
                                error={errors.detalleReclamo}
                                placeholder="Describe qué sucedió..."
                            />
                            <FormTextarea
                                label="Pedido del Consumidor"
                                {...register("pedidoConsumidor")}
                                error={errors.pedidoConsumidor}
                                placeholder="Describe qué solicitas (Ej: devolución del dinero, etc.)"
                            />
                        </div>
                    </fieldset>

                    <div className="space-y-4">
                        {serverError && (
                            <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-100 border border-red-200" role="alert">
                                <AlertTriangle className="flex-shrink-0 inline w-5 h-5 mr-3" />
                                <span className="font-medium">{serverError}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || isSubmitting}
                            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                    Enviando...
                                </>
                            ) : (
                                'Enviar Reclamo'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}