'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function useKeyboardShortcuts() {
  const router = useRouter();
  const lastKeyRef = useRef<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if typing in inputs or textareas
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      const key = e.key.toLowerCase();

      // "g" prefix logic (e.g. g + d, g + m, etc.)
      if (lastKeyRef.current === 'g') {
        lastKeyRef.current = null;
        if (timerRef.current) clearTimeout(timerRef.current);

        switch (key) {
          case 'd':
            router.push('/dashboard');
            break;
          case 'm':
            router.push('/marketplace');
            break;
          case 'w':
            router.push('/workflow');
            break;
          case 'a':
            router.push('/analytics');
            break;
          case 'r':
            router.push('/registry');
            break;
          case 'v':
            router.push('/wallet');
            break;
        }
        return;
      }

      if (key === 'g') {
        lastKeyRef.current = 'g';
        timerRef.current = setTimeout(() => {
          lastKeyRef.current = null;
        }, 1000); // 1 second window
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [router]);
}
