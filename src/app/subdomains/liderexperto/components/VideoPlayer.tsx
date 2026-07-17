"use client"

import { useState, useRef, useEffect, useCallback } from "react";
import { Play,Maximize, Minimize } from "lucide-react";
import Image from "next/image";
import Hls, { type ErrorData, Events } from 'hls.js';

// --- (Las interfaces de TypeScript no cambian, se mantienen igual) ---
interface HTMLVideoElementWithHls extends HTMLVideoElement {
  hlsInstance?: Hls;
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
}

interface HTMLElementWithFullscreen extends HTMLDivElement {
  msRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
}
interface DocumentWithFullscreen extends Document {
  msExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
  msFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  webkitFullscreenElement?: Element;
  webkitIsFullScreen?: boolean;
}

interface VideoPlayerProps {
  src: string;
  poster?: string;
  thumbnailUrl?: string;
  className?: string;
  triggerTime?: number;
  onTimeTrigger?: () => void;
}

export default function VideoPlayer({
  src,
  poster,
  thumbnailUrl,
  className = "",
  triggerTime,
  onTimeTrigger,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  // CAMBIO: Mantenemos isMuted en true inicialmente para saber que aún no se ha activado el sonido.
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElementWithHls>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  // CAMBIO: hasUserInteracted sigue siendo útil para la lógica del primer clic.
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const triggerFiredRef = useRef(false);


  //Lógica para Fullscreen
  const checkFullscreenStatus = useCallback(() => {
    const doc = document as DocumentWithFullscreen;
    const video = videoRef.current;
    if (video && typeof video.webkitDisplayingFullscreen === 'boolean') {
      setIsFullscreen(video.webkitDisplayingFullscreen);
    } else {
      setIsFullscreen(!!(doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement || doc.webkitIsFullScreen));
    }
  }, []);
  useEffect(() => {
    checkFullscreenStatus();
    document.addEventListener('fullscreenchange', checkFullscreenStatus);
    document.addEventListener('webkitfullscreenchange', checkFullscreenStatus);
    document.addEventListener('mozfullscreenchange', checkFullscreenStatus);
    document.addEventListener('MSFullscreenChange', checkFullscreenStatus);

    const video = videoRef.current;
    const handleWebkitBeginFullscreen = () => setIsFullscreen(true);
    const handleWebkitEndFullscreen = () => setIsFullscreen(false);
    if (video) {
      video.addEventListener('webkitbeginfullscreen', handleWebkitBeginFullscreen);
      video.addEventListener('webkitendfullscreen', handleWebkitEndFullscreen);
    }
    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreenStatus);
      document.removeEventListener('webkitfullscreenchange', checkFullscreenStatus);
      document.removeEventListener('mozfullscreenchange', checkFullscreenStatus);
      document.removeEventListener('MSFullscreenChange', checkFullscreenStatus);
      if (video) {
        video.removeEventListener('webkitbeginfullscreen', handleWebkitBeginFullscreen);
        video.removeEventListener('webkitendfullscreen', handleWebkitEndFullscreen);
      }
    };
  }, [checkFullscreenStatus]);

  //Lógica para carga de video HLS.js
  useEffect(() => {
    let currentHlsInstance: Hls | null = null;
    const videoElement = videoRef.current;
    if (!videoElement) return;
    if (hasError) return;

    setIsLoaded(false);
    setIsPlaying(false);

    // Reiniciar estados para una nueva fuente de video
    setHasUserInteracted(false);
    setIsMuted(true);

    if (videoElement.hlsInstance) {
      videoElement.hlsInstance.destroy();
      delete videoElement.hlsInstance;
    }
    videoElement.removeAttribute('src');

    const setupVideoSource = () => {
      if (src && src.includes('.m3u8')) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          currentHlsInstance = hls;
          videoElement.hlsInstance = hls;
          hls.loadSource(src);
          hls.attachMedia(videoElement);
          hls.on(Events.ERROR, (event: string, data: ErrorData) => {
            console.error('HLS.js Error:', data);
            if (data.fatal) {
              if (currentHlsInstance) { currentHlsInstance.destroy(); currentHlsInstance = null; }
              if (videoElement.hlsInstance) delete videoElement.hlsInstance;
            }
            setHasError(true); setIsLoaded(false); setIsPlaying(false);
          });
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
          videoElement.src = src;
        } else {
          setHasError(true); setIsLoaded(false);
        }
      } else if (src) {
        videoElement.src = src;
      } else {
        setHasError(true); setIsLoaded(false);
      }
    };
    setupVideoSource();

    // CAMBIO 1: Lógica simplificada al cargar los datos del video.
    // Ya no hacemos autoplay. Solo marcamos el video como cargado.
    const handleLoadedData = () => {
      if (hasError) return;
      setIsLoaded(true);
      // No hacemos nada más. El video está listo y en pausa.
    };

    const handleError = (_e: Event) => {
      console.error('Error del elemento HTML <video>:', videoElement.error?.message, _e);
      setHasError(true); setIsLoaded(false); setIsPlaying(false);
    };

    // Estos listeners de eventos son clave para mantener el estado sincronizado
    const handlePlayEvent = () => setIsPlaying(true);
    const handlePauseEvent = () => setIsPlaying(false);

    videoElement.addEventListener("loadeddata", handleLoadedData);
    videoElement.addEventListener("error", handleError);
    videoElement.addEventListener("play", handlePlayEvent);
    videoElement.addEventListener("pause", handlePauseEvent);

    return () => {
      videoElement.removeEventListener("loadeddata", handleLoadedData);
      videoElement.removeEventListener("error", handleError);
      videoElement.removeEventListener("play", handlePlayEvent);
      videoElement.removeEventListener("pause", handlePauseEvent);
      if (currentHlsInstance) { currentHlsInstance.destroy(); }
      if (videoElement.hlsInstance) { videoElement.hlsInstance.destroy(); delete videoElement.hlsInstance; }
    };
  }, [src, hasError]);

  //Efecto para Screen Wake Lock
  useEffect(() => {
    let effectScopedWakeLock: WakeLockSentinel | null = null;

    const handleWakeLockRelease = () => {
      console.log('Wake Lock sentinel fue liberado.');
      if (wakeLockRef.current === effectScopedWakeLock) {
        wakeLockRef.current = null;
      }
      if (effectScopedWakeLock) {
        effectScopedWakeLock.removeEventListener('release', handleWakeLockRelease);
      }
      effectScopedWakeLock = null;
    };

    const acquireWakeLock = async () => {
      if (!('wakeLock' in navigator && navigator.wakeLock)) {
        console.warn('Screen Wake Lock API no soportada.');
        return;
      }
      if (wakeLockRef.current && !wakeLockRef.current.released) return;
      if (effectScopedWakeLock && !effectScopedWakeLock.released) return;

      try {
        console.log("Intentando adquirir Wake Lock...");
        if (effectScopedWakeLock) { // Limpiar listener del sentinel anterior de este efecto
          effectScopedWakeLock.removeEventListener('release', handleWakeLockRelease);
        }
        const newSentinel = await navigator.wakeLock.request('screen');
        effectScopedWakeLock = newSentinel;
        effectScopedWakeLock.addEventListener('release', handleWakeLockRelease);
        wakeLockRef.current = effectScopedWakeLock;
        console.log('Screen Wake Lock adquirido.');
      } catch (err) {
        wakeLockRef.current = null;
        effectScopedWakeLock = null;
        if (err instanceof Error) { console.error(`Wake Lock acquire error: ${err.name}, ${err.message}`); }
        else { console.error('Wake Lock acquire unknown error:', err); }
      }
    };

    const releaseWakeLock = async () => {
      const currentLock = wakeLockRef.current; // Usar el lock del ref para liberar
      if (currentLock && !currentLock.released) {
        console.log("Intentando liberar Wake Lock...");
        try {
          await currentLock.release();
          // El evento 'release' se encargará de nulificar el ref y el effectScopedWakeLock
        } catch (err) {
          if (err instanceof Error) { console.error(`Wake Lock release error: ${err.name}, ${err.message}`); }
          else { console.error('Wake Lock release unknown error:', err); }
        }
      }
    };

    if (isPlaying && !isMuted) { acquireWakeLock(); }
    else { releaseWakeLock(); }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isPlaying && !isMuted) { acquireWakeLock(); }
      else { releaseWakeLock(); }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      releaseWakeLock();
      if (effectScopedWakeLock) {
        effectScopedWakeLock.removeEventListener('release', handleWakeLockRelease);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying, isMuted]);

  //Lógica para contar el tiempo de reproducción
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof triggerTime === 'undefined' || !onTimeTrigger) {
      return;
    }
    triggerFiredRef.current = false;
    const handleTimeUpdate = () => {
      if (video.currentTime >= triggerTime && !triggerFiredRef.current) {
        onTimeTrigger();
        triggerFiredRef.current = true;
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [src, triggerTime, onTimeTrigger]);


  //Funciones para manejo de eventos
  const commonPlayCatch = (err: unknown) => {
    if (err instanceof Error) { console.error(`Error al reproducir: ${err.name}, ${err.message}`); }
    else { console.error('Error desconocido al reproducir:', err); }
    setIsPlaying(false);
  };

  // Esta única función maneja el primer clic (con sonido) y los clics posteriores (pausa/reanudación).
  const handlePlayToggle = () => {
    const video = videoRef.current;
    if (!video || hasError || !isLoaded) return;

    if (isPlaying) {
      video.pause();
    } else {
      // Si es la primera interacción del usuario, activamos el sonido.
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        setIsMuted(false); // Actualiza el estado de React
        video.muted = false; // Modifica el elemento del DOM directamente
      }
      video.play().catch(commonPlayCatch);
    }
  };

  const handleRetry = () => { setHasError(false); setIsLoaded(false); setIsPlaying(false); };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    const container = playerContainerRef.current as HTMLElementWithFullscreen | null;
    const doc = document as DocumentWithFullscreen;
    const handleFsError = (err: unknown, context: string) => {
      if (err instanceof Error) { console.error(`Error en ${context}: ${err.name}, ${err.message}`); }
      else { console.error(`Error desconocido en ${context}:`, err); }
    };
    if (!video && !container) return;
    const isIOSWebKit = video && video.webkitEnterFullscreen;
    if (!isFullscreen) {
      let promise: Promise<void> | undefined;
      if (isIOSWebKit && video.webkitEnterFullscreen) { video.webkitEnterFullscreen(); }
      else if (container?.requestFullscreen) { promise = container.requestFullscreen(); }
      else if (container?.mozRequestFullScreen) { promise = container.mozRequestFullScreen(); }
      else if (container?.webkitRequestFullscreen) { promise = container.webkitRequestFullscreen(); }
      else if (container?.msRequestFullscreen) { promise = container.msRequestFullscreen(); }
      if (promise) promise.catch(err => handleFsError(err, "requestFullscreen"));
    } else {
      let promise: Promise<void> | undefined;
      if (isIOSWebKit && video.webkitExitFullscreen) { video.webkitExitFullscreen(); }
      else if (doc.exitFullscreen) { promise = doc.exitFullscreen(); }
      else if (doc.mozCancelFullScreen) { promise = doc.mozCancelFullScreen(); }
      else if (doc.webkitExitFullscreen) { promise = doc.webkitExitFullscreen(); }
      else if (doc.msExitFullscreen) { promise = doc.msExitFullscreen(); }
      if (promise) promise.catch(err => handleFsError(err, "exitFullscreen"));
    }
  };

  return (
    <div ref={playerContainerRef} className={`relative w-full aspect-video bg-black overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        muted={isMuted} // El estado `muted` es controlado por React
        loop
        playsInline
        preload="auto"
        className="w-full cursor-pointer"
        // CAMBIO 3: El clic en el video ahora siempre llama a la misma función.
        onClick={handlePlayToggle}
      />

      {/* --- (Indicador de carga y de error se mantienen igual) --- */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Cargando video...</p>
          </div>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
          <div className="text-white text-center">
            <p className="mb-4">Error al cargar el video</p>
            <button onClick={handleRetry} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Reintentar
            </button>
          </div>
        </div>
      )}
      {/* Se muestra si: el video está cargado, no hay error, el usuario NO ha interactuado Y se proporcionó un thumbnailUrl */}
      {isLoaded && !hasError && !hasUserInteracted && thumbnailUrl && (
        <div
          className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black"
          onClick={handlePlayToggle}
        >
          {/* Usamos next/image para optimización. 'fill' y 'object-cover' hacen que ocupe todo el div. */}
          <div className="flex justify-center items-center w-full h-full">
            <Image
              src={thumbnailUrl}
              alt="Poster del video"
              width={500} // Ajusta según tu tamaño deseado
              height={300} // Ajusta según tu tamaño deseado
              className="object-cover"
              priority
            />
          </div>
          {/* El botón de play se superpone a la imagen */}
          <div className="absolute">
            <button
              className="w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer bg-white/90 hover:bg-white text-black shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-125"
              aria-label="Reproducir"
            >
              <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Se muestra si: el video está pausado Y (no hay thumbnail O el usuario ya interactuó) */}
      {isLoaded && !hasError && !isPlaying && (!thumbnailUrl || hasUserInteracted) && (
        <div 
          className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 cursor-pointer" 
          onClick={handlePlayToggle}
        >
          <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 hover:bg-white text-black shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105" aria-label="Reproducir">
            <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" />
          </button>
        </div>
      )}
      {/* El botón de pantalla completa ahora solo depende de si el video está cargado */}
      {isLoaded && !hasError && (
        <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-20">
          <button
            onClick={toggleFullscreen}
            className="text-white p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label={isFullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      )}
    </div>
  );
}