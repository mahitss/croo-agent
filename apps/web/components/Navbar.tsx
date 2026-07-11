'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNexusStore } from '../store/nexusStore';
import { useToast } from './Toast';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { 
  Cpu, 
  Layers, 
  TrendingUp, 
  Wallet, 
  PlusCircle, 
  Shuffle, 
  ShieldCheck,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
  Settings
} from 'lucide-react';

const isProd = process.env.NODE_ENV === 'production';
const console = {
  log: (...args: any[]) => {
    if (!isProd) globalThis.console.log(...args);
  },
  warn: (...args: any[]) => {
    if (!isProd) globalThis.console.warn(...args);
  },
  error: (...args: any[]) => {
    globalThis.console.error(...args);
  },
  debug: (...args: any[]) => {
    if (!isProd) globalThis.console.debug(...args);
  },
  info: (...args: any[]) => {
    if (!isProd) globalThis.console.info(...args);
  }
};

export default function Navbar() {
  useKeyboardShortcuts();
  const pathname = usePathname();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsLargeDesktop(window.innerWidth >= 1536);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDemoMode = useNexusStore((state) => state.isDemoMode);
  const demoWallet = useNexusStore((state) => state.demoWallet);
  const liveWallet = useNexusStore((state) => state.liveWallet);
  const userWallet = isDemoMode ? demoWallet : liveWallet;
  
  const user = useNexusStore((state) => state.user);
  const token = useNexusStore((state) => state.token);
  const logoutUser = useNexusStore((state) => state.logoutUser);
  const setAuthModal = useNexusStore((state) => state.setAuthModal);
  
  const toggleDemoMode = useNexusStore((state) => state.toggleDemoMode);

  const toggleSidebar = useNexusStore((state) => state.toggleSidebar);
  const isMobileSidebarOpen = useNexusStore((state) => state.isMobileSidebarOpen);
  const setMobileSidebarOpen = useNexusStore((state) => state.setMobileSidebarOpen);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (!token || !user) return;
    e.preventDefault();
    if (window.innerWidth < 768) {
      setMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (token) {
      const isExpired = () => {
        try {
          const parts = token.split('.');
          if (parts.length !== 3) return true;
          const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
          if (payload && typeof payload.exp === 'number') {
            return payload.exp < Math.floor(Date.now() / 1000);
          }
          return false;
        } catch (e) {
          return true;
        }
      };

      if (isExpired()) {
        console.warn('[JWT_CHECK] Token has expired. Logging out.');
        logoutUser();
      }
    }
  }, [token, logoutUser]);

  const isAuthenticated = !!token && !!user;
  const authLoading = !mounted;
  const session = token;
  const walletConnected = !!userWallet.address && userWallet.address !== '0x0000000000000000000000000000000000000000';

  console.log("Navbar State Update:", {
    isAuthenticated,
    user,
    session: !!session,
    walletConnected,
    authLoading
  });

  globalThis.console.log("Navbar State Update:", {
    isAuthenticated,
    user,
    session: !!session,
    walletConnected,
    authLoading
  });

  const leftLinks = isAuthenticated && user
    ? [
        { href: '/', label: 'Portal', icon: Cpu },
        { href: '/marketplace', label: 'Marketplace', icon: Shuffle },
      ]
    : [
        { href: '/', label: 'Portal', icon: Cpu },
        { href: '/marketplace', label: 'Marketplace', icon: Shuffle },
        { href: '/workflow', label: 'Workflow Builder', icon: Layers },
        { href: '/dashboard', label: 'Dashboard', icon: TrendingUp },
      ];



  console.log("Rendering Login/Register", {
    isAuthenticated,
    user,
    authLoading
  });

  return (
    <>
      <nav 
      className="glass-card border-b border-border-dark py-4 px-6 sticky top-0 z-50 box-border"
      style={{
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div 
        className="max-w-7xl mx-auto flex items-center justify-between"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <Link 
            href="/" 
            onClick={handleLogoClick}
            className={`flex items-center gap-2 group flex-shrink-0 ${
              isAuthenticated ? 'cursor-pointer hover:opacity-85 select-none' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-secondary-neon to-primary-neon flex items-center justify-center font-bold text-black text-lg transition-transform group-hover:rotate-12 duration-300">
              O
            </div>
            <span className="font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              ORBIT <span className="text-primary-neon font-normal text-sm tracking-widest ml-1 bg-none text-shadow-glow">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {leftLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-xs lg:text-sm font-medium transition-colors py-1.5 px-3 rounded-md flex-shrink-0 ${
                    isActive
                      ? 'text-primary-neon bg-white/5 border border-primary-neon/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/2'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CENTER SECTION */}
        <div className="flex-grow" />

        {/* RIGHT SECTION */}
        <div 
          className="flex items-center gap-4 flex-shrink-0"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {mounted && isAuthenticated && user && (
            <Link 
              href="/wallet" 
              className="flex items-center gap-2 bg-white/5 border border-border-dark hover:border-primary-neon/40 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all duration-300"
              style={{
                flexShrink: 0,
                maxWidth: 'fit-content',
                whiteSpace: 'nowrap',
              }}
            >
              <Wallet className="w-4 h-4 text-primary-neon" />
              <span className="text-sm font-mono font-bold text-white">
                {mounted ? userWallet.balance.toFixed(2) : '0.00'} <span className="text-gray-400 text-xs">USDC</span>
              </span>
            </Link>
          )}

          {mounted && isAuthenticated && user && (
            <button
              onClick={toggleDemoMode}
              className={`text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md border tracking-wider transition-all duration-300 flex-shrink-0 ${
                isDemoMode
                  ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 hover:bg-yellow-400/30'
                  : 'bg-primary-neon/20 border-primary-neon text-primary-neon hover:bg-primary-neon/30'
              }`}
              title="Toggle execution mode between demo sandbox and production live payments"
            >
              <span>{!isDemoMode ? 'Live Mode' : 'Demo Mode'}</span>
            </button>
          )}

          <div 
            className={`flex items-center gap-2 ${
              isAuthenticated && user ? 'border-l border-border-dark pl-4' : ''
            }`}
            style={{ 
              position: 'relative',
              flexShrink: 0,
              display: 'flex',
              gap: '12px'
            }}
          >
            {(() => {
              console.log("Rendering Login/Register", {
                isAuthenticated,
                user,
                session: !!session,
                walletConnected,
                authLoading
              });
              return null;
            })()}
            {authLoading ? (
              <div 
                className="flex items-center gap-2"
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  gap: '12px'
                }}
              >
                <button
                  onClick={() => setAuthModal(true, 'login')}
                  className="text-xs font-bold text-gray-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/5 transition-all font-mono"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthModal(true, 'register')}
                  className="bg-primary-neon text-black text-xs font-extrabold px-3 py-1.5 rounded-md hover:brightness-110 transition-all font-mono"
                >
                  Register
                </button>
              </div>
            ) : (!isAuthenticated || !user) ? (
              <div 
                className="flex items-center gap-2"
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  gap: '12px'
                }}
              >
                <button
                  onClick={() => setAuthModal(true, 'login')}
                  className="text-xs font-bold text-gray-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/5 transition-all font-mono"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthModal(true, 'register')}
                  className="bg-primary-neon text-black text-xs font-extrabold px-3 py-1.5 rounded-md hover:brightness-110 transition-all font-mono"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="relative group" style={{ position: 'relative' }}>
                  <button className="flex items-center gap-1.5 focus:outline-none">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-neon to-accent-blue flex items-center justify-center font-bold text-black text-xs">
                      {user.displayName && user.displayName.length > 0 
                        ? user.displayName.substring(0, 2).toUpperCase() 
                        : user.username && user.username.length > 0 
                          ? user.username.substring(0, 2).toUpperCase() 
                          : (user.email ? user.email.substring(0, 2).toUpperCase() : 'US')
                      }
                    </div>
                    <span className="text-xs text-gray-300 hover:text-white font-mono hidden lg:inline max-w-[80px] truncate">
                      {user.displayName || user.username || user.email || 'User'}
                    </span>
                  </button>
                  
                  {/* Dropdown Menu Wrapper (Bridges the hover gap and secures high z-index & pointer-events) */}
                  <div 
                    className="absolute w-48 hidden group-hover:block hover:block animate-in fade-in duration-100"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: '0',
                      zIndex: 9999,
                    }}
                  >
                    <div className="bg-black border border-border-dark rounded-xl shadow-xl p-1.5 font-mono text-xs">
                      <div className="px-3 py-2 border-b border-border-dark text-[10px] text-gray-500 uppercase tracking-wider">
                        Role: <span className="text-primary-neon font-bold">{user.role}</span>
                      </div>
                      <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        Dashboard
                      </Link>
                      <Link href="/wallet" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        Wallet ({userWallet.balance.toFixed(2)} USDC)
                      </Link>
                      <button
                        onClick={logoutUser}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all pointer-events-auto"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>

      </div>
    </nav>
    </>
  );
}
