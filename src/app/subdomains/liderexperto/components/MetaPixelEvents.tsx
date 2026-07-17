// Archivo en src/components/MetaPixelEvents.tsx
'use client' // MUY IMPORTANTE: Indica que es un componente de cliente

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Helper para obtener el valor de una cookie del navegador por su nombre
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    return null
  }
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

export default function MetaPixelEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // La siguiente línea se ha eliminado ya que no se usaba.

    // 1. Envía el evento PageView desde el navegador (Píxel)
    // Esto es importante para el retargeting y para que Meta aprenda rápido.
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView')
    }

    // 2. Envía el mismo evento PageView desde el servidor (API de Conversiones)
    // Esto asegura que el evento se registre aunque el usuario tenga bloqueadores.
    fetch('/api/meta/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'PageView',
        eventSourceUrl: window.location.href,
        // Enviamos las cookies _fbp y _fbc para mejorar la coincidencia
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
      }),
    })
    .catch(err => {
      // Opcional: manejar errores si la llamada a la API falla
      console.error("Error sending PageView to CAPI:", err);
    });

  }, [pathname, searchParams]) // El array asegura que solo se ejecute cuando cambia la URL

  return null // Este componente no renderiza nada visible
}
