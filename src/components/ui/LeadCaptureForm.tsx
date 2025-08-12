// src/components/ui/LeadCaptureForm.tsx

'use client';

import { useState } from 'react';
import type { ResourceIdentifier, SubscribePayload } from '@/lib/types';

interface LeadCaptureFormProps {
    ctaText: string;
    resourceIdentifier: ResourceIdentifier;
}

export const LeadCaptureForm = ({ ctaText, resourceIdentifier }: LeadCaptureFormProps) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;

        const payload: SubscribePayload = {
            name,
            email,
            resource: resourceIdentifier,
        };

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Algo salió mal. Inténtalo de nuevo.');
            }
            
            setStatus('success');
            
            sessionStorage.setItem('leadName', name);
            sessionStorage.setItem('leadEmail', email);

            window.location.href = `/recursos/gracias?recurso=${resourceIdentifier}`;

        } catch (error: unknown) {
            setStatus('error');
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('Ocurrió un error inesperado.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
                <label htmlFor="name" className="sr-only">Nombre</label>
                <input type="text" name="name" id="name" required placeholder="Tu nombre" disabled={status === 'loading'} className="w-full rounded-md border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50" />
            </div>
            <div>
                <label htmlFor="email" className="sr-only">Correo Electrónico</label>
                <input type="email" name="email" id="email" required placeholder="Tu correo electrónico" disabled={status === 'loading'} className="w-full rounded-md border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50" />
            </div>
            <button type="submit" disabled={status === 'loading'} className="w-full rounded-md bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400">
                {status === 'loading' ? 'Procesando...' : ctaText}
            </button>
            {status === 'error' && <p className="text-red-600 text-center">{errorMessage}</p>}
        </form>
    );
};