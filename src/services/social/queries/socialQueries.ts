import {
  InfiniteData,
  QueryFilters,
  useInfiniteQuery,
  useMutation,
  useQuery
} from "@tanstack/react-query";
import { api } from "@/utils/axiosInstance";
import {
  CommentsRequest,
  UserProfile,
  Media,
  PostsRequest,
  TCollection,
  TPostInfo,
  CollectionsRequest,
  TPost
} from "@/utils/types/social/social";
import {
  EntityOwner,
  EntityPrivacy,
  ResponseWithMessage
} from "@/utils/types/social/shared";
import { queryClient } from "@/Providers";
import {
  postReactionCacheMutation,
  postInfoTotalCommentsCacheMutation,
  postTotalCommentsCacheMutation,
  createPostPostsCacheMutation,
  postInfoReactionCacheMutation,
  deletePostPostsCacheMutation,
  editPostPostsCacheMutation,
  editPostPostInfoCacheMutation,
  editUserProfileCacheMutation
} from "../functions/socialFunctions";
import { useAuthStore } from "@/utils/stores/useAuthStore";

export function useForYouFeed() {
  return useInfiniteQuery({
    queryKey: ["posts", "forYouFeed"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const { data } = await api.get(`/feed/for-you?page=${pageParam}`);
      return data as PostsRequest;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1
  });
}

export function useUserProfile(
  userHandle?: string,
  currentUserHandle?: string
) {
  return useQuery({
    queryKey: ["userProfile", userHandle],
    queryFn: async () => {
      let url: string;
      if (userHandle === currentUserHandle) {
        url = "/users/me";
      } else {
        url = `/users/${userHandle}`;
      }
      const { data } = await api.get(url);
      return data.data as UserProfile;
    },
    enabled: !!userHandle || !!currentUserHandle
  });
}

type UseEditUserProfileArgs = {
  userHandle: string;
  username: string;
  bio: string | null;
  banner: string | null;
  avatar: string | null;
};

export function useEditUserProfile() {
  return useMutation({
    mutationFn: async ({
      username,
      bio,
      banner,
      avatar
    }: UseEditUserProfileArgs) => {
      await api.put("/profile/details", {
        username,
        bio,
        banner,
        avatar
      });
    },
    onSuccess: (_, variables) => {
      const { avatar, banner, bio, username, userHandle } = variables;
      editUserProfileCacheMutation({
        userHandle,
        avatar,
        banner,
        username,
        bio
      });
    }
  });
}

type CreatePostArgs = {
  content: string | null;
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
      privacy
    }: CreatePostArgs) => {
      const { data } = await api.post("/posts", {
        content,
        media,
        collectionId,
        privacy
      });
      return data.data as ResponseWithMessage & {
        collection: TCollection | null;
        id: string;
      };
    },
    onSuccess: async (result, variables) => {
      const forYouFeedQueryFilter: QueryFilters = {
        predicate(query) {
          return query.queryKey.includes("forYouFeed");
        }
      };
      const currentUserProfilePostsQueryFilter: QueryFilters = {
        queryKey: ["posts", "userProfilePosts", variables.owner.handle],
        exact: true
      };
      await createPostPostsCacheMutation({
        queryFilter: forYouFeedQueryFilter,
        result,
        variables
      });
      await createPostPostsCacheMutation({
        queryFilter: currentUserProfilePostsQueryFilter,
        result,
        variables
      });
    }
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
    }
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
    }
  });
}

export function usePostInfo(postId: string) {
  return useQuery({
    queryKey: ["postInfo", postId],
    queryFn: async () => {
      const { data } = await api.get(`/posts/${postId}`);
      return data.data as TPostInfo;
    }
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
      result.page === result.totalPages ? undefined : result.page + 1
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
        id
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
                  perPage: 5
                },
                ...oldData.pages.slice(1)
              ]
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
                  totalPages: 1
                }
              ]
            };
          }
        }
      );

      await postTotalCommentsCacheMutation({
        postId,
        incrementTotalComments: true
      });
      await postInfoTotalCommentsCacheMutation({
        postId,
        incrementTotalComments: true
      });
    }
  });
}

export function useDeletePost(postId: string | null) {
  return useMutation({
    mutationKey: ["deletePost", postId],
    mutationFn: async (postId: string) => {
      return await api.delete(`/posts/${postId}`);
    },
    onSuccess: async (_, postId) => {
      await deletePostPostsCacheMutation(postId);
    }
  });
}

export function useUserProfilePosts(
  userHandle: string,
  currentUserHandle?: string
) {
  return useInfiniteQuery({
    queryKey: ["posts", "userProfilePosts", userHandle],
    queryFn: async () => {
      let url: string;
      if (userHandle === currentUserHandle) {
        url = "/posts/user/me";
      } else {
        url = `/posts/user/${userHandle}`;
      }
      const { data } = await api.get(url);
      return data as PostsRequest;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    enabled: !!currentUserHandle
  });
}

export function useUserCollections(
  userHandle: string,
  currentUserHandle?: string
) {
  return useInfiniteQuery({
    queryKey: ["collections", "userCollections", userHandle],
    queryFn: async () => {
      let url: string;
      if (userHandle === currentUserHandle) {
        url = "/collections/user/me";
      } else {
        url = `/collections/user/${userHandle}`;
      }
      const { data } = await api.get(url);
      return data as CollectionsRequest;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    enabled: !!currentUserHandle
  });
}

export function useEditPost() {
  return useMutation({
    mutationFn: async (postToEdit: TPost) => {
      const { id, content, privacy, media, collection } = postToEdit;
      return await api.put(`/posts/${id}`, {
        content,
        privacy,
        media,
        collectionId: collection?.id ?? null
      });
    },
    onSuccess: async (_, postToEdit) => {
      await editPostPostsCacheMutation(postToEdit);
      await editPostPostInfoCacheMutation(postToEdit);
    }
  });
}
