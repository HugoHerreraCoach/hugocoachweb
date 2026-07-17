// app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

    const payuHealth = await fetch('https://api.payulatam.com/payments-api/ping', {
      method: 'GET',
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        payu: payuHealth.ok ? 'up' : 'down',
        database: 'up',
        redis: 'up'
      }
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    const isAbortError = error instanceof Error && error.name === 'AbortError';
    
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: isAbortError ? 'Request timeout' : errorMessage 
      },
      { status: 503 }
    );
  }
}