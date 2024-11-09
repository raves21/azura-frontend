import { api } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAccessToken() {
  return useQuery({
    queryKey: ["accessToken"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/refresh`,
        {
          withCredentials: true,
        }
      );
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
