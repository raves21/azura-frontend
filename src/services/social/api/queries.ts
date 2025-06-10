import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/utils/variables/axiosInstances/backendAxiosInstance";
import {
  PaginatedCommentsResponse,
  UserProfile,
  PaginatedPostsResponse,
  TCollection,
  TPostInfo,
  PaginatedCollectionsResponse,
  Trend,
  PaginatedUserPreviewsResponse,
  PaginatedCollectionItemsResponse,
  PaginatedNotificationsResponse,
  PaginatedFollowerFollowingResponse,
  PaginatedPostLikesResponse,
  UserPreview,
} from "@/utils/types/social/social";
import { deletePost_PostsCacheMutation } from "../functions/cacheMutations";
import { MediaType } from "@/utils/types/shared";
import { PaginatedMediaExistenceInCollectionsResponse } from "@/utils/types/media/shared";
import {
  frequentlyChanging,
  rarelyChanging,
} from "@/utils/variables/queryClient";

export function useForYouFeed() {
  return useInfiniteQuery({
    queryKey: [`posts`, `forYouFeed`],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(`/feed/for-you`, {
        params: { page: pageParam },
      });
      return data as PaginatedPostsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}

export function useUserProfile(
  userHandle: string | undefined,
  currentUserHandle: string | undefined
) {
  return useQuery({
    queryKey: [`userProfile`, userHandle],
    queryFn: async () => {
      let url: string;
      if (userHandle === currentUserHandle) {
        url = `/users/me`;
      } else {
        url = `/users/${userHandle}`;
      }
      const { data } = await api.get(url);
      return data.data as UserProfile;
    },
    enabled: !!userHandle || !!currentUserHandle,
  });
}

export function usePostInfo(postId: string) {
  return useQuery({
    queryKey: [`postInfo`, postId],
    queryFn: async () => {
      const { data } = await api.get(`/posts/${postId}`);
      return data.data as TPostInfo;
    },
  });
}

export function usePostComments(postId: string) {
  return useInfiniteQuery({
    queryKey: [`postComments`, postId],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(`/posts/${postId}/comments`, {
        params: { page: pageParam, perPage: 5 },
      });
      return data as PaginatedCommentsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}

export function useDeletePost(postId: string | null) {
  return useMutation({
    mutationKey: [`deletePost`, postId],
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
  currentUserHandle: string | undefined
) {
  return useInfiniteQuery({
    queryKey: [`posts`, `userProfilePosts`, userHandle],
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
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
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
    queryKey: [`collections`, `userCollections`, userHandle],
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
    gcTime: rarelyChanging.gcTime,
    staleTime: rarelyChanging.staleTime,
  });
}

export function useCurrentUserCollections() {
  return useInfiniteQuery({
    queryKey: [`collections`, `currentUserCollections`],
    queryFn: async ({ pageParam }) => {
      const { data: collections } = await api.get(`/collections/user/me`, {
        params: { page: pageParam },
      });
      return collections as PaginatedCollectionsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    gcTime: rarelyChanging.gcTime,
    staleTime: rarelyChanging.staleTime,
  });
}

type UseFollowingFeedArgs = {
  enabled: boolean;
};

export function useFollowingFeed({ enabled }: UseFollowingFeedArgs) {
  return useInfiniteQuery({
    queryKey: [`posts`, `followingFeed`],
    queryFn: async ({ pageParam }) => {
      const { data: followingFeed } = await api.get(`/feed/following`, {
        params: { page: pageParam },
      });
      return followingFeed as PaginatedPostsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    enabled: !!enabled,
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}

export function useTrends() {
  return useQuery({
    queryKey: [`trends`],
    queryFn: async () => {
      const { data: trends } = await api.get(`/trending`);
      return trends.data as Trend[];
    },
    refetchInterval: 60 * 60 * 1000,
    refetchIntervalInBackground: true,
  });
}

export function useDiscoverPeople() {
  return useInfiniteQuery({
    queryKey: [`discoverPeople`, `userPreviewList`],
    queryFn: async ({ pageParam }) => {
      const { data: discoverPeopleResponse } = await api.get(
        `/discover-people`,
        { params: { page: pageParam } }
      );
      return discoverPeopleResponse as PaginatedUserPreviewsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    gcTime: rarelyChanging.gcTime,
    staleTime: rarelyChanging.staleTime,
  });
}

export function useDiscoverPeoplePreview() {
  return useQuery({
    queryKey: [`discoverPeoplePreview`, `userPreviewList`],
    queryFn: async () => {
      const { data: discoverPeoplePreviewResponse } = await api.get(
        `/discover-people`,
        { params: { perPage: 5 } }
      );
      return discoverPeoplePreviewResponse.data as UserPreview[];
    },
    gcTime: rarelyChanging.gcTime,
    staleTime: rarelyChanging.staleTime,
  });
}

export function useUserFollowingList(userId: string, currentUserId: string) {
  return useInfiniteQuery({
    queryKey: [`userFollowingList`, `userPreviewList`, userId],
    queryFn: async ({ pageParam }) => {
      let url: string;
      if (userId === currentUserId) {
        url = `/users/me/following`;
      } else {
        url = `/users/${userId}/following`;
      }
      const { data: discoverPeopleResponse } = await api.get(url, {
        params: { page: pageParam },
      });
      return discoverPeopleResponse as PaginatedUserPreviewsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}

export function useUserFollowerList(userId: string, currentUserId: string) {
  return useInfiniteQuery({
    queryKey: [`currentUserFollowerList`, `userPreviewList`, userId],
    queryFn: async ({ pageParam }) => {
      let url: string;
      if (userId === currentUserId) {
        url = `/users/me/followers`;
      } else {
        url = `/users/${userId}/followers`;
      }
      const { data: discoverPeopleResponse } = await api.get(url, {
        params: { page: pageParam },
      });
      return discoverPeopleResponse as PaginatedUserPreviewsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}

export function useSearchPeople(query: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: [`searchPeople`, `userPreviewList`, query],
    queryFn: async ({ pageParam }) => {
      const { data: searchPeopleResults } = await api.get(`/search/users`, {
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
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}

export function useSearchPosts(query: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: [`searchPosts`, `posts`, query],
    queryFn: async ({ pageParam }) => {
      const { data: searchPostsResults } = await api.get(`/search/posts`, {
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
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}

type UseMediaExistenceInCollectionArgs = {
  mediaId: string;
  mediaType: MediaType;
};

export function useMediaExistenceInCollections({
  mediaId,
  mediaType,
}: UseMediaExistenceInCollectionArgs) {
  return useInfiniteQuery({
    queryKey: [
      `collections`,
      `mediaExistenceInCollections`,
      mediaId,
      mediaType,
    ],
    queryFn: async ({ pageParam }) => {
      const { data: mediaExistenceInCollections } = await api.get(
        `/collections/check-media-existence`,
        { params: { mediaId, type: mediaType, page: pageParam } }
      );
      return mediaExistenceInCollections as PaginatedMediaExistenceInCollectionsResponse;
    },
    refetchOnMount: true,
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
  });
}

export function useMediaExistenceInCollection({
  mediaId,
  mediaType,
  collectionId,
}: UseMediaExistenceInCollectionArgs & { collectionId: string }) {
  return useQuery({
    queryKey: [`mediaExistenceInCollection`, mediaId, mediaType],
    queryFn: async () => {
      const { data: mediaExistenceInCollection } = await api.get(
        `/collections/${collectionId}/check-media-existence`,
        { params: { mediaId, type: mediaType } }
      );
      return mediaExistenceInCollection.data as {
        doesGivenMediaExist: boolean;
      };
    },
  });
}

export function useCollectionInfo(collectionId: string) {
  return useQuery({
    queryKey: [`collectionInfo`, collectionId],
    queryFn: async () => {
      const { data: collectionInfo } = await api.get(
        `/collections/${collectionId}`
      );
      return collectionInfo.data as TCollection;
    },
    gcTime: rarelyChanging.gcTime,
    staleTime: rarelyChanging.staleTime,
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
    queryKey: [`collectionItems`, collectionId],
    queryFn: async ({ pageParam }) => {
      const { data: collectionItems } = await api.get(
        `/collections/${collectionId}/collection-items`,
        { params: { page: pageParam } }
      );
      return collectionItems as PaginatedCollectionItemsResponse;
    },
    refetchOnMount: isCurrentUser,
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}

export function useNotifications() {
  return useInfiniteQuery({
    queryKey: [`notifications`],
    queryFn: async ({ pageParam }) => {
      const { data: notifications } = await api.get(`/notifications`, {
        params: {
          page: pageParam,
        },
      });
      return notifications as PaginatedNotificationsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}

type FollowingFollowerList = {
  userHandle: string;
  currentUserHandle: string | undefined;
};

export function useFollowingList({
  currentUserHandle,
  userHandle,
}: FollowingFollowerList) {
  return useInfiniteQuery({
    queryKey: [
      `followingList`,
      `userPreviewList`,
      userHandle,
      currentUserHandle,
    ],
    queryFn: async ({ pageParam }) => {
      let url: string;
      if (userHandle === currentUserHandle) {
        url = `/users/me/following`;
      } else {
        url = `/users/${userHandle}/following`;
      }

      const { data: followingList } = await api.get(url, {
        params: { page: pageParam },
      });

      return followingList as PaginatedFollowerFollowingResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}

export function useFollowerList({
  currentUserHandle,
  userHandle,
}: FollowingFollowerList) {
  return useInfiniteQuery({
    queryKey: [
      `followerList`,
      `userPreviewList`,
      userHandle,
      currentUserHandle,
    ],
    queryFn: async ({ pageParam }) => {
      let url: string;
      if (userHandle === currentUserHandle) {
        url = `/users/me/followers`;
      } else {
        url = `/users/${userHandle}/followers`;
      }

      const { data: followerList } = await api.get(url, {
        params: { page: pageParam },
      });

      return followerList as PaginatedUserPreviewsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}

export function usePostLikes(postId: string) {
  return useInfiniteQuery({
    queryKey: [`postLikes`, postId, `userPreviewList`],
    queryFn: async () => {
      const { data: postLikes } = await api.get(`/posts/${postId}/likes`);
      return postLikes as PaginatedPostLikesResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (result) =>
      result.page === result.totalPages ? undefined : result.page + 1,
    gcTime: frequentlyChanging.gcTime,
    staleTime: frequentlyChanging.staleTime,
  });
}
