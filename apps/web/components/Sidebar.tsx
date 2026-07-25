'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Workflow, 
  Activity, 
  Store, 
  Wallet, 
  UploadCloud, 
  ShieldAlert, 
  Settings, 
  User, 
  BookOpen 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname() || '';

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Workflow Builder', href: '/workspace/new', icon: Workflow },
    { name: 'Templates', href: '/templates', icon: BookOpen },
    { name: 'Analytics', href: '/analytics', icon: Activity },
    { name: 'Marketplace', href: '/marketplace', icon: Store },
    { name: 'Wallet', href: '/wallet', icon: Wallet },
    { name: 'Publish Agent', href: '/publish', icon: UploadCloud },
    { name: 'Admin', href: '/admin', icon: ShieldAlert },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0B0B0B] border-r border-[#232323] flex flex-col justify-between p-4 font-sans select-none min-h-[calc(100vh-80px)]">
      <div className="flex flex-col gap-2">
        <div className="px-3 py-2 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
          Platform Navigation
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all no-underline ${
                  isActive
                    ? 'bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#4EA3FF]' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Network Badge */}
      <div className="p-3 bg-[#111111] border border-[#232323] rounded-xl flex items-center justify-between text-[10px] font-mono text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CROO Mainnet</span>
        </span>
        <span className="text-gray-500">v2.4.0</span>
      </div>
    </aside>
  );
}
