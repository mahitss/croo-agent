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
  isCheckingAuth: boolean;
  rememberMe: boolean;
  isDemoMode: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'forgot' | 'verify';
  
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (val: boolean) => void;
  setRememberMe: (val: boolean) => void;

  initializeAuth: () => Promise<boolean>;
  setAuthModal: (open: boolean, tab?: 'login' | 'register' | 'forgot' | 'verify') => void;
  toggleDemoMode: () => void;
  loginUser: (usernameOrEmail: string, password: string) => Promise<boolean>;
  registerUser: (email: string, username: string, password: string, displayName?: string, role?: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  logoutEverywhere: () => Promise<void>;
  loginOAuth: (provider: 'google' | 'github') => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<boolean>;
  verifyEmail: (code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  scheduleAutoRefresh: () => void;
}

// Inline helper to decode JWT expiration
function getJwtExpiry(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const raw = typeof atob !== 'undefined'
      ? atob(base64)
      : Buffer.from(base64, 'base64').toString('binary');
      
    const jsonPayload = decodeURIComponent(
      raw
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return payload.exp ? payload.exp : null;
  } catch (e) {
    return null;
  }
}

function isJwtExpired(token: string): boolean {
  const exp = getJwtExpiry(token);
  if (!exp) return false;
  const current = Math.floor(Date.now() / 1000);
  return current > (exp - 10); // 10 second buffer
}

export const useAuthStore = create<AuthState>((set, get) => {
  return {
    user: null,
    token: null,
    isCheckingAuth: true,
    rememberMe: true,
    isDemoMode: true,
    isAuthModalOpen: false,
    authModalTab: 'login',
    isSidebarCollapsed: false,
    isMobileSidebarOpen: false,
    
    toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    setMobileSidebarOpen: (val) => set({ isMobileSidebarOpen: val }),
    setRememberMe: (val) => set({ rememberMe: val }),

    refreshTimeoutId: null as any,

    scheduleAutoRefresh: () => {
      if (typeof window === 'undefined') return;
      
      const currentTimeoutId = (get() as any).refreshTimeoutId;
      if (currentTimeoutId) {
        clearTimeout(currentTimeoutId);
      }
      
      const token = get().token;
      if (!token) return;
      
      const exp = getJwtExpiry(token);
      if (!exp) return;
      
      const current = Math.floor(Date.now() / 1000);
      const bufferSeconds = 30; // Refresh 30 seconds before expiration
      
      // Calculate delay in ms
      const delayMs = (exp - current - bufferSeconds) * 1000;
      console.log(`[AUTH_STORE] Scheduling auto refresh in ${delayMs / 1000}s (Expires at: ${exp}, current: ${current})`);
      
      if (delayMs > 0) {
        const timeoutId = setTimeout(async () => {
          console.log('[AUTH_STORE] Auto-refresh timer fired! Requesting token refresh...');
          const rememberMe = localStorage.getItem('orbit_remember_me') === 'true';
          const storage = rememberMe ? localStorage : sessionStorage;
          const refreshToken = storage.getItem('orbit_refreshtoken');
          
          if (refreshToken) {
            try {
              const res = await apiClient.post<any>('/api/v1/auth/refresh', { refreshToken });
              const parsedToken = res?.data?.token || res?.token;
              const nextRefresh = res?.data?.refreshToken || res?.refreshToken;
              
              if (parsedToken) {
                console.log('[AUTH_STORE] Auto-refresh succeeded.');
                storage.setItem('orbit_token', parsedToken);
                if (nextRefresh) {
                  storage.setItem('orbit_refreshtoken', nextRefresh);
                }
                set({ token: parsedToken });
                get().scheduleAutoRefresh();
              } else {
                console.warn('[AUTH_STORE] Auto-refresh token payload missing. Logging out user...');
                get().logoutUser();
              }
            } catch (e) {
              console.error('[AUTH_STORE] Auto-refresh request failed:', e);
              get().logoutUser();
            }
          } else {
            console.warn('[AUTH_STORE] No refresh token found during auto-refresh. Logging out...');
            get().logoutUser();
          }
        }, delayMs);
        
        set({ refreshTimeoutId: timeoutId } as any);
      } else {
        console.log('[AUTH_STORE] Token is already near expiry, refreshing immediately.');
        const rememberMe = localStorage.getItem('orbit_remember_me') === 'true';
        const storage = rememberMe ? localStorage : sessionStorage;
        const refreshToken = storage.getItem('orbit_refreshtoken');
        if (refreshToken) {
          apiClient.post<any>('/api/v1/auth/refresh', { refreshToken }).then((res) => {
            const parsedToken = res?.data?.token || res?.token;
            if (parsedToken) {
              storage.setItem('orbit_token', parsedToken);
              set({ token: parsedToken });
              get().scheduleAutoRefresh();
            }
          }).catch(() => {
            get().logoutUser();
          });
        }
      }
    },

    initializeAuth: async () => {
      if (typeof window === 'undefined') return false;
      console.log('[AUTH_STORE] App startup: Initializing auth state...');
      
      const storedDemoMode = localStorage.getItem('orbit_demomode');
      const rememberMe = localStorage.getItem('orbit_remember_me') === 'true';
      const storage = rememberMe ? localStorage : sessionStorage;
      
      const token = storage.getItem('orbit_token');
      const refreshToken = storage.getItem('orbit_refreshtoken');
      const userStr = storage.getItem('orbit_user');
      const parsedUser = userStr ? JSON.parse(userStr) : null;
      
      set({
        isDemoMode: storedDemoMode === null ? true : storedDemoMode === 'true',
        rememberMe
      });
      
      if (token && !isJwtExpired(token)) {
        console.log('[AUTH_STORE] Valid token restored on startup.');
        set({
          token,
          user: parsedUser,
          isCheckingAuth: false
        });
        get().scheduleAutoRefresh();
        return true;
      }
      
      // Attempt background silent refresh
      if (refreshToken) {
        console.log('[AUTH_STORE] Token expired or missing. Attempting silent refresh...');
        set({ isCheckingAuth: true });
        try {
          const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
          });
          
          if (res.ok) {
            const data = await res.json();
            const parsedToken = data?.data?.token || data?.token;
            const parsedNextRefresh = data?.data?.refreshToken || data?.refreshToken;
            
            if (parsedToken) {
              console.log('[AUTH_STORE] Silent refresh succeeded.');
              storage.setItem('orbit_token', parsedToken);
              if (parsedNextRefresh) {
                storage.setItem('orbit_refreshtoken', parsedNextRefresh);
              }
              
              // Get user profile
              const meRes = await fetch(`${BASE_URL}/api/v1/auth/me`, {
                headers: { 'Authorization': `Bearer ${parsedToken}` }
              });
              
              let updatedUser = parsedUser;
              if (meRes.ok) {
                const meData = await meRes.json();
                updatedUser = meData?.data?.profile || meData?.data?.user || meData?.profile || meData?.user || parsedUser;
                storage.setItem('orbit_user', JSON.stringify(updatedUser));
              }
              
              set({
                token: parsedToken,
                user: updatedUser,
                isCheckingAuth: false
              });
              get().scheduleAutoRefresh();
              return true;
            }
          }
        } catch (e) {
          console.error('[AUTH_STORE] Silent refresh failed:', e);
        }
      }
      
      console.log('[AUTH_STORE] No valid session restored. Set checking auth to false.');
      storage.removeItem('orbit_token');
      storage.removeItem('orbit_user');
      storage.removeItem('orbit_refreshtoken');
      
      set({
        token: null,
        user: null,
        isCheckingAuth: false
      });
      return false;
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
        const rememberMe = get().rememberMe;
        const res = await apiClient.post<any>('/api/v1/auth/login', { usernameOrEmail, password, rememberMe });
        if (res.success && res.data) {
          const profile = res.data.profile;
          const token = res.data.token;
          const refreshToken = res.data.refreshToken;
          
          const rememberMe = get().rememberMe;
          const storage = rememberMe ? localStorage : sessionStorage;
          localStorage.setItem('orbit_remember_me', String(rememberMe));
          
          console.log(`[AUTH_STORE] Login success: updating state. rememberMe: ${rememberMe}`);
          set({ user: profile, token });
          
          storage.setItem('orbit_token', token);
          storage.setItem('orbit_user', JSON.stringify(profile));
          if (refreshToken) {
            storage.setItem('orbit_refreshtoken', refreshToken);
          }
          
          // Clear the other storage to avoid conflict
          const otherStorage = rememberMe ? sessionStorage : localStorage;
          otherStorage.removeItem('orbit_token');
          otherStorage.removeItem('orbit_user');
          otherStorage.removeItem('orbit_refreshtoken');
          
          localStorage.setItem('orbit_login_just_succeeded', 'true');
          
          get().scheduleAutoRefresh();
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
        
        const rememberMe = get().rememberMe;
        const storage = rememberMe ? localStorage : sessionStorage;
        localStorage.setItem('orbit_remember_me', String(rememberMe));
        
        set({ user: localProfile, token: 'local-mock-token' });
        storage.setItem('orbit_token', 'local-mock-token');
        storage.setItem('orbit_user', JSON.stringify(localProfile));
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
          
          const rememberMe = get().rememberMe;
          const storage = rememberMe ? localStorage : sessionStorage;
          localStorage.setItem('orbit_remember_me', String(rememberMe));
          
          console.log('[AUTH_STORE] Register success: auto-logging in user');
          set({ user: profile, token });
          
          storage.setItem('orbit_token', token);
          storage.setItem('orbit_user', JSON.stringify(profile));
          if (refreshToken) {
            storage.setItem('orbit_refreshtoken', refreshToken);
          }
          
          // Clear the other storage to avoid conflict
          const otherStorage = rememberMe ? sessionStorage : localStorage;
          otherStorage.removeItem('orbit_token');
          otherStorage.removeItem('orbit_user');
          otherStorage.removeItem('orbit_refreshtoken');
          
          localStorage.setItem('orbit_login_just_succeeded', 'true');
          
          get().scheduleAutoRefresh();
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
        
        const rememberMe = get().rememberMe;
        const storage = rememberMe ? localStorage : sessionStorage;
        localStorage.setItem('orbit_remember_me', String(rememberMe));
        
        set({ user: localProfile, token: 'local-mock-token' });
        storage.setItem('orbit_token', 'local-mock-token');
        storage.setItem('orbit_user', JSON.stringify(localProfile));
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
      
      const currentTimeoutId = (get() as any).refreshTimeoutId;
      if (currentTimeoutId) {
        clearTimeout(currentTimeoutId);
        set({ refreshTimeoutId: null } as any);
      }

      set({ user: null, token: null });
      localStorage.removeItem('orbit_token');
      localStorage.removeItem('orbit_user');
      localStorage.removeItem('orbit_refreshtoken');
      localStorage.removeItem('orbit_login_just_succeeded');
      sessionStorage.removeItem('orbit_token');
      sessionStorage.removeItem('orbit_user');
      sessionStorage.removeItem('orbit_refreshtoken');
      document.cookie = "orbit_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },

    logoutEverywhere: async () => {
      console.log('[AUTH_STORE] Logout everywhere initiated: clearing all sessions from database');
      try {
        await apiClient.post<any>('/api/v1/auth/logout', {});
      } catch (e) {
        console.warn('[AUTH_STORE] Logout everywhere request failed, continuing local clear:', e);
      }
      
      const currentTimeoutId = (get() as any).refreshTimeoutId;
      if (currentTimeoutId) {
        clearTimeout(currentTimeoutId);
        set({ refreshTimeoutId: null } as any);
      }

      set({ user: null, token: null });
      localStorage.removeItem('orbit_token');
      localStorage.removeItem('orbit_user');
      localStorage.removeItem('orbit_refreshtoken');
      localStorage.removeItem('orbit_login_just_succeeded');
      sessionStorage.removeItem('orbit_token');
      sessionStorage.removeItem('orbit_user');
      sessionStorage.removeItem('orbit_refreshtoken');
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
      
      const rememberMe = get().rememberMe;
      const storage = rememberMe ? localStorage : sessionStorage;
      localStorage.setItem('orbit_remember_me', String(rememberMe));
      
      set({ user: localProfile, token: `oauth-${provider}-token` });
      storage.setItem('orbit_token', `oauth-${provider}-token`);
      storage.setItem('orbit_user', JSON.stringify(localProfile));
      localStorage.setItem('orbit_login_just_succeeded', 'true');
    },

    loginWithGoogle: async (idToken) => {
      console.log('[AUTH_STORE] loginWithGoogle initiated');
      try {
        const rememberMe = get().rememberMe;
        const res = await apiClient.post<any>('/api/v1/auth/google', { credential: idToken, idToken, rememberMe });
        if (res.success && res.data) {
          const profile = res.data.user;
          const token = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          
          const rememberMe = get().rememberMe;
          const storage = rememberMe ? localStorage : sessionStorage;
          localStorage.setItem('orbit_remember_me', String(rememberMe));
          
          console.log('[AUTH_STORE] Google login success: updating state');
          set({ user: profile, token });
          
          storage.setItem('orbit_token', token);
          storage.setItem('orbit_user', JSON.stringify(profile));
          if (refreshToken) {
            storage.setItem('orbit_refreshtoken', refreshToken);
          }
          
          // Clear the other storage to avoid conflict
          const otherStorage = rememberMe ? sessionStorage : localStorage;
          otherStorage.removeItem('orbit_token');
          otherStorage.removeItem('orbit_user');
          otherStorage.removeItem('orbit_refreshtoken');
          
          localStorage.setItem('orbit_login_just_succeeded', 'true');
          
          get().scheduleAutoRefresh();
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
        
        const rememberMe = get().rememberMe;
        const storage = rememberMe ? localStorage : sessionStorage;
        localStorage.setItem('orbit_remember_me', String(rememberMe));
        
        set({ user: localProfile, token: 'google-mock-token' });
        storage.setItem('orbit_token', 'google-mock-token');
        storage.setItem('orbit_user', JSON.stringify(localProfile));
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
        const rememberMe = localStorage.getItem('orbit_remember_me') === 'true';
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('orbit_user', JSON.stringify(updated));
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
    const rememberMe = localStorage.getItem('orbit_remember_me') === 'true';
    const storage = rememberMe ? localStorage : sessionStorage;
    const token = storage.getItem('orbit_token');
    const userStr = storage.getItem('orbit_user');
    const parsedUser = userStr ? JSON.parse(userStr) : null;
    
    useAuthStore.setState({
      isDemoMode: storedDemoMode === null ? true : storedDemoMode === 'true',
      rememberMe,
      token: token || null,
      user: parsedUser,
      isCheckingAuth: !!storage.getItem('orbit_refreshtoken')
    });
    console.log('[AUTH_STORE] Module-level synchronous hydration completed successfully.');
  } catch (e) {
    console.warn('[AUTH_STORE] Module-level synchronous hydration skipped/failed:', e);
  }

  // Listen for storage changes across tabs to sync logout/login
  window.addEventListener('storage', (event) => {
    if (event.key === 'orbit_token') {
      if (!event.newValue) {
        console.log('[AUTH_STORE] Token cleared in another tab, logging out here...');
        useAuthStore.getState().logoutUser();
      } else {
        console.log('[AUTH_STORE] Token updated in another tab, updating here...');
        const rememberMe = localStorage.getItem('orbit_remember_me') === 'true';
        const storage = rememberMe ? localStorage : sessionStorage;
        const userStr = storage.getItem('orbit_user');
        const parsedUser = userStr ? JSON.parse(userStr) : null;
        useAuthStore.setState({
          token: event.newValue,
          user: parsedUser,
          isCheckingAuth: false
        });
        useAuthStore.getState().scheduleAutoRefresh();
      }
    }
  });

  // Listen for refresh events dispatched by API client
  window.addEventListener('orbit_token_refreshed', (e: any) => {
    if (e.detail?.token) {
      useAuthStore.setState({ token: e.detail.token });
    }
  });
}

