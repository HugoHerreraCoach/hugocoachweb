"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

export default function WaitingListForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const phoneRegex = /^\d{9}$/;
        if (!firstName || !lastName || !email || !phone || !phoneRegex.test(phone)) {
            setStatus('error');
            if (!phoneRegex.test(phone) && phone) {
                setMessage('El celular debe tener 9 dígitos.');
            } else {
                setMessage('Por favor, completa todos los campos.');
            }
            return;
        }
        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    sms: `+51${phone}`,
                    isBasicData: true, // Usamos el mismo flag que el formulario de checkout
                }),
            });

            if (!response.ok) {
                throw new Error('Hubo un problema al registrarte. Inténtalo de nuevo.');
            }
            setStatus('success');

        } catch (error) {
            setStatus('error');
            if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage('Ocurrió un error inesperado.');
            }
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-green-500">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Estás en la lista!</h3>
                <p className="text-gray-600 font-montserrat">
                    Gracias por tu interés. Te avisaremos por correo y WhatsApp en cuanto el libro Líder Experto esté disponible nuevamente.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-[#F3F3F3] p-6 rounded-lg shadow-md border-t-4 border-gray-400">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                        <label htmlFor="firstName" className="block text-sm font-montserrat font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="Ej: Juan"
                            disabled={status === 'loading'}
                        />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label htmlFor="lastName" className="block text-sm font-montserrat font-medium text-gray-700 mb-1">Apellidos</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="Ej: Pérez"
                            disabled={status === 'loading'}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-montserrat font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="tu@correo.com"
                        disabled={status === 'loading'}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-montserrat font-medium text-gray-700 mb-1">Celular (WhatsApp)</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500">+51</span>
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value.replace(/\D/g, ''))}
                            className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="987 654 321"
                            maxLength={9}
                            disabled={status === 'loading'}
                        />
                    </div>
                </div>
                {status === 'error' && message && (
                    <div className="flex items-center text-red-600 text-sm font-medium">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <p>{message}</p>
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 flex items-center justify-center transition-colors duration-300 text-lg font-montserrat"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        '¡AVÍSENME CUANDO HAYA STOCK!'
                    )}
                </button>
            </form>
        </div>
    );
}