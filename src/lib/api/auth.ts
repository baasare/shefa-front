import api, { apiClient } from './client';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login/', credentials);
    const { access, refresh } = response.data;
    apiClient.login(access, refresh);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/register/', data);
    const { access, refresh } = response.data;
    apiClient.login(access, refresh);
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout/');
    } finally {
      apiClient.logout();
    }
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/user/');
    return response.data;
  },

  verifyToken: async (): Promise<boolean> => {
    try {
      await api.post('/api/auth/token/verify/');
      return true;
    } catch {
      return false;
    }
  },
};
