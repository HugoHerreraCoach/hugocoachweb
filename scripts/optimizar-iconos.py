#!/usr/bin/env python3
"""
Convierte una "hoja" de iconos generada con ChatGPT (iconos 3D sobre fondo negro)
en PNG sueltos, con transparencia y livianos, listos para next/image.

Uso:
    python3 scripts/optimizar-iconos.py HOJA.png nombre1 nombre2 ... [--tamano 256] [--max-kb 25]

Los nombres se asignan en orden de lectura (izquierda a derecha, arriba a abajo).
Salida: public/images/home/iconos/<nombre>.png

Pasos por icono:
1. Separa cada icono por componentes conectados sobre el fondo negro.
2. Negro -> transparencia (alfa = canal más brillante, color sin premultiplicar):
   el brillo queda semitransparente y se funde con fondos oscuros sin halo.
3. Recorta al contenido, centra en un lienzo cuadrado y redimensiona.
4. Cuantiza a paleta (<=256 colores con alfa) y guarda optimizado.
   Si pasa del presupuesto de KB, baja el tamaño de lado hasta cumplirlo.
"""

import argparse
import io
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "public" / "images" / "home" / "iconos"

UMBRAL_FONDO = 28        # brillo máximo (0-255) que se considera fondo negro
DILATACION = 18          # une los destellos y trazos de un mismo icono
AREA_MINIMA = 2500       # descarta motas sueltas
MARGEN_RELATIVO = 0.10   # aire alrededor del icono dentro del lienzo final


def cargar_hoja(ruta: Path) -> np.ndarray:
    return np.asarray(Image.open(ruta).convert("RGB"), dtype=np.float32)


def detectar_iconos(rgb: np.ndarray, cantidad: int) -> list[tuple[slice, slice]]:
    """Devuelve las cajas de los iconos en orden de lectura."""
    brillo = rgb.max(axis=2)
    mascara = brillo > UMBRAL_FONDO
    unida = ndimage.binary_dilation(mascara, iterations=DILATACION)
    etiquetas, total = ndimage.label(unida)
    cajas = ndimage.find_objects(etiquetas)

    candidatas = []
    for indice, caja in enumerate(cajas, start=1):
        if caja is None:
            continue
        area = int((etiquetas[caja] == indice).sum())
        if area >= AREA_MINIMA:
            candidatas.append((area, caja))

    if len(candidatas) < cantidad:
        sys.exit(f"Se esperaban {cantidad} iconos y se detectaron {len(candidatas)}. "
                 "Revisa la hoja (¿iconos pegados?) o ajusta DILATACION/UMBRAL_FONDO.")

    # Si hay de más, se quedan los más grandes.
    candidatas = sorted(candidatas, key=lambda c: c[0], reverse=True)[:cantidad]
    cajas_ok = [c[1] for c in candidatas]

    # Orden de lectura: se agrupa por filas según la posición vertical del centro.
    centros = [((c[0].start + c[0].stop) / 2, (c[1].start + c[1].stop) / 2, c) for c in cajas_ok]
    centros.sort(key=lambda t: t[0])
    alto_medio = np.mean([c[0].stop - c[0].start for c in cajas_ok])
    filas: list[list] = []
    for cy, cx, caja in centros:
        if filas and abs(cy - filas[-1][0][0]) < alto_medio * 0.6:
            filas[-1].append((cy, cx, caja))
        else:
            filas.append([(cy, cx, caja)])
    ordenadas = []
    for fila in filas:
        fila.sort(key=lambda t: t[1])
        ordenadas.extend(t[2] for t in fila)
    return ordenadas


def negro_a_transparente(rgb: np.ndarray) -> Image.Image:
    """Alfa = canal más brillante; el color se divide por el alfa para no oscurecer los bordes."""
    alfa = rgb.max(axis=2) / 255.0
    alfa = np.clip((alfa - 0.02) / 0.98, 0, 1)  # limpia el negro casi puro
    seguro = np.maximum(alfa, 1e-4)[..., None]
    color = np.clip(rgb / 255.0 / seguro, 0, 1)
    rgba = np.dstack([color, alfa[..., None]])
    return Image.fromarray((rgba * 255).astype(np.uint8), "RGBA")


def encuadrar(imagen: Image.Image, lado: int) -> Image.Image:
    """Recorta al contenido visible y lo centra en un lienzo cuadrado con aire."""
    caja = imagen.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()
    if caja:
        imagen = imagen.crop(caja)
    interior = int(lado * (1 - 2 * MARGEN_RELATIVO))
    imagen.thumbnail((interior, interior), Image.LANCZOS)
    lienzo = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    lienzo.paste(imagen, ((lado - imagen.width) // 2, (lado - imagen.height) // 2), imagen)
    return lienzo


def guardar_liviano(imagen: Image.Image, destino: Path) -> int:
    cuantizada = imagen.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
    buffer = io.BytesIO()
    cuantizada.save(buffer, format="PNG", optimize=True)
    destino.write_bytes(buffer.getvalue())
    return len(buffer.getvalue())


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("hoja", type=Path, help="PNG de la hoja de iconos")
    parser.add_argument("nombres", nargs="+", help="nombres de archivo, en orden de lectura")
    parser.add_argument("--tamano", type=int, default=256, help="lado final en px (por defecto 256)")
    parser.add_argument("--max-kb", type=int, default=25, help="presupuesto por icono en KB")
    args = parser.parse_args()

    SALIDA.mkdir(parents=True, exist_ok=True)
    rgb = cargar_hoja(args.hoja)
    cajas = detectar_iconos(rgb, len(args.nombres))

    total = 0
    for nombre, (filas, columnas) in zip(args.nombres, cajas):
        recorte = rgb[filas, columnas]
        transparente = negro_a_transparente(recorte)
        lado = args.tamano
        while True:
            peso = guardar_liviano(encuadrar(transparente, lado), SALIDA / f"{nombre}.png")
            if peso <= args.max_kb * 1024 or lado <= 128:
                break
            lado -= 32
        total += peso
        aviso = "" if peso <= args.max_kb * 1024 else "  <- sobre el presupuesto"
        print(f"{nombre:28s} {lado}px  {peso / 1024:5.1f} KB{aviso}")

    print(f"Total: {total / 1024:.0f} KB en {len(args.nombres)} iconos")


if __name__ == "__main__":
    main()
