import Image from 'next/image';

interface StepCardProps {
    title: string;
    subtitle: string;
    imageUrl: string;
    width: number;
    height: number;
}

export default function StepCard({ title, subtitle, imageUrl, width, height }: StepCardProps) {
    return (
        // El contenedor principal sigue siendo el punto de referencia con 'relative'
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl group">
            <Image
                src={imageUrl}
                alt={`Imagen para ${title}`}
                width={width}
                height={height}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                // La imagen ocupa todo el espacio y es la capa del fondo
                className="object-cover w-full h-full"
            />
            
            {/* Capa de Gradiente: Se posiciona sobre la imagen con un z-index de 10 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10 z-10" />

            {/* Capa de Texto: Se posiciona sobre TODO con un z-index de 20 */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold leading-tight text-balance">
                    {title}
                </h3>
                <p className="mt-2 text-lg text-white/90 leading-[1.4] text-balance">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}