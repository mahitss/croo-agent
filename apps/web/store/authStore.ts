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

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : window.location.origin)
    : "http://localhost:5000");

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
  isAuthenticated: boolean;
  initializationState: 'UNINITIALIZED' | 'CHECKING_SESSION' | 'AUTHENTICATED' | 'UNAUTHENTICATED';
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
  if (
    token === 'local-mock-token' ||
    token === 'google-mock-token' ||
    token.startsWith('mock-') ||
    token.startsWith('oauth-') ||
    token.includes('-mock-')
  ) {
    return false;
  }
  const exp = getJwtExpiry(token);
  if (!exp) return false;
  const current = Math.floor(Date.now() / 1000);
  return current > (exp - 10); // 10 second buffer
}

let initPromise: Promise<boolean> | null = null;

export const useAuthStore = create<AuthState>((set, get) => {
  return {
    user: null,
    token: null,
    isCheckingAuth: true,
    isAuthenticated: false,
    initializationState: 'UNINITIALIZED',
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
          console.log('[TOKEN REFRESH] Auto-refresh timer fired! Requesting token refresh...');
          const rememberMe = localStorage.getItem('orbit_remember_me') !== 'false';
          const storage = rememberMe ? localStorage : sessionStorage;
          const refreshToken = storage.getItem('orbit_refreshtoken');
          
          if (refreshToken) {
            try {
              const res = await apiClient.post<any>('/api/v1/auth/refresh', { refreshToken });
              const parsedToken = res?.data?.token || res?.token;
              const nextRefresh = res?.data?.refreshToken || res?.refreshToken;
              
              if (parsedToken) {
                console.log('[TOKEN REFRESH] Auto-refresh succeeded.');
                storage.setItem('orbit_token', parsedToken);
                if (nextRefresh) {
                  storage.setItem('orbit_refreshtoken', nextRefresh);
                }
                set({ token: parsedToken });
                get().scheduleAutoRefresh();
              } else {
                console.warn('[TOKEN REFRESH] Auto-refresh token payload missing. Logging out user...');
                get().logoutUser();
              }
            } catch (e) {
              console.error('[TOKEN REFRESH] Auto-refresh request failed:', e);
              get().logoutUser();
            }
          } else {
            console.warn('[TOKEN REFRESH] No refresh token found during auto-refresh. Logging out...');
            get().logoutUser();
          }
        }, delayMs);
        
        set({ refreshTimeoutId: timeoutId } as any);
      } else {
        console.log('[TOKEN REFRESH] Token is already near expiry, refreshing immediately.');
        const rememberMe = localStorage.getItem('orbit_remember_me') !== 'false';
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
      if (initPromise) return initPromise;
      
      initPromise = (async () => {
        console.log('[AUTH INIT] Starting session validation...');
        set({ initializationState: 'CHECKING_SESSION', isCheckingAuth: true });
        
        const storedDemoMode = localStorage.getItem('orbit_demomode');
        const rememberMe = localStorage.getItem('orbit_remember_me') !== 'false';
        
        const getCookie = (name: string) => {
          if (typeof window === 'undefined') return null;
          const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
          try {
            return match ? decodeURIComponent(match[2]) : null;
          } catch (e) {
            return match ? match[2] : null;
          }
        };

        const token = localStorage.getItem('orbit_token') || sessionStorage.getItem('orbit_token') || getCookie('orbit_token') || getCookie('token');
        const refreshToken = localStorage.getItem('orbit_refreshtoken') || sessionStorage.getItem('orbit_refreshtoken') || getCookie('orbit_refreshtoken');
        const userStr = localStorage.getItem('orbit_user') || sessionStorage.getItem('orbit_user') || getCookie('orbit_user');
        const parsedUser = userStr ? JSON.parse(userStr) : null;
        const storage = localStorage.getItem('orbit_token') ? localStorage : sessionStorage;
        
        set({
          isDemoMode: storedDemoMode === null ? true : storedDemoMode === 'true',
          rememberMe
        });
        
        if (token && !isJwtExpired(token)) {
          console.log('[AUTH INIT] Valid token found in storage. Verifying session with backend...');
          try {
            const meRes = await fetch(`${BASE_URL}/api/v1/users/me`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (meRes.ok) {
              const meData = await meRes.json();
              const freshUser = (meData?.id || meData?.email) ? meData : (meData?.data?.profile || meData?.data?.user || meData?.data || meData?.profile || meData?.user || parsedUser);
              console.log('[AUTH READY] Session verified. User ID:', freshUser?.id);
              storage.setItem('orbit_user', JSON.stringify(freshUser));
              set({
                token,
                user: freshUser,
                isAuthenticated: true,
                initializationState: 'AUTHENTICATED',
                isCheckingAuth: false
              });
              get().scheduleAutoRefresh();
              return true;
            } else if (meRes.status === 401) {
              console.warn('[AUTH INIT] Token is invalid or unauthorized. Clearing session.');
              storage.removeItem('orbit_token');
              storage.removeItem('orbit_user');
              storage.removeItem('orbit_refreshtoken');
              set({
                token: null,
                user: null,
                isAuthenticated: false,
                initializationState: 'UNAUTHENTICATED',
                isCheckingAuth: false
              });
              return false;
            } else {
              console.log('[AUTH READY] Server returned error, restoring local cached session. User ID:', parsedUser?.id);
              set({
                token,
                user: parsedUser,
                isAuthenticated: true,
                initializationState: 'AUTHENTICATED',
                isCheckingAuth: false
              });
              get().scheduleAutoRefresh();
              return true;
            }
          } catch (err) {
            console.error('[AUTH INIT] Session validation request failed:', err);
            set({
              token,
              user: parsedUser,
              isAuthenticated: true,
              initializationState: 'AUTHENTICATED',
              isCheckingAuth: false
            });
            get().scheduleAutoRefresh();
            return true;
          }
        }
        
        // Attempt background silent refresh
        if (refreshToken) {
          console.log('[TOKEN REFRESH] Token expired or missing. Attempting silent refresh...');
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
                console.log('[TOKEN REFRESH] Silent refresh succeeded.');
                storage.setItem('orbit_token', parsedToken);
                if (parsedNextRefresh) {
                  storage.setItem('orbit_refreshtoken', parsedNextRefresh);
                }
                
                // Set cookies for authentication
                const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
                const secureFlag = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
                document.cookie = `orbit_token=${parsedToken}; max-age=${maxAge}; path=/; SameSite=Lax${secureFlag}`;
                document.cookie = `token=${parsedToken}; max-age=${maxAge}; path=/; SameSite=Lax${secureFlag}`;
                
                // Get user profile
                const meRes = await fetch(`${BASE_URL}/api/v1/users/me`, {
                  headers: { 'Authorization': `Bearer ${parsedToken}` }
                });
                
                let updatedUser = parsedUser;
                if (meRes.ok) {
                  const meData = await meRes.json();
                  updatedUser = (meData?.id || meData?.email) ? meData : (meData?.data?.profile || meData?.data?.user || meData?.data || meData?.profile || meData?.user || parsedUser);
                  storage.setItem('orbit_user', JSON.stringify(updatedUser));
                }
                
                console.log('[AUTH READY] Session restored via refresh token. User ID:', updatedUser?.id);
                set({
                  token: parsedToken,
                  user: updatedUser,
                  isAuthenticated: true,
                  initializationState: 'AUTHENTICATED',
                  isCheckingAuth: false
                });
                get().scheduleAutoRefresh();
                return true;
              }
            }
          } catch (e) {
            console.error('[TOKEN REFRESH] Silent refresh failed:', e);
          }
        }
        
        console.log('[AUTH READY] No valid session restored. Transitioning to UNAUTHENTICATED.');
        storage.removeItem('orbit_token');
        storage.removeItem('orbit_user');
        storage.removeItem('orbit_refreshtoken');
        
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          initializationState: 'UNAUTHENTICATED',
          isCheckingAuth: false
        });
        return false;
      })();
      
      return initPromise;
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
        
        const success = res.success !== undefined ? res.success : true;
        const data = res.data !== undefined ? res.data : res;

        if (success && data && data.token) {
          const profile = data.profile;
          const token = data.token;
          const refreshToken = data.refreshToken;
          
          const rememberMe = get().rememberMe;
          const storage = rememberMe ? localStorage : sessionStorage;
          localStorage.setItem('orbit_remember_me', String(rememberMe));
          
          console.log(`[AUTH_STORE] Login success: updating state. rememberMe: ${rememberMe}`);
          set({ user: profile, token, isAuthenticated: true, initializationState: 'AUTHENTICATED' });
          
          storage.setItem('orbit_token', token);
          storage.setItem('orbit_user', JSON.stringify(profile));
          if (refreshToken) {
            storage.setItem('orbit_refreshtoken', refreshToken);
          }
          
          // Set cookies for authentication
          const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
          const secureFlag = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
          document.cookie = `orbit_token=${token}; max-age=${maxAge}; path=/; SameSite=Lax${secureFlag}`;
          document.cookie = `token=${token}; max-age=${maxAge}; path=/; SameSite=Lax${secureFlag}`;
          
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
        console.error('[AUTH_STORE] Login error:', err);
        throw err;
      }
    },

    registerUser: async (email, username, password, displayName, role = 'user') => {
      let mappedRole = role;
      if (role === 'creator') {
        mappedRole = 'developer';
      }
      console.log('[REGISTER] Sending request', { email, username, password: '••••••••', displayName, role: mappedRole });
      try {
        const res = await apiClient.post<any>('/api/v1/auth/register', { email, username, password, displayName, role: mappedRole });
        console.log('[REGISTER] Response received', res);

        const success = res.success !== undefined ? res.success : true;
        const data = res.data !== undefined ? res.data : res;

        if (success && data && data.token) {
          const profile = data.profile;
          const token = data.token;
          const refreshToken = data.refreshToken;
          
          const rememberMe = get().rememberMe;
          const storage = rememberMe ? localStorage : sessionStorage;
          localStorage.setItem('orbit_remember_me', String(rememberMe));
          
          console.log('[REGISTER] User created');
          set({ user: profile, token, isAuthenticated: true, initializationState: 'AUTHENTICATED' });
          console.log('[REGISTER] Auth state updated');
          
          storage.setItem('orbit_token', token);
          storage.setItem('orbit_user', JSON.stringify(profile));
          if (refreshToken) {
            storage.setItem('orbit_refreshtoken', refreshToken);
          }
          
          // Set cookies for authentication
          const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
          const secureFlag = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
          document.cookie = `orbit_token=${token}; max-age=${maxAge}; path=/; SameSite=Lax${secureFlag}`;
          document.cookie = `token=${token}; max-age=${maxAge}; path=/; SameSite=Lax${secureFlag}`;
          
          // Clear the other storage to avoid conflict
          const otherStorage = rememberMe ? sessionStorage : localStorage;
          otherStorage.removeItem('orbit_token');
          otherStorage.removeItem('orbit_user');
          otherStorage.removeItem('orbit_refreshtoken');
          
          localStorage.setItem('orbit_login_just_succeeded', 'true');
          
          get().scheduleAutoRefresh();
          return true;
        }
        throw new Error(res.message || 'Registration failed: Invalid response structure');
      } catch (err) {
        console.error('[AUTH_STORE] Registration error:', err);
        throw err;
      }
    },

    logoutUser: async () => {
      console.log('[LOGOUT] Clearing credentials and session state...');
      try {
        await apiClient.post<any>('/api/v1/auth/logout', {});
      } catch (e) {
        // Continue local clear
      }
      
      const currentTimeoutId = (get() as any).refreshTimeoutId;
      if (currentTimeoutId) {
        clearTimeout(currentTimeoutId);
        set({ refreshTimeoutId: null } as any);
      }

      set({ user: null, token: null, isAuthenticated: false, initializationState: 'UNAUTHENTICATED' });
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
      initPromise = null;
    },

    logoutEverywhere: async () => {
      console.log('[LOGOUT] Clearing credentials and session state (Everywhere)...');
      try {
        await apiClient.post<any>('/api/v1/auth/logout', {});
      } catch (e) {
        // Continue local clear
      }
      
      const currentTimeoutId = (get() as any).refreshTimeoutId;
      if (currentTimeoutId) {
        clearTimeout(currentTimeoutId);
        set({ refreshTimeoutId: null } as any);
      }

      set({ user: null, token: null, isAuthenticated: false, initializationState: 'UNAUTHENTICATED' });
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
      initPromise = null;
    },



    loginWithGoogle: async (idToken) => {
      console.log('[FRONTEND_AUTH_STAGE 1] loginWithGoogle initiated in authStore');
      try {
        const rememberMe = get().rememberMe;
        console.log('[FRONTEND_AUTH_STAGE 2] Dispatching POST /api/v1/auth/google via apiClient');
        const res = await apiClient.post<any>('/api/v1/auth/google', { credential: idToken, idToken, rememberMe });
        console.log('[FRONTEND_AUTH_STAGE 3] Response payload received by authStore:', res);
        
        const success = res.success !== undefined ? res.success : true;
        const data = res.data !== undefined ? res.data : res;

        if (success && data && (data.accessToken || data.token)) {
          const profile = data.user || data.profile;
          const token = data.accessToken || data.token;
          const refreshToken = data.refreshToken;
          
          const rememberMe = get().rememberMe;
          const storage = rememberMe ? localStorage : sessionStorage;
          localStorage.setItem('orbit_remember_me', String(rememberMe));
          
          console.log('[FRONTEND_AUTH_STAGE 4] Updating Zustand authStore state and local storage');
          set({ user: profile, token, isAuthenticated: true, initializationState: 'AUTHENTICATED' });
          
          storage.setItem('orbit_token', token);
          storage.setItem('orbit_user', JSON.stringify(profile));
          if (refreshToken) {
            storage.setItem('orbit_refreshtoken', refreshToken);
          }
          
          // Set cookies for authentication
          const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
          const secureFlag = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
          document.cookie = `orbit_token=${token}; max-age=${maxAge}; path=/; SameSite=Lax${secureFlag}`;
          document.cookie = `token=${token}; max-age=${maxAge}; path=/; SameSite=Lax${secureFlag}`;
          
          // Clear the other storage to avoid conflict
          const otherStorage = rememberMe ? sessionStorage : localStorage;
          otherStorage.removeItem('orbit_token');
          otherStorage.removeItem('orbit_user');
          otherStorage.removeItem('orbit_refreshtoken');
          
          localStorage.setItem('orbit_login_just_succeeded', 'true');
          
          get().scheduleAutoRefresh();
          return true;
        }
        throw new Error(res?.message || 'Google login failed: Invalid response structure');
      } catch (err) {
        console.error('[FRONTEND_AUTH_ERROR] Google login failed in authStore:', err);
        throw err;
      }
    },

    verifyEmail: async (code) => {
      console.log('[AUTH_STORE] verifyEmail initiated with code:', code);
      const user = get().user;
      if (user) {
        const updated = { ...user, emailVerified: true };
        set({ user: updated });
        const rememberMe = localStorage.getItem('orbit_remember_me') !== 'false';
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
    const rememberMe = localStorage.getItem('orbit_remember_me') !== 'false';
    const storage = rememberMe ? localStorage : sessionStorage;
    const token = storage.getItem('orbit_token');
    const userStr = storage.getItem('orbit_user');
    const parsedUser = userStr ? JSON.parse(userStr) : null;
    
    useAuthStore.setState({
      isDemoMode: storedDemoMode === null ? true : storedDemoMode === 'true',
      rememberMe,
      token: token || null,
      user: parsedUser,
      isAuthenticated: token && !isJwtExpired(token) ? true : false,
      initializationState: token && !isJwtExpired(token) ? 'AUTHENTICATED' : 'UNINITIALIZED',
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
        const rememberMe = localStorage.getItem('orbit_remember_me') !== 'false';
        const storage = rememberMe ? localStorage : sessionStorage;
        const userStr = storage.getItem('orbit_user');
        const parsedUser = userStr ? JSON.parse(userStr) : null;
        useAuthStore.setState({
          token: event.newValue,
          user: parsedUser,
          isAuthenticated: true,
          initializationState: 'AUTHENTICATED',
          isCheckingAuth: false
        });
        useAuthStore.getState().scheduleAutoRefresh();
      }
    }
  });

  // Listen for refresh events dispatched by API client
  window.addEventListener('orbit_token_refreshed', (e: any) => {
    if (e.detail?.token) {
      useAuthStore.setState({ token: e.detail.token, isAuthenticated: true, initializationState: 'AUTHENTICATED' });
    }
  });
}
