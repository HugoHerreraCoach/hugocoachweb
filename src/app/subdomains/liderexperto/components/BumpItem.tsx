// components/BumpItem.tsx

import { useState } from "react";
import type { FC, ReactNode, MouseEvent, ChangeEvent } from "react";
import Image from "next/image";

type BumpItemProps = {
  id: string;
  name: string;
  offerHeadline: string; // 👈 NUEVA PROP: "Oferta especial por única vez", "Upgrade Exclusivo"
  productTitle: string; // 👈 NUEVA PROP: "Audiolibro Líder Experto", "Clase grabada + Kit"
  price: number;
  isChecked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  shortDescription: string; // Esta será la descripción bajo el productTitle
  imageUrl: string;
  imageWidth?: number;
  imageHeight?: number;
  children: ReactNode; // Para los beneficios detallados expandibles
};

const BumpItem: FC<BumpItemProps> = ({
  id,
  name,
  offerHeadline,
  productTitle,
  price,
  isChecked,
  onChange,
  isDisabled = false,
  shortDescription,
  imageUrl,
  imageWidth, // Ajustado para el nuevo layout, podría ser un poco más grande
  imageHeight,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    // Al hacer clic en la label, se marca el checkbox.
    <label
      htmlFor={id}
      className={`border rounded-md p-4 flex flex-col items-start gap-3 cursor-pointer hover:border-green-500 transition-all duration-200
      ${
        isChecked
          ? "border-green-500 bg-green-50 ring-2 ring-green-200"
          : "border-gray-200"
      }`}
    >
      <div className="flex">
        {/* Columna de la Imagen (Más a la izquierda) */}
        <div className="flex-shrink-0 mt-1">
          <Image
            src={imageUrl}
            alt={productTitle} // Usamos productTitle para el alt
            width={imageWidth}
            height={imageHeight}
            className="max-w-[60px] mr-2"
          />
        </div>

        {/* Columna del Contenido Principal */}
        <div className="w-full">
          {/* Fila Superior: Checkbox, Offer Headline y Precio */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={id}
                name={name}
                checked={isChecked}
                onChange={onChange}
                className="h-5 w-5 text-green-600 border-gray-300 rounded mr-2 cursor-pointer" // Checkbox antes del texto
                disabled={isDisabled}
              />
              <span className="font-bold text-gray-800 leading-[1]">
                {offerHeadline}
              </span>
            </div>
            <span className="font-semibold text-green-600">
              S/{price.toFixed(2)}
            </span>
          </div>

          {/* Título del Producto/Oferta */}
          <h3 className="text-lg font-bold text-gray-900 mt-1 leading-[1.2]">
            {productTitle}
          </h3>

          {/* Descripción corta y enlace "ver más..." */}
          <div className="text-base text-black mt-1 leading-[1.4]">
            <p>
              {shortDescription}{" "}
              <span
                onClick={handleToggleExpand}
                className="font-bold text-blue-600 underline hover:text-blue-800 cursor-pointer"
              >
                {isExpanded ? "ver menos..." : "ver más..."}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Beneficios Detallados (Expandibles) */}
      <div
        className={`transition-all duration-500 leading-[1.4] text-lg ease-in-out overflow-hidden ${
          isExpanded ? "max-h-screen mt-2" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </label>
  );
};

export default BumpItem;
