'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNexusStore } from '../store/nexusStore';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { 
  Cpu, 
  Layers, 
  TrendingUp, 
  Wallet, 
  PlusCircle, 
  Shuffle, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export default function Navbar() {
  useKeyboardShortcuts();
  const pathname = usePathname();
  const userWallet = useNexusStore((state) => state.userWallet);
  const isRunning = useNexusStore((state) => state.isRunning);

  const links = [
    { href: '/', label: 'Portal', icon: Cpu },
    { href: '/marketplace', label: 'Marketplace', icon: Shuffle },
    { href: '/workflow', label: 'Workflow Builder', icon: Layers },
    { href: '/dashboard', label: 'Dashboard', icon: TrendingUp },
    { href: '/analytics', label: 'Analytics', icon: TrendingUp },
    { href: '/wallet', label: 'USDC Wallet', icon: Wallet },
    { href: '/registry', label: 'Publish Agent', icon: PlusCircle },
    { href: '/admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <nav className="glass-card border-b border-border-dark py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-secondary-neon to-primary-neon flex items-center justify-center font-bold text-black text-lg transition-transform group-hover:rotate-12 duration-300">
            O
          </div>
          <span className="font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            ORBIT <span className="text-primary-neon font-normal text-sm tracking-widest ml-1 bg-none text-shadow-glow">AI</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors py-1.5 px-3 rounded-md ${
                  isActive
                    ? 'text-primary-neon bg-white/5 border border-primary-neon/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/2'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Wallet Status & Indicators */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isRunning ? 'bg-secondary-neon' : 'bg-primary-neon'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isRunning ? 'bg-secondary-neon' : 'bg-primary-neon'
              }`}></span>
            </span>
            <span className="text-xs text-gray-500 font-mono tracking-wider">
              {isRunning ? 'RUNNING_DAG' : 'NODE_CONNECTED'}
            </span>
          </div>

          <Link href="/wallet" className="flex items-center gap-2 bg-white/5 border border-border-dark hover:border-primary-neon/40 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all duration-300">
            <Wallet className="w-4 h-4 text-primary-neon" />
            <span className="text-sm font-mono font-bold text-white">
              {userWallet.balance.toFixed(2)} <span className="text-gray-400 text-xs">USDC</span>
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
