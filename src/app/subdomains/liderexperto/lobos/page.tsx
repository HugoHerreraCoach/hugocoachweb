import type { Metadata } from "next";
import OtoStart from "@liderexperto/lider/oto1/OtoStart";

// Páginas de oferta posteriores a la compra: no deben aparecer en buscadores.
export const metadata: Metadata = {
  title: "Oferta especial | Líder Experto",
  robots: { index: false, follow: false },
};

export default function PageLobos() {
  return (
    <>
      <div>
        <OtoStart/>
      </div>
    </>
  );
}