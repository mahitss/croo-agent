const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${url}`);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return res.json() as Promise<T>;
  },
  async post<T>(url: string, body: any): Promise<T> {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return res.json() as Promise<T>;
  },
};
