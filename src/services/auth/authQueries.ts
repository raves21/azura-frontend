import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/utils/variables/queryClient";
import {
  LoginResponse,
  UserBasicInfo,
  UserSession,
} from "@/utils/types/auth/auth";
import { api } from "@/utils/variables/axiosInstances/backendAxiosInstance";
import Bowser from "bowser";
import { setCurrentUser } from "./sharedFunctions";
import axios from "axios";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import {
  closeAllPopups,
  drawRandomURL,
} from "@/utils/functions/sharedFunctions";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["authenticatedUser"],
    queryFn: async () => {
      const RANDOM_BACKEND_URL = drawRandomURL({
        urlList: [
          `${import.meta.env.VITE_BACKEND_BASE_URL_1}`,
          `${import.meta.env.VITE_BACKEND_BASE_URL_2}`,
        ],
      });

      const BACKEND_URL = !!Number(import.meta.env.VITE_IS_PROD)
        ? RANDOM_BACKEND_URL
        : import.meta.env.VITE_BACKEND_BASE_URL;
      const { data } = await axios.get(`${BACKEND_URL}/users/me`, {
        withCredentials: true,
      });
      return data.data as UserBasicInfo;
    },
    retryOnMount: false,
  });
}

export function useSendOTC({ key }: { key?: string }) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async (email: string) => {
      const response = await api.post("/otc/send", { email });
      return {
        message: response.data.message,
        statusCode: response.status,
      };
    },
  });
}

type UseVerifyOTCArgs = { email: string; otc: string };

export function useVerifyOTC() {
  return useMutation({
    mutationFn: async ({ email, otc }: UseVerifyOTCArgs) => {
      await api.get("/otc/verify", { params: { email, otc } });
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
      await api.post("/auth/signup", {
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
      const userAgentParser = Bowser.getParser(window.navigator.userAgent);
      const { data } = await api.post("/auth/login", {
        email,
        password,
        browser: userAgentParser.getBrowser().name,
        os: userAgentParser.getOS().name,
        platform: userAgentParser.getPlatform().type,
      });

      return data as LoginResponse;
    },
    onSuccess: (result, { password }) => {
      queryClient.clear();
      if (result.isDetachedMode) {
        useAuthStore.getState().setDetachedModeUserInfo({
          ...result,
          data: {
            ...result.data,
            user: {
              ...result.data.user,
              password,
            },
          },
        });
        history.replaceState(null, "", "/detached-mode");
      } else {
        setCurrentUser(result.data.user);
        history.replaceState(null, "", "/anime");
      }
    },
  });
}

export function useFindUserByEmail() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const { data } = await api.get(
        "/auth/forgot-password/find-user-by-email",
        {
          params: {
            email,
          },
        }
      );
      return data.data as UserBasicInfo;
    },
  });
}

type UseChangePasswordArgs = {
  userId: string;
  newPassword: string;
};

export function useForgotPasswordChangePassword() {
  return useMutation({
    mutationFn: async ({ newPassword, userId }: UseChangePasswordArgs) => {
      await api.post("/auth/forgot-password/change-password", {
        userId,
        newPassword,
      });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async ({
      newPassword,
    }: Pick<UseChangePasswordArgs, "newPassword">) => {
      await api.put("/account/password", {
        password: newPassword,
      });
    },
  });
}

export function useLogout({ key }: { key: string }) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      setCurrentUser(null);
      closeAllPopups();
      queryClient.clear();
      history.replaceState(null, "", "/login");
    },
  });
}

export function useSessions() {
  return useQuery({
    queryKey: ["currentUserSessions"],
    queryFn: async () => {
      const { data: currentUserSessions } = await api.get("/sessions");
      return currentUserSessions.data as UserSession[];
    },
  });
}

export function useVerifyPassword() {
  return useMutation({
    mutationFn: async (password: string) => {
      await api.post("/account/verify-password", { password });
    },
  });
}

export function useChangeEmail() {
  return useMutation({
    mutationFn: async (email: string) => {
      await api.put("/account/email", { email });
    },
  });
}

export function useChangeHandle({ key }: { key: string }) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async (handle: string) => {
      await api.put("/account/handle", { handle });
    },
  });
}

export function useVerifyHandle() {
  return useMutation({
    mutationFn: async (handle: string) => {
      await api.get("/auth/check-handle-availability", {
        params: {
          handle,
        },
      });
    },
  });
}

export function useAccountSettingLogoutSession({ key }: { key: string }) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async (sessionId: string) => {
      await api.post(`/sessions/${sessionId}/logout`);
    },
    onSuccess: (_, sessionId) => {
      queryClient.setQueryData<UserSession[] | undefined>(
        ["currentUserSessions"],
        (oldData) => {
          if (!oldData) return undefined;
          return oldData.filter((userSession) => userSession.id !== sessionId);
        }
      );
    },
  });
}

export function useDetachedModeLogoutSession({ key }: { key: string }) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async (sessionId: string) => {
      await api.post(`/auth/detached/${sessionId}/logout`);
    },
  });
}

export function useDeleteAccount({ key }: { key: string }) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async () => {
      await api.post("/account/delete-account");
    },
    onSuccess: () => {
      setCurrentUser(null);
      closeAllPopups();
      queryClient.clear();
      history.replaceState(null, "", "/login");
    },
  });
}
