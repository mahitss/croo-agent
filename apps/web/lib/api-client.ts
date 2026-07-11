const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:10000"
      : window.location.origin)
    : "http://localhost:10000");

function isJwtExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    // Decode base64url payload
    const base64Url = parts[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const payload = JSON.parse(jsonPayload);
    const exp = payload.exp;
    if (!exp) return false;
    
    const current = Math.floor(Date.now() / 1000);
    return current > (exp - 10); // 10-second buffer
  } catch (e) {
    console.error('[API_CLIENT] Failed to decode JWT token:', e);
    return true;
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.token) {
        localStorage.setItem('orbit-live-session', data.token);
        if (data.refreshToken) {
          localStorage.setItem('orbit_refreshtoken', data.refreshToken);
        }
        return data.token;
      }
    }
  } catch (e) {
    console.error('Failed to refresh access token:', e);
  }
  return null;
}

function handleSessionExpiration() {
  localStorage.removeItem('orbit-live-session');
  localStorage.removeItem('orbit-live-user');
  localStorage.removeItem('orbit_refreshtoken');
  sessionStorage.removeItem('orbit-live-session');
  sessionStorage.removeItem('orbit-live-user');
  document.cookie = "orbit_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('nexus_session_expired'));
    if (window.location.pathname !== '/') {
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
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = [];
}

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  let token = localStorage.getItem('orbit-live-session');

  // Verify and auto-refresh token if expired to prevent 401 spam
  if (token && isJwtExpired(token)) {
    const refreshToken = localStorage.getItem('orbit_refreshtoken');
    if (refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshAccessToken(refreshToken).then(newToken => {
          isRefreshing = false;
          if (newToken) {
            onRefreshed(newToken);
          } else {
            handleSessionExpiration();
          }
        });
      }

      const retryOriginalRequest = new Promise<string>((resolve) => {
        subscribeTokenRefresh((t: string) => {
          resolve(t);
        });
      });

      const newToken = await retryOriginalRequest;
      token = newToken;
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

  let response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  // Intercept 401 failures and try to refresh on the fly (Problem 7)
  if (response.status === 401) {
    console.warn('[API_CLIENT] 401 Unauthorized returned. Attempting token refresh...');
    const refreshToken = localStorage.getItem('orbit_refreshtoken');
    if (refreshToken) {
      const newToken = await refreshAccessToken(refreshToken);
      if (newToken) {
        headers['Authorization'] = `Bearer ${newToken}`;
        // Retry once
        response = await fetch(`${BASE_URL}${url}`, {
          ...options,
          headers,
        });
      }
    }

    if (response.status === 401) {
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