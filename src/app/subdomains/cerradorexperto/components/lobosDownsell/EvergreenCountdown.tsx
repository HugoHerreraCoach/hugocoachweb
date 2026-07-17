'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';

// --- Constantes y Tipos ---
const OTO_STORAGE_KEY = 'hugoherreracoach_oto_targetDate_v1';
const OFFER_DURATION_IN_MINUTES = 30;

type TimeLeft = {
    días: number;
    horas: number;
    minutos: number;
    segundos: number;
};

// --- Lógica Pura (Helper Function) ---
const calculateTimeLeft = (targetDate: string): TimeLeft | null => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference > 0) {
        return {
            días: Math.floor(difference / (1000 * 60 * 60 * 24)),
            horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutos: Math.floor((difference / 1000 / 60) % 60),
            segundos: Math.floor((difference / 1000) % 60),
        };
    }
    return null;
};

// --- El Componente Unificado ---
const EvergreenCountdown: FC = () => {
    // Estado para la fecha de finalización (de la lógica del wrapper)
    const [targetDate, setTargetDate] = useState<string | null>(null);
    // Estado para el tiempo restante (de la lógica del timer)
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    // Efecto #1: Manejar localStorage para obtener/establecer la fecha objetivo (se ejecuta una sola vez)
    useEffect(() => {
        const storedTargetDate = localStorage.getItem(OTO_STORAGE_KEY);
        if (storedTargetDate) {
            setTargetDate(storedTargetDate);
        } else {
            const newTargetDate = new Date();
            newTargetDate.setMinutes(newTargetDate.getMinutes() + OFFER_DURATION_IN_MINUTES);
            const newTargetDateString = newTargetDate.toISOString();
            localStorage.setItem(OTO_STORAGE_KEY, newTargetDateString);
            setTargetDate(newTargetDateString);
        }
    }, []);

    // Efecto #2: Iniciar el intervalo del temporizador una vez que tenemos una fecha objetivo
    useEffect(() => {
        // No hacer nada si aún no tenemos una fecha
        if (!targetDate) return;

        // Calcular el tiempo inicial al cargar
        setTimeLeft(calculateTimeLeft(targetDate));

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
        return () => clearInterval(timer);
    }, [targetDate]); // Este efecto depende de `targetDate`

    // --- Renderizado Condicional ---

    // 1. Estado de Carga: Aún no hemos determinado la fecha desde localStorage
    if (targetDate === null) {
        return <div className="h-[124px] w-full animate-pulse rounded-lg bg-slate-800/50"></div>;
    }

    // 2. Estado Finalizado: El tiempo se ha acabado
    if (!timeLeft) {
        return (
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-red-500 tracking-wide uppercase">Oferta Expirada</h2>
                <p className="text-slate-400 mt-1 mb-6">Lamentablemente, esta oportunidad única ha terminado.</p>
            </div>
        );
    }

    // 3. Estado Activo: Mostrando el contador
    const timeEntries = Object.entries(timeLeft) as [keyof TimeLeft, number][];
    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 tracking-wide uppercase">Oferta Única y Exclusiva</h2>
            <p className="text-slate-300 mt-1 mb-6">Tu acceso especial a esta oferta termina en:</p>

            {/* Visualización del temporizador */}
            <div className="flex justify-center items-center gap-2 sm:gap-4">
                {timeEntries.map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                        <div className="text-2xl sm:text-4xl font-bold text-white bg-slate-800/50 border border-slate-700 rounded-lg w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center">
                            {String(value).padStart(2, '0')}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-400 mt-2 uppercase tracking-wider">{unit}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EvergreenCountdown;