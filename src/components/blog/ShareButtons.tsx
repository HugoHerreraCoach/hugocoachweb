'use client';

import { usePathname } from 'next/navigation';
import { Linkedin, MessageCircle, Twitter } from 'lucide-react';
import { SidebarCard } from './SidebarCard';
import type { LucideIcon } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
}

export const ShareButtons = ({ title }: ShareButtonsProps) => {
  const pathname = usePathname();
  // Aseguramos el dominio base para que los enlaces funcionen en producción
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.hugoherreracoach.com' 
    : 'http://localhost:3000';
  const url = `${baseUrl}${pathname}`;

  const shareLinks: { name: string; href: string; Icon: LucideIcon }[] = [
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      Icon: Linkedin,
    },
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${url}`)}`,
      Icon: MessageCircle,
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      Icon: Twitter,
    },
  ];

  return (
    <SidebarCard title="Compartir Dossier">
      <div className="flex space-x-3">
        {shareLinks.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir en ${name}`}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-blue-600 rounded-lg text-sm font-semibold transition-colors duration-200 text-gray-200 hover:text-white"
          >
            <Icon className="h-4 w-4" />
            <span>{name}</span>
          </a>
        ))}
      </div>
    </SidebarCard>
  );
};