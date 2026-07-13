const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : window.location.origin)
    : "http://localhost:5000");

function isJwtExpired(token: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    // Decode base64url payload
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
    console.log(`[API_CLIENT] Token check: sub=${payload.sub || payload.id}, exp=${exp}, current=${current}, expired=${expired}`);
    return expired;
  } catch (e) {
    console.error('[API_CLIENT] Failed to decode JWT token:', e);
    return true;
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    console.log('[API_CLIENT] Sending refresh payload with token:', refreshToken ? refreshToken.substring(0, 8) + '...' : 'none');
    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    
    console.log('[API_CLIENT] Refresh POST request status:', res.status);
    if (res.ok) {
      const data = await res.json();
      console.log('[API_CLIENT] Refresh Endpoint raw response:', JSON.stringify(data));
      
      const parsedToken = data?.data?.token || data?.token;
      const parsedNextRefresh = data?.data?.refreshToken || data?.refreshToken;
      
      if (parsedToken) {
        if (typeof window !== 'undefined') {
          const rememberMe = localStorage.getItem('orbit_remember_me') === 'true';
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
    console.error('[API_CLIENT] Failed to execute refreshAccessToken:', e);
  }
  return null;
}

function handleSessionExpiration() {
  if (typeof window !== 'undefined') {
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

    window.dispatchEvent(new Event('nexus_session_expired'));
    if (window.location.pathname !== '/' && window.location.pathname !== '/settings' && window.location.pathname !== '/wallet') {
      window.location.href = `/?auth=login&redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
    } else if (window.location.pathname !== '/') {
      window.location.href = `/?auth=login&redirect=${encodeURIComponent(window.location.pathname)}`;
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
  const rememberMe = !isServer && localStorage.getItem('orbit_remember_me') === 'true';
  const storage = isServer ? null : (rememberMe ? localStorage : sessionStorage);
  let token = storage ? storage.getItem('orbit_token') : null;

  // Verify and auto-refresh token if expired to prevent 401 spam
  if (token && isJwtExpired(token) && !isServer && storage) {
    const refreshToken = storage.getItem('orbit_refreshtoken');
    if (refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshAccessToken(refreshToken).then(newToken => {
          isRefreshing = false;
          if (newToken) {
            onRefreshed(newToken);
          } else {
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

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'x-execution-mode': 'LIVE'
  } as Record<string, string>;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  console.log(`[API_CLIENT] Dispatching Request: ${url}, Auth: ${token ? 'Bearer ' + token.substring(0, 15) + '...' : 'None'}`);

  let response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  console.log(`[API_CLIENT] Response status: ${response.status} for ${url}`);

  // Intercept 401 failures and try to refresh on the fly (Problem 7)
  if (response.status === 401 && !isServer && storage) {
    console.warn(`[API_CLIENT] 401 Unauthorized returned for ${url}. Checking temporary login bypass...`);
    
    // Check if the login just succeeded flag is set
    const justSucceeded = localStorage.getItem('orbit_login_just_succeeded') === 'true';
    if (justSucceeded) {
      console.warn(`[API_CLIENT] 401 received but login just succeeded. Clearing bypass flag and retrying request once...`);
      localStorage.removeItem('orbit_login_just_succeeded');
      
      // Retry request exactly once with the same token
      response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers,
      });
      
      console.log(`[API_CLIENT] Retry response status: ${response.status} for ${url}`);
      if (response.status === 401) {
        console.error(`[API_CLIENT] Retry still returned 401 for ${url}. Preserving session to prevent login loops.`);
      }
      return response;
    }

    console.warn('[API_CLIENT] Standard 401 logic: Attempting token refresh...');
    const refreshToken = storage.getItem('orbit_refreshtoken');
    if (refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshAccessToken(refreshToken).then(newToken => {
          isRefreshing = false;
          if (newToken) {
            onRefreshed(newToken);
          } else {
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
      console.error('[API_CLIENT] Still unauthorized after refresh. Logging out user...');
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
          msg = errBody.message;
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