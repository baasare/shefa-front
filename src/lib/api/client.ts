import axios, { AxiosInstance } from 'axios';

import { API_BASE as API_URL } from './config';
import { tokenStorage } from '@/lib/utils/cookies';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = tokenStorage.getAccess();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const newToken = await this.refreshToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            tokenStorage.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<string | null> {
    const refreshToken = tokenStorage.getRefresh();
    if (!refreshToken) return null;

    try {
      const response = await axios.post(`${API_URL}auth/token/refresh/`, {
        refresh: refreshToken,
      });
      const { access } = response.data;
      if (access) {
        tokenStorage.setTokens(access, refreshToken);
        return access;
      }
      return null;
    } catch {
      return null;
    }
  }

  public getClient(): AxiosInstance {
    return this.client;
  }

  public login(accessToken: string, refreshToken: string): void {
    tokenStorage.setTokens(accessToken, refreshToken);
  }

  public logout(): void {
    tokenStorage.clearTokens();
  }
}

export const apiClient = new ApiClient();
export default apiClient.getClient();
