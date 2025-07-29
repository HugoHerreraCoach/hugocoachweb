import type { ReactNode } from 'react';

interface SidebarCardProps {
  title: string;
  children: ReactNode;
  className?: string; 
}

export const SidebarCard = ({ title, children, className = '' }: SidebarCardProps) => {
  return (
    <div className={`bg-gray-900 rounded-xl p-6 ring-1 ring-gray-700/50 ${className}`}>
      <h4 className="text-xl font-bold text-white mb-4">{title}</h4>
      {children}
    </div>
  );
};