// Central API utility — all calls go through here
const BASE = 'http://127.0.0.1:8000/api/v1';

function getToken() {
  return localStorage.getItem('gg_access');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  };
}

async function request(method, path, body = null, auth = true) {
  const opts = {
    method,
    headers: auth ? authHeaders() : { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // Throw with the full error data so callers can show the real message
    const err = new Error(
      data?.detail || data?.phone_number?.[0] || JSON.stringify(data) || 'Request failed'
    );
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  // Auth
  requestOTP: (phone_number) =>
    request('POST', '/auth/request-otp/', { phone_number }, false),
  verifyOTP: (phone_number, code) =>
    request('POST', '/auth/verify-otp/', { phone_number, code }, false),
  setupProfile: (payload) =>
    request('POST', '/auth/setup-profile/', payload),
  me: () => request('GET', '/auth/me/'),

  // Tasks
  getTasks: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request('GET', `/tasks/${qs ? '?' + qs : ''}`);
  },
  getTask: (id) => request('GET', `/tasks/${id}/`),
  acceptTask: (id) => request('POST', `/tasks/${id}/accept/`),
  withdrawTask: (id) => request('POST', `/tasks/${id}/withdraw/`),
  myTasks: () => request('GET', '/tasks/my-tasks/'),

  // AI match
  matchedTasks: (limit = 6) =>
    request('GET', `/ai/match/?limit=${limit}`),

  // Proof — uses FormData so handled separately
  uploadProof: async (assignmentId, stage, imageFile, lat, lng) => {
    const form = new FormData();
    form.append('stage', stage);
    form.append('image', imageFile);
    if (lat) form.append('latitude', lat);
    if (lng) form.append('longitude', lng);
    const res = await fetch(`${BASE}/proof/${assignmentId}/upload/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: form,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw { status: res.status, data };
    return data;
  },
  getProof: (assignmentId) =>
    request('GET', `/proof/${assignmentId}/`),

  // Volunteer
  volunteerImpact: () => request('GET', '/volunteers/impact/'),

  // Organisations
  registerOrg: (payload) =>
    request('POST', '/organisations/register/', payload),
};
