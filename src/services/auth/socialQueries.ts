import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api } from "@/utils/axiosInstance";
import { CurrentUserProfile, PostsRequest } from "@/utils/types/social/social";

export function useForYouFeed() {
  return useInfiniteQuery({
    queryKey: ["forYouFeed"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const { data } = await api.get(`/feed/for-you?page=${pageParam}`);
      return data as PostsRequest;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
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
