import { useQuery } from "@tanstack/react-query";
import {
  UserBasicInfo,
  UserSession,
} from "@/utils/types/auth/auth";
import { api } from "@/utils/variables/axiosInstances/backendAxiosInstance";
import axios from "axios";

export function useCurrentUser() {
  return useQuery({
    queryKey: [`authenticatedUser`],
    queryFn: async () => {
      const { data } = await axios.get(
        `${!!Number(import.meta.env.VITE_IS_PROD) ? import.meta.env.VITE_BACKEND_BASE_URL_1 : import.meta.env.VITE_BACKEND_BASE_URL}/users/me`,
        {
          withCredentials: true,
        }
      );
      return data.data as UserBasicInfo;
    },
    retryOnMount: false,
  });
}

export function useSessions() {
  return useQuery({
    queryKey: [`currentUserSessions`],
    queryFn: async () => {
      const { data: currentUserSessions } = await api.get(`/sessions`);
      return currentUserSessions.data as UserSession[];
    },
  });
}

