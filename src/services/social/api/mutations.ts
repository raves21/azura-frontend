import { EntityPrivacy, EntityOwner } from "@/utils/types/social/shared";
import {
  Media,
  TPost,
  TPostComment,
  TCollection,
} from "@/utils/types/social/social";
import { api } from "@/utils/variables/axiosInstances/backendAxiosInstance";
import { queryClient } from "@/utils/variables/queryClient";
import { useMutation } from "@tanstack/react-query";
import {
  createPost_PostsCacheMutation,
  post_ReactionCacheMutation,
  createComment_CommentsCacheMutation,
  post_TotalCommentsCacheMutation,
  postInfo_TotalCommentsCacheMutation,
  editUserProfile_ProfileCacheMutation,
  editUserProfile_PostsCacheMutation,
  editPost_PostsCacheMutation,
  editPost_PostInfoCacheMutation,
  unFollowUser_UserProfileCacheMutation,
  unfollowUser_UserPreviewListCacheMutation,
  followUser_UserProfileCacheMutation,
  followUser_UserPreviewListCacheMutation,
  addCollectionItem_CollectionItemsCacheMutation,
  toggleMediaExistenceInCollectionCacheMutation,
  deleteCollectionItem_CollectionIitemsCacheMutation,
  createCollection_CollectionsCacheMutation,
  editCollection_CollectionInfoCacheMutation,
  deleteCollection_CollectionsCacheMutation,
  deleteComment_CommentsCacheMutation,
  editComment_CommentsCacheMutation,
} from "../functions/cacheMutations";
import { getCurrentUser, setCurrentUser } from "@/utils/functions/auth/functions";

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
      const { data } = await api.post(`/posts`, {
        content,
        media,
        collectionId,
        privacy,
      });
      return {
        ...data.data,
        totalLikes: 0,
        totalComments: 0,
        isLikedByCurrentUser: false,
      } as TPost;
    },
    onSuccess: async (result, { currentUserHandle }) => {
      if (currentUserHandle) {
        createPost_PostsCacheMutation({
          currentUserHandle,
          postsFrom: `forYouFeed`,
          result,
        });
        createPost_PostsCacheMutation({
          currentUserHandle,
          postsFrom: `currentUserProfile`,
          result,
        });
      }
    },
  });
}

export function useLikePost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      //run the api call
      return await api.post(`/posts/${postId}/likes`);
    },
    onError: async (error, postId) => {
      if (!error.message.includes(`400`)) {
        post_ReactionCacheMutation({ postId, type: `unlike` });
      }
    },
  });
}

export function useUnLikePost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      //run the api call
      return await api.delete(`/posts/${postId}/likes`);
    },
    onError: async (error, postId) => {
      if (!error.message.includes(`404`)) {
        post_ReactionCacheMutation({ postId, type: `like` });
      }
    },
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
      const currentUser = getCurrentUser();
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
      await api.put(`/account/details`, {
        username,
        bio,
        banner,
        avatar,
      });
    },
    onSuccess: (_, variables) => {
      const { avatar, banner, bio, username, userHandle } = variables;
      const currentUser = getCurrentUser();

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
      if (!error.message.includes(`400`)) {
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
      if (!error.message.includes(`404`)) {
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

type UseAddCollectionItemArgs = {
  collectionId: string;
  media: Media;
  currentUserHandle: string | undefined;
};

export function useAddCollectionItem() {
  return useMutation({
    mutationFn: async ({ collectionId, media }: UseAddCollectionItemArgs) => {
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
    onSuccess: (_, { currentUserHandle, media, collectionId }) => {
      addCollectionItem_CollectionItemsCacheMutation({
        collectionId,
        media,
      });
      if (currentUserHandle) {
        queryClient.invalidateQueries({
          queryKey: [
            `collections`,
            `mediaExistenceInCollections`,
            media.id,
            media.type,
          ],
          refetchType: `none`,
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: [`collections`, `userCollections`, currentUserHandle],
          exact: true,
        });
      }
    },
    onError: async (error, variables) => {
      const { collectionId, media } = variables;
      if (!error.message.includes(`400`)) {
        //if error, set it back to doesGivenMediaExist: false
        toggleMediaExistenceInCollectionCacheMutation({
          collectionId,
          mediaId: media.id,
          mediaType: media.type,
          type: `remove`,
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
    mutationKey: [`deleteCollectionItem`, collectionId, media.id, media.type],
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
      if (!error.message.includes(`404`)) {
        //if error, set it back to doesGivenMediaExist: true
        toggleMediaExistenceInCollectionCacheMutation({
          collectionId,
          mediaId: media.id,
          mediaType: media.type,
          type: `add`,
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
      const { data: newCollection } = await api.post(`/collections`, {
        name,
        privacy,
        description,
        photo,
      });
      return newCollection.data as TCollection;
    },
    onSuccess: (result) => {
      createCollection_CollectionsCacheMutation(result);
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
          return query.queryKey.includes(`collections`);
        },
      });
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes(`posts`);
        },
      });
      editCollection_CollectionInfoCacheMutation(editedCollection);
    },
  });
}

type UseDeleteCollectionArgs = {
  collectionId: string;
  userHandle: string;
};

export function useDeleteCollection({ collectionId }: UseDeleteCollectionArgs) {
  return useMutation({
    mutationKey: [`deleteCollection`, collectionId],
    mutationFn: async ({ collectionId }: UseDeleteCollectionArgs) => {
      await api.delete(`/collections/${collectionId}`);
    },
    onSuccess: (_, { userHandle, collectionId }) => {
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes(`posts`);
        },
      });
      queryClient.removeQueries({
        queryKey: [`collectionInfo`, collectionId],
        exact: true,
      });
      deleteCollection_CollectionsCacheMutation(collectionId);
      history.pushState(null, ``, `/social/${userHandle}/collections`);
    },
  });
}

type UseUpdateNotificationReadStatus = {
  notificationId: string;
  isRead: boolean;
};

export function useUpdateNotificationReadStatus() {
  return useMutation({
    mutationFn: async ({
      isRead,
      notificationId,
    }: UseUpdateNotificationReadStatus) => {
      await api.put(`/collections/${notificationId}`, {
        isRead,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`notifications`] });
    },
  });
}

export function useDeleteNotification() {
  return useMutation({
    mutationFn: async (collectionId: string) => {
      await api.delete(`/collections/${collectionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`notifications`] });
    },
  });
}

export function useDeleteAllNotifications({ key }: { key: string }) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async () => {
      await api.delete(`/notifications`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`notifications`] });
    },
  });
}

type DeleteUpdatePostCommentArgs = {
  postId: string;
  commentId: string;
};

export function useDeletePostComment(commentId: string) {
  return useMutation({
    mutationKey: [`deleteComment`, commentId],
    mutationFn: async ({ commentId, postId }: DeleteUpdatePostCommentArgs) => {
      await api.delete(`/posts/${postId}/comments/${commentId}`);
    },
    onSuccess: (_, { postId, commentId }) => {
      deleteComment_CommentsCacheMutation({ commentId, postId });
    },
  });
}

export function useEditPostComment(commentId: string) {
  return useMutation({
    mutationKey: [`editComment`, commentId],
    mutationFn: async ({
      commentId,
      postId,
      content,
    }: DeleteUpdatePostCommentArgs & { content: string }) => {
      await api.put(`/posts/${postId}/comments/${commentId}`, { content });
    },
    onSuccess: (_, { commentId, content, postId }) => {
      editComment_CommentsCacheMutation({ commentId, content, postId });
    },
  });
}
