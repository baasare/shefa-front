import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, isLoading, isAuthenticated, login, register, logout, checkAuth } =
    useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      checkAuth();
    }
  }, [checkAuth, isAuthenticated, isLoading]);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };
}
