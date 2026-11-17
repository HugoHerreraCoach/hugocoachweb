# `info.hugoherreracoach.com` — Hub de conversión orgánica hacia ConexiGO

Documentación técnica y comercial del subdominio `info.hugoherreracoach.com` (`src/app/subdomains/info/`), utilizado como enlace principal en la biografía de Instagram (`@hugoherreracoach`) y redes orgánicas de Hugo Herrera.

## 1. Enrutamiento y Aislamiento de Layout

- **`src/middleware.ts`**: Vive dentro de `src/` (al mismo nivel que `src/app/` para que Next.js 16 lo registre tanto en `next dev` como en `next build`). Detecta el subdominio `info` en el host (`info.hugoherreracoach.com` o `info.localhost`), reescribe internamente hacia `/subdomains/info` e inyecta la cabecera `x-is-subdomain: true`.
- **`src/app/layout.tsx` y `src/app/subdomains/info/layout.tsx`**: Cuando `x-is-subdomain === 'true'`, el layout raíz omite `<Menu />` y `<Footer />` del sitio corporativo principal. `src/app/subdomains/info/layout.tsx` define únicamente los metadatos SEO/OpenGraph canónicos en español y el contenedor `.info-hub-root` sin volver a abrir `<html>`, `<body>` ni `<main>`.

## 2. Jerarquía Comercial y UX/UI

La vista se diseña **Mobile-First (`360px`)** pensando en el navegador interno de Instagram:

1. **Cabecera compacta + barra de salto rápido (`HeroSection.tsx`)**:
   - Muestra identidad verificada de Hugo Herrera (`Fundador de ConexiGO · Entrenador de Ventas`) y tres pruebas reales en cifras tabulares (`+20,000` entrenados, `120+` equipos comerciales, `4.9 ★` en Google).
   - Barra sticky de 1 fila (`ConexiGO IA`, `Libros`, `Recursos`, `Empresas`) con compensación `scroll-margin-top` (`.info-anchor-section`) para no ocultar encabezados al saltar.
2. **Bloque #1 protagonista — ConexiGO + Migo IA (`ConexigoShowcaseSection.tsx`)**:
   - Cabina en **Liquid Glass de 4 capas** (halo ambiental controlado, `backdrop-filter: blur(22px) saturate(165%)`, borde especular cenital `inset 0 1px 0` y tarjetas internas opacas con radios concéntricos `rounded-[28px]` → `rounded-2xl`).
   - Único botón primario rojo (`#ff2000`) de toda la página: **«Probar Migo IA y ver planes»** + botón secundario de cristal **«Hablar por WhatsApp»**, ambos visibles en el primer pantallazo móvil (`360×780`) sin hacer scroll.
   - Escenario visual con capturas reales de la Bandeja omnicanal y configuración de Migo IA (`priority` en la imagen candidata a LCP).
3. **Bloque #2 — Libros y generador de guiones (`BooksAndToolsSection.tsx`)**:
   - Grilla compacta de 3 tarjetas opacas: *Líder Experto* (libro físico gratis cubriendo envío), *Cerrador Experto* ($7 USD) y *TotalScript IA* (gratis).
4. **Bloque #3 — Recursos gratuitos (`ToolboxSection.tsx`)**:
   - Los 4 descargables gratuitos (*Radiografía Comercial*, *Mapa de Objeciones*, *Guion de Calificación* e *Inducción en 30 Días*) adaptados por `@container` query (`recurso-slot`).
5. **Bloque #4 — Empresas y conferencias (`CtaSection.tsx`)**:
   - Llamada gratuita de 20 minutos con un asesor del equipo (`LLAMADA_GRATIS_URL`) y enlace directo a `/servicios/aceleracion-comercial`.

## 3. Reglas de Atribución hacia ConexiGO

Definidas en `src/app/subdomains/info/lib/info-catalogo.utils.ts`:

- **Web (`conexigo.com`)**: `construirUrlConexigoDesdeInfo` agrega `utm_source=instagram`, `utm_medium=bio_info`, `utm_campaign=perfil_hugo` y `utm_content` diferenciado (`hero_cta_principal` vs. `footer_link`), eliminando explícitamente cualquier parámetro `origen` para conservar `web-principal` en el pasaporte de Meta Pixel + CAPI de `conexigo.com` y no mezclar tráfico orgánico con conjuntos de anuncios pagados.
- **WhatsApp Comercial (`+51 938 530 423`)**: `construirUrlWhatsappConexigo` dirige al canal oficial de ventas de ConexiGO con mensaje corto prellenado identificando que la persona viene del Instagram de Hugo.

## 4. Verificación

```bash
node --test scripts/test-info-subdomain.mjs
npx next typegen && npx tsc --noEmit
```
