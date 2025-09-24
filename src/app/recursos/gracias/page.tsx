'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';

function GraciasContent() {
    const searchParams = useSearchParams();
    const recurso = searchParams.get('recurso');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedName = sessionStorage.getItem('leadName');
        const storedEmail = sessionStorage.getItem('leadEmail');

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const resourceNames: { [key: string]: string } = {
        objeciones: 'Mapa Definitivo de Objeciones',
        preguntas: 'Guion de 50 Preguntas Estratégicas',
        radiografia: 'Radiografía de tu Sistema Comercial',
        capacitacion: 'Sistema de Capacitación de 30 Días',
        seguimiento: 'Plantillas de Seguimiento por WhatsApp'
    };

    const contenidoVendedor = {
        puente: 'La herramienta que vas a recibir te ayudará a ganar batallas individuales. Pero para ganar la guerra de las comisiones, necesitas un arsenal completo, no solo una navaja.',
        ctaTitulo: 'El Siguiente Paso Lógico: El Sistema Completo',
        ctaBotonTexto: 'Conocer el Programa "Lobos de Ventas"',
        ctaEnlace: 'https://lobosdeventas.hugoherreracoach.com/'
    };

    const contenidoDueño = {
        puente: 'La herramienta que está en camino te da una solución específica. Pero las soluciones aisladas no escalan negocios; los sistemas completos, sí. El siguiente paso es diseñar la arquitectura completa.',
        ctaTitulo: '¿Viste el Problema? Ahora Construyamos la Solución',
        ctaBotonTexto: 'Agendar Sesión Estratégica Gratuita',
        ctaEnlace: 'https://calendly.com/hugoherrera-coach/agendar-videollamada'
    };

    const esVendedor = recurso === 'objeciones' || recurso === 'preguntas'|| recurso === 'seguimiento';
    const contenido = esVendedor ? contenidoVendedor : contenidoDueño;
    const nombreRecurso = resourceNames[recurso || ''] || 'recurso';

    return (
        <div className="bg-slate-900 text-white min-h-screen flex items-center">
            <div className="container mx-auto max-w-5xl px-4 py-16 text-center">

                {/* --- PASO 1: CONFIRMACIÓN Y CONFIANZA --- */}
                <div className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                        ¡Listo, {name || 'crack'}! Tu <span className="text-blue-600">{nombreRecurso}</span> está en camino.
                    </h1>
                    {/* --- LÍNEA ACTUALIZADA CON TU SUGERENCIA --- */}
                    <p className="mt-4 text-xl lg:text-2xl text-slate-300">
                        He enviado el acceso a tu correo: <strong className="text-slate-100">{email || 'que registraste'}</strong>.
                        <br />Si no lo ves en 2 minutos, busca en la carpeta de <strong>Promociones</strong> o <strong>Spam</strong>.
                    </p>
                    {/* ----------------------------------------- */}
                </div>

                <div className="my-12 border-t border-slate-700"></div>

                {/* --- PASO 2: EL PUENTE --- */}
                <div className="mb-12">
                    <h2 className="text-2xl lg:text-3xl font-semibold text-slate-200 text-balance">
                        Mientras esperas, lee esto. Es importante.
                    </h2>
                    <p className="mt-4 text-xl lg:text-2xl mx-auto text-slate-300 text-balance">
                        {contenido.puente}
                    </p>
                </div>

                {/* --- PASO 3: EL PIVOTE ESTRATÉGICO --- */}
                <div>
                    <h3 className="text-xl font-bold tracking-tight text-white">
                        {contenido.ctaTitulo}
                    </h3>
                    <Link
                        href={contenido.ctaEnlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 text-lg lg:text-xl font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
                    >
                        {contenido.ctaBotonTexto}
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default function GraciasPage() {
    return (
        <Suspense fallback={<div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">Cargando...</div>}>
            <GraciasContent />
        </Suspense>
    );
}