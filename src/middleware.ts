import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  const requestHeaders = new Headers(request.headers);

  // 1. Si la ruta ya empieza con /subdomains de manera explícita (ej. desarrollo local directo)
  if (url.pathname.startsWith('/subdomains')) {
    requestHeaders.set('x-is-subdomain', 'true');
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    });
  }

  // 2. Ignorar archivos de Next.js, API y recursos estáticos
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 3. Extraer el subdominio del host
  let subdomain = '';
  
  if (host.includes('localhost:3000')) {
    const parts = host.split('.');
    if (parts.length > 1 && parts[0] !== 'localhost:3000') {
      subdomain = parts[0];
    }
  } else {
    const parts = host.split('.');
    if (parts.length > 2) {
      if (parts[0] !== 'www') {
        subdomain = parts[0];
      }
    }
  }

  if (subdomain) {
    if (subdomain === 'lobos' || subdomain === 'lobosdeventas') {
      subdomain = 'lobosdeventas';
    }

    url.pathname = `/subdomains/${subdomain}${url.pathname}`;
    requestHeaders.set('x-is-subdomain', 'true');
    
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      }
    });
  }

  return NextResponse.next();
}
