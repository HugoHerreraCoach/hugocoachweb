"use client";

// src/components/layout/MenuMovil.tsx
// Menú de pantalla completa para móvil. Lee la misma navegación que el de escritorio (`navegacion.ts`).
// Los ítems con varias columnas (Servicios) se muestran como tarjetas con acordeón bajo su propia etiqueta.

import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight, ChevronDown, MessageCircle, X } from 'lucide-react';
import { LLAMADA_GRATIS_URL, WHATSAPP_URL } from '@/lib/servicios';
import { navPrincipal, type ColumnaMenu, type EnlaceNav, type ItemNav } from '@/lib/navegacion';

const ACORDEON_INICIAL = 'Para empresas y equipos';

const conGrupos = navPrincipal.filter((item) => (item.columnas?.length ?? 0) > 1);
const sencillos = navPrincipal.filter((item) => (item.columnas?.length ?? 0) <= 1);

interface MenuMovilProps {
  abierto: boolean;
  onCerrar: () => void;
  /** Botón que abrió el menú: recibe el foco al cerrar. */
  disparadorRef: RefObject<HTMLButtonElement | null>;
}

// --- Una fila de enlace: nombre, línea de apoyo y, si es el destacado, su insignia ---

function FilaMovil({ enlace, onNavegar }: { enlace: EnlaceNav; onNavegar: () => void }) {
  return (
    <Link
      href={enlace.href}
      target={enlace.externo ? '_blank' : undefined}
      rel={enlace.externo ? 'noopener noreferrer' : undefined}
      onClick={onNavegar}
      className={`relative block min-h-[56px] rounded-xl px-3 py-2.5 transition-colors active:bg-white/10 ${
        enlace.destacado ? 'bg-[#0a4afc]/15 ring-1 ring-inset ring-[#0a4afc]/50' : ''
      }`}
    >
      {enlace.insignia && (
        <span className="absolute -top-2.5 right-3 rounded-full bg-[#0a4afc] px-2.5 py-0.5 text-[11px] font-semibold text-white">
          {enlace.insignia}
        </span>
      )}
      <span className="flex items-center gap-1.5 text-[17px] font-semibold leading-tight text-white">
        {enlace.etiqueta}
        {enlace.externo && <ArrowUpRight size={15} className="text-slate-500" aria-hidden="true" />}
      </span>
      {enlace.descripcion && <span className="mt-0.5 block text-sm leading-snug text-slate-400">{enlace.descripcion}</span>}
    </Link>
  );
}

// --- Acordeón: el contenido sigue en el DOM pero con `inert` cuando está cerrado (no se enfoca ni se lee) ---

interface AcordeonProps {
  id: string;
  titulo: string;
  columna: ColumnaMenu;
  abierto: boolean;
  activo: boolean;
  tarjeta: boolean;
  onAlternar: () => void;
  onNavegar: () => void;
}

function Acordeon({ id, titulo, columna, abierto, activo, tarjeta, onAlternar, onNavegar }: AcordeonProps) {
  return (
    <div className={tarjeta ? 'rounded-2xl border border-slate-800 bg-slate-900/50' : ''}>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={onAlternar}
        className={`flex min-h-[56px] w-full items-center justify-between gap-3 text-left text-lg font-semibold text-white ${
          tarjeta ? 'px-4' : ''
        }`}
      >
        <span className="flex items-center gap-2">
          {titulo}
          {activo && <span className="h-1.5 w-1.5 rounded-full bg-[#4d8bff]" aria-label="Sección actual" />}
        </span>
        <ChevronDown
          size={22}
          className={`flex-shrink-0 text-slate-400 transition-transform duration-200 motion-reduce:transition-none ${
            abierto ? 'rotate-180 text-[#4d8bff]' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={id}
        inert={!abierto}
        className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
          abierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <ul className={`space-y-1 ${tarjeta ? 'px-2 pt-3' : ''}`}>
            {columna.enlaces.map((enlace) => (
              <li key={enlace.etiqueta}>
                <FilaMovil enlace={enlace} onNavegar={onNavegar} />
              </li>
            ))}
          </ul>
          {columna.pie && (
            <Link
              href={columna.pie.href}
              onClick={onNavegar}
              className={`mt-1 flex min-h-[48px] items-center gap-1.5 text-base font-semibold text-[#4d8bff] ${
                tarjeta ? 'px-5 pb-1' : 'px-3'
              }`}
            >
              {columna.pie.etiqueta}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MenuMovil({ abierto, onCerrar, disparadorRef }: MenuMovilProps) {
  const pathname = usePathname();
  const [acordeonAbierto, setAcordeonAbierto] = useState<string | null>(ACORDEON_INICIAL);
  const raizRef = useRef<HTMLDivElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const rutaAnterior = useRef(pathname);
  const estabaAbierto = useRef(false);

  const estaActivo = (item: ItemNav): boolean =>
    (item.activoEn ?? []).some((ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`));

  // Al abrir, el foco pasa al botón de cerrar; al cerrar, vuelve al botón que abrió el menú.
  useEffect(() => {
    let temporizador: ReturnType<typeof setTimeout> | undefined;
    if (abierto) {
      // Se espera un instante a que el panel deje de ser `inert` y empiece a deslizarse antes de enfocarlo.
      temporizador = setTimeout(() => cerrarRef.current?.focus({ preventScroll: true }), 60);
    } else if (estabaAbierto.current) {
      disparadorRef.current?.focus({ preventScroll: true });
    }
    estabaAbierto.current = abierto;
    return () => clearTimeout(temporizador);
  }, [abierto, disparadorRef]);

  // Si la ruta cambia (por ejemplo con "atrás"), el menú se cierra solo.
  useEffect(() => {
    if (rutaAnterior.current !== pathname) {
      rutaAnterior.current = pathname;
      onCerrar();
    }
  }, [pathname, onCerrar]);

  // El foco no se escapa del menú con Tab.
  const alTeclear = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key !== 'Tab') return;
    const enfocables = Array.from(raizRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []).filter(
      (el) => !el.closest('[inert]'),
    );
    if (enfocables.length === 0) return;
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    if (e.shiftKey && document.activeElement === primero) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  };

  return (
    <div
      ref={raizRef}
      id="menu-movil"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      aria-hidden={!abierto}
      inert={!abierto}
      onKeyDown={alTeclear}
      className={`fixed inset-0 z-[60] flex flex-col bg-black text-white transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
        abierto ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-800 px-4">
        <Link href="/" className="text-xl font-bold uppercase tracking-wider" onClick={onCerrar}>
          HUGO HERRERA
        </Link>
        <button ref={cerrarRef} type="button" onClick={onCerrar} aria-label="Cerrar menú" className="-mr-2 flex h-11 w-11 items-center justify-center">
          <X size={28} />
        </button>
      </div>

      <nav className="flex-grow overflow-y-auto overscroll-contain px-4 pb-6 pt-5" aria-label="Principal móvil">
        {conGrupos.map((item) => (
          <section key={item.etiqueta} aria-label={item.etiqueta}>
            <p className="px-1 text-xs font-semibold uppercase tracking-widest text-slate-500">{item.etiqueta}</p>
            <div className="mt-3 space-y-3">
              {item.columnas?.map((columna, indice) => {
                const titulo = columna.titulo ?? item.etiqueta;
                return (
                  <Acordeon
                    key={titulo}
                    id={`acordeon-${item.etiqueta}-${indice}`.replace(/\s+/g, '-').toLowerCase()}
                    titulo={titulo}
                    columna={columna}
                    abierto={acordeonAbierto === titulo}
                    activo={false}
                    tarjeta
                    onAlternar={() => setAcordeonAbierto(acordeonAbierto === titulo ? null : titulo)}
                    onNavegar={onCerrar}
                  />
                );
              })}
            </div>
          </section>
        ))}

        <ul className="mt-6 divide-y divide-slate-800 border-y border-slate-800">
          {sencillos.map((item) => {
            const activo = estaActivo(item);
            if (item.tipo === 'enlace' && item.href) {
              return (
                <li key={item.etiqueta}>
                  <Link
                    href={item.href}
                    target={item.externo ? '_blank' : undefined}
                    rel={item.externo ? 'noopener noreferrer' : undefined}
                    onClick={onCerrar}
                    aria-current={activo ? 'page' : undefined}
                    className={`flex min-h-[56px] items-center justify-between text-lg font-semibold ${activo ? 'text-[#4d8bff]' : 'text-white'}`}
                  >
                    {item.etiqueta}
                    {item.externo ? (
                      <ArrowUpRight size={20} className="text-slate-500" aria-hidden="true" />
                    ) : (
                      <ArrowRight size={20} className="text-slate-500" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            }
            const columna = item.columnas?.[0];
            if (!columna) return null;
            return (
              <li key={item.etiqueta}>
                <Acordeon
                  id={`acordeon-${item.etiqueta}`.replace(/\s+/g, '-').toLowerCase()}
                  titulo={item.etiqueta}
                  columna={columna}
                  abierto={acordeonAbierto === item.etiqueta}
                  activo={activo}
                  tarjeta={false}
                  onAlternar={() => setAcordeonAbierto(acordeonAbierto === item.etiqueta ? null : item.etiqueta)}
                  onNavegar={onCerrar}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-shrink-0 items-center gap-3 border-t border-slate-800 bg-black px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        <Link
          href={LLAMADA_GRATIS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCerrar}
          className="flex min-h-[56px] flex-1 items-center justify-center rounded-xl bg-[#0a4afc] px-4 text-lg font-semibold text-white transition-colors active:scale-[0.98] active:bg-[#0b3ccf]"
        >
          Llamada gratis de 20 min
        </Link>
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCerrar}
          aria-label="Escríbeme por WhatsApp"
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-slate-600 text-white transition-colors active:bg-white/10"
        >
          <MessageCircle size={24} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
