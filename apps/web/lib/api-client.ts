const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "");

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 15000
) {
  if (!BASE_URL && typeof window !== "undefined") {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not defined. Please configure it in your Vercel Environment Variables."
    );
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

export const apiClient = {
  async get<T>(
    url: string,
    retries = 3,
    delay = 1000
  ): Promise<T> {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (
          retries > 0 &&
          [429, 502, 503, 504].includes(response.status)
        ) {
          console.warn(
            `[API_RETRY] HTTP ${response.status} → ${url}. Retrying in ${delay}ms...`
          );

          await new Promise((resolve) =>
            setTimeout(resolve, delay)
          );

          return this.get<T>(url, retries - 1, delay * 2);
        }

        throw new Error(`HTTP Error: ${response.status}`);
      }

      return response.json() as Promise<T>;
    } catch (error: any) {
      if (retries > 0 && error.name !== "AbortError") {
        console.warn(
          `[API_RETRY] Network error → ${url}: ${error.message}. Retrying in ${delay}ms...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );

        return this.get<T>(url, retries - 1, delay * 2);
      }

      throw error;
    }
  },

  async post<T>(url: string, body: any): Promise<T> {
    const response = await fetchWithTimeout(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },

  async put<T>(url: string, body: any): Promise<T> {
    const response = await fetchWithTimeout(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },

  async delete<T>(url: string): Promise<T> {
    const response = await fetchWithTimeout(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },
};