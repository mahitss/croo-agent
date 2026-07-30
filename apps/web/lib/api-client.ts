import { useAuthStore } from '../store/authStore';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : window.location.origin)
    : "http://localhost:5000");

function isJwtExpired(token: string): boolean {
  if (typeof window === 'undefined') return false;
  // Bypass expiration check for local/oauth mock tokens
  if (
    token === 'local-mock-token' ||
    token === 'google-mock-token' ||
    token.startsWith('mock-') ||
    token.startsWith('oauth-') ||
    token.includes('-mock-')
  ) {
    return false;
  }
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
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
    const exp = payload.exp;
    if (!exp) return false;
    
    const current = Math.floor(Date.now() / 1000);
    const expired = current > (exp - 10);
    return expired;
  } catch (e) {
    return true;
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    console.log('[TOKEN REFRESH] Renewing access token...');
    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ refreshToken })
    });
    
    if (res.ok) {
      const data = await res.json();
      const parsedToken = data?.data?.token || data?.token;
      const parsedNextRefresh = data?.data?.refreshToken || data?.refreshToken;
      
      if (parsedToken) {
        if (typeof window !== 'undefined') {
          const rememberMe = localStorage.getItem('orbit_remember_me') !== 'false';
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('orbit_token', parsedToken);
          if (parsedNextRefresh) {
            storage.setItem('orbit_refreshtoken', parsedNextRefresh);
          }
          window.dispatchEvent(new CustomEvent('orbit_token_refreshed', { detail: { token: parsedToken } }));
        }
        return parsedToken;
      }
    }
  } catch (e) {
    console.error('[TOKEN REFRESH] Request failed:', e);
  }
  return null;
}

let redirectLoopGuard = false;

function handleSessionExpiration() {
  if (typeof window !== 'undefined') {
    console.log('[LOGOUT] Session expired, executing user logout...');
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

    useAuthStore.setState({ token: null, user: null, isAuthenticated: false, initializationState: 'UNAUTHENTICATED' });
    window.dispatchEvent(new Event('nexus_session_expired'));
    
    if (redirectLoopGuard) return;
    
    // Prevent redirect loop if already on login view
    if (window.location.search.includes('auth=login')) {
      return;
    }
    
    redirectLoopGuard = true;
    const destPath = window.location.pathname;
    if (destPath !== '/' && destPath !== '/settings' && destPath !== '/wallet') {
      window.location.href = `/?auth=login&redirect=${encodeURIComponent(destPath + window.location.search)}`;
    } else if (destPath !== '/') {
      window.location.href = `/?auth=login&redirect=${encodeURIComponent(destPath)}`;
    } else {
      window.location.href = '/?auth=login';
    }
  }
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const isServer = typeof window === 'undefined';
  
  // Guard 1: Never fetch protected routes if auth is UNINITIALIZED / CHECKING_SESSION
  if (!isServer && !url.startsWith('/api/v1/auth/')) {
    let authState = useAuthStore.getState();
    if (authState.initializationState === 'UNINITIALIZED' || authState.initializationState === 'CHECKING_SESSION') {
      console.log(`[QUEUE REQUESTS] Deferring request to ${url} until auth initialization completes...`);
      await new Promise<void>((resolve) => {
        const unsubscribe = useAuthStore.subscribe((state) => {
          if (state.initializationState === 'AUTHENTICATED' || state.initializationState === 'UNAUTHENTICATED') {
            unsubscribe();
            resolve();
          }
        });
      });
      console.log(`[RETRY REQUESTS] Resubmitting deferred request to ${url}`);
      authState = useAuthStore.getState();
    }

    // Abort if unauthenticated guest session
    if (!authState.isAuthenticated) {
      return new Response(JSON.stringify({ success: false, message: 'Unauthorized (AuthGuard Blocked)' }), { status: 401 });
    }
  }

  const rememberMe = !isServer && localStorage.getItem('orbit_remember_me') !== 'false';
  const storage = isServer ? null : (rememberMe ? localStorage : sessionStorage);
  let token = storage ? storage.getItem('orbit_token') : null;

  // Enforce queue during ongoing refresh (skip for auth routes)
  if (token && isJwtExpired(token) && !isServer && storage && !url.startsWith('/api/v1/auth/')) {
    const refreshToken = storage.getItem('orbit_refreshtoken');
    if (refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        console.log(`[QUEUE REQUESTS] Deferring requests. Initializing single token refresh...`);
        refreshAccessToken(refreshToken).then(newToken => {
          isRefreshing = false;
          if (newToken) {
            console.log(`[RETRY REQUESTS] Token refresh succeeded. Retrying queued requests.`);
            onRefreshed(newToken);
          } else {
            console.warn(`[LOGOUT] Token refresh failed. Flushing queue.`);
            handleSessionExpiration();
            onRefreshed('');
          }
        });
      }

      const retryOriginalRequest = new Promise<string>((resolve) => {
        subscribeTokenRefresh((t: string) => {
          resolve(t);
        });
      });

      const newToken = await retryOriginalRequest;
      token = newToken || null;
    } else {
      handleSessionExpiration();
      return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401 });
    }
  }

  const isDemo = useAuthStore.getState().isDemoMode;
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'x-execution-mode': isDemo ? 'DEMO' : 'LIVE'
  } as Record<string, string>;

  if (token && !url.startsWith('/api/v1/auth/google')) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const isAuthRoute = url.startsWith('/api/v1/auth/');
  const startTime = Date.now();
  const isoTime = new Date().toISOString();
  console.log(`[API_CLIENT] [${isoTime}] fetchWithAuth start: ${BASE_URL}${url} (Method: ${options.method || 'GET'})`);
  let response: Response;
  try {
    // 120s for auth routes (accommodates Render cold starts & DB queries), 60s for standard API routes
    const defaultTimeoutMs = isAuthRoute ? 120000 : 60000;
    const timeoutSignal = (options as any).signal || AbortSignal.timeout(defaultTimeoutMs);
    console.log(`[API_CLIENT] [${new Date().toISOString()}] Sending network request to ${BASE_URL}${url} (Timeout: ${defaultTimeoutMs}ms)...`);
    response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
      credentials: 'include',
      signal: timeoutSignal,
    });
    const duration = Date.now() - startTime;
    console.log(`[API_CLIENT] [${new Date().toISOString()}] fetchWithAuth finished: ${BASE_URL}${url} with status ${response.status} (Duration: ${duration}ms)`);
  } catch (fetchErr: any) {
    const duration = Date.now() - startTime;
    const isDemo = useAuthStore.getState().isDemoMode;
    if (isDemo) {
      console.warn(`[API_CLIENT] Demo mode fallback for ${url}: Using internal execution engine.`);
    } else {
      console.error(`[API_CLIENT_ERROR] [${new Date().toISOString()}] fetchWithAuth request to ${BASE_URL}${url} failed/timed out after ${duration}ms:`, fetchErr.message);
    }
    throw fetchErr;
  }

  // Intercept 401 failures and try to refresh on the fly (Problem 7)
  if (response.status === 401 && !isServer && storage && !url.startsWith('/api/v1/auth/')) {
    const justSucceeded = localStorage.getItem('orbit_login_just_succeeded') === 'true';
    if (justSucceeded) {
      localStorage.removeItem('orbit_login_just_succeeded');
      return response;
    }

    const refreshToken = storage.getItem('orbit_refreshtoken');
    if (refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        console.log(`[QUEUE REQUESTS] 401 received for ${url}. Deferring requests to run refresh...`);
        refreshAccessToken(refreshToken).then(newToken => {
          isRefreshing = false;
          if (newToken) {
            console.log(`[RETRY REQUESTS] Token refresh succeeded. Retrying queued requests.`);
            onRefreshed(newToken);
          } else {
            console.warn(`[LOGOUT] Token refresh failed. Flushing queue.`);
            handleSessionExpiration();
            onRefreshed('');
          }
        });
      }

      const retryOriginalRequest = new Promise<string>((resolve) => {
        subscribeTokenRefresh((t: string) => {
          resolve(t);
        });
      });

      const newToken = await retryOriginalRequest;
      if (newToken) {
        headers['Authorization'] = `Bearer ${newToken}`;
        response = await fetch(`${BASE_URL}${url}`, {
          ...options,
          headers,
        });
      } else {
        response = new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401 });
      }
    } else {
      handleSessionExpiration();
    }
  }

  return response;
}

export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const res = await fetchWithAuth(url, { method: 'GET' });
    if (!res.ok) {
      throw { name: "HttpError", status: res.status, message: `HTTP Error: ${res.status}` };
    }
    return res.json() as Promise<T>;
  },

  async post<T>(url: string, body: any): Promise<T> {
    const res = await fetchWithAuth(url, { method: 'POST', body: JSON.stringify(body) });
    if (!res.ok) {
      let msg = `HTTP Error: ${res.status}`;
      try {
        const errBody = await res.json();
        if (errBody && errBody.message) {
          msg = Array.isArray(errBody.message) ? errBody.message.join(', ') : errBody.message;
        }
      } catch (e) {}
      throw new Error(msg);
    }
    return res.json() as Promise<T>;
  },

  async put<T>(url: string, body: any): Promise<T> {
    const res = await fetchWithAuth(url, { method: 'PUT', body: JSON.stringify(body) });
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    return res.json() as Promise<T>;
  },

  async delete<T>(url: string): Promise<T> {
    const res = await fetchWithAuth(url, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    return res.json() as Promise<T>;
  },

  async patch<T>(url: string, body: any): Promise<T> {
    const res = await fetchWithAuth(url, { method: 'PATCH', body: JSON.stringify(body) });
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    return res.json() as Promise<T>;
  }
};