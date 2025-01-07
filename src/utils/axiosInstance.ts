import axios from "axios";
import { queryClient } from "@/Providers";
import { RefreshResponse } from "./types/auth/auth";
import { useAuthStore } from "./stores/useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true,
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const data = queryClient.getQueryData(["refreshJWT"]) as RefreshResponse;
    if (data) {
      config.headers.Authorization = `Bearer ${data.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshSuccess = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If error is not 401 or request already retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If token refresh is already in progress, wait for it
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/refresh`,
        {
          withCredentials: true,
        }
      );
      const data = response.data.data as RefreshResponse;
      queryClient.setQueryData(["refreshJWT"], data);
      onRefreshSuccess(data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      // If refresh token is expired/invalid, set the accesstoken to null
      queryClient.setQueryData(["refreshJWT"], null);
      useAuthStore.getState().setCurrentUser(null);
      history.replaceState(null, "", "/login");
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export { api };
