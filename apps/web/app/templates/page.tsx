'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TemplatesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Templates section has been removed and integrated directly into Unified Builder
    router.replace('/workspace/new');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-xs font-mono text-gray-400">
      Redirecting to Unified Builder...
    </div>
  );
}
