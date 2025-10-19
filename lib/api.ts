// API Integration utilities
// TODO: Replace with your actual API endpoints

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("auth_token")

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}

// Authentication
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (userData: any) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  logout: () => apiRequest("/auth/logout", { method: "POST" }),
}

// Complaints
export const complaintsAPI = {
  getAll: (filters?: any) => apiRequest(`/complaints${filters ? `?${new URLSearchParams(filters)}` : ""}`),

  getById: (id: string) => apiRequest(`/complaints/${id}`),

  create: (complaint: any) =>
    apiRequest("/complaints", {
      method: "POST",
      body: JSON.stringify(complaint),
    }),

  update: (id: string, data: any) =>
    apiRequest(`/complaints/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}

// Cases
export const casesAPI = {
  getAll: (filters?: any) => apiRequest(`/cases${filters ? `?${new URLSearchParams(filters)}` : ""}`),

  getById: (id: string) => apiRequest(`/cases/${id}`),

  update: (id: string, data: any) =>
    apiRequest(`/cases/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  assignAgent: (caseId: string, agentId: string) =>
    apiRequest(`/cases/${caseId}/assign`, {
      method: "POST",
      body: JSON.stringify({ agentId }),
    }),
}

// Criminal History
export const historyAPI = {
  search: (query: string) => apiRequest(`/history/search?q=${encodeURIComponent(query)}`),

  getProfile: (citizenId: string) => apiRequest(`/history/profile/${citizenId}`),
}

// Reports
export const reportsAPI = {
  getStatistics: (filters?: any) =>
    apiRequest(`/reports/statistics${filters ? `?${new URLSearchParams(filters)}` : ""}`),

  export: (type: string, filters?: any) =>
    apiRequest(`/reports/export/${type}${filters ? `?${new URLSearchParams(filters)}` : ""}`),
}

// Notifications
export const notificationsAPI = {
  getAll: () => apiRequest("/notifications"),

  markAsRead: (id: string) => apiRequest(`/notifications/${id}/read`, { method: "PUT" }),

  markAllAsRead: () => apiRequest("/notifications/read-all", { method: "PUT" }),
}

// Admin
export const adminAPI = {
  getUsers: () => apiRequest("/admin/users"),

  createUser: (userData: any) =>
    apiRequest("/admin/users", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  updateUser: (id: string, data: any) =>
    apiRequest(`/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  getAuditLogs: () => apiRequest("/admin/audit-logs"),
}
