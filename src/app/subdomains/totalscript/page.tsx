'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { savePromptAndGenerateScript } from './actions';

const LOADING_STEPS = [
  "Analizando los detalles de tu producto...",
  "Evaluando el rango de precio y canal de venta...",
  "Estructurando la secuencia de apertura y enganche...",
  "Redactando objeciones comunes y técnicas de cierre...",
  "Aplicando gatillos mentales y técnicas persuasivas...",
  "Diseñando el guion experto final..."
];

export default function TotalScriptPage() {
  const [inicio, setInicio] = useState(true);
  const [formTicket, setFormTicket] = useState<string>('');
  const [recomendacion, setRecomendacion] = useState('');
  const [emailScript, setEmailScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [respuesta, setRespuesta] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  
  const [formData, setFormData] = useState({
    quest1: '',
    quest2: '',
    quest3: '',
    quest4: '',
    quest5: '',
  });

  const [showPriceDialog, setShowPriceDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  // Efecto para cambiar el mensaje de carga cíclicamente
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 2200);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

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
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

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
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => console.error('Error al copiar:', err));
  };

  const handleDownloadPDF = async () => {
    if (!respuesta) return;
    setIsDownloadingPdf(true);
    try {
      const response = await fetch('/api/totalscript/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scriptText: respuesta,
          company: formData.quest5,
          product: formData.quest1
        })
      });

      if (!response.ok) throw new Error('Error al generar el PDF en el servidor');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Guion_Ventas_${formData.quest5.replace(/\s+/g, '_') || 'TotalScript'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      alert('Hubo un error al generar y descargar tu PDF. Por favor, intenta de nuevo.');
    } finally {
      setIsDownloadingPdf(false);
    }
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
        {!inicio && !isLoading && !respuesta && (
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

            <h2 className="text-2xl font-bold mb-4 text-center tracking-tight text-slate-900">
              Personaliza tu Guion de Ventas
            </h2>

            {/* Progress Bar */}
            {(() => {
              const answeredCount = Object.values(formData).filter(v => v.trim() !== '').length;
              const progressPercentage = (answeredCount / 5) * 100;
              return (
                <div className="mb-8">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Progreso del formulario</span>
                    <span>{answeredCount} de 5 preguntas</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-300 ease-out shadow-lg" 
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })()}

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
                  className="w-full min-h-[80px] bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 transition-all shadow-sm"
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
                  className="w-full min-h-[80px] bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 transition-all shadow-sm"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 pr-12 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 transition-all shadow-sm"
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
                  className="w-full min-h-[80px] bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 transition-all shadow-sm"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-98"
              >
                Siguiente Paso
              </button>
            </form>
          </section>
        )}

        {/* LOADING ANIMATION */}
        {isLoading && (
          <section className="w-full max-w-2xl bg-white border border-[#E5E7EB] p-10 rounded-2xl text-center shadow-xl my-6 flex flex-col items-center">
            <div className="relative flex justify-center items-center mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-100 border-t-indigo-600"></div>
              <div className="absolute font-bold text-xs text-indigo-600 animate-pulse">IA</div>
            </div>
            <p className="text-lg text-slate-800 font-semibold transition-all duration-300">
              {LOADING_STEPS[loadingStep]}
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Diseñando un guion de ventas personalizado de alto impacto.
            </p>
            <div className="w-48 bg-slate-100 h-1.5 rounded-full mt-6 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-500 ease-out" 
                style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
              />
            </div>
          </section>
        )}

        {/* STEP 3: RESULT RESPONSE */}
        {respuesta && !isLoading && (
          <section className="w-full max-w-2xl bg-white border border-[#E5E7EB] p-8 rounded-2xl shadow-xl my-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-indigo-600">Guion de Ventas Generado</h3>
                <p className="text-xs text-slate-400">Personalizado para tu negocio</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopyClipboard}
                  className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 border ${
                    copySuccess 
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-transparent"
                  }`}
                >
                  {copySuccess ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span>Copiar Guion</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloadingPdf}
                  className="flex-1 sm:flex-none px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 border disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloadingPdf ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Generando...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Descargar PDF</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setInicio(false)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 border border-transparent"
                >
                  Regenerar
                </button>
              </div>
            </div>

            {/* Script Box */}
            <div className="bg-slate-50/60 p-6 rounded-xl border border-slate-200/60 font-mono text-sm leading-relaxed text-slate-800 shadow-inner">
              {(() => {
                if (respuesta.includes("Lo sentimos") || respuesta.includes("Error al generar")) {
                  return (
                    <div className="text-red-600 text-sm p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2.5">
                      <svg className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="font-bold">Error del Servicio</p>
                        <p className="text-xs text-red-500 mt-0.5">{respuesta}</p>
                      </div>
                    </div>
                  );
                }
                
                return respuesta.split('\n').map((line, idx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return <div key={idx} className="h-3" />;

                  if (trimmed.startsWith('Asesor:')) {
                    const content = trimmed.substring(7).trim();
                    return (
                      <div key={idx} className="flex gap-3 mb-4 items-start animate-fade-in">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                          AS
                        </div>
                        <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl rounded-tl-none p-3.5 text-sm text-slate-800 font-sans leading-relaxed shadow-sm max-w-[85%]">
                          <p className="font-bold text-indigo-700 text-xs mb-1 uppercase tracking-wider">Asesor</p>
                          {content}
                        </div>
                      </div>
                    );
                  } else if (trimmed.startsWith('Cliente:')) {
                    const content = trimmed.substring(8).trim();
                    return (
                      <div key={idx} className="flex gap-3 mb-4 items-start justify-end animate-fade-in">
                        <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl rounded-tr-none p-3.5 text-sm text-slate-800 font-sans leading-relaxed text-left shadow-sm order-1 max-w-[85%]">
                          <p className="font-bold text-emerald-700 text-xs mb-1 uppercase tracking-wider">Cliente</p>
                          {content}
                        </div>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md order-2">
                          CL
                        </div>
                      </div>
                    );
                  } else if (trimmed.startsWith('Asesor (si') || trimmed.startsWith('Asesor(') || trimmed.startsWith('Asesor (en')) {
                    return (
                      <div key={idx} className="my-3 px-4 py-2.5 bg-slate-100 border-l-4 border-slate-400 text-xs text-slate-600 font-sans rounded-r-lg italic">
                        {trimmed}
                      </div>
                    );
                  }

                  return (
                    <p key={idx} className="text-slate-700 font-sans text-sm mb-3 pl-11">
                      {trimmed}
                    </p>
                  );
                });
              })()}
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
