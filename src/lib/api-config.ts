export const API_BASE_URL = 'http://localhost:8000';

export const API_ENDPOINTS = {
  userDashboard: (userId: string) => `${API_BASE_URL}/api/user/${userId}/dashboard`,
  userProgress: (userId: string) => `${API_BASE_URL}/api/user/${userId}/progress`,
  similarUsers: (userId: string) => `${API_BASE_URL}/api/user/${userId}/similar`,
}; 