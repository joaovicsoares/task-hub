import { apiClient } from './api';
import { API_ENDPOINTS } from '@/config/api';

interface AuthResponse {
  token: string;
}

interface SignupData {
  email: string;
  password: string;
  username: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.signup, data);
    apiClient.setToken(response.token);
    return response;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.login, data);
    apiClient.setToken(response.token);
    return response;
  },

  logout() {
    apiClient.setToken(null);
  },

  isAuthenticated() {
    return apiClient.isAuthenticated();
  },

  getToken() {
    return apiClient.getToken();
  },
};
