const API_BASE = '';

function getToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(path.startsWith('/') ? path : `/api${path}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(text || res.statusText);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function login(email, password) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function getStudents() {
  return request('/students');
}

export async function getStudent(id) {
  return request(`/students/${id}`);
}

export async function getFaculty() {
  return request('/faculty');
}

export async function getClasses() {
  return request('/classes');
}

export async function createClass(payload) {
  return request('/classes', { method: 'POST', body: JSON.stringify(payload) });
}

export async function markAttendance(payload) {
  return request('/attendance/mark', { method: 'POST', body: JSON.stringify(payload) });
}

export async function getAttendanceByStudent(studentId) {
  return request(`/attendance/student/${studentId}`);
}

export async function getAttendanceByClass(classId) {
  return request(`/attendance/class/${classId}`);
}

export default { login, getStudents, getStudent, getFaculty, getClasses, createClass, markAttendance, getAttendanceByStudent, getAttendanceByClass };
