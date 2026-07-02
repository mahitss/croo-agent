const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function fetchWithTimeout(url: string, options: any = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export const apiClient = {
  async get<T>(url: string, retries = 3, delay = 1000): Promise<T> {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}${url}`, { method: 'GET' });
      if (!res.ok) {
        if (retries > 0 && (res.status === 502 || res.status === 503 || res.status === 504 || res.status === 429)) {
          console.warn(`[API_RETRY] Transient HTTP ${res.status} on GET ${url}. Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return this.get<T>(url, retries - 1, delay * 2);
        }
        throw new Error(`HTTP Error: ${res.status}`);
      }
      return res.json() as Promise<T>;
    } catch (err: any) {
      if (retries > 0 && err.name !== 'AbortError') {
        console.warn(`[API_RETRY] Network failure on GET ${url}: ${err.message}. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.get<T>(url, retries - 1, delay * 2);
      }
      throw err;
    }
  },

  async post<T>(url: string, body: any): Promise<T> {
    const res = await fetchWithTimeout(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return res.json() as Promise<T>;
  },
};

