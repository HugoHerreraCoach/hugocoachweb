// src/components/blog/ReadingProgressBar.tsx

'use client';

import { useState, useEffect } from 'react';

export const ReadingProgressBar = () => {
  const [width, setWidth] = useState<number>(0);

  const scrollHeight = (): void => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight || document.body.scrollHeight;
    
    // Evitar división por cero si el contenido no es lo suficientemente largo
    if (scrollHeight - el.clientHeight === 0) {
      setWidth(0);
      return;
    }

    const percent = (scrollTop / (scrollHeight - el.clientHeight)) * 100;
    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-1.5 bg-gray-800/50 backdrop-blur-sm">
      <div 
        className="h-1.5 bg-blue-600 shadow-lg shadow-blue-500/50 transition-all duration-75 ease-out" 
        style={{ width: `${width}%` }} 
      />
    </div>
  );
};