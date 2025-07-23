'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { User, LayoutDashboard } from 'lucide-react';

export const SolutionSection: FC = () => {
  const [isArchitect, setIsArchitect] = useState<boolean>(false);
  // NUEVO: Estado para controlar si el switch ya fue presionado al menos una vez.
  const [hasBeenClicked, setHasBeenClicked] = useState<boolean>(false);

  const toggleState = (): void => {
    // CAMBIO: Se actualiza el estado principal y se asegura que el estado `hasBeenClicked` se establezca en true solo una vez.
    if (!hasBeenClicked) {
      setHasBeenClicked(true);
    }
    setIsArchitect(prevState => !prevState);
  };

  return (
    <section 
      className="w-full px-4 md:px-20 py-0 bg-[linear-gradient(to_bottom,theme(colors.slate.50)_50%,theme(colors.black)_50%)]"
      id="como-funciona"
    >
      <div className={`
        relative mx-auto max-w-7xl overflow-hidden rounded-3xl shadow-2xl border
        transition-all duration-500 ease-in-out
        ${isArchitect
          ? 'border-blue-700 bg-[radial-gradient(ellipse_at_center,rgba(10,74,252,0.15),transparent_80%)] bg-slate-900' 
          : 'border-slate-700 bg-slate-900'
        }
      `}>
        
        <div className="flex flex-col items-center gap-y-6 lg:gap-y-10 p-6 py-12 text-center lg:p-20">

          <div className="flex flex-col items-center gap-y-4">
            <button
              onClick={toggleState}
              aria-label={`Cambiar a vista de ${isArchitect ? 'Operador' : 'Arquitecto'}`}
              className={`
                group relative flex h-16 w-40 cursor-pointer items-center rounded-full p-1 shadow-inner 
                transition-all duration-300 hover:border-slate-500 active:scale-95
                ${isArchitect ? 'border-blue-800 bg-slate-900' : 'border-slate-700 bg-slate-800'}
              `}
            >
              {/* CAMBIO: El pulso solo se renderiza si el botón nunca ha sido presionado. */}
              {!hasBeenClicked && (
                <span className="absolute left-1 top-1 h-14 w-14 rounded-full bg-blue-500/50 animate-ping opacity-75"></span>
              )}
              
              {/* ELIMINADO: Se quitaron los spans con texto "Operador" y "Arquitecto" del interior del switch. */}

              <div
                className={`
                  absolute flex h-14 w-14 items-center justify-center rounded-full shadow-lg 
                  transition-all duration-300 ease-in-out
                  ${isArchitect 
                    ? 'translate-x-[96px] bg-blue-600 group-hover:translate-x-[90px]' 
                    : 'translate-x-0 bg-white group-hover:translate-x-1'
                  }
                `}
              >
                <div className="relative h-7 w-7">
                  <User 
                    className={`absolute inset-0 m-auto text-slate-700 transition-all duration-300 ease-in-out ${isArchitect ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
                    aria-hidden="true"
                  />
                  <LayoutDashboard 
                    className={`absolute inset-0 m-auto text-white transition-all duration-300 ease-in-out ${isArchitect ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                    aria-hidden="true" 
                  />
                </div>
              </div>
            </button>
            <div className="relative h-8 flex items-center">
              <span className={`transition-all duration-300 ease-in-out whitespace-nowrap ${isArchitect ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'} text-base lg:text-xl font-semibold text-slate-400`}>
                Rol: Operador
              </span>
              <span className={`absolute left-0 right-0 mx-auto transition-all duration-300 ease-in-out whitespace-nowrap ${isArchitect ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} text-base lg:text-xl font-semibold text-blue-400`}>
                Rol: Arquitecto
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 lg:gap-y-6">
            <div className="relative flex h-28 items-center justify-center overflow-hidden lg:h-28">
              <h2 className={`absolute px-4 text-3xl font-bold tracking-tight text-slate-200 lg:text-5xl text-balance transition-all duration-500 ease-in-out ${isArchitect ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}>
                Atrapado siendo el operador principal de tu negocio.
              </h2>
              <h2 className={`absolute px-4 text-3xl font-bold tracking-tight text-blue-500 lg:text-5xl text-balance transition-all duration-500 ease-in-out ${isArchitect ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                Conviértete en el arquitecto de tu crecimiento.
              </h2>
            </div>

            <p className="text-xl lg:text-2xl leading-[1.4] lg:leading-[1.6] text-slate-300 text-balance">
              La Implementación &quot;Líder Experto&quot; no es un curso, es la construcción de tu motor comercial. Durante 8 semanas, trabajo directamente contigo para diseñar e instalar una estructura de ventas a medida.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};