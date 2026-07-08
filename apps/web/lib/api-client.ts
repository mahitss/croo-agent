const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:10000"
      : window.location.origin)
    : "http://localhost:10000");

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 90000
) {
  console.log("STEP 3");
  console.log("ABOUT TO FETCH", url);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return response;
  } catch (error: any) {
    clearTimeout(timeout);
    console.error("FETCH FAILED", error);
    if (error && error.stack) {
      console.error(error.stack);
    }
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

        throw { name: "HttpError", status: response.status, message: `HTTP Error: ${response.status}` };
      }

      return response.json() as Promise<T>;
    } catch (error: any) {
      if (retries > 0 && error.name !== "AbortError" && error.name !== "HttpError") {
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
    console.log("STEP 2");
    console.log("REQUEST BODY", body);
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