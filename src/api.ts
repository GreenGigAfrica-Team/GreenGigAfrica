// Uses env var in production, proxy in development
const BASE = (import.meta.env.VITE_API_URL || '') + '/api/v1';

function getToken(): string | null {
  return localStorage.getItem('gg_access');
}

function authHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

async function request<T>(
  method: string,
  path: string,
  body: unknown = null,
  auth = true
): Promise<T> {
  const opts: RequestInit = {
    method,
    headers: auth ? authHeaders() : { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      data?.detail ||
      data?.phone_number?.[0] ||
      data?.non_field_errors?.[0] ||
      Object.values(data as Record<string, string[]>)?.[0]?.[0] ||
      'Request failed';
    const err = new Error(msg);
    (err as any).status = res.status;
    (err as any).data = data;
    throw err;
  }
  return data as T;
}

export interface OTPResponse {
  detail: string;
  dev_otp?: string;
  dev_note?: string;
}

export interface VerifyResponse {
  tokens: { access: string; refresh: string };
  profile_complete: boolean;
}

export interface ProfilePayload {
  full_name: string;
  lga: string;
  task_interests: string[];
  role: 'job_seeker' | 'volunteer';
}

export const api = {
  requestOTP: (phone_number: string) =>
    request<OTPResponse>('POST', '/auth/request-otp/', { phone_number }, false),

  verifyOTP: (phone_number: string, code: string) =>
    request<VerifyResponse>('POST', '/auth/verify-otp/', { phone_number, code }, false),

  setupProfile: (payload: ProfilePayload) =>
    request('POST', '/auth/setup-profile/', payload),

  me: () => request('GET', '/auth/me/'),
};
