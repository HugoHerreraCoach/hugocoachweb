//src/components/layout/Footer.tsx

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookA } from 'lucide-react';

// --- DEFINICIONES DE TIPOS (Intactas) ---
interface SocialLink {
    name: string;
    href: string;
    iconSrc: string;
}

interface FooterLink {
    label: string;
    href: string;
    isExternal?: boolean;
}

interface FooterColumn {
    title: string;
    links: readonly FooterLink[];
}

// --- CONFIGURACIÓN DE COLUMNAS (MODIFICADA PARA REFLEJAR TUS PRIORIDADES DENTRO DE 3 COLUMNAS) ---
const footerColumns: Readonly<FooterColumn[]> = [
    {
        title: 'Soluciones',
        links: [
            { label: 'Libro: Cerrador Experto', href: 'https://cerradorexperto.hugoherreracoach.com/', isExternal: true },
            { label: 'Libro: Líder Experto', href: 'https://liderexperto.hugoherreracoach.com/', isExternal: true },
            { label: 'Programa Lobos de Ventas', href: 'https://lobosdeventas.hugoherreracoach.com/', isExternal: true },
        ],
    },
    {
        title: 'Servicios',
        links: [
            { label: 'Aceleración Comercial', href: '/servicios/aceleracion-comercial' },
            { label: 'Conferencias', href: '/servicios/conferencias' },
        ],
    },
    {
        title: 'Recursos',
        links: [
            { label: 'Blog de Ventas', href: '/blog' },
            { label: 'Recursos Gratuitos', href: '/recursos' },
            { label: 'App con IA: TotalScript', href: 'https://totalscript.hugoherreracoach.com/', isExternal: true },
        ],
    },
];

// --- ÍCONOS SOCIALES (Intactos, como los proporcionaste) ---
const socialLinks: Readonly<SocialLink[]> = [
    { name: 'Instagram', href: 'https://www.instagram.com/hugoherreracoach', iconSrc: 'instagramIcon.png' },
    { name: 'Facebook', href: 'https://www.facebook.com/hugoherreracoach/', iconSrc: 'facebookIcon.png' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@hugoherreracoach', iconSrc: 'tiktokIcon.png' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/hugoherreracoach/', iconSrc: 'linkeinIcon.png' },
    { name: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=51900239201&text=%C2%A1Hola%20Hugo!%20%F0%9F%98%8A%20Vengo%20de%20tu%20p%C3%A1gina%20web.%20Mi%20nombre%20es...', iconSrc: 'whatsappIcon.png' },
    { name: 'YouTube', href: 'https://www.youtube.com/@hugoherreracoach', iconSrc: 'youtubeIcon.png' },
];

// El JSX del componente se mantiene exactamente como lo proporcionaste.
export default function Footer() {
    const currentYear: number = new Date().getFullYear();

    return (
        <footer className="bg-black text-white border-t border-gray-800/50">
            <div className="container mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3 gap-8">
                        {footerColumns.map((column) => (
                            <div key={column.title}>
                                <h3 className="text-sm font-bold tracking-wider uppercase text-gray-400">{column.title}</h3>
                                <ul className="mt-4 space-y-3">
                                    {column.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                target={link.isExternal ? '_blank' : '_self'}
                                                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                                                className="text-gray-300 hover:text-white transition-colors duration-200"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="md:col-start-2 lg:col-start-4 lg:col-span-2">
                        <Link href="https://api.whatsapp.com/send?phone=51900239201&text=%C2%A1Hola%20Hugo!%20%F0%9F%98%8A%20Vengo%20de%20tu%20p%C3%A1gina%20web.%20Mi%20nombre%20es..." target="_blank" rel="noopener noreferrer" className="group inline-flex items-center mb-2">
                            <h3 className="text-lg font-semibold text-white">Atención Personalizada</h3>
                            <ArrowRight size={18} className="ml-2 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-gray-400 text-base leading-relaxed">
                            Comunícate directamente para resolver dudas sobre coaching, programas o eventos.
                        </p>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col-reverse md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mt-6 md:mt-0">
                        {/* AVISO OFICIAL DE INDECOPI */}
                        <div className="mb-0">
                            <Link href="/libro-de-reclamaciones" className="inline-block">
                                <Image
                                    src="/images/libro-reclamaciones-aviso.png"
                                    alt="Aviso de Libro de Reclamaciones"
                                    width={145} 
                                    height={58}
                                    className="mx-auto md:mx-0"
                                />
                            </Link>
                        </div>

                        <p className="text-sm text-gray-500">© {currentYear} Todos los derechos reservados.</p>
                        <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
                            <Link href="/politica-de-privacidad" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Política de Privacidad</Link>
                            <Link href="/terminos-de-servicio" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Términos de Servicio</Link>
                            <Link
                                href="/libro-de-reclamaciones"
                                className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center"
                            >
                                <BookA size={14} className="mr-1" />
                                Libro de Reclamaciones
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-5">
                        {socialLinks.map((social) => {
                            // Aplicamos una clase de ajuste vertical solo si el ícono es el de YouTube.
                            const alignmentClass: string = social.name === 'YouTube' ? 'mt-3 w-8 h-8' : '';

                            return (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="text-gray-400 transition-colors flex items-center h-8 w-8 rounded-full"
                                >
                                    <Image
                                        src={`/icons/${social.iconSrc}`}
                                        alt={`Logo de ${social.name}`}
                                        width={128}
                                        height={128}
                                        // Concatenamos la clase de ajuste con las clases base.
                                        className={`h-6 w-6 object-contain ${alignmentClass}`}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}