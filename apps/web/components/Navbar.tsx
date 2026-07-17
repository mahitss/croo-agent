'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { useToast } from './Toast';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const setAuthModal = useAuthStore((state) => state.setAuthModal);
  
  const isAuthenticated = !!token && !!user;
  const authLoading = !mounted;

  const handleLogout = async () => {
    await logoutUser();
    setIsDropdownOpen(false);
    toast('Logged out successfully.', 'info');
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-black/55 backdrop-blur-[20px] border-b border-white/6 px-8 flex items-center justify-between shadow-sm">
      {/* LEFT: Logo & Brand Name */}
      <Link href={isAuthenticated ? "/workspaces" : "/"} className="flex items-center gap-3 select-none no-underline">
        <div className="w-[36px] h-[36px] rounded-xl bg-white flex items-center justify-center font-extrabold text-black text-xl">
          O
        </div>
        <span className="font-extrabold text-sm tracking-wider text-white/80 font-sans">
          ORBIT AI
        </span>
      </Link>

      {/* CENTER: Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/templates" className="text-xs font-medium text-gray-400 hover:text-white transition-colors font-sans no-underline">
          Templates
        </Link>
        <Link href="/pricing" className="text-xs font-medium text-gray-400 hover:text-white transition-colors font-sans no-underline">
          Pricing
        </Link>
        <Link href="/docs" className="text-xs font-medium text-gray-400 hover:text-white transition-colors font-sans no-underline">
          Docs
        </Link>
      </div>

      {/* RIGHT: Auth Controls */}
      <div className="flex items-center gap-6">
        {authLoading ? (
          <div className="w-[120px] h-8 rounded bg-white/5 animate-pulse" />
        ) : !isAuthenticated ? (
          <>
            <button
              onClick={() => setAuthModal(true, 'login')}
              className="text-xs font-medium text-white/80 hover:text-white transition-colors font-sans bg-transparent border-0 cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => setAuthModal(true, 'register')}
              className="border border-white/15 bg-white/4 hover:bg-white/8 text-white/80 hover:text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors font-sans cursor-pointer"
            >
              Register
            </button>
          </>
        ) : (
          <div className="relative" style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 focus:outline-none bg-transparent border-0 cursor-pointer text-left py-1"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4EA3FF] to-white flex items-center justify-center font-bold text-black text-xs select-none">
                {user.displayName && user.displayName.length > 0 
                  ? user.displayName.substring(0, 2).toUpperCase() 
                  : user.username && user.username.length > 0 
                    ? user.username.substring(0, 2).toUpperCase() 
                    : (user.email ? user.email.substring(0, 2).toUpperCase() : 'US')
                }
              </div>
              <span className="text-xs text-white/80 hover:text-white font-sans hidden md:inline max-w-[100px] truncate select-none">
                {user.displayName || user.username || 'User'}
              </span>
            </button>
            
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div 
                  className="absolute w-56 bg-black border border-white/10 rounded-xl shadow-2xl p-1.5 font-sans text-xs z-50 animate-in fade-in duration-100"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: '0',
                  }}
                >
                  {/* User Profile Header */}
                  <div className="px-3 py-2 border-b border-white/10 flex flex-col gap-0.5 select-none">
                    <span className="font-semibold text-white truncate">
                      {user.displayName || user.username || 'Mahit Saxena'}
                    </span>
                    <span className="text-[10px] text-gray-500 truncate">
                      {user.email || 'mahitsaxena008@gmail.com'}
                    </span>
                  </div>

                  {/* Dropdown Options */}
                  <div className="mt-1">
                    <Link 
                      href="/settings?tab=profile" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-left no-underline"
                    >
                      Settings
                    </Link>
                    <Link 
                      href="/settings?tab=security" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-left no-underline"
                    >
                      Account
                    </Link>
                    <Link 
                      href="/settings?tab=billing" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-left no-underline"
                    >
                      Billing
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all pointer-events-auto bg-transparent border-0 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
