'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { useToast } from './Toast';
import { 
  Search, 
  Bell, 
  Wallet, 
  Cpu, 
  ChevronDown, 
  Building2, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  User, 
  Sparkles,
  Command
} from 'lucide-react';
import CommandPalette from './CommandPalette';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWorkspaceDropdown, setIsWorkspaceDropdown] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('Default Enterprise Workspace');
  const [mode, setMode] = useState<'demo' | 'live'>('demo');
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const setAuthModal = useAuthStore((state) => state.setAuthModal);
  
  const isAuthenticated = mounted && !!token && !!user;
  const authLoading = !mounted;

  const handleLogout = async () => {
    await logoutUser();
    setIsDropdownOpen(false);
    toast('Logged out successfully.', 'info');
    router.push('/');
  };

  const handleToggleMode = () => {
    const nextMode = mode === 'demo' ? 'live' : 'demo';
    setMode(nextMode);
    toast(`Switched to ${nextMode === 'demo' ? 'Demo Sandbox' : 'Live Mainnet'} environment.`, 'info');
  };

  const notificationsList = [
    { id: '1', title: 'Swarm Completed', text: 'Research Consensus Swarm finished 3-node run.', time: '5m ago' },
    { id: '2', title: 'Escrow Released', text: '1.50 USDC transferred to agent-search-1.', time: '20m ago' },
    { id: '3', title: 'Node Installed', text: 'Clinical EHR Mapper added to canvas.', time: '1h ago' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-[64px] bg-[#050505]/90 backdrop-blur-xl border-b border-[#232323] px-6 flex items-center justify-between shadow-lg font-sans select-none">
        
        {/* LEFT: Logo, Brand & Workspace Selector */}
        <div className="flex items-center gap-6">
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2.5 select-none no-underline group">
            <div className="w-8 h-8 rounded-xl bg-[#4EA3FF] flex items-center justify-center font-extrabold text-black text-lg shadow-lg group-hover:scale-105 transition-transform">
              O
            </div>
            <span className="font-extrabold text-sm tracking-wider text-white font-sans">
              ORBIT <span className="text-[#4EA3FF]">AI</span>
            </span>
          </Link>

          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setIsWorkspaceDropdown(!isWorkspaceDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-white/5 border border-[#232323] text-xs font-semibold text-gray-300 hover:text-white cursor-pointer transition-all"
              >
                <Building2 className="w-3.5 h-3.5 text-[#4EA3FF]" />
                <span className="max-w-[140px] truncate">{selectedWorkspace}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {isWorkspaceDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsWorkspaceDropdown(false)} />
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#111111] border border-[#232323] rounded-2xl shadow-2xl p-2 z-50 text-xs font-sans space-y-1">
                    {['Default Enterprise Workspace', 'Production Swarm Cluster', 'Staging Sandbox'].map((ws) => (
                      <button
                        key={ws}
                        onClick={() => {
                          setSelectedWorkspace(ws);
                          setIsWorkspaceDropdown(false);
                          toast(`Switched to workspace "${ws}".`, 'info');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-all border-0 cursor-pointer ${
                          selectedWorkspace === ws ? 'bg-[#4EA3FF]/10 text-[#4EA3FF] font-semibold' : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        {ws}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* CENTER: Global Search Command Trigger */}
        {isAuthenticated && (
          <button
            onClick={() => setIsCmdOpen(true)}
            className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-xl bg-[#111111] hover:bg-white/5 border border-[#232323] text-gray-400 hover:text-gray-200 text-xs transition-all cursor-pointer w-72 justify-between"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-gray-500" />
              <span>Search platform, workflows, nodes...</span>
            </span>
            <kbd className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-400 flex items-center gap-0.5">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
        )}

        {/* RIGHT: Controls, Telemetry & User Profile */}
        <div className="flex items-center gap-4">
          {authLoading ? (
            <div className="w-[120px] h-8 rounded-xl bg-white/5 animate-pulse" />
          ) : !isAuthenticated ? (
            <>
              <button
                onClick={() => setAuthModal(true, 'login')}
                className="text-xs font-semibold text-gray-300 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => setAuthModal(true, 'register')}
                className="border-0 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow"
              >
                Register
              </button>
            </>
          ) : (
            <>
              {/* Environment Switcher */}
              <button
                onClick={handleToggleMode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-semibold border transition-all cursor-pointer ${
                  mode === 'demo'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${mode === 'demo' ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
                <span>{mode === 'demo' ? 'Demo Sandbox' : 'Live Mainnet'}</span>
              </button>

              {/* Running Executions Pill */}
              <Link
                href="/dashboard"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111111] border border-[#232323] text-gray-300 text-xs font-mono no-underline hover:border-white/10"
              >
                <Cpu className="w-3.5 h-3.5 text-[#4EA3FF] animate-spin" />
                <span>2 Swarms</span>
              </Link>

              {/* Wallet Credit Pill */}
              <Link
                href="/wallet"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111111] border border-[#232323] text-white text-xs font-mono font-bold no-underline hover:border-white/10"
              >
                <Wallet className="w-3.5 h-3.5 text-purple-400" />
                <span>$150.00 USDC</span>
              </Link>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 bg-[#111111] hover:bg-white/5 border border-[#232323] text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-[#4EA3FF] absolute top-1.5 right-1.5 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-[#4EA3FF] absolute top-1.5 right-1.5" />
                </button>

                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 w-80 bg-[#111111] border border-[#232323] rounded-2xl shadow-2xl p-4 z-50 text-xs font-sans space-y-3">
                      <div className="flex items-center justify-between border-b border-[#232323] pb-2">
                        <span className="font-bold text-white font-mono uppercase text-[10px]">Platform Notifications</span>
                        <span className="text-[10px] text-[#4EA3FF] cursor-pointer">Mark all read</span>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {notificationsList.map((n) => (
                          <div key={n.id} className="p-2 rounded-xl bg-[#050505] border border-[#232323] space-y-0.5">
                            <div className="flex justify-between font-semibold text-white">
                              <span>{n.title}</span>
                              <span className="text-[9px] text-gray-500 font-mono">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-gray-400 leading-relaxed">{n.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* User Profile Menu */}
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2.5 focus:outline-none bg-transparent border-0 cursor-pointer text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#4EA3FF] to-purple-400 flex items-center justify-center font-bold text-black text-xs select-none shadow">
                    {user.displayName && user.displayName.length > 0 
                      ? user.displayName.substring(0, 2).toUpperCase() 
                      : user.username && user.username.length > 0 
                        ? user.username.substring(0, 2).toUpperCase() 
                        : (user.email ? user.email.substring(0, 2).toUpperCase() : 'US')
                    }
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                </button>
                
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div 
                      className="absolute top-full right-0 mt-2 w-56 bg-[#111111] border border-[#232323] rounded-2xl shadow-2xl p-2 font-sans text-xs z-50 space-y-1"
                    >
                      <div className="px-3 py-2 border-b border-[#232323] space-y-0.5">
                        <p className="font-semibold text-white truncate">
                          {user.displayName || user.username || 'User Profile'}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate font-mono">
                          {user.email || 'operator@orbitai.dev'}
                        </p>
                      </div>

                      <Link 
                        href="/profile" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all no-underline"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        <span>User Profile</span>
                      </Link>

                      <Link 
                        href="/settings" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all no-underline"
                      >
                        <Settings className="w-4 h-4 text-gray-400" />
                        <span>Platform Settings</span>
                      </Link>

                      <div className="pt-1 border-t border-[#232323]">
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer border-0"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

      </nav>

      {/* Command Palette Modal */}
      <CommandPalette />
    </>
  );
}
