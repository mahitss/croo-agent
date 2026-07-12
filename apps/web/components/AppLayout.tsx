'use client';

import { useEffect, useState } from 'react';
import { useNexusStore } from '../store/nexusStore';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const user = useNexusStore((state) => state.user);
  const token = useNexusStore((state) => state.token);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthenticated = !!token && !!user;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary-neon/20 border-t-primary-neon animate-spin" />
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
