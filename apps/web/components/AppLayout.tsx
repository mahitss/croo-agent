'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import Navbar from './Navbar';

function AppSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-gray-400 font-sans text-xs">
      <header className="h-[80px] border-b border-white/6 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-[36px] h-[36px] rounded-xl bg-white/5 animate-pulse" />
          <div className="w-20 h-4 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-24 h-8 bg-white/5 rounded-xl animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
        </div>
      </header>

      <div className="flex flex-grow relative overflow-hidden items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-white/40 animate-spin" />
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || '';
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthenticated = !!token && !!user;
  
  const publicRoutes = [
    '/',
    '/pricing',
    '/docs',
    '/privacy',
    '/terms',
    '/about',
    '/careers',
    '/blog',
    '/login',
    '/register',
    '/templates'
  ];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Secure client-side redirect guard
  useEffect(() => {
    if (mounted && !isCheckingAuth && !isAuthenticated && !isPublicRoute) {
      console.warn(`[ROUTE_GUARD] Redirecting unauthenticated user from ${pathname} to portal`);
      const currentPath = window.location.pathname + window.location.search;
      window.location.href = `/?auth=login&redirect=${encodeURIComponent(currentPath)}`;
    }
  }, [mounted, isCheckingAuth, isAuthenticated, isPublicRoute, pathname]);

  // Immediate render for public routes to enable full SSR and prevent hydration mismatches
  if (isPublicRoute) {
    if (pathname === '/') {
      return (
        <div className="min-h-screen flex flex-col bg-[#050505]">
          <main className="flex-grow flex flex-col">
            {children}
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col bg-[#050505] text-white">
        <Navbar />
        <main className="flex-1 flex flex-col min-w-0 pt-[80px] relative z-10">
          {children}
        </main>
      </div>
    );
  }

  // Auth checking skeleton for protected routes
  if (!mounted || isCheckingAuth) {
    return <AppSkeleton />;
  }

  // Redirecting state skeleton
  if (!isAuthenticated) {
    return <AppSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />
      <main className="flex-1 flex flex-col min-w-0 pt-[80px] relative z-10">
        {children}
      </main>
    </div>
  );
}
