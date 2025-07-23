"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

// --- DEFINICIONES DE TIPOS ---

interface SubMenuItemType {
  label: string;
  href: string;
  description: string;
  isExternal?: boolean;
}

interface MegaMenuSection {
  sectionTitle: string;
  items: SubMenuItemType[];
}

interface NavItem {
  label:string;
  href?: string;
  isMegaMenu?: boolean;
  content?: MegaMenuSection[];
  subMenu?: SubMenuItemType[];
}

// --- CONFIGURACIÓN DE LA NAVEGACIÓN (ACTUALIZADA) ---

const navConfig: NavItem[] = [
  {
    label: 'Soluciones',
    isMegaMenu: true,
    content: [
      {
        sectionTitle: 'PARA VENDEDORES',
        items: [
          { label: 'Libro: Cerrador Experto', href: 'https://cerradorexperto.hugoherreracoach.com/', isExternal: true, description: '139 maneras de resolver objeciones.' },
          { label: 'Programa Lobos de Ventas', href: 'https://lobosdeventas.hugoherreracoach.com/', isExternal: true, description: 'Formación de alto rendimiento en 30 días.' },
          { label: 'Coaching 1:1', href: '/servicios/coaching-uno-a-uno', description: 'Potencia tu negocio con sesiones personalizadas.' },
        ]
      },
      {
        sectionTitle: 'PARA LÍDERES Y EMPRESAS',
        items: [
          { label: 'Libro: Líder Experto', href: 'https://liderexperto.hugoherreracoach.com/', isExternal: true, description: 'Crea equipos de élite que vendan más y mejor.' },
          { label: 'Entrenamiento para Equipos', href: '/servicios/entrenamiento-equipos', description: 'Convierte a tu equipo en una fuerza de élite.' },
          { label: 'Asesoría en Gestión Comercial', href: '/servicios/asesoria-comercial', description: 'Diseña un sistema de ventas que escale.' },
          { label: 'Software y Embudos a Medida', href: '/servicios/desarrollo-software', description: 'Infraestructura digital para crecer.' },
          { label: 'Conferencias', href: '/servicios/conferencias', description: 'Impacto y motivación para tu evento.' },
        ]
      }
    ]
  },
  {
    label: 'Recursos',
    // 'Casos de Éxito' fue movido a 'Sobre Mí'
    subMenu: [
      { label: 'Blog de Ventas', href: '/blog', description: 'Estrategias y guías para dominar las ventas.' },
      { label: 'Recursos Gratuitos', href: '/recursos', description: 'Herramientas y plantillas para aplicar hoy.' },
      { label: 'App con IA: TotalScript', href: 'https://totalscript.app/', isExternal: true, description: 'Genera guiones de venta en segundos.' },
    ]
  },
  {
    label: 'Sobre Mí',
    // Ahora es un menú desplegable
    subMenu: [
        { label: 'Mi Historia', href: '/mi-historia', description: 'Conoce la trayectoria y filosofía de Hugo.' },
        { label: 'Casos de Éxito', href: '/casos-de-exito', description: 'Resultados reales de nuestros clientes.' },
    ]
  },
];

// --- COMPONENTE REACT (Sin cambios en el JSX) ---

export default function OptimizedMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string): void => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleLinkClick = (): void => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  // Componente reutilizable para los enlaces del submenú
  const SubMenuItem = ({ item }: { item: SubMenuItemType }) => (
    <Link
      href={item.href}
      target={item.isExternal ? '_blank' : '_self'}
      rel={item.isExternal ? 'noopener noreferrer' : undefined}
      className="group/subitem block p-3 transition-colors rounded-lg hover:bg-gray-800"
      onClick={handleLinkClick}
    >
      <p className="font-semibold text-white">{item.label}</p>
      <p className="text-sm text-gray-400 group-hover/subitem:text-gray-300">{item.description}</p>
    </Link>
  );

  return (
    <header className="relative bg-black text-white p-4 lg:px-8 z-50 shadow-md shadow-gray-900/50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl lg:text-2xl font-bold uppercase tracking-wider" onClick={handleLinkClick}>
          HUGO HERRERA
        </Link>

        {/* --- MENÚ DE ESCRITORIO CON MEGamenú --- */}
        <nav className="hidden lg:flex items-center space-x-8 text-base font-semibold">
          {navConfig.map((item) => (
            <div key={item.label} className="group relative">
              <div className="flex items-center space-x-1 cursor-pointer py-4">
                {item.href ? (
                  <Link href={item.href}><span>{item.label}</span></Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {(item.subMenu || item.isMegaMenu) && <ChevronDown size={16} className="mt-1 transition-transform group-hover:rotate-180" />}
              </div>

              {/* Menú Desplegable Normal */}
              {item.subMenu && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 hidden group-hover:block pt-3">
                  <div className="bg-black border border-gray-800 rounded-lg shadow-2xl p-2 space-y-1">
                    {item.subMenu.map((subItem) => <SubMenuItem key={subItem.label} item={subItem} />)}
                  </div>
                </div>
              )}

              {/* Mega Menú para "Soluciones" */}
              {item.isMegaMenu && item.content && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[40rem] hidden group-hover:block pt-3">
                  <div className="bg-black border border-gray-800 rounded-lg shadow-2xl p-6">
                    <div className="grid grid-cols-2 gap-x-8">
                      {item.content.map(section => (
                        <div key={section.sectionTitle}>
                          <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-4">{section.sectionTitle}</h3>
                          <div className="space-y-1">
                            {section.items.map(subItem => <SubMenuItem key={subItem.label} item={subItem} />)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-6">
          <Link href="https://calendly.com/hugoherrera-coach/agendar-videollamada" target="_blank" rel="noopener noreferrer" className="bg-white text-black font-bold py-2.5 px-6 rounded-full hover:bg-gray-200 transition-transform hover:scale-105 text-base">
            AGENDAR LLAMADA
          </Link>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(true)} aria-label="Abrir menú">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* --- MENÚ OVERLAY PARA MÓVIL --- */}
      <div className={`fixed inset-0 bg-black text-white transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link href="/" className="text-xl font-bold uppercase tracking-wider" onClick={handleLinkClick}>
              HUGO HERRERA
            </Link>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menú">
              <X size={28} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4">
            <nav>
              <ul>
                {navConfig.map((item) => (
                  <li key={item.label} className="border-b border-gray-800">
                    <div className="flex items-center justify-between w-full py-4 text-lg" onClick={() => (item.subMenu || item.isMegaMenu) ? toggleDropdown(item.label) : undefined}>
                      {item.href ? (
                        <Link href={item.href} className="flex-grow" onClick={handleLinkClick}>
                          {item.label}
                        </Link>
                      ) : (
                        <span className="flex-grow">{item.label}</span>
                      )}
                      {(item.subMenu || item.isMegaMenu) && <ChevronDown size={24} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />}
                    </div>

                    {/* Lógica para desplegables en móvil */}
                    {openDropdown === item.label && (
                      <div className="pl-4 pb-2 space-y-2">
                        {item.subMenu?.map((subItem) => (
                          <Link key={subItem.label} href={subItem.href} target={subItem.isExternal ? '_blank' : '_self'} rel={subItem.isExternal ? 'noopener noreferrer' : undefined} className="block py-2 text-gray-400" onClick={handleLinkClick}>
                            {subItem.label}
                          </Link>
                        ))}
                        {item.isMegaMenu && item.content?.map(section => (
                          <div key={section.sectionTitle} className="pt-2">
                            <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-2">{section.sectionTitle}</h3>
                            {section.items.map(subItem => (
                              <Link key={subItem.label} href={subItem.href} target={subItem.isExternal ? '_blank' : '_self'} rel={subItem.isExternal ? 'noopener noreferrer' : undefined} className="block py-2 text-gray-400 pl-2" onClick={handleLinkClick}>
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="p-4 border-t border-gray-800">
            <Link href="https://calendly.com/hugoherrera-coach/agendar-videollamada" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-white text-black font-bold py-3 px-5 rounded-full hover:bg-gray-200 transition-colors text-base" onClick={handleLinkClick}>
              AGENDAR LLAMADA
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}