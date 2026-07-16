'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useNexusStore } from '../store/nexusStore';
import { useAuthStore } from '../store/authStore';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function AppSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-dark text-gray-400 font-mono text-xs">
      {/* Navbar skeleton */}
      <header className="h-16 border-b border-border-dark flex items-center justify-between px-6 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 animate-pulse" />
          <div className="w-20 h-4 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-24 h-8 bg-white/5 rounded-xl animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
        </div>
      </header>

      <div className="flex flex-grow relative overflow-hidden">
        {/* Sidebar skeleton */}
        <aside className="w-64 border-r border-border-dark p-5 flex flex-col gap-6 bg-black/20">
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full h-9 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        </aside>

        {/* Main area skeleton */}
        <main className="flex-1 p-6 md:p-10 flex flex-col gap-6 overflow-y-auto">
          <div className="flex items-center gap-4 pb-6 border-b border-border-dark">
            <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="w-48 h-5 bg-white/5 rounded animate-pulse" />
              <div className="w-64 h-3 bg-white/5 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse-slow">
            <div className="md:col-span-1 h-64 bg-white/5 rounded-2xl border border-border-dark/60" />
            <div className="md:col-span-2 h-96 bg-white/5 rounded-2xl border border-border-dark/60" />
          </div>
        </main>
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
    '/register'
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

  if (!mounted || isCheckingAuth) {
    return <AppSkeleton />;
  }

  // If page is protected and user is not authenticated, continue showing skeleton while redirect resolves
  if (!isAuthenticated && !isPublicRoute) {
    return <AppSkeleton />;
  }

  if (pathname === '/') {
    return (
      <div className="min-h-screen flex flex-col bg-bg-dark">
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
