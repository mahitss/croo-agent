'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Workflow, 
  Activity, 
  Store, 
  Wallet, 
  ShieldAlert, 
  Settings, 
  Bot,
  Rocket,
  FolderGit2,
  BookOpen,
  PlusCircle
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname() || '';

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { 
      name: 'Workspace', 
      href: '/workspaces', 
      icon: Workflow,
      subItems: [
        { name: 'My Workflows', href: '/workspaces', icon: FolderGit2 },
        { name: 'Create Workflow', href: '/workspace/new', icon: PlusCircle },
        { name: 'Templates', href: '/templates', icon: BookOpen },
      ]
    },
    { name: 'Marketplace', href: '/marketplace', icon: Store },
    { name: 'Agents', href: '/agents', icon: Bot },
    { name: 'Analytics', href: '/analytics', icon: Activity },
    { name: 'Billing', href: '/wallet', icon: Wallet },
    { name: 'Deployments', href: '/deployments', icon: Rocket },
    { name: 'Administration', href: '/admin', icon: ShieldAlert },
    { name: 'Settings', href: '/settings', icon: Settings },
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
              <div key={item.name} className="flex flex-col gap-0.5">
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all no-underline ${
                    isActive
                      ? 'bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#4EA3FF]' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                </Link>

                {item.subItems && (
                  <div className="ml-4 pl-3 border-l border-[#232323] flex flex-col gap-0.5 my-1">
                    {item.subItems.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all no-underline ${
                            isSubActive
                              ? 'text-[#4EA3FF] font-semibold bg-white/5'
                              : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                          }`}
                        >
                          <SubIcon className="w-3.5 h-3.5" />
                          <span>{sub.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
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
