"use client";

import { useEffect, useState } from "react";
import { Package, Check, LoaderCircle, AlertCircle } from "lucide-react";
import { DEPARTAMENTOS_PERU, type DatosEnvio } from "@cerradorexperto/lib/envio";

/**
 * Pide la dirección DESPUÉS de pagar, y solo a quien compró el libro físico.
 * Va arriba de todo en /gracias: en una página de gracias la atención cae
 * rápido, y este es el único paso que todavía necesitamos del cliente.
 */
export default function DireccionEnvio() {
  const [estado, setEstado] = useState<"cargando" | "oculto" | "formulario" | "enviando" | "listo">("cargando");
  const [error, setError] = useState<string | null>(null);
  const [pi, setPi] = useState<string | null>(null);
  const [datos, setDatos] = useState<DatosEnvio>({
    nombre: "", telefono: "", dni: "", departamento: "Lima", distrito: "", direccion: "", referencia: "",
  });

  useEffect(() => {
    const id = typeof window !== "undefined" ? localStorage.getItem("last_payment_intent") : null;
    if (!id) return setEstado("oculto");
    setPi(id);

    fetch(`/api/pedido/direccion?pi=${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.yaRegistrada) return setEstado("listo");
        if (!d.requiereDireccion) return setEstado("oculto");
        if (d.nombre) setDatos((prev) => ({ ...prev, nombre: d.nombre }));
        setEstado("formulario");
      })
      .catch(() => setEstado("oculto"));
  }, []);

  const actualizar = (campo: keyof DatosEnvio, valor: string) =>
    setDatos((prev) => ({ ...prev, [campo]: valor }));

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("enviando");
    setError(null);
    try {
      const res = await fetch("/api/pedido/direccion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId: pi, ...datos }),
      });
      const d = await res.json();
      if (!res.ok) {
        setError(d.error || "No se pudo guardar. Revisa los datos.");
        setEstado("formulario");
        return;
      }
      setEstado("listo");
    } catch {
      setError("No se pudo guardar. Intenta de nuevo.");
      setEstado("formulario");
    }
  };

  if (estado === "cargando" || estado === "oculto") return null;

  if (estado === "listo") {
    return (
      <section className="bg-slate-900 px-4 pt-10">
        <div className="container mx-auto max-w-2xl rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 flex items-start gap-3">
          <Check className="h-6 w-6 flex-shrink-0 text-emerald-400" />
          <div>
            <p className="font-bold text-emerald-300">Dirección registrada</p>
            <p className="text-sm text-slate-300 mt-1">
              Tu libro físico sale en el próximo despacho. Te escribo al WhatsApp que dejaste
              cuando esté en camino.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const enviando = estado === "enviando";
  const input =
    "w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const label = "block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5";

  return (
    <section className="bg-slate-900 px-4 pt-10">
      <div className="container mx-auto max-w-2xl rounded-xl border-2 border-amber-500/50 bg-slate-800/60 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <Package className="h-7 w-7 flex-shrink-0 text-amber-400" />
          <h2 className="text-2xl font-extrabold text-white">Falta 1 paso para enviarte tu libro</h2>
        </div>
        <p className="text-slate-300 mb-6 text-sm leading-relaxed">
          Compraste la versión impresa. Dime a dónde te la mando y sale en el próximo despacho
          (<strong className="text-amber-300">martes y viernes</strong>).
        </p>

        <form onSubmit={enviar} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Nombre de quien recibe</label>
              <input className={input} value={datos.nombre} onChange={(e) => actualizar("nombre", e.target.value)} placeholder="Juan Pérez" required />
            </div>
            <div>
              <label className={label}>WhatsApp de contacto</label>
              <input className={input} value={datos.telefono} onChange={(e) => actualizar("telefono", e.target.value)} placeholder="987 654 321" required />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={label}>DNI</label>
              <input className={input} value={datos.dni} onChange={(e) => actualizar("dni", e.target.value.replace(/\D/g, "").slice(0, 8))} placeholder="12345678" inputMode="numeric" required />
            </div>
            <div>
              <label className={label}>Departamento</label>
              <select className={input} value={datos.departamento} onChange={(e) => actualizar("departamento", e.target.value)} required>
                {DEPARTAMENTOS_PERU.map((d) => (<option key={d} value={d}>{d}</option>))}
              </select>
            </div>
            <div>
              <label className={label}>Distrito</label>
              <input className={input} value={datos.distrito} onChange={(e) => actualizar("distrito", e.target.value)} placeholder="Miraflores" required />
            </div>
          </div>

          <div>
            <label className={label}>Dirección</label>
            <input className={input} value={datos.direccion} onChange={(e) => actualizar("direccion", e.target.value)} placeholder="Av. Larco 1234, Dpto. 501" required />
          </div>

          <div>
            <label className={label}>Referencia <span className="normal-case text-slate-500">(opcional, pero ayuda al repartidor)</span></label>
            <input className={input} value={datos.referencia} onChange={(e) => actualizar("referencia", e.target.value)} placeholder="Casa verde, frente al parque" />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-6 py-3.5 text-lg font-bold text-white shadow-lg transition-opacity disabled:opacity-60"
          >
            {enviando && <LoaderCircle className="h-5 w-5 animate-spin" />}
            {enviando ? "Guardando..." : "CONFIRMAR MI DIRECCIÓN"}
          </button>
        </form>
      </div>
    </section>
  );
}
