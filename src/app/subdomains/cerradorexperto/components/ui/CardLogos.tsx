import Image from 'next/image';

// Un componente genérico para mostrar un logo
const Logo = ({ src, alt }: { src: string; alt: string }) => (
    <Image src={src} alt={alt} width={60} height={40} className="object-contain" />
);

// Mapeo de 'issuer' a la ruta de tu imagen en la carpeta `public`
const logoMap: { [key: string]: string } = {
    visa: '/subdomains/cerradorexperto/icons/visaIcon.jpg',
    mastercard: '/subdomains/cerradorexperto/icons/mastercardIcon.jpg',
    amex: '/subdomains/cerradorexperto/icons/amexIcon.jpg',
    dinersclub: '/subdomains/cerradorexperto/icons/dinersIcon.jpg',
    // Agrega otros si los tienes
};

export function getCardLogo(issuer: string) {
    const src = logoMap[issuer] || '/subdomains/cerradorexperto/icons/defaultIcon.png'; // Ten una imagen por defecto
    const alt = `${issuer} logo`;

    // Prevenimos renderizar una imagen rota si el issuer es desconocido y no hay default
    if (!logoMap[issuer]) {
        return (
            <div className="w-[60px] h-[40px] bg-slate-200 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
            </div>
        );
    }

    return <Logo src={src} alt={alt} />;
}