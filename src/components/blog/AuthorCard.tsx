// src/components/blog/AuthorCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { SidebarCard } from './SidebarCard';

const socialLinks: { name: string; href: string }[] = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/hugoherreracoach/' },
  { name: 'Instagram', href: 'https://www.instagram.com/hugoherreracoach' },
  { name: 'YouTube', href: 'https://www.youtube.com/@hugoherreracoach' }
];

export const AuthorCard = () => {
  return (
    // Utilizamos el SidebarCard que creamos, con un estilo ligeramente distinto para destacarlo
    <SidebarCard title="Sobre el Autor" className="bg-gray-800/50 border border-blue-500/20 ring-0">
      <div className="flex items-center gap-4 -mt-4 mb-4">
        <Image
          src="/images/hugoAuthority.jpg" 
          alt="Hugo Herrera"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-bold text-white">Hugo Herrera</h3>
          <p className="text-sm text-blue-400">Coach & Estratega de Ventas</p>
        </div>
      </div>
      <p className="text-gray-300 text-sm">
        Ayudo a vendedores y empresas a construir sistemas de ventas predecibles para escalar sus ingresos.
      </p>
      <div className="mt-4 flex justify-center space-x-4 border-t border-gray-700 pt-4">
        {socialLinks.map(({ name, href }) => (
            <Link key={name} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 text-sm font-semibold transition-colors duration-200">
                {name}
            </Link>
        ))}
      </div>
    </SidebarCard>
  );
};