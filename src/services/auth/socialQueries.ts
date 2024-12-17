import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/axiosInstance";
import { CurrentUserProfile, Posts } from "@/utils/types/social/social";

export function useForYouFeed(page: number) {
  return useQuery({
    queryKey: ["for-you-feed", page],
    queryFn: async () => {
      const { data } = await api.get("/feed/for-you");
      return data as Posts;
    },
  });
}

export function useCurrentUserProfile() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data.data as CurrentUserProfile;
    },
  });
}
