// src/components/ui/OneClickButton.tsx

"use client";

import { LoaderCircle, Zap, Lock } from 'lucide-react'; // -> Iconos más persuasivos

type OneClickButtonProps = {
    isPending: boolean;
    cardInfo: string; // ej: "VISA **** 4242"
};

export function OneClickButton({ isPending, cardInfo }: OneClickButtonProps) {
    return (
        <button
            type="submit"
            disabled={isPending}
            className="group w-full cursor-pointer rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-70 disabled:scale-100"
        >
            <div className="flex flex-col items-center justify-center p-4 text-center">
                {isPending ? (
                    <div className="flex h-[68px] items-center justify-center gap-3">
                        <LoaderCircle className="h-8 w-8 animate-spin" />
                        <span className="text-2xl font-bold tracking-wide">PROCESANDO...</span>
                    </div>
                ) : (
                    <>
                        {/* -> Parte Superior: La Acción Principal */}
                        <div className="flex items-center gap-3">
                            <Zap className="h-8 w-8 transition-transform group-hover:rotate-[-15deg] group-hover:scale-125" />
                            <span className="text-2xl font-bold leading-tight tracking-wide">
                                Sí, ¡Añadir con 1-Clic!
                            </span>
                        </div>

                        {/* -> Parte Inferior: Reafirmación de Seguridad */}
                        <div className="mt-2 flex items-center gap-2 rounded-full bg-black/20 px-3 py-1">
                            <Lock className="h-4 w-4 text-emerald-200" />
                            <p className="text-sm font-semibold text-emerald-100">
                                Pago seguro a tu {cardInfo}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </button>
    );
}