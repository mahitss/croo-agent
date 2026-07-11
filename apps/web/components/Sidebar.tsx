'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard,
  Layers, 
  TrendingUp, 
  PlusCircle, 
  ShieldCheck, 
  Settings, 
  LogOut
} from 'lucide-react';
import { useNexusStore } from '../store/nexusStore';

export default function Sidebar() {
  const pathname = usePathname();
  
  const isSidebarCollapsed = useNexusStore((state) => state.isSidebarCollapsed);
  const isMobileSidebarOpen = useNexusStore((state) => state.isMobileSidebarOpen);
  const setMobileSidebarOpen = useNexusStore((state) => state.setMobileSidebarOpen);
  const logoutUser = useNexusStore((state) => state.logoutUser);

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/workflow', label: 'Workflow Builder', icon: Layers },
    { href: '/analytics', label: 'Analytics', icon: TrendingUp },
    { href: '/registry', label: 'Publish Agent', icon: PlusCircle },
    { href: '/admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <>
      {/* Mobile Backdrop Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden transition-opacity duration-250 animate-in fade-in"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel Container */}
      <aside 
        className={`fixed md:relative inset-y-0 left-0 h-full md:h-auto z-[9999] md:z-10 flex flex-col justify-between border-r border-border-dark bg-black/95 transition-all duration-250 ease-in-out font-mono flex-shrink-0 ${
          isSidebarCollapsed ? 'md:w-[72px]' : 'md:w-[280px]'
        } ${
          isMobileSidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full md:translate-x-0 w-0 md:w-auto overflow-hidden md:overflow-visible'
        }`}
      >
        {/* Sidebar Header (sticky / flex-shrink-0) */}
        <div className="flex items-center justify-between p-6 border-b border-border-dark flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-secondary-neon to-primary-neon flex items-center justify-center font-bold text-black text-lg transition-transform hover:rotate-12 duration-300">
              O
            </div>
            <span className={`font-extrabold text-xl tracking-wider text-white transition-all duration-200 ${
              isSidebarCollapsed ? 'md:hidden' : 'block'
            }`}>
              ORBIT <span className="text-primary-neon font-normal text-sm tracking-widest ml-1 text-shadow-glow">AI</span>
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-grow py-6 overflow-y-auto space-y-1.5 px-3">
          {!isSidebarCollapsed && (
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4 px-3 font-mono hidden md:block">
              Navigation
            </div>
          )}
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`group relative flex items-center rounded-xl text-xs transition-all duration-200 py-3 ${
                  isSidebarCollapsed ? 'justify-center px-0' : 'px-3 gap-3'
                } ${
                  isActive
                    ? 'text-primary-neon bg-primary-neon/10 border border-primary-neon/30 shadow-[0_0_15px_rgba(0,255,204,0.15)] font-extrabold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary-neon' : 'text-gray-400 group-hover:text-white'}`} />
                
                {/* Label - hidden if collapsed */}
                <span className={`transition-opacity duration-200 ${isSidebarCollapsed ? 'md:hidden' : 'block'}`}>
                  {link.label}
                </span>

                {/* Tooltip - visible only if collapsed */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-black/95 border border-border-dark text-[10px] text-white rounded-lg font-mono pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl hidden md:block">
                    {link.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-border-dark space-y-3 flex-shrink-0">
          {/* Settings Button */}
          <Link
            href="/settings"
            onClick={() => setMobileSidebarOpen(false)}
            className={`group relative w-full flex items-center rounded-xl text-xs transition-all duration-200 py-3 ${
              isSidebarCollapsed ? 'justify-center px-0' : 'px-3 gap-3'
            } ${
              pathname === '/settings'
                ? 'text-primary-neon bg-primary-neon/10 border border-primary-neon/30 shadow-[0_0_15px_rgba(0,255,204,0.15)] font-extrabold'
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent font-medium'
            }`}
          >
            <Settings className={`w-4 h-4 flex-shrink-0 ${pathname === '/settings' ? 'text-primary-neon' : 'text-gray-400 group-hover:text-white'}`} />
            <span className={isSidebarCollapsed ? 'md:hidden' : 'block'}>Settings</span>
            
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-black/95 border border-border-dark text-[10px] text-white rounded-lg font-mono pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl hidden md:block">
                Settings
              </div>
            )}
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => {
              setMobileSidebarOpen(false);
              logoutUser();
            }}
            className={`group relative w-full flex items-center rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all border border-transparent py-3 ${
              isSidebarCollapsed ? 'justify-center px-0' : 'px-3 gap-3'
            }`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className={isSidebarCollapsed ? 'md:hidden' : 'block'}>Logout</span>
            
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-black/95 border border-border-dark text-[10px] text-red-400 rounded-lg font-mono pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl hidden md:block">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
