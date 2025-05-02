import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/utils/variables/queryClient";
import { LoginResponse, UserBasicInfo } from "@/utils/types/auth/auth";
import { api } from "@/utils/variables/axiosInstances/backendAxiosInstance";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import Bowser from "bowser";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["authenticatedUser"],
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data.data as UserBasicInfo;
    },
    retryOnMount: false,
  });
}

export function useOTC(email: string) {
  return useQuery({
    queryKey: ["otc", email],
    queryFn: async () => {
      const response = await api.post("/otc/send", { email });
      return {
        message: response.data.message,
        statusCode: response.status,
      };
    },
  });
}

export function useSendOTC() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await api.post("/otc/send", { email });
      return {
        message: response.data.message,
        statusCode: response.status,
      };
    },
    onSuccess: (result, email) => {
      queryClient.setQueryData(["otc", email], {
        message: result.message,
        statusCode: result.statusCode,
      });
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
    onSuccess: (result) => {
      queryClient.clear();
      if (result.isDetachedMode) {
        useAuthStore.getState().setDetachedModeUserInfo(result);
        history.replaceState(null, "", "/detached-mode");
      } else {
        queryClient.setQueryData<UserBasicInfo>(
          ["authenticatedUser"],
          result.data.user
        );
        history.replaceState(null, "", "/movie");
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

export function useChangePassword() {
  return useMutation({
    mutationFn: async ({
      newPassword,
      userId,
    }: {
      newPassword: string;
      userId: string;
    }) => {
      await api.post("/auth/forgot-password/change-password", {
        userId,
        newPassword,
      });
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout", null);
    },
    onSuccess: () => {
      queryClient.clear();
      history.replaceState(null, "", "/login");
    },
  });
}
