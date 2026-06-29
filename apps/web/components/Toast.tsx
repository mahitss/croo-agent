'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast Overlay stack */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          let borderClass = 'border-border-dark bg-card-dark';
          let Icon = Info;
          let iconColor = 'text-accent-blue';

          if (t.type === 'success') {
            borderClass = 'border-primary-neon/30 bg-primary-neon/5 shadow-[0_0_15px_rgba(0,255,204,0.1)]';
            Icon = CheckCircle2;
            iconColor = 'text-primary-neon';
          } else if (t.type === 'error') {
            borderClass = 'border-red-500/30 bg-red-500/5';
            Icon = AlertCircle;
            iconColor = 'text-red-500';
          }

          return (
            <div 
              key={t.id}
              className={`pointer-events-auto glass-card border p-4 rounded-xl flex items-start gap-3 transition-all duration-300 transform translate-y-0 opacity-100 ${borderClass}`}
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
              <div className="flex-grow text-xs font-mono text-gray-200 pr-2 leading-relaxed">
                {t.message}
              </div>
              <button 
                onClick={() => removeToast(t.id)}
                className="text-gray-500 hover:text-white shrink-0 p-0.5 rounded transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
