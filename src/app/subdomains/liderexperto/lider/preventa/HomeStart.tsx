"use client"

import { useState, useEffect } from 'react';
import VideoPlayer from "@liderexperto/components/VideoPlayer" 
import Link from "next/link"
import Image from "next/image"


export default function SalesPage() {
  // 1. Estado para controlar el botón
  const [showButton, setShowButton] = useState(false);
  // Un nombre único para este video en el almacenamiento del navegador.
  const storageKey = 'vioVideoSistemaVentas';
  // 2. Lógica para usuarios que regresan - revisa si el usuario ya vio el video.
  useEffect(() => {
    if (localStorage.getItem(storageKey) === 'true') {
      console.log("Usuario recurrente. Mostrando el botón.");
      setShowButton(true); // Si ya lo vio, encendemos el interruptor.
    }
  }, []);

  // 3.El componente `VideoPlayer` llamará a esta función cuando se cumplan los 90 segundos.
  const handleVideoTimeReached = () => {
    console.log("Umbral de 90 segundos alcanzado. Mostrando botón y guardando estado.");
    setShowButton(true); // Muestra el botón.
    localStorage.setItem(storageKey, 'true'); // Guarda en la "memoria" del navegador.
  };

  return (
    <main className="bg-black text-white flex flex-col items-center">
        <div className="flex flex-col max-w-[1200px] items-center pt-14 px-4">
          {/* Título principal */}
          <h1 className="font-montserrat text-3xl font-black md:text-4xl text-center">
            ¿Tu equipo SOLO <span className="bg-red-600 px-2">VENDE</span> SI TÚ ESTÁS <span className="text-[#E40200] inline-block border-b-1 border-[#E40200]">DETRÁS</span><span className="text-[#E40200]">?</span>
          </h1>
          <p id="descubre" className="text-xl leading-[1.2] md:text-2xl border border-red-600 rounded-lg p-4 px-2 my-6 text-center max-w-140">
            Descubre <span className="font-bold">cómo construir un equipo</span> que venda solo, todos los meses... incluso sin ti.
          </p>

          {/* Sección de video */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden mb-6">
            {/* Barra roja superior */}
            <div className="bg-red-600 text-white py-2 px-1 flex items-center justify-center">
              <Image
                src={"/subdomains/liderexperto/preventa/volumenIcon.png"}
                alt="Icono derecha"
                width={100}
                height={100}
                className="w-[20px] md:w-[26px] mr-2"
              />
              <span className="text-xl md:text-2xl leading-[1.2] font-barlow-condensed font-medium">Mira el video para más detalles</span>
            </div>
            {/* Componente video */}
            <div className="aspect-video bg-black relative">             
              <VideoPlayer
                src="https://stream.mux.com/0200vSEVkSrTsOMPcAfDA47KjULintJslyhN13VhBs8rg.m3u8"
                poster="/subdomains/liderexperto/venta/logoLiderExperto.jpg"
                className="max-w-full"
                triggerTime={90} // <-- Prop para indicar el tiempo
                onTimeTrigger={handleVideoTimeReached} // <-- Prop para la función a ejecutar
              />
            </div>
          </div>

          {/* Boton de acción */}
          {/* <Link href="/" className="flex items-center justify-center font-barlow-condensed font-bold text-xl md:text-2xl p-4 md:px-10 bg-green-600 border-b-6 border-[#00960B]  text-white rounded-lg cursor-pointer">
              SÍ, QUIERO DESCUBRIR EL SISTEMA
              <Image 
                  src="/subdomains/liderexperto/preventa/arrowRightIcon.png"
                  alt="Icono derecha"
                  width={80}
                  height={80}
                  className="w-6 md:w-8 ml-2 mt-[2px]"
              />
          </Link> */}
          {/* 5. HACEMOS QUE EL BOTÓN APAREZCA CONDICIONALMENTE */}
          {showButton && ( 
            <Link 
              href="/" className="flex items-center justify-center font-barlow-condensed font-bold text-xl md:text-2xl p-4 md:px-10 bg-green-600 border-b-4 border-green-800 hover:bg-green-700 text-white rounded-lg cursor-pointer transition-all duration-300 animate-pulse"
            >
              SÍ, QUIERO DESCUBRIR EL SISTEMA
              <Image 
                src="/subdomains/liderexperto/preventa/arrowRightIcon.png"
                alt="Icono derecha"
                width={80}
                height={80}
                className="w-6 md:w-8 ml-2 mt-[2px]"
              />
            </Link>
          )}
        </div>

        <div className="flex flex-col max-w-[1200px] items-center pt-10 px-4">
          <div className="flex w-[90%] h-0.5 bg-red-600 mx-auto"></div>
          <p className="font-barlow-condensed font-extrabold text-3xl md:text-5xl mb-2 ">
            Este video es para ti si...
          </p>
          <div className="w-[90%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>

          {/* Lista de puntos */}
          <div className="space-y-4 mt-4 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-12">
            {[
              "Tienes vendedores, pero sientes que podrían dar mucho más.",
              "Tus ventas suben un mes y bajan al siguiente, sin razón clara.",
              "Ya probaste motivarlos, capacitarlos o incluso cambiar personas... pero los resultados no se mantienen.",
              "Estás siempre pendiente del equipo, porque si tú no estás, las cosas no avanzan.",
              "Sabes que algo no está funcionando, pero no logras identificar qué es.",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#1E1E1E] rounded-lg p-4 flex items-start max-w-[700px]"
              >
                <Image 
                  src="/subdomains/liderexperto/preventa/rightIcon.png"
                  alt="Icono derecha"
                  width={100}
                  height={100}
                  className="w-4 md:w-6 mr-2 mt-[6px]"
                />
                <p className="text-white text-xl md:text-2xl font-barlow font-medium leading-[1.2]">{item}</p>
              </div>
            ))}
          </div>
        </div>
    </main>
  )
}