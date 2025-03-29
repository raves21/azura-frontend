import { queryClient } from "@/utils/variables/queryClient";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { EntityOwner, EntityPrivacy } from "@/utils/types/social/shared";
import {
  PaginatedCommentsResponse,
  Media,
  PaginatedUserPreviewsResponse,
  PaginatedPostsResponse,
  TCollection,
  TPost,
  TPostComment,
  TPostInfo,
  UserProfile,
} from "@/utils/types/social/social";
import { QueryFilters, InfiniteData, QueryKey } from "@tanstack/react-query";
import { MediaType } from "@/utils/types/shared";
import { PaginatedMediaExistenceInCollectionsResponse } from "@/utils/types/media/shared";

const POSTS_QUERY_FILTER: QueryFilters = {
  predicate(query) {
    return query.queryKey.includes("posts");
  },
};

const FOR_YOU_FEED_QUERY_FILTER: QueryFilters = {
  predicate(query) {
    return query.queryKey.includes("forYouFeed");
  },
};

const CURRENT_USER_PROFILE_POSTS_QUERY_FILTER = (
  currentUserHandle: string
) => ({
  queryKey: ["posts", "userProfilePosts", currentUserHandle],
  exact: true,
});

const COMMENTS_QUERY_FILTER = (postId: string): QueryKey => [
  "postComments",
  postId,
];

const POST_INFO_QUERY_KEY = (postId: string): QueryKey => ["postInfo", postId];

const USER_PROFILE_QUERY_KEY = (userHandle: string): QueryKey => [
  "userProfile",
  userHandle,
];

const USER_PREVIEW_LIST_QUERY_FILTER: QueryFilters = {
  predicate(query) {
    return query.queryKey.includes("userPreviewList");
  },
};

const CHECK_MEDIA_COLLECTIONS_LIST_QUERY_KEY = (
  mediaId: string,
  mediaType: MediaType
) => ["collections", "mediaExistenceInCollections", mediaId, mediaType];

type CreatePostPostsCacheMutation = {
  postsFrom: "forYouFeed" | "currentUserProfile";
  currentUserHandle: string;
  variables: {
    content: string | null;
    media: Media | null;
    privacy: EntityPrivacy;
    owner: EntityOwner;
  };
  result: { collection: TCollection | null; id: string };
};

export function createPost_PostsCacheMutation({
  postsFrom,
  variables,
  result,
  currentUserHandle,
}: CreatePostPostsCacheMutation) {
  const { content, media, owner, privacy } = variables;
  const { collection, id } = result;
  let newPost: TPost;
  if (media) {
    newPost = {
      id,
      totalComments: 0,
      totalLikes: 0,
      collection: null,
      content,
      createdAt: new Date().toString(),
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
      createdAt: new Date().toString(),
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
      createdAt: new Date().toString(),
      isLikedByCurrentUser: false,
      media: null,
      owner,
      privacy,
    };
  }
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, unknown>>(
    postsFrom === "forYouFeed"
      ? FOR_YOU_FEED_QUERY_FILTER
      : CURRENT_USER_PROFILE_POSTS_QUERY_FILTER(currentUserHandle),
    (oldData) => {
      const firstPage = oldData?.pages[0];
      //if there are already existing posts
      if (firstPage && firstPage.data.length > 0) {
        return {
          pageParams: oldData.pageParams,
          pages: [
            {
              data: [newPost, ...firstPage.data],
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
}

type LikeUnlikePostCacheMutation = {
  postId: string;
  type: "like" | "unlike";
};

export function post_ReactionCacheMutation({
  postId,
  type,
}: LikeUnlikePostCacheMutation) {
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, unknown>>(
    POSTS_QUERY_FILTER,
    (oldData) => {
      if (!oldData) return undefined;

      const newPages = oldData.pages.map((page) => ({
        ...page,
        data: page.data.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              totalLikes:
                type === "like" ? post.totalLikes + 1 : post.totalLikes - 1,
              isLikedByCurrentUser: type === "like" ? true : false,
            };
          }
          return post;
        }),
      }));

      return {
        pageParams: oldData.pageParams,
        pages: newPages,
      };
    }
  );
}

type PostInfoPageLikeUnlikePostCacheMutationArgs = {
  postId: string;
  type: "like" | "unlike";
};

export function postInfo_ReactionCacheMutation({
  postId,
  type,
}: PostInfoPageLikeUnlikePostCacheMutationArgs) {
  queryClient.setQueryData<TPostInfo>(
    POST_INFO_QUERY_KEY(postId),
    (oldData) => {
      const currentUser = useAuthStore.getState().currentUser;
      if (!oldData || !currentUser) return undefined;

      if (type === "like") {
        return {
          ...oldData,
          totalLikes: oldData.totalLikes + 1,
          isLikedByCurrentUser: true,
          postFirstLikers: oldData.postFirstLikers ?? [
            {
              avatar: currentUser.avatar,
              username: currentUser.username,
              id: currentUser.id,
            },
          ],
        };
      } else {
        let postFirstLikers: Omit<EntityOwner, "handle">[] | null =
          oldData.postFirstLikers;

        //*note: postFirstLikers array has max 2 people (the first and the second liker),
        //*but we only show one (the very first) in the ui. The other guy is reserved for
        //*the case where the current user is the first post liker and if he unlikes the post,
        //*Then we can set the other guy (the second liker) as the new first post liker
        if (oldData.postFirstLikers) {
          const postFirstLikersCount = oldData.postFirstLikers.length;
          //if there are two postFirstLikers
          if (postFirstLikersCount >= 1) {
            //if the first post liker is the current user himself
            if (oldData.postFirstLikers[0].id === currentUser.id) {
              postFirstLikers =
                postFirstLikersCount === 1
                  ? null
                  : oldData.postFirstLikers.slice(1);
            }
          }
        }

        return {
          ...oldData,
          totalLikes: oldData.totalLikes - 1,
          isLikedByCurrentUser: false,
          postFirstLikers,
        };
      }
    }
  );
}

type PostInfoPageTotalCommentsCacheMutationArgs = {
  postId: string;
  incrementTotalComments: boolean;
};

export function postInfo_TotalCommentsCacheMutation({
  postId,
  incrementTotalComments,
}: PostInfoPageTotalCommentsCacheMutationArgs) {
  queryClient.setQueryData<TPostInfo>(
    POST_INFO_QUERY_KEY(postId),
    (oldData) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        totalComments: incrementTotalComments
          ? oldData.totalComments + 1
          : oldData.totalComments - 1,
      };
    }
  );
}

type CreateCommentCommentsCacheMutationArgs = {
  postId: string;
  newComment: TPostComment;
};

export function createComment_CommentsCacheMutation({
  postId,
  newComment,
}: CreateCommentCommentsCacheMutationArgs) {
  queryClient.setQueriesData<InfiniteData<PaginatedCommentsResponse, unknown>>(
    { queryKey: COMMENTS_QUERY_FILTER(postId) },
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
}

type PostTotalCommentsCacheMutationArgs = {
  postId: string;
  incrementTotalComments: boolean;
};

export function post_TotalCommentsCacheMutation({
  postId,
  incrementTotalComments,
}: PostTotalCommentsCacheMutationArgs) {
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, unknown>>(
    POSTS_QUERY_FILTER,
    (oldData) => {
      if (!oldData) return undefined;

      const newPages = oldData.pages.map((page) => ({
        ...page,
        data: page.data.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              totalComments: incrementTotalComments
                ? post.totalComments + 1
                : post.totalComments - 1,
            };
          }
          return post;
        }),
      }));

      return {
        pageParams: oldData.pageParams,
        pages: newPages,
      };
    }
  );
}

export function deletePost_PostsCacheMutation(postId: string) {
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, unknown>>(
    POSTS_QUERY_FILTER,
    (oldData) => {
      if (!oldData) return undefined;

      const newPages = oldData.pages.map((page) => ({
        ...page,
        data: page.data.filter((post) => post.id !== postId),
      }));

      return {
        pageParams: oldData.pageParams,
        pages: newPages,
      };
    }
  );
}

export function editPost_PostsCacheMutation(postToEdit: TPost) {
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, unknown>>(
    POSTS_QUERY_FILTER,
    (oldData) => {
      if (!oldData) return undefined;

      const newPages = oldData.pages.map((page) => ({
        ...page,
        data: page.data.map((post) => {
          if (post.id === postToEdit.id) {
            return {
              ...post,
              content: postToEdit.content,
              media: postToEdit.media,
              collection: postToEdit.collection,
              privacy: postToEdit.privacy,
            };
          }
          return post;
        }),
      }));

      return {
        pageParams: oldData.pageParams,
        pages: newPages,
      };
    }
  );
}

export function editPost_PostInfoCacheMutation(postToEdit: TPost) {
  queryClient.setQueryData<TPostInfo>(
    POST_INFO_QUERY_KEY(postToEdit.id),
    (oldData) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        content: postToEdit.content,
        media: postToEdit.media,
        collection: postToEdit.collection,
        privacy: postToEdit.privacy,
      };
    }
  );
}

type EditUserProfileCacheMutationArgs = {
  userHandle: string;
  username: string;
  avatar: string | null;
  banner: string | null;
  bio: string | null;
};

export function editUserProfile_ProfileCacheMutation({
  userHandle,
  username,
  avatar,
  bio,
  banner,
}: EditUserProfileCacheMutationArgs) {
  queryClient.setQueryData<UserProfile>(
    USER_PROFILE_QUERY_KEY(userHandle),
    (oldData) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        username,
        avatar,
        bio,
        banner,
      };
    }
  );
}

export function editUserProfile_PostsCacheMutation({
  userHandle,
  username,
  avatar,
}: EditUserProfileCacheMutationArgs) {
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, unknown>>(
    POSTS_QUERY_FILTER,
    (oldData) => {
      if (!oldData) return undefined;

      const newPages = oldData.pages.map((page) => ({
        ...page,
        data: page.data.map((post) => {
          if (post.owner.handle === userHandle) {
            return {
              ...post,
              owner: {
                ...post.owner,
                avatar,
                username,
              },
            };
          }
          return post;
        }),
      }));

      return {
        pageParams: oldData.pageParams,
        pages: newPages,
      };
    }
  );
}

type FollowUnfollowCacheMutationArgs = {
  userHandle: string;
  currentUserHandle: string | undefined;
};

export function followUser_UserProfileCacheMutation({
  userHandle,
  currentUserHandle,
}: FollowUnfollowCacheMutationArgs) {
  //mutate the other user's totalFollowers
  queryClient.setQueryData<UserProfile>(
    USER_PROFILE_QUERY_KEY(userHandle),
    (oldData) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        followedByYou: true,
        totalFollowers: oldData.totalFollowers + 1,
      };
    }
  );
  //mutate the current user's totalFollowing
  queryClient.setQueryData<UserProfile>(
    USER_PROFILE_QUERY_KEY(currentUserHandle!),
    (oldData) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        totalFollowing: oldData.totalFollowing + 1,
      };
    }
  );
}

export function unFollowUser_UserProfileCacheMutation({
  userHandle,
  currentUserHandle,
}: FollowUnfollowCacheMutationArgs) {
  //mutate the other user's totalFollowers
  queryClient.setQueryData<UserProfile>(
    USER_PROFILE_QUERY_KEY(userHandle),
    (oldData) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        followedByYou: false,
        totalFollowers: oldData.totalFollowers - 1,
      };
    }
  );

  //mutate the current user's totalFollowing
  queryClient.setQueryData<UserProfile>(
    USER_PROFILE_QUERY_KEY(currentUserHandle!),
    (oldData) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        totalFollowing: oldData.totalFollowing - 1,
      };
    }
  );
}

export function followUser_UserPreviewListCacheMutation({
  userHandle,
}: Pick<FollowUnfollowCacheMutationArgs, "userHandle">) {
  queryClient.setQueriesData<
    InfiniteData<PaginatedUserPreviewsResponse, unknown>
  >(USER_PREVIEW_LIST_QUERY_FILTER, (oldData) => {
    if (!oldData) return undefined;

    const newPages = oldData.pages.map((page) => ({
      ...page,
      data: page.data.map((userPreview) => {
        if (userPreview.handle === userHandle) {
          return {
            ...userPreview,
            isFollowedByCurrentUser: true,
          };
        }
        return userPreview;
      }),
    }));

    return {
      pageParams: oldData.pageParams,
      pages: newPages,
    };
  });
}

export function unfollowUser_UserPreviewListCacheMutation({
  userHandle,
}: Pick<FollowUnfollowCacheMutationArgs, "userHandle">) {
  queryClient.setQueriesData<
    InfiniteData<PaginatedUserPreviewsResponse, unknown>
  >(USER_PREVIEW_LIST_QUERY_FILTER, (oldData) => {
    if (!oldData) return undefined;

    const newPages = oldData.pages.map((page) => ({
      ...page,
      data: page.data.map((userPreview) => {
        if (userPreview.handle === userHandle) {
          return {
            ...userPreview,
            isFollowedByCurrentUser: false,
          };
        }
        return userPreview;
      }),
    }));

    return {
      pageParams: oldData.pageParams,
      pages: newPages,
    };
  });
}

export type ToggleCollectionItemCacheMutationArgs = {
  collectionId: string;
  mediaId: string;
  mediaType: MediaType;
  type: "add" | "remove";
};

export function toggleCollectionItem_MediaExistenceInCollectionsCacheMutation({
  collectionId,
  mediaId,
  mediaType,
  type,
}: ToggleCollectionItemCacheMutationArgs) {
  const queryKey = CHECK_MEDIA_COLLECTIONS_LIST_QUERY_KEY(mediaId, mediaType);

  queryClient.setQueryData<
    InfiniteData<PaginatedMediaExistenceInCollectionsResponse, unknown>
  >(queryKey, (oldData) => {
    if (!oldData) return undefined;

    const newPages = oldData.pages.map((page) => ({
      ...page,
      data: page.data.map((collection) => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            doesGivenMediaExist: type === "add" ? true : false,
          };
        }
        return collection;
      }),
    }));

    return {
      pageParams: oldData.pageParams,
      pages: newPages,
    };
  });
}
