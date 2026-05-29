export type ApiResponse<T> = {
  data: T;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const LOCAL_API_URL = "http://127.0.0.1:8000/api";
const PRODUCTION_API_URL = "https://manager-kols-models-production.up.railway.app/api";

function normalizeApiBaseUrl(value: string) {
  const trimmed = value.trim().replace(/\/$/, "");

  if (!trimmed) {
    return LOCAL_API_URL;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function getApiBaseUrl() {
  return normalizeApiBaseUrl(
    process.env.NEXT_PUBLIC_API_URL ?? (process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : LOCAL_API_URL),
  );
}

export function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem("onstagevn_auth_token");
}

async function parseApiError(response: Response) {
  try {
    const data = await response.json();

    if (typeof data?.message === "string") {
      return new ApiError(data.message, response.status, data?.errors);
    }

    return new ApiError("Không thể xử lý yêu cầu từ backend.", response.status, data);
  } catch {
    return new ApiError("Không thể xử lý yêu cầu từ backend.", response.status);
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw await parseApiError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
