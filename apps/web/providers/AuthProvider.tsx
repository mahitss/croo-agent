'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore, UserProfile } from '../store/authStore';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  initializationState: 'UNINITIALIZED' | 'CHECKING_SESSION' | 'AUTHENTICATED' | 'UNAUTHENTICATED';
  role: string;
  rememberMe: boolean;
  
  // Auth Actions
  loginUser: (u: string, p: string) => Promise<boolean>;
  registerUser: (e: string, u: string, p: string, d?: string, r?: string) => Promise<boolean>;
  loginWithGoogle: (idToken: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  logoutEverywhere: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  hasRole: (requiredRoles: string | string[]) => boolean;
  setAuthModal: (open: boolean, tab?: 'login' | 'register' | 'forgot' | 'verify') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const initializationState = useAuthStore((state) => state.initializationState);
  const rememberMe = useAuthStore((state) => state.rememberMe);

  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const loginUser = useAuthStore((state) => state.loginUser);
  const registerUser = useAuthStore((state) => state.registerUser);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const logoutEverywhere = useAuthStore((state) => state.logoutEverywhere);
  const setAuthModal = useAuthStore((state) => state.setAuthModal);

  useEffect(() => {
    setMounted(true);
    console.log('[AUTH_PROVIDER] Initializing session restoration manager...');
    initializeAuth();

    // Prevent third-party Web3 browser extension errors (MetaMask inpage.js) from breaking Next.js UI overlay
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.message || event.reason || '';
      if (
        typeof reason === 'string' &&
        (reason.includes('MetaMask') ||
         reason.includes('inpage.js') ||
         reason.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
         reason.includes('user rejected') ||
         reason.includes('User rejected the request'))
      ) {
        event.preventDefault();
        console.warn('[WEB3_PROVIDER] Third-party wallet extension event handled gracefully:', reason);
      }
    };

    const handleError = (event: ErrorEvent) => {
      const msg = event.message || '';
      const filename = event.filename || '';
      if (
        msg.includes('MetaMask') ||
        filename.includes('inpage.js') ||
        filename.includes('chrome-extension://')
      ) {
        event.preventDefault();
        console.warn('[WEB3_PROVIDER] Third-party extension script error suppressed:', msg);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
      window.addEventListener('error', handleError);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        window.removeEventListener('error', handleError);
      }
    };
  }, [initializeAuth]);

  const userRole = user?.role || 'user';

  const hasRole = (requiredRoles: string | string[]): boolean => {
    if (!isAuthenticated || !user) return false;
    if (typeof requiredRoles === 'string') {
      return userRole === requiredRoles || userRole === 'admin';
    }
    return requiredRoles.includes(userRole) || userRole === 'admin';
  };

  const refreshSession = async (): Promise<boolean> => {
    console.log('[AUTH_PROVIDER] Manual session refresh requested.');
    return initializeAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isCheckingAuth,
        initializationState,
        role: userRole,
        rememberMe,
        loginUser,
        registerUser,
        loginWithGoogle,
        logoutUser,
        logoutEverywhere,
        refreshSession,
        hasRole,
        setAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route Wrapper Component
export const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string | string[] }> = ({ children, requiredRole }) => {
  const { isAuthenticated, isCheckingAuth, initializationState, hasRole, setAuthModal } = useAuth();
  
  if (isCheckingAuth || initializationState === 'UNINITIALIZED' || initializationState === 'CHECKING_SESSION') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-gray-400 font-mono text-xs">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#4EA3FF] animate-spin" />
          <div>[SESSION_MANAGER] Verifying enterprise identity session...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-6 font-sans">
        <div className="bg-[#111111] border border-[#232323] p-8 rounded-2xl max-w-md w-full text-center flex flex-col gap-4">
          <h2 className="text-xl font-bold">Authentication Required</h2>
          <p className="text-sm text-gray-400">Please sign in to your enterprise workspace to continue.</p>
          <button
            onClick={() => setAuthModal(true, 'login')}
            className="w-full bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black font-semibold py-2.5 rounded-xl transition-all cursor-pointer border-0 mt-2"
          >
            Sign In to Workspace
          </button>
        </div>
      </div>
    );
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-6 font-sans">
        <div className="bg-[#111111] border border-red-500/20 p-8 rounded-2xl max-w-md w-full text-center flex flex-col gap-4">
          <h2 className="text-xl font-bold text-red-400">Access Restricted</h2>
          <p className="text-sm text-gray-400">Your account role ({useAuthStore.getState().user?.role || 'user'}) does not have permission to access this resource.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Role Guard Wrapper Component
export const RoleGuard: React.FC<{ children: React.ReactNode; roles: string | string[]; fallback?: React.ReactNode }> = ({ children, roles, fallback = null }) => {
  const { hasRole } = useAuth();
  if (!hasRole(roles)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
};
