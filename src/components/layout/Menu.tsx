//src/components/layout/Menu.tsx

"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu as MenuIcon } from 'lucide-react';
import { LLAMADA_GRATIS_URL } from '@/lib/servicios';
import { navPrincipal, type ColumnaMenu, type EnlaceNav, type ItemNav } from '@/lib/navegacion';
import MenuMovil from '@/components/layout/MenuMovil';

/** Tiempo de gracia al sacar el mouse, para poder cruzar en diagonal hacia el panel. */
const RETRASO_CIERRE_MS = 150;

// --- Una fila de enlace: nombre y, si hay, una línea de apoyo. El destacado lleva barra y fondo azul. ---

interface FilaEnlaceProps {
  enlace: EnlaceNav;
  onNavegar: () => void;
}

function FilaEnlace({ enlace, onNavegar }: FilaEnlaceProps) {
  return (
    <Link
      href={enlace.href}
      target={enlace.externo ? '_blank' : undefined}
      rel={enlace.externo ? 'noopener noreferrer' : undefined}
      onClick={onNavegar}
      className={`group/fila block rounded-lg border-l-2 transition-colors focus-visible:bg-white/5 ${
        enlace.destacado
          ? 'border-[#0a4afc] bg-[#0a4afc]/10 hover:bg-[#0a4afc]/15'
          : 'border-transparent hover:bg-white/5'
      } px-3 py-2.5`}
    >
      <span className="flex items-center gap-1.5 font-semibold text-white">
        {enlace.etiqueta}
        {enlace.externo && <ArrowUpRight size={14} className="text-slate-500 group-hover/fila:text-[#4d8bff]" aria-hidden="true" />}
      </span>
      {enlace.descripcion && <span className="mt-0.5 block text-sm leading-snug text-slate-400">{enlace.descripcion}</span>}
    </Link>
  );
}

// --- Una columna de desplegable de escritorio: título, filas y un enlace discreto al final ---

interface PanelColumnaProps {
  columna: ColumnaMenu;
  onNavegar: () => void;
  /** Primera columna de un panel de dos: lleva el enlace de cierre en azul. */
  principal?: boolean;
  /** Segunda columna: fondo apenas más claro y línea divisoria a la izquierda. */
  secundaria?: boolean;
}

function PanelColumna({ columna, onNavegar, principal = true, secundaria = false }: PanelColumnaProps) {
  return (
    <div className={`p-2 ${secundaria ? 'border-l border-slate-800 bg-slate-950' : ''}`}>
      {columna.titulo && (
        <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">{columna.titulo}</p>
      )}
      <ul className="space-y-0.5">
        {columna.enlaces.map((enlace) => (
          <li key={enlace.etiqueta}>
            <FilaEnlace enlace={enlace} onNavegar={onNavegar} />
          </li>
        ))}
      </ul>
      {columna.pie && (
        <div className="mt-2 border-t border-slate-800 pt-2">
          <Link
            href={columna.pie.href}
            onClick={onNavegar}
            className={`group/pie flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/5 ${
              principal ? 'text-[#4d8bff] hover:text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {columna.pie.etiqueta}
            <ArrowRight size={14} className="transition-transform group-hover/pie:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Menu() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState<string | null>(null);
  const [movilAbierto, setMovilAbierto] = useState<boolean>(false);
  const botonMenuRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const ultimoPuntero = useRef<string>('mouse');
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  const limpiarTemporizador = (): void => {
    if (temporizador.current) {
      clearTimeout(temporizador.current);
      temporizador.current = null;
    }
  };

  const abrir = (etiqueta: string): void => {
    limpiarTemporizador();
    setAbierto(etiqueta);
  };

  const cerrarConRetraso = (): void => {
    limpiarTemporizador();
    temporizador.current = setTimeout(() => setAbierto(null), RETRASO_CIERRE_MS);
  };

  const cerrarTodo = (): void => {
    limpiarTemporizador();
    setAbierto(null);
    setMovilAbierto(false);
  };

  // Escape cierra; un clic fuera del encabezado cierra los paneles de escritorio.
  useEffect(() => {
    const alTeclear = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setAbierto(null);
        setMovilAbierto(false);
      }
    };
    const alHacerClic = (e: MouseEvent): void => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setAbierto(null);
    };
    document.addEventListener('keydown', alTeclear);
    document.addEventListener('mousedown', alHacerClic);
    return () => {
      document.removeEventListener('keydown', alTeclear);
      document.removeEventListener('mousedown', alHacerClic);
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, []);

  // Con el menú móvil abierto, la página de atrás no se desplaza.
  useEffect(() => {
    document.body.style.overflow = movilAbierto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [movilAbierto]);

  const estaActivo = (item: ItemNav): boolean =>
    (item.activoEn ?? []).some((ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`));

  const alTocarDisparador = (etiqueta: string): void => {
    // Con mouse el panel ya se abre al pasar; con toque, el segundo toque lo cierra.
    setAbierto((actual) => (actual === etiqueta && ultimoPuntero.current !== 'mouse' ? null : etiqueta));
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-slate-800 bg-black text-white">
      <div className="container mx-auto flex h-16 items-stretch justify-between px-4 lg:h-[72px] lg:px-8">
        <Link href="/" className="flex items-center text-xl font-bold uppercase tracking-wider lg:text-2xl" onClick={cerrarTodo}>
          HUGO HERRERA
        </Link>

        {/* --- ESCRITORIO --- */}
        <nav className="hidden items-stretch lg:flex" aria-label="Principal">
          {navPrincipal.map((item) => {
            const activo = estaActivo(item);
            const estiloBase = `flex h-full items-center gap-1.5 border-b-2 px-3 text-[15px] font-medium transition-colors xl:px-4 ${
              activo ? 'border-[#0a4afc] text-white' : 'border-transparent text-slate-300 hover:text-white'
            }`;

            if (item.tipo === 'enlace' && item.href) {
              return (
                <Link
                  key={item.etiqueta}
                  href={item.href}
                  target={item.externo ? '_blank' : undefined}
                  rel={item.externo ? 'noopener noreferrer' : undefined}
                  aria-current={activo ? 'page' : undefined}
                  className={estiloBase}
                >
                  {item.etiqueta}
                  {item.externo && <ArrowUpRight size={13} className="text-slate-500" aria-hidden="true" />}
                </Link>
              );
            }

            const estaAbierto = abierto === item.etiqueta;
            const columnas = item.columnas ?? [];
            const dosColumnas = columnas.length > 1;

            return (
              <div
                key={item.etiqueta}
                className="relative flex"
                onPointerEnter={(e) => e.pointerType === 'mouse' && abrir(item.etiqueta)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && cerrarConRetraso()}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setAbierto((actual) => (actual === item.etiqueta ? null : actual));
                  }
                }}
              >
                <button
                  type="button"
                  aria-expanded={estaAbierto}
                  aria-haspopup="true"
                  onPointerDown={(e) => (ultimoPuntero.current = e.pointerType)}
                  onClick={() => alTocarDisparador(item.etiqueta)}
                  className={estiloBase}
                >
                  {item.etiqueta}
                  <ChevronDown size={15} className={`transition-transform ${estaAbierto ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                {estaAbierto && columnas.length > 0 && (
                  <div
                    className={`menu-in absolute top-full ${item.alineacion === 'derecha' ? 'right-0' : 'left-0'} ${
                      dosColumnas ? 'w-[40rem] xl:w-[46rem]' : 'w-[24rem]'
                    }`}
                  >
                    <div
                      className={`grid overflow-hidden rounded-b-xl border border-t-0 border-slate-800 bg-black shadow-2xl shadow-black/70 ${
                        dosColumnas ? 'grid-cols-2' : ''
                      }`}
                    >
                      {columnas.map((columna, indice) => (
                        <PanelColumna
                          key={columna.titulo ?? item.etiqueta}
                          columna={columna}
                          onNavegar={cerrarTodo}
                          principal={indice === 0}
                          secundaria={indice > 0}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href={LLAMADA_GRATIS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-lg bg-[#0a4afc] px-4 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b3ccf] active:scale-[0.98] xl:px-5"
          >
            Llamada gratis<span className="hidden xl:inline"> de 20 min</span>
          </Link>
        </div>

        <div className="flex items-center lg:hidden">
          <button
            ref={botonMenuRef}
            type="button"
            onClick={() => setMovilAbierto(true)}
            aria-label="Abrir menú"
            aria-expanded={movilAbierto}
            aria-controls="menu-movil"
            aria-haspopup="dialog"
            className="-mr-2 flex h-11 w-11 items-center justify-center"
          >
            <MenuIcon size={28} />
          </button>
        </div>
      </div>

      <MenuMovil abierto={movilAbierto} onCerrar={() => setMovilAbierto(false)} disparadorRef={botonMenuRef} />
    </header>
  );
}
