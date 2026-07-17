'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { savePromptAndGenerateScript } from './actions';

export default function TotalScriptPage() {
  const [inicio, setInicio] = useState(true);
  const [formTicket, setFormTicket] = useState<string>('');
  const [recomendacion, setRecomendacion] = useState('');
  const [emailScript, setEmailScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [respuesta, setRespuesta] = useState('');
  
  const [formData, setFormData] = useState({
    quest1: '',
    quest2: '',
    quest3: '',
    quest4: '',
    quest5: '',
  });

  const [showPriceDialog, setShowPriceDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePrice = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlechangeEmailScript = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailScript(event.target.value);
  };

  const selectTicketAndRecommend = (ticketType: string) => {
    setFormTicket(ticketType);
    if (ticketType === 'Low') {
      setRecomendacion('por WhatsApp');
    } else if (ticketType === 'Middle') {
      setRecomendacion('por Teléfono');
    } else {
      setRecomendacion('en Persona (Videollamada)');
    }
    setShowPriceDialog(false);
    setInicio(false);
  };

  const handleStart = () => {
    setShowPriceDialog(true);
  };

  const handleBackToStart = () => {
    setInicio(true);
    setFormData({
      quest1: '',
      quest2: '',
      quest3: '',
      quest4: '',
      quest5: '',
    });
    setRespuesta('');
  };

  const handleOpenEmailDialog = (event: FormEvent) => {
    event.preventDefault();

    if (!formData.quest1.trim()) {
      alert('Por favor, completa la pregunta 1.');
      return;
    }
    if (!formData.quest2.trim()) {
      alert('Por favor, completa la pregunta 2.');
      return;
    }
    if (!formData.quest3.trim()) {
      alert('Por favor, ingresa un precio válido.');
      return;
    }
    if (!formData.quest4.trim()) {
      alert('Por favor, completa la pregunta 4.');
      return;
    }
    if (!formData.quest5.trim()) {
      alert('Por favor, ingresa el nombre de tu empresa.');
      return;
    }

    setShowEmailDialog(true);
  };

  const handleGenerateScript = async (event: FormEvent) => {
    event.preventDefault();
    if (!emailScript.trim() || !emailScript.includes('@')) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setShowEmailDialog(false);
    setIsLoading(true);
    setRespuesta('');

    try {
      const result = await savePromptAndGenerateScript(
        {
          Email: emailScript,
          ProductOrService: formData.quest1,
          Description: formData.quest2,
          Price: formData.quest3,
          offer: formData.quest4,
          Company: formData.quest5,
        },
        formTicket,
        recomendacion
      );
      setRespuesta(result);
    } catch (error) {
      console.error(error);
      setRespuesta('Error al generar el guion. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(respuesta)
      .then(() => alert('¡Guion copiado al portapapeles!'))
      .catch((err) => console.error('Error al copiar:', err));
  };

  return (
    <div className="bg-[#F9FAFB] text-[#111827] font-sans min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200 py-3 px-6 flex items-center justify-center">
        <img 
          src="/subdomains/totalscript/src/sources/totalscript.png" 
          alt="TotalScript Logo" 
          className="h-8 w-auto cursor-pointer"
          onClick={handleBackToStart}
        />
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-10 flex flex-col justify-center items-center">
        {/* STEP 1: WELCOME SCREEN */}
        {inicio && (
          <section className="text-center max-w-2xl animate-fade-in py-8 flex flex-col items-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6 tracking-wide shadow-sm">
              INTELIGENCIA ARTIFICIAL PARA VENTAS
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none mb-6 text-slate-900">
              Genera scripts para <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800">vender más</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-lg mx-auto font-light leading-relaxed">
              Crea guiones y scripts de ventas altamente persuasivos adaptados a tu producto y tipo de cliente con un solo clic.
            </p>
            
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
            >
              Comenzar Ahora
            </button>

            {/* Feature graphics */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-xl mx-auto opacity-90 border-t border-slate-200 pt-8 w-full">
              <div className="flex flex-col items-center">
                <img src="/subdomains/totalscript/src/sources/imagenSelecticked.png" className="w-12 h-12 object-contain mb-2" alt="Paso 1" />
                <span className="text-xs text-slate-500 font-medium">1. Elige tu Ticket</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="/subdomains/totalscript/src/sources/imagenCompleteForm.png" className="w-12 h-12 object-contain mb-2" alt="Paso 2" />
                <span className="text-xs text-slate-500 font-medium">2. Responde 5 preguntas</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="/subdomains/totalscript/src/sources/imagenGuionDes.png" className="w-12 h-12 object-contain mb-2" alt="Paso 3" />
                <span className="text-xs text-slate-500 font-medium">3. Genera tu Guion</span>
              </div>
            </div>
          </section>
        )}

        {/* STEP 2: QUESTIONS FORM */}
        {!inicio && (
          <section className="w-full max-w-2xl bg-white border border-[#E5E7EB] p-8 rounded-2xl shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={handleBackToStart}
                className="text-sm font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 transition-colors duration-200"
              >
                ← Atrás
              </button>
              <div className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                {formTicket} Ticket &bull; Venta {recomendacion}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-8 text-center tracking-tight text-slate-900">
              Personaliza tu Guion de Ventas
            </h2>

            <form onSubmit={handleOpenEmailDialog} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold">1</span>
                  ¿Qué producto o servicio estás ofreciendo?
                </label>
                <textarea
                  required
                  name="quest1"
                  value={formData.quest1}
                  onChange={handleChange}
                  placeholder="Ejemplo: Asesoría de Marketing Inmobiliario"
                  className="w-full min-h-[80px] bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold">2</span>
                  Describe brevemente tu producto o servicio
                </label>
                <textarea
                  required
                  name="quest2"
                  value={formData.quest2}
                  onChange={handleChange}
                  placeholder="Ejemplo: Es un programa completo de publicidad y captación de leads en redes sociales..."
                  className="w-full min-h-[80px] bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold">3</span>
                  ¿Cuál es el precio de tu producto o servicio? (Solo números)
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="quest3"
                    value={formData.quest3}
                    onChange={handleChangePrice}
                    placeholder="Ejemplo: 300"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 pr-12 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">USD</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold">4</span>
                  ¿Qué oferta especial o bono puedes proporcionar?
                </label>
                <textarea
                  required
                  name="quest4"
                  value={formData.quest4}
                  onChange={handleChange}
                  placeholder="Ejemplo: 10% de descuento y plantilla de prospección gratis"
                  className="w-full min-h-[80px] bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold">5</span>
                  Escribe el nombre de tu empresa
                </label>
                <input
                  required
                  type="text"
                  name="quest5"
                  value={formData.quest5}
                  onChange={handleChange}
                  placeholder="Ejemplo: Belcan Enterprise"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-98"
              >
                Crear Guion
              </button>
            </form>
          </section>
        )}

        {/* LOADING ANIMATION */}
        {isLoading && (
          <section className="w-full max-w-2xl bg-white border border-[#E5E7EB] p-10 rounded-2xl text-center shadow-xl my-6 animate-pulse">
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
            <p className="text-lg text-slate-800 font-medium">
              Tu guion experto está siendo diseñado por la IA...
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Esto tomará solo unos segundos.
            </p>
          </section>
        )}

        {/* STEP 3: RESULT RESPONSE */}
        {respuesta && !isLoading && (
          <section className="w-full max-w-2xl bg-white border border-[#E5E7EB] p-8 rounded-2xl shadow-xl my-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-indigo-600">Guion de Ventas Generado</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyClipboard}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copiar Guion
                </button>
                <button
                  onClick={() => setInicio(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  Regenerar
                </button>
              </div>
            </div>

            {/* Script Box */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/60 max-h-[450px] overflow-y-auto font-mono text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
              {respuesta}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleBackToStart}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Crear Otro Guion
              </button>
            </div>
          </section>
        )}
      </main>

      {/* DIALOG 1: PRICE TICKET SELECTOR */}
      {showPriceDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <h2 className="text-xl font-bold mb-2 text-center text-slate-900">
              ¿Cuál es el precio de tu producto o servicio?
            </h2>
            <p className="text-sm text-slate-500 text-center mb-6">
              Esto nos ayudará a definir la mejor estrategia y canal de cierre para tu guion.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => selectTicketAndRecommend('Low')}
                className="w-full p-4 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all flex justify-between items-center group cursor-pointer"
              >
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Low Ticket</h4>
                  <p className="text-xs text-slate-500">Rango de 0 - 100 USD</p>
                </div>
                <span className="text-xs text-indigo-600 font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  WhatsApp
                </span>
              </button>

              <button
                onClick={() => selectTicketAndRecommend('Middle')}
                className="w-full p-4 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all flex justify-between items-center group cursor-pointer"
              >
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Middle Ticket</h4>
                  <p className="text-xs text-slate-500">Rango de 100 - 500 USD</p>
                </div>
                <span className="text-xs text-indigo-600 font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  Teléfono
                </span>
              </button>

              <button
                onClick={() => selectTicketAndRecommend('High')}
                className="w-full p-4 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all flex justify-between items-center group cursor-pointer"
              >
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">High Ticket</h4>
                  <p className="text-xs text-slate-500">Precio mayor a 500 USD</p>
                </div>
                <span className="text-xs text-indigo-600 font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  Persona/Zoom
                </span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <button
                onClick={() => setShowPriceDialog(false)}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG 2: EMAIL INPUT */}
      {showEmailDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-2xl text-center">
            <h2 className="text-xl font-bold mb-2 text-slate-900">
              Ingresa tu correo para generar tu script
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Te enviaremos una copia del guion generado por la Inteligencia Artificial.
            </p>

            <form onSubmit={handleGenerateScript} className="space-y-4">
              <div>
                <input
                  required
                  type="email"
                  value={emailScript}
                  onChange={handlechangeEmailScript}
                  placeholder="Tu correo electrónico (ej. juan@empresa.com)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 text-center placeholder:text-slate-450 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer active:scale-98"
              >
                Generar Guion Experto
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
              <button
                onClick={() => setShowEmailDialog(false)}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                Atrás
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-2">Copyright © 2026 Hugo Herrera. Todos los derechos reservados.</p>
          <p>TotalScript &bull; Aviso Legal &bull; Política de Cookies</p>
        </div>
      </footer>
    </div>
  );
}
