import { useState, useEffect } from 'react';
import apiClient from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = { immediate: true }
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  };

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, []);

  return {
    ...state,
    execute,
    refetch: execute,
  };
}

// Specific hooks for common operations
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      apiClient.setToken(token);
      // Verify token by fetching current user
      apiClient.getCurrentUser()
        .then((userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // Token is invalid
          apiClient.clearToken();
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);
      apiClient.setToken(response.accessToken);
      setUser(response);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData: any) => {
    try {
      const response = await apiClient.signup(userData);
      apiClient.setToken(response.accessToken);
      setUser(response);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiClient.clearToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    logout,
  };
}

export function useDashboard() {
  return useApi(() => apiClient.getDashboardStats());
}

export function useProducts() {
  return useApi(() => apiClient.getProducts());
}

export function useOrders() {
  return useApi(() => apiClient.getOrders());
}

export function usePayments() {
  return useApi(() => apiClient.getPayments());
}

export function useShipments() {
  return useApi(() => apiClient.getShipments());
}

export function useNotifications() {
  return useApi(() => apiClient.getNotifications());
}

export function useBusiness() {
  return useApi(() => apiClient.getCurrentBusiness());
}