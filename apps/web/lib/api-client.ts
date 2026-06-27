export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return res.json() as Promise<T>;
  },
  async post<T>(url: string, body: any): Promise<T> {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/api.json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return res.json() as Promise<T>;
  },
};
