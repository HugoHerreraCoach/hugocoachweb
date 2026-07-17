"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Maximize, Minimize } from "lucide-react";
import Image from "next/image";

// --- Definiciones de Tipos para la API de YouTube ---
// Para evitar 'any' y tener un tipado estricto.

enum YouTubePlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

interface YouTubeOnStateChangeEvent {
  data: YouTubePlayerState;
}

interface YouTubePlayer {
  destroy: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
}

// --- Definición de Props del Componente ---
interface YoutubePlayerProps {
  videoId: string;
  thumbnailUrl?: string;
  className?: string;
  triggerTime?: number;
  onTimeTrigger?: () => void;
}

export default function YoutubePlayer({
  videoId,
  thumbnailUrl,
  className = "",
  triggerTime,
  onTimeTrigger,
}: YoutubePlayerProps) {
  // --- Estados y Referencias ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isCssFullscreen, setIsCssFullscreen] = useState(false);

  const playerRef = useRef<YouTubePlayer | null>(null);
  const playerDivRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  // Tipado estricto con la interfaz nativa del navegador
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const triggerFiredRef = useRef(false);

  // --- Efecto Principal: Carga y Control de la API de YouTube ---
  useEffect(() => {
    const createPlayer = () => {
      if (!playerDivRef.current || playerRef.current || !(window as any).YT) return;

      playerRef.current = new (window as any).YT.Player(playerDivRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 0, controls: 0, rel: 0, loop: 1,
          playlist: videoId, playsinline: 1, iv_load_policy: 3,
          modestbranding: 1, fs: 0,
        },
        events: {
          'onReady': () => setIsLoaded(true),
          'onError': () => {
            setHasError(true);
            setIsLoaded(false);
          },
          'onStateChange': (event: YouTubeOnStateChangeEvent) => {
            if (event.data === YouTubePlayerState.PLAYING) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if (typeof (window as any).YT === 'undefined' || typeof (window as any).YT.Player === 'undefined') {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      (window as any).onYouTubeIframeAPIReady = createPlayer;
      document.head.appendChild(tag);
    } else {
      createPlayer();
    }

    return () => {
      playerRef.current?.destroy();
    };
  }, [videoId]);

  // --- Efecto para controlar el scroll en pantalla completa ---
  useEffect(() => {
    if (isCssFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCssFullscreen]);

  // --- Funciones de Control ---
  const handlePlayToggle = () => {
    if (!isLoaded || !playerRef.current) return;
    if (!hasUserInteracted) setHasUserInteracted(true);
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoaded(false);
    playerRef.current?.destroy();
    playerRef.current = null;
    if (window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady();
    }
  };
  
  const toggleCssFullscreen = useCallback(() => {
    setIsCssFullscreen(prev => !prev);
  }, []);

  // --- Wake Lock para mantener la pantalla encendida ---
  useEffect(() => {
    if (!('wakeLock' in navigator)) return;
    
    const manageWakeLock = async () => {
      if (isPlaying) {
        try {
          // La variable local también tiene tipado estricto
          const wakeLock: WakeLockSentinel = await navigator.wakeLock.request('screen');
          wakeLockRef.current = wakeLock;
        } catch (err) {
          console.error('Screen Wake Lock failed:', err);
        }
      } else {
        if (wakeLockRef.current) {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
        }
      }
    };
    
    manageWakeLock();
    
    return () => {
      wakeLockRef.current?.release().catch(() => {});
    };
  }, [isPlaying]);

  // --- Time Trigger ---
  useEffect(() => {
    if (!onTimeTrigger || typeof triggerTime === 'undefined') return;
    triggerFiredRef.current = false;
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        if (playerRef.current && !triggerFiredRef.current) {
          try {
            const currentTime = playerRef.current.getCurrentTime();
            if (currentTime >= triggerTime) {
              onTimeTrigger();
              triggerFiredRef.current = true;
              clearInterval(interval);
            }
          } catch (err) { console.error('Error getting current time:', err); }
        }
      }, 500);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isPlaying, triggerTime, onTimeTrigger]);

  // --- Renderizado ---
  return (
    <div
      ref={playerContainerRef}
      className={`relative w-full bg-black overflow-hidden ${className} ${
        isCssFullscreen ? 'simulated-fullscreen' : 'aspect-video'
      }`}
    >
      <div ref={playerDivRef} className="absolute inset-0 w-full h-full" />
      
      <div className="absolute inset-0 z-10" onClick={handlePlayToggle} />
      
      {!isLoaded && !hasError && ( 
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-40">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Cargando video...</p>
          </div>
        </div> 
      )}

      {hasError && ( 
        <div className="absolute inset-0 bg-black flex items-center justify-center z-40">
          <div className="text-white text-center">
            <p className="mb-4">Error al cargar el video</p>
            <button 
              onClick={handleRetry} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {isLoaded && !hasError && !hasUserInteracted && thumbnailUrl && ( 
        <div 
          className="absolute inset-0 z-30 flex cursor-pointer items-center justify-center bg-black" 
          onClick={handlePlayToggle}
        >
          <Image 
            src={thumbnailUrl} 
            alt="Poster del video"
            width={700}
            height={394}
            className="object-contain w-auto h-auto max-w-[90%] max-h-[90%]"
            priority 
          />
          <div className="absolute">
            <button 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer bg-white/90 hover:bg-white text-black shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110" 
              aria-label="Reproducir"
            >
              <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" />
            </button>
          </div>
        </div> 
      )}

      <div
        className={`absolute inset-0 bg-black flex items-center justify-center z-20 transition-opacity ease-in-out cursor-pointer ${
            !isPlaying ? 'duration-0' : 'duration-300'
          } ${
            isLoaded && !isPlaying && hasUserInteracted 
              ? 'opacity-100' 
              : 'opacity-0 pointer-events-none'
          }`}
        onClick={handlePlayToggle}
      >
        {thumbnailUrl && (
          <Image 
            src={thumbnailUrl} 
            alt="Video pausado"
            width={700}
            height={394}
            className="object-contain w-auto h-auto max-w-[90%] max-h-[90%]"
          />
        )}
        <div className="absolute">
          <button 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 hover:bg-white text-black cursor-pointer shadow-lg flex items-center justify-center"
            aria-label="Reproducir"
          >
            <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" />
          </button>
        </div>
      </div>

      {isLoaded && !hasError && ( 
        <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-50">
          <button 
            onClick={toggleCssFullscreen} 
            className="text-white p-2 hover:bg-white/20 rounded-full cursor-pointer transition-colors duration-200 bg-black/30 backdrop-blur-sm" 
            aria-label={isCssFullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"}
          >
            {isCssFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div> 
      )}
    </div>
  );
}