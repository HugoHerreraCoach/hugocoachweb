// src/hooks/useCountdownTimer.ts
"use client"
import { useState, useEffect } from 'react';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

interface UseCountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  onComplete?: () => void;
}

export const useCountdownTimer = ({
  initialHours = 0,
  initialMinutes = 15,
  initialSeconds = 0,
  onComplete
}: UseCountdownTimerProps = {}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer);
          if (onComplete) {
            onComplete();
          }
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  return {
    timeLeft,
    formatTime,
    isExpired: timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0
  };
};

// Componente opcional para mostrar el timer
interface CountdownDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
  formatTime: (time: number) => string;
}

export const CountdownDisplay = ({ hours, minutes, seconds, formatTime }: CountdownDisplayProps) => {
  return (
    <div className="w-full bg-gradient-to-b from-red-600 to-red-800 py-4 px-4">
      <div className="flex justify-center items-center gap-4">
        <div className="text-center">
          <div className="bg-black text-white px-3 py-2 rounded text-2xl md:text-3xl font-bold min-w-[60px]">
            {formatTime(hours)}
          </div>
          <div className="text-xs md:text-sm mt-1 font-medium">Horas</div>
        </div>
        <div className="text-center">
          <div className="bg-black text-white px-3 py-2 rounded text-2xl md:text-3xl font-bold min-w-[60px]">
            {formatTime(minutes)}
          </div>
          <div className="text-xs md:text-sm mt-1 font-medium">Minutos</div>
        </div>
        <div className="text-center">
          <div className="bg-black text-white px-3 py-2 rounded text-2xl md:text-3xl font-bold min-w-[60px]">
            {formatTime(seconds)}
          </div>
          <div className="text-xs md:text-sm mt-1 font-medium">Segundos</div>
        </div>
      </div>
    </div>
  );
};