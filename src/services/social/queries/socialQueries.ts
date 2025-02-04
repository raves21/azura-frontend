import {
  QueryFilters,
  useInfiniteQuery,
  useMutation,
  useQuery
} from "@tanstack/react-query";
import { api } from "@/utils/variables/axiosInstances/authAxiosInstance";
import {
  CommentsRequest,
  UserProfile,
  Media,
  PostsRequest,
  TCollection,
  TPostInfo,
  CollectionsRequest,
  TPost,
  TPostComment
} from "@/utils/types/social/social";
import {
  EntityOwner,
  EntityPrivacy,
  ResponseWithMessage
} from "@/utils/types/social/shared";
import {
  post_ReactionCacheMutation,
  postInfo_TotalCommentsCacheMutation,
  post_TotalCommentsCacheMutation,
  createPost_PostsCacheMutation,
  postInfo_ReactionCacheMutation,
  deletePost_PostsCacheMutation,
  editPost_PostsCacheMutation,
  editPost_PostInfoCacheMutation,
  editUserProfile_ProfileCacheMutation,
  createComment_CommentsCacheMutation,
  editUserProfile_PostsCacheMutation,
  followUser_UserProfileCacheMutation,
  unFollowUser_UserProfileCacheMutation
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
      const currentUser = useAuthStore.getState().currentUser;
      const setCurrentUser = useAuthStore.getState().setCurrentUser;

      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          avatar,
          username
        });
      }
      editUserProfile_ProfileCacheMutation({
        userHandle,
        avatar,
        banner,
        username,
        bio
      });
      editUserProfile_PostsCacheMutation({
        userHandle,
        avatar,
        banner,
        bio,
        username
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
      await createPost_PostsCacheMutation({
        queryFilter: forYouFeedQueryFilter,
        result,
        variables
      });
      await createPost_PostsCacheMutation({
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
      await postInfo_ReactionCacheMutation({ postId, type: "like" });
      await post_ReactionCacheMutation({ postId, type: "like" });
      //run the api call
      return await api.post(`posts/${postId}/likes`);
    },
    onError: async (_, postId) => {
      //revert post cache state back to unliked if it throws an error
      await post_ReactionCacheMutation({ postId, type: "unlike" });
    }
  });
}

export function useUnLikePost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      //mutate the cache
      await postInfo_ReactionCacheMutation({ postId, type: "unlike" });
      await post_ReactionCacheMutation({ postId, type: "unlike" });
      //run the api call
      return await api.delete(`posts/${postId}/likes`);
    },
    onError: async (_, postId) => {
      //revert post cache state back to liked if it throws an error
      await post_ReactionCacheMutation({ postId, type: "like" });
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
      const newComment: TPostComment = {
        author: currentUser,
        content,
        createdAt: new Date(),
        postId,
        id
      };
      await createComment_CommentsCacheMutation({
        postId,
        newComment
      });
      await post_TotalCommentsCacheMutation({
        postId,
        incrementTotalComments: true
      });
      await postInfo_TotalCommentsCacheMutation({
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
      await deletePost_PostsCacheMutation(postId);
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
      await editPost_PostsCacheMutation(postToEdit);
      await editPost_PostInfoCacheMutation(postToEdit);
    }
  });
}

type FollowUnfollowArgs = {
  userId: string;
  userHandle: string;
};

export function useFollowUser() {
  return useMutation({
    mutationFn: async ({ userId, userHandle }: FollowUnfollowArgs) => {
      //mutate the cache
      followUser_UserProfileCacheMutation({ userHandle });
      //run the api call
      await api.post(`/users/${userId}/follow`);
    },
    onError: (_, variables) => {
      const { userHandle } = variables;
      //if error, set it cache data back to unfollowed
      unFollowUser_UserProfileCacheMutation({ userHandle });
    }
  });
}

export function useUnfollowUser() {
  return useMutation({
    mutationFn: async ({ userId, userHandle }: FollowUnfollowArgs) => {
      //mutate the cache
      unFollowUser_UserProfileCacheMutation({ userHandle });
      //run the api call
      await api.post(`/users/${userId}/unfollow`);
    },
    onError: (_, variables) => {
      const { userHandle } = variables;
      //if error, set it cache data back to followed
      followUser_UserProfileCacheMutation({ userHandle });
    }
  });
}
