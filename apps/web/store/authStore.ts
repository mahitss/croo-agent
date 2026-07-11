import { create } from 'zustand';
import { apiClient } from '../lib/api-client';

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'creator' | 'admin';
  displayName?: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isDemoMode: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'forgot';
  
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (val: boolean) => void;

  initializeAuth: () => void;
  setAuthModal: (open: boolean, tab?: 'login' | 'register' | 'forgot') => void;
  toggleDemoMode: () => void;
  loginUser: (usernameOrEmail: string, password: string) => Promise<boolean>;
  registerUser: (email: string, username: string, password: string, displayName?: string, role?: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  loginOAuth: (provider: 'google' | 'github') => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<boolean>;
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
      const storedDemoMode = localStorage.getItem('orbit_demomode');
      const token = localStorage.getItem('orbit-live-session');
      const userStr = localStorage.getItem('orbit-live-user');
      
      set({
        isDemoMode: storedDemoMode === null ? true : storedDemoMode === 'true',
        token: token || null,
        user: userStr ? JSON.parse(userStr) : null
      });
    },

    setAuthModal: (open, tab = 'login') => set({ isAuthModalOpen: open, authModalTab: tab }),

    toggleDemoMode: () => {
      const currentMode = get().isDemoMode;
      const nextMode = !currentMode;
      set({ isDemoMode: nextMode });
      localStorage.setItem('orbit_demomode', String(nextMode));
      
      // Dispatch update event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('nexus_mode_changed', { detail: { mode: nextMode ? 'demo' : 'live' } }));
      }
    },

    loginUser: async (usernameOrEmail, password) => {
      try {
        const res = await apiClient.post<any>('/api/v1/auth/login', { usernameOrEmail, password });
        if (res.success && res.data) {
          const profile = res.data.profile;
          const token = res.data.token;
          const refreshToken = res.data.refreshToken;
          
          set({ user: profile, token });
          localStorage.setItem('orbit-live-session', token);
          localStorage.setItem('orbit-live-user', JSON.stringify(profile));
          localStorage.setItem('orbit_login_just_succeeded', 'true');
          if (refreshToken) {
            localStorage.setItem('orbit_refreshtoken', refreshToken);
          }
          return true;
        }
        return false;
      } catch (err) {
        if (!get().isDemoMode) throw err;
        // Mock fallback for offline / sandbox
        const localProfile: UserProfile = {
          id: 'user-mock-1',
          email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@orbitai.dev`,
          username: usernameOrEmail.split('@')[0],
          role: 'user',
          displayName: usernameOrEmail.split('@')[0]
        };
        set({ user: localProfile, token: 'local-mock-token' });
        localStorage.setItem('orbit-live-session', 'local-mock-token');
        localStorage.setItem('orbit-live-user', JSON.stringify(localProfile));
        localStorage.setItem('orbit_login_just_succeeded', 'true');
        return true;
      }
    },

    registerUser: async (email, username, password, displayName, role = 'user') => {
      try {
        const res = await apiClient.post<any>('/api/v1/auth/register', { email, username, password, displayName, role });
        if (res.success && res.data) {
          const profile = res.data.profile;
          const token = res.data.token;
          const refreshToken = res.data.refreshToken;
          
          set({ user: profile, token });
          localStorage.setItem('orbit-live-session', token);
          localStorage.setItem('orbit-live-user', JSON.stringify(profile));
          localStorage.setItem('orbit_login_just_succeeded', 'true');
          if (refreshToken) {
            localStorage.setItem('orbit_refreshtoken', refreshToken);
          }
          return true;
        }
        return false;
      } catch (err) {
        if (!get().isDemoMode) throw err;
        const localProfile: UserProfile = {
          id: 'user-mock-1',
          email,
          username,
          role: role as any,
          displayName: displayName || username
        };
        set({ user: localProfile, token: 'local-mock-token' });
        localStorage.setItem('orbit-live-session', 'local-mock-token');
        localStorage.setItem('orbit-live-user', JSON.stringify(localProfile));
        localStorage.setItem('orbit_login_just_succeeded', 'true');
        return true;
      }
    },

    logoutUser: async () => {
      try {
        await apiClient.post<any>('/api/v1/auth/logout', {});
      } catch (e) {}
      set({ user: null, token: null });
      localStorage.removeItem('orbit-live-session');
      localStorage.removeItem('orbit-live-user');
      localStorage.removeItem('orbit_refreshtoken');
      localStorage.removeItem('orbit_login_just_succeeded');
    },

    loginOAuth: async (provider) => {
      const localProfile: UserProfile = {
        id: `user-oauth-${provider}-${Date.now()}`,
        email: `oauth-${provider}@orbitai.dev`,
        username: `${provider}_user`,
        role: 'user',
        displayName: `OAuth ${provider.toUpperCase()} User`,
        avatarUrl: provider === 'google' 
          ? 'https://lh3.googleusercontent.com/a/default-user' 
          : 'https://github.com/identicons/default.png'
      };
      set({ user: localProfile, token: `oauth-${provider}-token` });
      localStorage.setItem('orbit-live-session', `oauth-${provider}-token`);
      localStorage.setItem('orbit-live-user', JSON.stringify(localProfile));
      localStorage.setItem('orbit_login_just_succeeded', 'true');
    },

    loginWithGoogle: async (idToken) => {
      try {
        const res = await apiClient.post<any>('/api/v1/auth/google', { credential: idToken, idToken });
        if (res.success && res.data) {
          const profile = res.data.user;
          const token = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          
          set({ user: profile, token });
          localStorage.setItem('orbit-live-session', token);
          localStorage.setItem('orbit-live-user', JSON.stringify(profile));
          localStorage.setItem('orbit_login_just_succeeded', 'true');
          if (refreshToken) {
            localStorage.setItem('orbit_refreshtoken', refreshToken);
          }
          return true;
        }
        return false;
      } catch (err) {
        if (!get().isDemoMode) throw err;
        const localProfile: UserProfile = {
          id: 'user-google-mock-1',
          email: 'google-test@orbitai.dev',
          username: 'google_test',
          role: 'user',
          displayName: 'Google Test User',
          avatarUrl: 'https://lh3.googleusercontent.com/a/default-user'
        };
        set({ user: localProfile, token: 'google-mock-token' });
        localStorage.setItem('orbit-live-session', 'google-mock-token');
        localStorage.setItem('orbit-live-user', JSON.stringify(localProfile));
        localStorage.setItem('orbit_login_just_succeeded', 'true');
        return true;
      }
    }
  };
});
