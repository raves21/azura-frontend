import {
  InfiniteData,
  QueryFilters,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { api } from "@/utils/axiosInstance";
import {
  CurrentUserProfile,
  Media,
  PostsRequest,
  TCollection,
  TPost,
} from "@/utils/types/social/social";
import {
  EntityOwner,
  EntityPrivacy,
  ResponseWithMessage,
} from "@/utils/types/social/shared";
import { queryClient } from "@/Providers";
import {
  likePostCacheMutation,
  unlikePostCacheMutation,
} from "@/utils/functions/reusable_functions";

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

type CreatePostArgs = {
  content: string;
  media: Media | null;
  collectionId: string | null;
  privacy: EntityPrivacy;
  owner: EntityOwner;
};

export function useCreatePost() {
  return useMutation({
    mutationFn: async ({
      content,
      media,
      collectionId,
      privacy,
    }: CreatePostArgs) => {
      const { data } = await api.post("/posts", {
        content,
        media,
        collectionId,
        privacy,
      });
      return data as ResponseWithMessage & {
        collection: TCollection | null;
        id: string;
        createdAt: Date;
      };
    },
    onSuccess: async (data, variables) => {
      const { content, media, privacy, owner } = variables;
      const { collection, createdAt, id } = data;
      const queryFilter: QueryFilters = { queryKey: ["forYouFeed"] };
      await queryClient.cancelQueries(queryFilter);
      let newPost: TPost;
      if (media) {
        newPost = {
          id,
          totalComments: 0,
          totalLikes: 0,
          collection: null,
          content,
          createdAt,
          isLikedByCurrentUser: false,
          media,
          owner,
          privacy,
        };
      } else if (collection) {
        newPost = {
          id,
          totalComments: 0,
          totalLikes: 0,
          collection,
          content,
          createdAt,
          isLikedByCurrentUser: false,
          media: null,
          owner,
          privacy,
        };
      } else {
        newPost = {
          id,
          totalComments: 0,
          totalLikes: 0,
          collection: null,
          content,
          createdAt,
          isLikedByCurrentUser: false,
          media: null,
          owner,
          privacy,
        };
      }
      queryClient.setQueriesData<InfiniteData<PostsRequest, unknown>>(
        queryFilter,
        // @ts-ignore
        (oldData) => {
          if (!oldData) return oldData;
          const firstPage = oldData.pages[0];
          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  data: [newPost, ...firstPage.data],
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        }
      );
    },
  });
}

export function useLikePost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      console.log("LIKING POST...");
      return await api.post(`posts/${postId}/likes`);
    },
    onSuccess: () => console.log("POST LIKED!"),
    onError: async (_, postId) => {
      await unlikePostCacheMutation(postId);
    },
  });
}

export function useUnLikePost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      console.log("UNLIKING POST...");
      return await api.delete(`posts/${postId}/likes`);
    },
    onSuccess: () => console.log("POST UNLIKED!"),
    onError: async (_, postId) => {
      await likePostCacheMutation(postId);
    },
  });
}
