import { create } from 'zustand';
import { apiClient } from '../lib/api-client';

const isProd = process.env.NODE_ENV === 'production';
const console = {
  log: (...args: any[]) => {
    if (!isProd) globalThis.console.log(...args);
  },
  warn: (...args: any[]) => {
    if (!isProd) globalThis.console.warn(...args);
  },
  error: (...args: any[]) => {
    globalThis.console.error(...args);
  },
  debug: (...args: any[]) => {
    if (!isProd) globalThis.console.debug(...args);
  },
  info: (...args: any[]) => {
    if (!isProd) globalThis.console.info(...args);
  }
};

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'creator' | 'admin';
  displayName?: string;
  avatarUrl?: string;
  emailVerified?: boolean;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isDemoMode: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'forgot' | 'verify';
  
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (val: boolean) => void;

  initializeAuth: () => void;
  setAuthModal: (open: boolean, tab?: 'login' | 'register' | 'forgot' | 'verify') => void;
  toggleDemoMode: () => void;
  loginUser: (usernameOrEmail: string, password: string) => Promise<boolean>;
  registerUser: (email: string, username: string, password: string, displayName?: string, role?: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  loginOAuth: (provider: 'google' | 'github') => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<boolean>;
  verifyEmail: (code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  return {
    user: null,
    token: null,
    isDemoMode: true,
    isAuthModalOpen: false,
    authModalTab: 'login',
    isSidebarCollapsed: false,
    isMobileSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    setMobileSidebarOpen: (val) => set({ isMobileSidebarOpen: val }),

    initializeAuth: () => {
      if (typeof window === 'undefined') return;
      console.log('[AUTH_STORE] App startup: Initializing auth state from localStorage...');
      const storedDemoMode = localStorage.getItem('orbit_demomode');
      const token = localStorage.getItem('orbit_token');
      const userStr = localStorage.getItem('orbit_user');
      
      const parsedUser = userStr ? JSON.parse(userStr) : null;
      console.log('[AUTH_STORE] Token restored:', token ? 'YES' : 'NO', 'User:', parsedUser ? parsedUser.username : 'GUEST');
      
      set({
        isDemoMode: storedDemoMode === null ? true : storedDemoMode === 'true',
        token: token || null,
        user: parsedUser
      });
    },

    setAuthModal: (open, tab = 'login') => {
      console.log(`[AUTH_STORE] setAuthModal: open=${open}, tab=${tab}`);
      set({ isAuthModalOpen: open, authModalTab: tab });
    },

    toggleDemoMode: () => {
      const currentMode = get().isDemoMode;
      const nextMode = !currentMode;
      console.log('[AUTH_STORE] toggleDemoMode: switching to', nextMode ? 'DEMO' : 'LIVE');
      set({ isDemoMode: nextMode });
      localStorage.setItem('orbit_demomode', String(nextMode));
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('nexus_mode_changed', { detail: { mode: nextMode ? 'demo' : 'live' } }));
      }
    },

    loginUser: async (usernameOrEmail, password) => {
      console.log('[AUTH_STORE] loginUser initiated for:', usernameOrEmail);
      try {
        const res = await apiClient.post<any>('/api/v1/auth/login', { usernameOrEmail, password });
        if (res.success && res.data) {
          const profile = res.data.profile;
          const token = res.data.token;
          const refreshToken = res.data.refreshToken;
          
          console.log('[AUTH_STORE] Login success: updating state with token and profile');
          set({ user: profile, token });
          localStorage.setItem('orbit_token', token);
          localStorage.setItem('orbit_user', JSON.stringify(profile));
          localStorage.setItem('orbit_login_just_succeeded', 'true');
          if (refreshToken) {
            localStorage.setItem('orbit_refreshtoken', refreshToken);
          }
          return true;
        }
        console.warn('[AUTH_STORE] Login failed: Invalid credentials response structure');
        return false;
      } catch (err) {
        if (!get().isDemoMode) {
          console.error('[AUTH_STORE] Login error in Live mode:', err);
          throw err;
        }
        console.log('[AUTH_STORE] Login error in Demo mode. Using mock session fallback.');
        const localProfile: UserProfile = {
          id: 'user-mock-1',
          email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@orbitai.dev`,
          username: usernameOrEmail.split('@')[0],
          role: 'user',
          displayName: usernameOrEmail.split('@')[0],
          emailVerified: true
        };
        set({ user: localProfile, token: 'local-mock-token' });
        localStorage.setItem('orbit_token', 'local-mock-token');
        localStorage.setItem('orbit_user', JSON.stringify(localProfile));
        localStorage.setItem('orbit_login_just_succeeded', 'true');
        return true;
      }
    },

    registerUser: async (email, username, password, displayName, role = 'user') => {
      console.log('[AUTH_STORE] registerUser initiated for:', username, email);
      try {
        const res = await apiClient.post<any>('/api/v1/auth/register', { email, username, password, displayName, role });
        if (res.success && res.data) {
          const profile = res.data.profile;
          const token = res.data.token;
          const refreshToken = res.data.refreshToken;
          
          console.log('[AUTH_STORE] Register success: auto-logging in user');
          set({ user: profile, token });
          localStorage.setItem('orbit_token', token);
          localStorage.setItem('orbit_user', JSON.stringify(profile));
          localStorage.setItem('orbit_login_just_succeeded', 'true');
          if (refreshToken) {
            localStorage.setItem('orbit_refreshtoken', refreshToken);
          }
          return true;
        }
        console.warn('[AUTH_STORE] Registration failed: Invalid response structure');
        return false;
      } catch (err) {
        if (!get().isDemoMode) {
          console.error('[AUTH_STORE] Registration error in Live mode:', err);
          throw err;
        }
        console.log('[AUTH_STORE] Registration error in Demo mode. Using mock session fallback.');
        const localProfile: UserProfile = {
          id: 'user-mock-1',
          email,
          username,
          role: role as any,
          displayName: displayName || username,
          emailVerified: true
        };
        set({ user: localProfile, token: 'local-mock-token' });
        localStorage.setItem('orbit_token', 'local-mock-token');
        localStorage.setItem('orbit_user', JSON.stringify(localProfile));
        localStorage.setItem('orbit_login_just_succeeded', 'true');
        return true;
      }
    },

    logoutUser: async () => {
      console.log('[AUTH_STORE] Logout initiated: clearing tokens and cache');
      try {
        await apiClient.post<any>('/api/v1/auth/logout', {});
      } catch (e) {
        console.warn('[AUTH_STORE] Logout backend request failed, continuing local clear:', e);
      }
      set({ user: null, token: null });
      localStorage.removeItem('orbit_token');
      localStorage.removeItem('orbit_user');
      localStorage.removeItem('orbit_refreshtoken');
      localStorage.removeItem('orbit_login_just_succeeded');
      sessionStorage.removeItem('orbit_token');
      sessionStorage.removeItem('orbit_user');
      document.cookie = "orbit_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },

    loginOAuth: async (provider) => {
      console.log('[AUTH_STORE] loginOAuth: setting mock OAuth session for', provider);
      const localProfile: UserProfile = {
        id: `user-oauth-${provider}-${Date.now()}`,
        email: `oauth-${provider}@orbitai.dev`,
        username: `${provider}_user`,
        role: 'user',
        displayName: `OAuth ${provider.toUpperCase()} User`,
        avatarUrl: provider === 'google' 
          ? 'https://lh3.googleusercontent.com/a/default-user' 
          : 'https://github.com/identicons/default.png',
        emailVerified: true
      };
      set({ user: localProfile, token: `oauth-${provider}-token` });
      localStorage.setItem('orbit_token', `oauth-${provider}-token`);
      localStorage.setItem('orbit_user', JSON.stringify(localProfile));
      localStorage.setItem('orbit_login_just_succeeded', 'true');
    },

    loginWithGoogle: async (idToken) => {
      console.log('[AUTH_STORE] loginWithGoogle initiated');
      try {
        const res = await apiClient.post<any>('/api/v1/auth/google', { credential: idToken, idToken });
        if (res.success && res.data) {
          const profile = res.data.user;
          const token = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          
          console.log('[AUTH_STORE] Google login success: updating state');
          set({ user: profile, token });
          localStorage.setItem('orbit_token', token);
          localStorage.setItem('orbit_user', JSON.stringify(profile));
          localStorage.setItem('orbit_login_just_succeeded', 'true');
          if (refreshToken) {
            localStorage.setItem('orbit_refreshtoken', refreshToken);
          }
          return true;
        }
        return false;
      } catch (err) {
        if (!get().isDemoMode) {
          console.error('[AUTH_STORE] Google login error in Live mode:', err);
          throw err;
        }
        console.log('[AUTH_STORE] Google login error in Demo mode. Using mock session fallback.');
        const localProfile: UserProfile = {
          id: 'user-google-mock-1',
          email: 'google-test@orbitai.dev',
          username: 'google_test',
          role: 'user',
          displayName: 'Google Test User',
          avatarUrl: 'https://lh3.googleusercontent.com/a/default-user',
          emailVerified: true
        };
        set({ user: localProfile, token: 'google-mock-token' });
        localStorage.setItem('orbit_token', 'google-mock-token');
        localStorage.setItem('orbit_user', JSON.stringify(localProfile));
        localStorage.setItem('orbit_login_just_succeeded', 'true');
        return true;
      }
    },

    verifyEmail: async (code) => {
      console.log('[AUTH_STORE] verifyEmail initiated with code:', code);
      const user = get().user;
      if (user) {
        const updated = { ...user, emailVerified: true };
        set({ user: updated });
        localStorage.setItem('orbit_user', JSON.stringify(updated));
      }
    },

    forgotPassword: async (email) => {
      console.log('[AUTH_STORE] forgotPassword initiated for email:', email);
    }
  };
});

// Run initial hydration synchronously on module import if in client context
if (typeof window !== 'undefined') {
  try {
    const storedDemoMode = localStorage.getItem('orbit_demomode');
    const token = localStorage.getItem('orbit_token');
    const userStr = localStorage.getItem('orbit_user');
    const parsedUser = userStr ? JSON.parse(userStr) : null;
    
    useAuthStore.setState({
      isDemoMode: storedDemoMode === null ? true : storedDemoMode === 'true',
      token: token || null,
      user: parsedUser
    });
    console.log('[AUTH_STORE] Module-level synchronous hydration completed successfully.');
  } catch (e) {
    console.warn('[AUTH_STORE] Module-level synchronous hydration skipped/failed:', e);
  }
}
