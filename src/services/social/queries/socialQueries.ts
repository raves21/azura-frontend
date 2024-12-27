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
  TPost,
  TPostInfo,
} from "@/utils/types/social/social";
import {
  EntityOwner,
  EntityPrivacy,
  ResponseWithMessage,
} from "@/utils/types/social/shared";
import { queryClient } from "@/Providers";
import {
  unlikePostCacheMutation,
  likePostCacheMutation,
} from "../functions/socialFunctions";

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
      return data.data as ResponseWithMessage & {
        collection: TCollection | null;
        id: string;
        createdAt: Date;
      };
    },
    onSuccess: async (result, variables) => {
      const { content, media, privacy, owner } = variables;
      const { collection, createdAt, id } = result;
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
        (oldData) => {
          const firstPage = oldData?.pages[0];
          //if there are already existing posts
          if (firstPage && firstPage.data.length > 0) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  data: [newPost, ...firstPage.data],
                  //totalPages is ofcourse not accurate, this is just to make typescript happy.
                  //this wont affect anything. (source: trust me bro)
                  totalPages: oldData.pages[0].totalPages,
                  message: "new post created in cache",
                  page: 1,
                  perPage: 10,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
          //if there are no posts yet
          else {
            return {
              pageParams: [1],
              pages: [
                {
                  data: [newPost],
                  message: "success creating the first post",
                  page: 1,
                  perPage: 10,
                  totalPages: 1,
                },
              ],
            };
          }
        }
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
    },
  });
}

export function useLikePost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      return await api.post(`posts/${postId}/likes`);
    },
    onError: async (_, postId) => {
      //revert post state back to unliked if it throws an error
      await unlikePostCacheMutation(postId);
    },
  });
}

export function useUnLikePost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      return await api.delete(`posts/${postId}/likes`);
    },
    onError: async (_, postId) => {
      //revert post state back to liked if it throws an error
      await likePostCacheMutation(postId);
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
        `/posts/${postId}/comments?page=${pageParam}`
      );
      return data as CommentsRequest;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
  });
}
