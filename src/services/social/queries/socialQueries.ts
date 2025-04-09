import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/utils/variables/axiosInstances/backendAxiosInstance";
import {
  PaginatedCommentsResponse,
  UserProfile,
  Media,
  PaginatedPostsResponse,
  TCollection,
  TPostInfo,
  PaginatedCollectionsResponse,
  TPost,
  TPostComment,
  Trend,
  PaginatedUserPreviewsResponse,
  PaginatedCollectionItemsResponse,
} from "@/utils/types/social/social";
import {
  EntityOwner,
  EntityPrivacy,
  ResponseWithMessage,
} from "@/utils/types/social/shared";
import {
  post_ReactionCacheMutation,
  postInfo_TotalCommentsCacheMutation,
  post_TotalCommentsCacheMutation,
  createPost_PostsCacheMutation,
  deletePost_PostsCacheMutation,
  editPost_PostsCacheMutation,
  editPost_PostInfoCacheMutation,
  editUserProfile_ProfileCacheMutation,
  createComment_CommentsCacheMutation,
  editUserProfile_PostsCacheMutation,
  followUser_UserProfileCacheMutation,
  unFollowUser_UserProfileCacheMutation,
  followUser_UserPreviewListCacheMutation,
  unfollowUser_UserPreviewListCacheMutation,
  toggleMediaExistenceInCollectionCacheMutation,
  deleteCollectionItem_CollectionIitemsCacheMutation,
  addCollectionItem_CollectionIitemsCacheMutation,
  editCollectionInfo_CollectionInfoCacheMutation,
} from "../functions/cacheMutations";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { MediaType } from "@/utils/types/shared";
import { PaginatedMediaExistenceInCollectionsResponse } from "@/utils/types/media/shared";
import { queryClient } from "@/utils/variables/queryClient";

export function useForYouFeed() {
  return useInfiniteQuery({
    queryKey: ["posts", "forYouFeed"],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(`/feed/for-you`, {
        params: { page: pageParam },
      });
      return data as PaginatedPostsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
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
    enabled: !!userHandle || !!currentUserHandle,
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
      avatar,
    }: UseEditUserProfileArgs) => {
      await api.put("/profile/details", {
        username,
        bio,
        banner,
        avatar,
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
          username,
        });
      }
      editUserProfile_ProfileCacheMutation({
        userHandle,
        avatar,
        banner,
        username,
        bio,
      });
      editUserProfile_PostsCacheMutation({
        userHandle,
        avatar,
        banner,
        bio,
        username,
      });
    },
  });
}

type CreatePostArgs = {
  content: string | null;
  media: Media | null;
  collectionId: string | null;
  privacy: EntityPrivacy;
  owner: EntityOwner;
  currentUserHandle: string | undefined;
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
      };
    },
    onSuccess: async (result, variables) => {
      if (variables.currentUserHandle) {
        createPost_PostsCacheMutation({
          currentUserHandle: variables.currentUserHandle,
          postsFrom: "forYouFeed",
          result,
          variables,
        });
        createPost_PostsCacheMutation({
          currentUserHandle: variables.currentUserHandle,
          postsFrom: "currentUserProfile",
          result,
          variables,
        });
      }
    },
  });
}

export function useLikePost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      //run the api call
      return await api.post(`posts/${postId}/likes`);
    },
    onError: async (error, postId) => {
      if (!error.message.includes("400")) {
        post_ReactionCacheMutation({ postId, type: "unlike" });
      }
    },
  });
}

export function useUnLikePost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      //run the api call
      return await api.delete(`posts/${postId}/likes`);
    },
    onError: async (error, postId) => {
      if (!error.message.includes("404")) {
        post_ReactionCacheMutation({ postId, type: "like" });
      }
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
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(`/posts/${postId}/comments`, {
        params: { page: pageParam, perPage: 5 },
      });
      return data as PaginatedCommentsResponse;
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
      const currentUser = useAuthStore.getState().currentUser;
      if (currentUser) {
        const newComment: TPostComment = {
          author: currentUser,
          content,
          createdAt: new Date().toString(),
          postId,
          id,
        };
        createComment_CommentsCacheMutation({
          postId,
          newComment,
        });
        post_TotalCommentsCacheMutation({
          postId,
          incrementTotalComments: true,
        });
        postInfo_TotalCommentsCacheMutation({
          postId,
          incrementTotalComments: true,
        });
      }
    },
  });
}

export function useDeletePost(postId: string | null) {
  return useMutation({
    mutationKey: ["deletePost", postId],
    mutationFn: async (postId: string) => {
      return await api.delete(`/posts/${postId}`);
    },
    onSuccess: async (_, postId) => {
      deletePost_PostsCacheMutation(postId);
    },
  });
}

export function useUserProfilePosts(
  userHandle: string,
  currentUserHandle?: string
) {
  return useInfiniteQuery({
    queryKey: ["posts", "userProfilePosts", userHandle],
    queryFn: async ({ pageParam }) => {
      let url: string;
      if (userHandle === currentUserHandle) {
        url = `/posts/user/me`;
      } else {
        url = `/posts/user/${userHandle}`;
      }
      const { data } = await api.get(url, { params: { page: pageParam } });
      return data as PaginatedPostsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    enabled: !!currentUserHandle,
  });
}

type UseUserCollectionArgs = {
  userHandle: string;
  currentUserHandle?: string;
};

export function useUserCollections({
  userHandle,
  currentUserHandle,
}: UseUserCollectionArgs) {
  return useInfiniteQuery({
    queryKey: ["collections", "userCollections", userHandle],
    queryFn: async ({ pageParam }) => {
      let url: string;
      if (userHandle === currentUserHandle) {
        url = `/collections/user/me`;
      } else {
        url = `/collections/user/${userHandle}`;
      }
      const { data } = await api.get(url, { params: { page: pageParam } });
      return data as PaginatedCollectionsResponse;
    },
    initialPageParam: 1,
    refetchOnMount: userHandle === currentUserHandle,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    enabled: !!currentUserHandle,
  });
}

export function useCurrentUserCollections() {
  return useInfiniteQuery({
    queryKey: ["collections", "currentUserCollections"],
    queryFn: async ({ pageParam }) => {
      const { data: collections } = await api.get("/collections/user/me", {
        params: { page: pageParam },
      });
      return collections as PaginatedCollectionsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
  });
}

export function useEditPost() {
  return useMutation({
    mutationFn: async (editedPost: TPost) => {
      const { id, content, privacy, media, collection } = editedPost;
      return await api.put(`/posts/${id}`, {
        content,
        privacy,
        media,
        collectionId: collection?.id ?? null,
      });
    },
    onSuccess: async (_, editedPost) => {
      editPost_PostsCacheMutation(editedPost);
      editPost_PostInfoCacheMutation(editedPost);
    },
  });
}

type FollowUnfollowArgs = {
  userId: string;
  userHandle: string;
  currentUserHandle: string | undefined;
};

export function useFollowUser() {
  return useMutation({
    mutationFn: async ({ userId }: FollowUnfollowArgs) => {
      //run the api call
      await api.post(`/users/${userId}/follow`);
    },
    onError: async (error, variables) => {
      const { userHandle, currentUserHandle } = variables;
      if (!error.message.includes("400")) {
        //if error, set it data back to unfollowed
        unFollowUser_UserProfileCacheMutation({
          userHandle,
          currentUserHandle,
        });
        unfollowUser_UserPreviewListCacheMutation({ userHandle });
      }
    },
  });
}

export function useUnfollowUser() {
  return useMutation({
    mutationFn: async ({ userId }: FollowUnfollowArgs) => {
      //run the api call
      await api.post(`/users/${userId}/unfollow`);
    },
    onError: async (error, variables) => {
      const { userHandle, currentUserHandle } = variables;
      if (!error.message.includes("404")) {
        //if error, set it data back to followed
        followUser_UserProfileCacheMutation({
          userHandle,
          currentUserHandle,
        });
        followUser_UserPreviewListCacheMutation({ userHandle });
      }
    },
  });
}

type UseFollowingFeedArgs = {
  enabled: boolean;
};

export function useFollowingFeed({ enabled }: UseFollowingFeedArgs) {
  return useInfiniteQuery({
    queryKey: ["posts", "followingFeed"],
    queryFn: async ({ pageParam }) => {
      const { data: followingFeed } = await api.get("/feed/following", {
        params: { page: pageParam },
      });
      return followingFeed as PaginatedPostsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    enabled: !!enabled,
  });
}

export function useTrends() {
  return useQuery({
    queryKey: ["trends"],
    queryFn: async () => {
      const { data: trends } = await api.get("/trending");
      return trends.data as Trend[];
    },
    refetchInterval: 300000,
    refetchIntervalInBackground: true,
  });
}

export function useDiscoverPeople() {
  return useInfiniteQuery({
    queryKey: ["discoverPeople", "userPreviewList"],
    queryFn: async ({ pageParam }) => {
      const { data: discoverPeopleResponse } = await api.get(
        "/discover-people",
        { params: { page: pageParam } }
      );
      return discoverPeopleResponse as PaginatedUserPreviewsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
  });
}

export function useUserFollowingList(userId: string, currentUserId: string) {
  return useInfiniteQuery({
    queryKey: ["userFollowingList", "userPreviewList", userId],
    queryFn: async ({ pageParam }) => {
      let url: string;
      if (userId === currentUserId) {
        url = "/users/me/following";
      } else {
        url = `users/${userId}/following`;
      }
      const { data: discoverPeopleResponse } = await api.get(url, {
        params: { page: pageParam },
      });
      return discoverPeopleResponse as PaginatedUserPreviewsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
  });
}

export function useUserFollowerList(userId: string, currentUserId: string) {
  return useInfiniteQuery({
    queryKey: ["currentUserFollowerList", "userPreviewList", userId],
    queryFn: async ({ pageParam }) => {
      let url: string;
      if (userId === currentUserId) {
        url = "/users/me/followers";
      } else {
        url = `users/${userId}/followers`;
      }
      const { data: discoverPeopleResponse } = await api.get(url, {
        params: { page: pageParam },
      });
      return discoverPeopleResponse as PaginatedUserPreviewsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
  });
}

export function useSearchPeople(query: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: ["searchPeople", "userPreviewList", query],
    queryFn: async ({ pageParam }) => {
      const { data: searchPeopleResults } = await api.get("/search/users", {
        params: {
          query,
          page: pageParam,
        },
      });
      return searchPeopleResults as PaginatedUserPreviewsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    enabled: !!enabled,
  });
}

export function useSearchPosts(query: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: ["searchPosts", query],
    queryFn: async ({ pageParam }) => {
      const { data: searchPostsResults } = await api.get("/search/posts", {
        params: {
          query,
          page: pageParam,
        },
      });
      return searchPostsResults as PaginatedPostsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    enabled: !!enabled,
  });
}

type UseMediaExistenceInCollectionsArgs = {
  mediaId: string;
  mediaType: MediaType;
};

export function useMediaExistenceInCollections({
  mediaId,
  mediaType,
}: UseMediaExistenceInCollectionsArgs) {
  return useInfiniteQuery({
    queryKey: [
      "collections",
      "mediaExistenceInCollections",
      mediaId,
      mediaType,
    ],
    queryFn: async ({ pageParam }) => {
      const { data: mediaExistenceInCollections } = await api.get(
        `/collections/check-media-existence/${mediaId}`,
        { params: { type: mediaType, page: pageParam } }
      );
      return mediaExistenceInCollections as PaginatedMediaExistenceInCollectionsResponse;
    },
    refetchOnMount: true,
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
  });
}

type UseAddCollectionItemArgs = {
  collectionId: string;
  media: Media;
  currentUserHandle: string | undefined;
};

export function useAddCollectionItem() {
  return useMutation({
    mutationFn: async ({ collectionId, media }: UseAddCollectionItemArgs) => {
      //mutate the cache
      addCollectionItem_CollectionIitemsCacheMutation({
        collectionId,
        media,
      });
      //run the api call
      await api.post(`/collections/${collectionId}/collection-items`, {
        mediaId: media.id,
        type: media.type,
        title: media.title,
        year: media.year,
        description: media.description,
        coverImage: media.coverImage,
        posterImage: media.posterImage,
        rating: media.rating,
        status: media.status,
      });
    },
    onSuccess: (_, { currentUserHandle, media }) => {
      if (currentUserHandle) {
        queryClient.invalidateQueries({
          queryKey: [
            "collections",
            "mediaExistenceInCollections",
            media.id,
            media.type,
          ],
          refetchType: "none",
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["collections", "userCollections", currentUserHandle],
          exact: true,
        });
      }
    },
    onError: async (error, variables) => {
      const { collectionId, media } = variables;
      if (!error.message.includes("400")) {
        //if error, set it back to doesGivenMediaExist: false
        toggleMediaExistenceInCollectionCacheMutation({
          collectionId,
          mediaId: media.id,
          mediaType: media.type,
          type: "remove",
        });
      }
    },
  });
}

type UseDeleteCollectionItemArgs = {
  collectionId: string;
  media: Media;
};

export function useDeleteCollectionItem({
  collectionId,
  media,
}: UseDeleteCollectionItemArgs) {
  return useMutation({
    mutationKey: ["deleteCollectionItem", collectionId, media.id, media.type],
    mutationFn: async ({
      collectionId,
      media,
    }: UseDeleteCollectionItemArgs) => {
      //mutate cache
      deleteCollectionItem_CollectionIitemsCacheMutation({
        collectionId,
        mediaId: media.id,
        mediaType: media.type,
      });
      //run the api call
      await api.delete(`/collections/${collectionId}/collection-items`, {
        params: { mediaId: media.id, mediaType: media.type },
      });
    },
    onError: async (error, variables) => {
      const { collectionId, media } = variables;
      if (!error.message.includes("404")) {
        //if error, set it back to doesGivenMediaExist: true
        toggleMediaExistenceInCollectionCacheMutation({
          collectionId,
          mediaId: media.id,
          mediaType: media.type,
          type: "add",
        });
      }
    },
  });
}

type UseCreateCollectionArgs = {
  name: string;
  privacy: EntityPrivacy;
  description: string | null;
  photo: string | null;
};

export function useCreateCollection() {
  return useMutation({
    mutationFn: async ({
      name,
      privacy,
      description,
      photo,
    }: UseCreateCollectionArgs) => {
      await api.post("/collections", { name, privacy, description, photo });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
}

export function useEditCollection() {
  return useMutation({
    mutationFn: async (editedCollection: TCollection) => {
      const { description, id, name, privacy, photo } = editedCollection;
      await api.put(`/collections/${id}`, {
        description,
        name,
        privacy,
        photo,
      });
    },
    onSuccess: (_, editedCollection) => {
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes("collections");
        },
      });
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes("posts");
        },
      });
      editCollectionInfo_CollectionInfoCacheMutation(editedCollection);
    },
  });
}

export function useCollectionInfo(collectionId: string) {
  return useQuery({
    queryKey: ["collectionInfo", collectionId],
    queryFn: async () => {
      const { data: collectionInfo } = await api.get(
        `/collections/${collectionId}`
      );
      return collectionInfo.data as TCollection;
    },
  });
}

type UseCollectionItemsArgs = {
  collectionId: string;
  isCurrentUser: boolean;
};

export function useCollectionItems({
  collectionId,
  isCurrentUser,
}: UseCollectionItemsArgs) {
  return useInfiniteQuery({
    queryKey: ["collectionItems", collectionId],
    queryFn: async () => {
      const { data: collectionItems } = await api.get(
        `/collections/${collectionId}/collection-items`
      );
      return collectionItems as PaginatedCollectionItemsResponse;
    },
    refetchOnMount: isCurrentUser,
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
  });
}
