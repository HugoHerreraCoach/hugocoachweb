// src/components/ui/YoutubePlayer.tsx
'use client';

import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { Play, Maximize, Minimize } from 'lucide-react';
import Image from 'next/image';

// --- Tipos (Sin cambios) ---
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
    getIframe: () => HTMLIFrameElement;
}
declare global {
    interface Window {
        onYouTubeIframeAPIReady?: () => void;
        YT?: {
            Player: new (elementId: string, options: object) => YouTubePlayer;
            PlayerState: typeof YouTubePlayerState;
        };
    }
}

// --- Props (Sin cambios) ---
interface YoutubePlayerProps {
    videoId: string;
    thumbnailUrl?: string;
    className?: string;
    triggerTime?: number;
    onTimeTrigger?: () => void;
}

// --- Lógica de API (Sin cambios) ---
let apiPromise: Promise<void> | null = null;
const loadYouTubeAPI = (): Promise<void> => {
    if (apiPromise) {
        return apiPromise;
    }
    apiPromise = new Promise((resolve) => {
        if (typeof window !== 'undefined' && window.YT?.Player) {
            resolve();
            return;
        }
        window.onYouTubeIframeAPIReady = () => {
            resolve();
        };
        if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
        }
    });
    return apiPromise;
};

export default function YoutubePlayer({
    videoId,
    thumbnailUrl,
    className = '',
    triggerTime,
    onTimeTrigger,
}: YoutubePlayerProps) {
    // --- Hooks de Estado (Sin cambios) ---
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
    const [isCssFullscreen, setIsCssFullscreen] = useState<boolean>(false);

    // --- Refs y IDs (Sin cambios) ---
    const playerRef = useRef<YouTubePlayer | null>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const wakeLockRef = useRef<WakeLockSentinel | null>(null);
    const triggerFiredRef = useRef<boolean>(false);
    const uniqueId = useId();
    const playerDivId = `Youtubeer-${videoId}-${uniqueId}`;

    const effectiveThumbnailUrl: string = thumbnailUrl ?? `http://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // --- Efectos (Sin cambios) ---
    useEffect(() => {
        let isComponentMounted = true;
        const initializePlayer = () => {
            if (!isComponentMounted || playerRef.current || !window.YT) return;
            playerRef.current = new window.YT.Player(playerDivId, {
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    rel: 0,
                    loop: 1,
                    playlist: videoId,
                    playsinline: 1,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    fs: 0,
                },
                events: {
                    onReady: () => {
                        if (isComponentMounted) setIsLoaded(true);
                    },
                    onError: () => {
                        if (isComponentMounted) {
                            setHasError(true);
                            setIsLoaded(false);
                        }
                    },
                    onStateChange: (event: YouTubeOnStateChangeEvent) => {
                        if (!isComponentMounted) return;
                        setIsPlaying(event.data === YouTubePlayerState.PLAYING);
                    },
                },
            });
        };

        loadYouTubeAPI()
            .then(() => {
                initializePlayer();
            })
            .catch(() => {
                if (isComponentMounted) setHasError(true);
            });

        return () => {
            isComponentMounted = false;
            playerRef.current?.destroy();
            playerRef.current = null;
        };
    }, [videoId, playerDivId]);

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

    // --- Funciones de control (Sin cambios) ---
    const handlePlayToggle = () => {
        if (!isLoaded || !playerRef.current) return;
        if (!hasUserInteracted) setHasUserInteracted(true);

        const iframe = playerRef.current.getIframe();
        iframe.focus();

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const toggleCssFullscreen = useCallback(() => {
        setIsCssFullscreen(prev => !prev);
    }, []);

    // ...otros efectos y funciones sin cambios...
    useEffect(() => {
        if (!('wakeLock' in navigator)) return;
        const manageWakeLock = async () => {
            if (isPlaying) {
                try {
                    wakeLockRef.current = await navigator.wakeLock.request('screen');
                } catch (err) { console.log(err) }
            } else if (wakeLockRef.current) {
                await wakeLockRef.current.release();
                wakeLockRef.current = null;
            }
        };
        manageWakeLock();
        return () => {
            wakeLockRef.current?.release().catch(() => { });
        };
    }, [isPlaying]);

    useEffect(() => {
        if (!onTimeTrigger || typeof triggerTime === 'undefined') return;
        let interval: NodeJS.Timeout | undefined;
        if (isPlaying) {
            triggerFiredRef.current = false;
            interval = setInterval(() => {
                if (playerRef.current && !triggerFiredRef.current) {
                    try {
                        const currentTime = playerRef.current.getCurrentTime();
                        if (currentTime >= triggerTime) {
                            onTimeTrigger();
                            triggerFiredRef.current = true;
                            clearInterval(interval);
                        }
                    } catch (err) {console.log(err)}
                }
            }, 500);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying, onTimeTrigger, triggerTime]);

    // --- Renderizado ---
    return (
        <div
            ref={playerContainerRef}
            className={`relative w-full bg-black overflow-hidden ${className} ${isCssFullscreen ? 'simulated-fullscreen' : 'aspect-video'
                }`}
        >
            <div id={playerDivId} className="absolute inset-0 w-full h-full" />

            {/* Capa de interacción principal */}
            <div className="absolute inset-0 z-10" onClick={handlePlayToggle} />

            {/* Overlays de estado */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            )}

            {isLoaded && !hasError && !hasUserInteracted && thumbnailUrl && (
                <div
                    className="absolute inset-0 z-30 flex cursor-pointer items-center justify-center bg-black"
                    onClick={handlePlayToggle}
                >
                    <Image src={effectiveThumbnailUrl} alt="Poster del video" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
                    <div className="absolute">
                        <button className="w-20 h-20 rounded-full cursor-pointer bg-white/90 hover:bg-white text-black shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110" aria-label="Reproducir">
                            <Play className="w-10 h-10 ml-1" />
                        </button>
                    </div>
                </div>
            )}

            {/* Overlay de Pausa */}
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20 transition-opacity ease-in-out cursor-pointer ${isLoaded && !isPlaying && hasUserInteracted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={handlePlayToggle}
            >
                <button className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-black cursor-pointer shadow-lg flex items-center justify-center" aria-label="Reproducir">
                    <Play className="w-10 h-10 ml-1" />
                </button>
            </div>

            {/* ✅ CAMBIO AQUÍ: z-50 -> z-40 */}
            {isLoaded && !hasError && (
                <div className="absolute bottom-3 right-3 z-40">
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