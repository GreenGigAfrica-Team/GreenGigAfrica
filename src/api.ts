// Central API utility
// In dev: Vite proxy forwards /api → http://127.0.0.1:8000
// In prod: VITE_API_URL points to the deployed backend
const BASE = (import.meta.env.VITE_API_URL ?? '') + '/api/v1';

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
    const d = data as Record<string, unknown>;
    const msg =
      (d?.detail as string) ||
      (d?.phone_number as string[])?.[0] ||
      (d?.non_field_errors as string[])?.[0] ||
      (Object.values(d)?.[0] as string[])?.[0] ||
      'Request failed';
    const err = new Error(msg) as Error & { status: number; data: unknown };
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data as T;
}

export interface OTPResponse { detail: string; dev_otp?: string; }
export interface TokenPair { access: string; refresh: string; }
export interface VerifyResponse { tokens: TokenPair; profile_complete: boolean; }
export interface FirebaseLoginResponse { message: string; phone: string; tokens: TokenPair; profile_complete: boolean; }
export interface ProfilePayload { full_name: string; lga: string; task_interests: string[]; role: 'job_seeker' | 'volunteer'; }
export interface Profile { id: number; phone_number: string; role: string; full_name: string; lga: string; task_interests: string[]; total_tasks_completed: number; total_waste_kg: string; total_trees_planted: number; total_earnings: string; impact_score: number; created_at: string; }
export interface Task { id: number; title: string; description: string; category: string; lga: string; reward: string; status: string; deadline: string | null; }
export interface Assignment { assignment_id: number; assignment_status: string; task: Task; }

export const api = {
  firebaseLogin: (token: string) =>
    request<FirebaseLoginResponse>('POST', '/auth/firebase-login/', { token }, false),
  requestOTP: (phone_number: string) =>
    request<OTPResponse>('POST', '/auth/request-otp/', { phone_number }, false),
  verifyOTP: (phone_number: string, code: string) =>
    request<VerifyResponse>('POST', '/auth/verify-otp/', { phone_number, code }, false),
  setupProfile: (payload: ProfilePayload) =>
    request<Profile>('POST', '/auth/setup-profile/', payload),
  me: () => request<Profile>('GET', '/auth/me/'),
  refreshToken: (refresh: string) =>
    request<{ access: string }>('POST', '/auth/token/refresh/', { refresh }, false),
  getTasks: (params: Record<string, string> = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request<{ results: Task[]; count: number }>('GET', `/tasks/${qs ? '?' + qs : ''}`);
  },
  getTask: (taskId: number) => request<Task>('GET', `/tasks/${taskId}/`),
  acceptTask: (taskId: number) => request('POST', `/tasks/${taskId}/accept/`),
  withdrawTask: (taskId: number) => request('POST', `/tasks/${taskId}/withdraw/`),
  myTasks: () => request<Assignment[]>('GET', '/tasks/my-tasks/'),
  orgDashboard: () => request('GET', '/tasks/org-dashboard/'),
  matchedTasks: (limit = 6) => request<{ results: Task[] }>('GET', `/ai/match/?limit=${limit}`),
  uploadProof: async (assignmentId: number, stage: string, imageFile: File, lat?: number, lng?: number) => {
    const form = new FormData();
    form.append('stage', stage);
    form.append('image', imageFile);
    if (lat != null) form.append('latitude', String(lat));
    if (lng != null) form.append('longitude', String(lng));
    const res = await fetch(`${BASE}/proof/${assignmentId}/upload/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: form,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((data as { detail?: string })?.detail || 'Upload failed');
    return data;
  },
  getProof: (assignmentId: number) => request('GET', `/proof/${assignmentId}/`),
  reviewProof: (assignmentId: number, payload: { status: string; note?: string }) =>
    request('POST', `/proof/${assignmentId}/review/`, payload),
  volunteerImpact: () => request('GET', '/volunteers/impact/'),
  downloadCertificate: (assignmentId: number) => request('GET', `/volunteers/certificate/${assignmentId}/`),
  registerOrg: (payload: unknown) => request('POST', '/organisations/register/', payload),
  myOrganisation: () => request('GET', '/organisations/me/'),
};
