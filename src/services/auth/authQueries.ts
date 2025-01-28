import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/utils/variables/queryClient";
import {
  LoginResponse,
  RefreshResponse,
  UserBasicInfo
} from "@/utils/types/auth/auth";
import { useAuthStore } from "@/utils/stores/useAuthStore";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export function useRefreshJWT() {
  return useQuery({
    queryKey: ["refreshJWT"],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/refresh`, {
        withCredentials: true
      });
      return data.data as RefreshResponse;
    },
    retryOnMount: false
  });
}

export function useOTC(email: string) {
  return useQuery({
    queryKey: ["otc", email],
    queryFn: async () => {
      const response = await axios.post(`${BASE_URL}/otc/send`, { email });
      return {
        message: response.data.message,
        statusCode: response.status
      };
    }
  });
}

export function useSendOTC() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post(`${BASE_URL}/otc/send`, { email });
      return {
        message: response.data.message,
        statusCode: response.status
      };
    },
    onSuccess: (result, email) => {
      queryClient.setQueryData(["otc", email], {
        message: result.message,
        statusCode: result.statusCode
      });
    }
  });
}

type UseVerifyOTCArgs = { email: string; otc: string };

export function useVerifyOTC() {
  return useMutation({
    mutationFn: async ({ email, otc }: UseVerifyOTCArgs) => {
      await axios.get(`${BASE_URL}/otc/verify?email=${email}&otc=${otc}`);
    }
  });
}

export function useCreateAccount() {
  return useMutation({
    mutationFn: async ({
      username,
      email,
      password,
      handle
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
        handle
      });
    }
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({
      email,
      password
    }: {
      email: string;
      password: string;
    }) => {
      const { data } = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      return data as LoginResponse;
    },
    onSuccess: (result) => {
      queryClient.clear();
      if (result.isDetachedMode) {
        useAuthStore.getState().setDetachedModeUserInfo(result);
        history.replaceState(null, "", "/detached-mode");
      } else {
        const refreshJWTInitialData: RefreshResponse = {
          accessToken: result.data.accessToken,
          currentUserBasicInfo: result.data.user
        };
        queryClient.setQueryData(["refreshJWT"], refreshJWTInitialData);
        useAuthStore.getState().setCurrentUser(result.data.user);
        history.replaceState(null, "", "/anime");
      }
    }
  });
}

export function useFindUserByEmail() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const { data } = await axios.get(
        `${BASE_URL}/auth/forgot-password/find-user-by-email`,
        {
          params: {
            email
          }
        }
      );
      return data.data as UserBasicInfo;
    }
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async ({
      newPassword,
      userId
    }: {
      newPassword: string;
      userId: string;
    }) => {
      await axios.post(`${BASE_URL}/auth/forgot-password/change-password`, {
        userId,
        newPassword
      });
    }
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await axios.post(`${BASE_URL}/auth/logout`, null, {
        withCredentials: true
      });
    },
    onSuccess: () => {
      queryClient.clear();
      history.replaceState(null, "", "/login");
    }
  });
}
