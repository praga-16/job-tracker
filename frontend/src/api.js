// frontend/src/api.js
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

const defaultHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {})
});

export const register = async (name, email, password) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: defaultHeaders(),
    body: JSON.stringify({ name, email, password })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || JSON.stringify(json.errors));
  return json;
};

export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: defaultHeaders(),
    body: JSON.stringify({ email, password })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || JSON.stringify(json.errors));
  return json;
};

export const fetchJobs = async (status) => {
  const token = localStorage.getItem('token');
  const url = status ? `${API_BASE}/jobs?status=${encodeURIComponent(status)}` : `${API_BASE}/jobs`;
  const res = await fetch(url, { headers: defaultHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
};

export const fetchJob = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/jobs/${id}`, { headers: defaultHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch job');
  return res.json();
};

export const createJobApi = async (data) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: defaultHeaders(token),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.errors ? JSON.stringify(json.errors) : json.message || 'Create failed');
  return json;
};

export const updateJobApi = async (id, data) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/jobs/${id}`, {
    method: 'PUT',
    headers: defaultHeaders(token),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.errors ? JSON.stringify(json.errors) : json.message || 'Update failed');
  return json;
};

export const deleteJobApi = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/jobs/${id}`, { method: 'DELETE', headers: defaultHeaders(token) });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
};
