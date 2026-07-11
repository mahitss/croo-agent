'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function SettingsErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception context
    console.error('[SETTINGS_ERROR_BOUNDARY] Client-side render crashed:', error);
  }, [error]);

  return (
    <div className="flex-1 bg-bg-dark flex items-center justify-center p-6 font-mono text-xs">
      <div className="glass-card max-w-lg w-full border border-border-dark p-8 rounded-2xl text-center shadow-xl">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 text-red-400">
          <AlertTriangle className="w-5 h-5 text-secondary-neon" />
        </div>
        <h2 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2">Component Execution Fault</h2>
        <p className="text-[10px] text-gray-500 leading-relaxed mb-6 uppercase">
          A client-side exception occurred while rendering the Settings workspace.
        </p>
        
        {/* Error Details */}
        <div className="bg-black/60 border border-border-dark rounded-xl p-4 text-left mb-6 overflow-x-auto font-mono text-gray-400 leading-normal max-h-[120px] select-text">
          <div className="text-[10px] text-red-400 font-bold mb-1 uppercase">Error Details:</div>
          <div>{error.message || 'Unknown runtime error'}</div>
          {error.digest && <div className="text-[9px] text-gray-600 mt-1 uppercase">Digest: {error.digest}</div>}
        </div>

        <button
          onClick={reset}
          className="w-full bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-extrabold py-2.5 rounded-xl hover:brightness-110 transition-all font-mono flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reinitialize Component
        </button>
      </div>
    </div>
  );
}
