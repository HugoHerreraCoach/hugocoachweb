'use client';

import { Bot, Sparkles, MessageCircle } from 'lucide-react';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';

export function BonusSection() {
  return (
    <section className="w-full bg-slate-950 py-16 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Copy */}
          <AnimatedOpacity>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-5 lg:mb-6">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-bold tracking-wider uppercase text-amber-400">
                  Bono Exclusivo
                </span>
              </div>

              <h2 className="text-2xl lg:text-5xl font-bold tracking-tight text-white text-balance">
                Tu WhatsApp atendiendo clientes{' '}
                <span className="text-amber-400">mientras duermes.</span>
              </h2>

              <p className="mt-5 lg:mt-6 text-lg lg:text-xl leading-[1.6] text-slate-300 text-balance">
                Tus vendedores no deberían perder tiempo respondiendo preguntas repetitivas.
                Si calificas tras nuestra sesión de validación, incluyo el diseño de un{' '}
                <span className="font-semibold text-white">
                  asistente inteligente para tu WhatsApp
                </span>{' '}
                que filtra y califica a tus prospectos automáticamente, antes de que lleguen a tu equipo.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MessageCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span>Responde consultas 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MessageCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span>Filtra curiosos de compradores</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MessageCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span>Solo llegan prospectos listos</span>
                </div>
              </div>
            </div>
          </AnimatedOpacity>

          {/* Right: Mockup visual */}
          <AnimatedOpacity duration="duration-[1500ms]">
            <div className="relative">
              {/* Phone mockup frame */}
              <div className="mx-auto max-w-[300px] lg:max-w-[320px] rounded-[2rem] border-2 border-gray-700 bg-slate-900 p-3 lg:p-4 shadow-2xl shadow-amber-500/5">
                {/* Phone header */}
                <div className="flex items-center gap-3 pb-3 lg:pb-4 border-b border-gray-800 mb-3 lg:mb-4">
                  <div className="h-9 w-9 lg:h-10 lg:w-10 rounded-full bg-gradient-to-br from-[#0a4afc] to-[#4d8bff] flex items-center justify-center">
                    <Bot className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Asistente IA</p>
                    <p className="text-xs text-green-400">en línea</p>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="space-y-2.5 lg:space-y-3">
                  {/* Bot message */}
                  <div className="flex gap-2">
                    <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-3 lg:px-4 py-2.5 lg:py-3 max-w-[85%]">
                      <p className="text-xs lg:text-sm text-slate-200">
                        ¡Hola! 👋 Soy el asistente de Hugo Herrera. ¿En qué te puedo ayudar?
                      </p>
                    </div>
                  </div>

                  {/* User reply */}
                  <div className="flex justify-end">
                    <div className="bg-[#0a4afc] rounded-2xl rounded-tr-sm px-3 lg:px-4 py-2.5 lg:py-3 max-w-[85%]">
                      <p className="text-xs lg:text-sm text-white">Quiero información sobre el entrenamiento de ventas</p>
                    </div>
                  </div>

                  {/* Bot qualification */}
                  <div className="flex gap-2">
                    <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-3 lg:px-4 py-2.5 lg:py-3 max-w-[85%]">
                      <p className="text-xs lg:text-sm text-slate-200">
                        ¡Claro! ¿Cuántas personas tiene tu equipo de ventas?
                      </p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex gap-2">
                    <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-3 lg:px-4 py-2.5 lg:py-3">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow behind phone */}
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_70%)]" />
            </div>
          </AnimatedOpacity>
        </div>
      </div>
    </section>
  );
}
