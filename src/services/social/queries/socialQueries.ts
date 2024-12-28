import {
  InfiniteData,
  QueryFilters,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { api } from "@/utils/axiosInstance";
import {
  CommentsRequest,
  CurrentUserProfile,
  Media,
  PostsRequest,
  TCollection,
  TPostInfo,
} from "@/utils/types/social/social";
import {
  EntityOwner,
  EntityPrivacy,
  ResponseWithMessage,
} from "@/utils/types/social/shared";
import { queryClient } from "@/Providers";
import {
  postReactionCacheMutation,
  postInfoTotalCommentsCacheMutation,
  postTotalCommentsCacheMutation,
  createPostPostsCacheMutation,
  postInfoReactionCacheMutation,
} from "../functions/socialFunctions";
import { useAuthStore } from "@/utils/stores/authStore";

export function useForYouFeed() {
  return useInfiniteQuery({
    queryKey: ["posts", "forYouFeed"],
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
      return data.data as ResponseWithMessage & {
        collection: TCollection | null;
        id: string;
        createdAt: Date;
      };
    },
    onSuccess: async (result, variables) => {
      const forYouFeedQueryFilter: QueryFilters = {
        predicate(query) {
          return query.queryKey.includes("forYouFeed");
        },
      };
      //todo: also mutate the posts in currentUser profile
      await createPostPostsCacheMutation({
        queryFilter: forYouFeedQueryFilter,
        result,
        variables,
      });
    },
  });
}

export function useLikePost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      //mutate the cache
      await postInfoReactionCacheMutation({ postId, type: "like" });
      await postReactionCacheMutation({ postId, type: "like" });
      //run the api call
      return await api.post(`posts/${postId}/likes`);
    },
    onError: async (_, postId) => {
      //revert post cache state back to unliked if it throws an error
      await postReactionCacheMutation({ postId, type: "unlike" });
    },
  });
}

export function useUnLikePost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      //mutate the cache
      await postInfoReactionCacheMutation({ postId, type: "unlike" });
      await postReactionCacheMutation({ postId, type: "unlike" });
      //run the api call
      return await api.delete(`posts/${postId}/likes`);
    },
    onError: async (_, postId) => {
      //revert post cache state back to liked if it throws an error
      await postReactionCacheMutation({ postId, type: "like" });
    },
  });
}

export function usePostInfo(postId: string) {
  return useQuery({
    queryKey: ["postInfo", postId],
    queryFn: async () => {
      const { data } = await api.get(`/posts/${postId}`);
      return data.data as TPostInfo;
    },
  });
}

export function usePostComments(postId: string) {
  return useInfiniteQuery({
    queryKey: ["postComments", postId],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const { data } = await api.get(
        `/posts/${postId}/comments?page=${pageParam}&perPage=5`
      );
      return data as CommentsRequest;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
  });
}

type CreatePostCommentArgs = {
  postId: string;
  content: string;
};

export function useCreatePostComment() {
  return useMutation({
    mutationFn: async ({ postId, content }: CreatePostCommentArgs) => {
      const { data } = await api.post(`/posts/${postId}/comments`, { content });
      return data.data as { id: string };
    },
    onSuccess: async (result, variables) => {
      const { id } = result;
      const { postId, content } = variables;
      const currentUser = useAuthStore.getState().currentUser!;
      const newComment = {
        author: currentUser,
        content,
        createdAt: new Date(),
        postId,
        id,
      };
      const queryFilter: QueryFilters = { queryKey: ["postComments", postId] };
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<CommentsRequest, unknown>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          //if there are already existing comments
          if (firstPage && firstPage.data.length > 0) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  data: [newComment, ...firstPage.data],
                  totalPages: oldData.pages[0].totalPages,
                  message: "new post created in cache",
                  page: 1,
                  perPage: 5,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
          //if there are no commnets yet
          else {
            return {
              pageParams: [1],
              pages: [
                {
                  data: [newComment],
                  message: "created first comment in cache",
                  page: 1,
                  perPage: 5,
                  totalPages: 1,
                },
              ],
            };
          }
        }
      );

      await postTotalCommentsCacheMutation({
        postId,
        incrementTotalComments: true,
      });
      await postInfoTotalCommentsCacheMutation({
        postId,
        incrementTotalComments: true,
      });
    },
  });
}
