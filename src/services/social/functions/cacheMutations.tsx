import { queryClient } from "@/utils/variables/queryClient";
import { EntityOwner } from "@/utils/types/social/shared";
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
  PaginatedCollectionItemsResponse,
  TCollectionItem,
  PaginatedCollectionsResponse,
} from "@/utils/types/social/social";
import { QueryFilters, InfiniteData, QueryKey } from "@tanstack/react-query";
import { MediaType } from "@/utils/types/shared";
import { PaginatedMediaExistenceInCollectionsResponse } from "@/utils/types/media/shared";
import { getCurrentUser } from "@/services/auth/sharedFunctions";

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

const POST_COMMENTS_QUERY_KEY = (postId: string): QueryKey => [
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

const MEDIA_EXISTENCE_IN_COLLECTIONS_QUERY_KEY = (
  mediaId: string,
  mediaType: MediaType
) => ["collections", "mediaExistenceInCollections", mediaId, mediaType];

const MEDIA_EXISTENCE_IN_COLLECTION_QUERY_KEY = (
  mediaId: string,
  mediaType: MediaType
) => ["mediaExistenceInCollection", mediaId, mediaType];

const COLLECTION_ITEMS_QUERY_FILTER = (collectionId: string): QueryFilters => ({
  queryKey: ["collectionItems", collectionId],
});

const COLLECTION_INFO_QUERY_KEY = (collectionId: string): QueryKey => [
  "collectionInfo",
  collectionId,
];

const COLLECTIONS_QUERY_FILTER: QueryFilters = {
  predicate(query) {
    return query.queryKey.includes("collections");
  },
};

type CreatePostPostsCacheMutation = {
  postsFrom: "forYouFeed" | "currentUserProfile";
  currentUserHandle: string;
  result: TPost;
};

export function createPost_PostsCacheMutation({
  postsFrom,
  result,
  currentUserHandle,
}: CreatePostPostsCacheMutation) {
  const newPost: TPost = result;
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, number>>(
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
              message: "added post",
              page: 1,
              perPage: oldData.pages[0].perPage,
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
              message: "first post",
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
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, number>>(
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
      const currentUser = getCurrentUser();
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
  queryClient.setQueriesData<InfiniteData<PaginatedCommentsResponse, number>>(
    { queryKey: POST_COMMENTS_QUERY_KEY(postId) },
    (oldData) => {
      if (!oldData) return undefined;
      const firstPage = oldData.pages[0];
      //if there are already existing comments
      if (firstPage && firstPage.data.length > 0) {
        return {
          pageParams: oldData.pageParams,
          pages: [
            {
              data: [newComment, ...firstPage.data],
              message: "added post",
              page: 1,
              totalPages: firstPage.totalPages,
              perPage: firstPage.perPage,
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
              message: "first comment",
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
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, number>>(
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
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, number>>(
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
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, number>>(
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
  queryClient.setQueriesData<InfiniteData<PaginatedPostsResponse, number>>(
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
    InfiniteData<PaginatedUserPreviewsResponse, number>
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
    InfiniteData<PaginatedUserPreviewsResponse, number>
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

type ToggleMediaExistenceInCollectionCacheMutationArgs = {
  collectionId: string;
  mediaId: string;
  mediaType: MediaType;
  type: "add" | "remove";
};

export function toggleMediaExistenceInCollectionCacheMutation({
  collectionId,
  mediaId,
  mediaType,
  type,
}: ToggleMediaExistenceInCollectionCacheMutationArgs) {
  queryClient.setQueryData<
    InfiniteData<PaginatedMediaExistenceInCollectionsResponse, number>
  >(MEDIA_EXISTENCE_IN_COLLECTIONS_QUERY_KEY(mediaId, mediaType), (oldData) => {
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

export function deleteCollectionItem_CollectionIitemsCacheMutation({
  collectionId,
  mediaId,
  mediaType,
}: Omit<ToggleMediaExistenceInCollectionCacheMutationArgs, "type">) {
  queryClient.setQueriesData<
    InfiniteData<PaginatedCollectionItemsResponse, number>
  >(COLLECTION_ITEMS_QUERY_FILTER(collectionId), (oldData) => {
    if (!oldData) return undefined;

    const newPages = oldData.pages.map((page) => ({
      ...page,
      data: page.data.filter(
        (collectionItem) =>
          !(
            collectionItem.media.id === mediaId &&
            collectionItem.media.type === mediaType
          )
      ),
    }));

    return {
      pageParams: oldData.pageParams,
      pages: newPages,
    };
  });
}

type AddCollectionItemCollectionItemsCacheMutationArgs = {
  collectionId: string;
  media: Media;
};

export function addCollectionItem_CollectionItemsCacheMutation({
  collectionId,
  media,
}: AddCollectionItemCollectionItemsCacheMutationArgs) {
  const newCollectionItem: TCollectionItem = {
    collectionId,
    id: Math.random().toString(),
    media,
  };

  //add it to the cached data of useCollectionItems
  queryClient.setQueriesData<
    InfiniteData<PaginatedCollectionItemsResponse, number>
  >(COLLECTION_ITEMS_QUERY_FILTER(collectionId), (oldData) => {
    if (!oldData) return undefined;
    const firstPage = oldData.pages[0];

    //if has existing collectionItems
    if (firstPage && firstPage.data.length > 0) {
      return {
        pageParams: oldData.pageParams,
        pages: [
          {
            data: [newCollectionItem, ...firstPage.data],
            message: "added collectionitem",
            page: 1,
            perPage: firstPage.perPage,
            totalPages: firstPage.totalPages,
          },
          ...oldData.pages.slice(1),
        ],
      };
    } else {
      return {
        pageParams: [1],
        pages: [
          {
            data: [newCollectionItem],
            message: "",
            page: 1,
            perPage: 10,
            totalPages: 1,
          },
        ],
        message: "first collectionitem created",
        page: 1,
        perPage: 10,
        totalPages: 1,
      };
    }
  });

  //change the useMediaExistenceInCollection cache: set doesGivenMediaExist to true
  queryClient.setQueryData<{ doesGivenMediaExist: boolean }>(
    MEDIA_EXISTENCE_IN_COLLECTION_QUERY_KEY(media.id, media.type),
    () => ({
      doesGivenMediaExist: true,
    })
  );
}

export function editCollection_CollectionInfoCacheMutation(
  editedCollection: TCollection
) {
  queryClient.setQueryData<TCollection>(
    COLLECTION_INFO_QUERY_KEY(editedCollection.id),
    (oldData) => {
      if (!oldData) return undefined;

      return editedCollection;
    }
  );
}

export function createCollection_CollectionsCacheMutation(
  newCollection: TCollection
) {
  queryClient.setQueriesData<
    InfiniteData<PaginatedCollectionsResponse, number>
  >(COLLECTIONS_QUERY_FILTER, (oldData) => {
    if (!oldData) return undefined;
    const firstPage = oldData.pages[0];

    if (firstPage && firstPage.data.length > 0) {
      return {
        pageParams: oldData.pageParams,
        pages: [
          {
            data: [newCollection, ...firstPage.data],
            message: "added collection",
            page: 1,
            perPage: firstPage.perPage,
            totalPages: firstPage.totalPages,
          },
          ...oldData.pages.slice(1),
        ],
      };
    } else {
      return {
        pageParams: [1],
        pages: [
          {
            data: [newCollection],
            message: "first collection created",
            page: 1,
            perPage: 10,
            totalPages: 1,
          },
        ],
      };
    }
  });
}

export function deleteCollection_CollectionsCacheMutation(
  collectionId: string
) {
  queryClient.setQueriesData<
    InfiniteData<PaginatedCollectionsResponse, number>
  >(COLLECTIONS_QUERY_FILTER, (oldData) => {
    if (!oldData) return undefined;

    const newPages = oldData.pages.map((page) => ({
      ...page,
      data: page.data.filter((collection) => collection.id !== collectionId),
    }));

    return {
      pageParams: oldData.pageParams,
      pages: newPages,
    };
  });
}
