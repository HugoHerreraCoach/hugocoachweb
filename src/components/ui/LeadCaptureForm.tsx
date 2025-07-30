'use client';

// Este es un formulario del lado del cliente para interactividad
export const LeadCaptureForm = ({ ctaText }: { ctaText: string }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Aquí va la lógica para enviar los datos a Brevo.
        // 1. Recoger los datos del formulario (nombre y correo).
        // 2. Enviar a un endpoint de tu API o directamente a Brevo si se usa su API de cliente.
        // 3. Al recibir respuesta exitosa, redirigir a la página de gracias:
        //    window.location.href = '/recursos/gracias';
        console.log('Formulario enviado. Redirigiendo...');
        alert('¡Gracias! Revisa tu correo para descargar el recurso.');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
                <label htmlFor="name" className="sr-only">Nombre</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Tu nombre"
                    className="w-full rounded-md border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="email" className="sr-only">Correo Electrónico</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Tu correo electrónico"
                    className="w-full rounded-md border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {ctaText}
            </button>
        </form>
    );
};