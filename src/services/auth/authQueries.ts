import { api } from "@/utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/Providers";
import { LoginResponse } from "@/utils/types/auth/auth";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export function useAccessToken() {
  return useQuery({
    queryKey: ["accessToken"],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/refresh`, {
        withCredentials: true,
      });
      return data.data.accessToken;
    },
    retryOnMount: false,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data.data;
    },
  });
}

export function useOTC(email: string) {
  return useQuery({
    queryKey: ["otc", email],
    queryFn: async () => {
      const response = await axios.post(`${BASE_URL}/otc/send`, { email });
      return {
        message: response.data.message,
        statusCode: response.status,
      };
    },
  });
}

export function useSendtOTC(email: string) {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post(`${BASE_URL}/otc/send`, { email });
      return {
        message: response.data.message,
        statusCode: response.status,
      };
    },
    onSuccess: (result) => {
      queryClient.setQueryData(["otc", email], {
        message: result.message,
        statusCode: result.statusCode,
      });
    },
  });
}

export function useVerifyOTC() {
  return useMutation({
    mutationFn: async ({ email, otc }: { email: string; otc: string }) => {
      await axios.get(`${BASE_URL}/otc/verify?email=${email}&otc=${otc}`);
    },
  });
}

export function useCreateAccount() {
  return useMutation({
    mutationFn: async ({
      username,
      email,
      password,
      handle,
    }: {
      username: string;
      email: string;
      password: string;
      handle: string;
    }) => {
      await axios.post(`${BASE_URL}/auth/signup`, {
        username,
        email,
        password,
        handle,
      });
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data } = await axios.post<LoginResponse>(
        `${BASE_URL}/auth/login`,
        { email, password }
      );

      return data;
    },
  });
}
