import { queryClient } from "@/Providers";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { EntityOwner, EntityPrivacy } from "@/utils/types/social/shared";
import {
  Media,
  PostsRequest,
  TCollection,
  TPost,
  TPostInfo,
  UserProfile
} from "@/utils/types/social/social";
import { QueryFilters, InfiniteData, QueryKey } from "@tanstack/react-query";

const POSTS_QUERY_FILTER: QueryFilters = {
  predicate(query) {
    return query.queryKey.includes("posts");
  }
};

const POST_INFO_QUERY_KEY = (postId: string): QueryKey => ["postInfo", postId];

const USER_PROFILE_QUERY_KEY = (userHandle: string): QueryKey => [
  "userProfile",
  userHandle
];

type CreatePostPostsCacheMutation = {
  queryFilter: QueryFilters;
  variables: {
    content: string | null;
    media: Media | null;
    privacy: EntityPrivacy;
    owner: EntityOwner;
  };
  result: { collection: TCollection | null; id: string };
};

export async function createPostPostsCacheMutation({
  queryFilter,
  variables,
  result
}: CreatePostPostsCacheMutation) {
  const { content, media, owner, privacy } = variables;
  const { collection, id } = result;
  await queryClient.cancelQueries(queryFilter);
  let newPost: TPost;
  if (media) {
    newPost = {
      id,
      totalComments: 0,
      totalLikes: 0,
      collection: null,
      content,
      createdAt: new Date(),
      isLikedByCurrentUser: false,
      media,
      owner,
      privacy
    };
  } else if (collection) {
    newPost = {
      id,
      totalComments: 0,
      totalLikes: 0,
      collection,
      content,
      createdAt: new Date(),
      isLikedByCurrentUser: false,
      media: null,
      owner,
      privacy
    };
  } else {
    newPost = {
      id,
      totalComments: 0,
      totalLikes: 0,
      collection: null,
      content,
      createdAt: new Date(),
      isLikedByCurrentUser: false,
      media: null,
      owner,
      privacy
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
              totalPages: oldData.pages[0].totalPages,
              message: "new post created in cache",
              page: 1,
              perPage: 10
            },
            ...oldData.pages.slice(1)
          ]
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
              totalPages: 1
            }
          ]
        };
      }
    }
  );
}

type LikeUnlikePostCacheMutation = {
  postId: string;
  type: "like" | "unlike";
};

export async function postReactionCacheMutation({
  postId,
  type
}: LikeUnlikePostCacheMutation) {
  await queryClient.cancelQueries(POSTS_QUERY_FILTER);
  queryClient.setQueriesData<InfiniteData<PostsRequest, unknown>>(
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
              isLikedByCurrentUser: type === "like" ? true : false
            };
          }
          return post;
        })
      }));

      return {
        pageParams: oldData.pageParams,
        pages: newPages
      };
    }
  );
}

type PostInfoPageLikeUnlikePostCacheMutationArgs = {
  postId: string;
  type: "like" | "unlike";
};

export async function postInfoReactionCacheMutation({
  postId,
  type
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
              id: currentUser.id
            }
          ]
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
          postFirstLikers
        };
      }
    }
  );
}

type PostInfoPageTotalCommentsCacheMutationArgs = {
  postId: string;
  incrementTotalComments: boolean;
};

export async function postInfoTotalCommentsCacheMutation({
  postId,
  incrementTotalComments
}: PostInfoPageTotalCommentsCacheMutationArgs) {
  queryClient.setQueryData<TPostInfo>(
    POST_INFO_QUERY_KEY(postId),
    (oldData) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        totalComments: incrementTotalComments
          ? oldData.totalComments + 1
          : oldData.totalComments - 1
      };
    }
  );
}

type PostTotalCommentsCacheMutationArgs = {
  postId: string;
  incrementTotalComments: boolean;
};

export async function postTotalCommentsCacheMutation({
  postId,
  incrementTotalComments
}: PostTotalCommentsCacheMutationArgs) {
  await queryClient.cancelQueries(POSTS_QUERY_FILTER);
  queryClient.setQueriesData<InfiniteData<PostsRequest, unknown>>(
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
                : post.totalComments - 1
            };
          }
          return post;
        })
      }));

      return {
        pageParams: oldData.pageParams,
        pages: newPages
      };
    }
  );
}

export async function deletePostPostsCacheMutation(postId: string) {
  await queryClient.cancelQueries(POSTS_QUERY_FILTER);
  queryClient.setQueriesData<InfiniteData<PostsRequest, unknown>>(
    POSTS_QUERY_FILTER,
    (oldData) => {
      if (!oldData) return undefined;

      const newPages = oldData.pages.map((page) => ({
        ...page,
        data: page.data.filter((post) => post.id !== postId)
      }));

      return {
        pageParams: oldData.pageParams,
        pages: newPages
      };
    }
  );
}

export async function editPostPostsCacheMutation(postToEdit: TPost) {
  await queryClient.cancelQueries(POSTS_QUERY_FILTER);
  queryClient.setQueriesData<InfiniteData<PostsRequest, unknown>>(
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
              privacy: postToEdit.privacy
            };
          }
          return post;
        })
      }));

      return {
        pageParams: oldData.pageParams,
        pages: newPages
      };
    }
  );
}

export async function editPostPostInfoCacheMutation(postToEdit: TPost) {
  queryClient.setQueryData<TPostInfo>(
    POST_INFO_QUERY_KEY(postToEdit.id),
    (oldData) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        content: postToEdit.content,
        media: postToEdit.media,
        collection: postToEdit.collection,
        privacy: postToEdit.privacy
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

export async function editUserProfileCacheMutation({
  userHandle,
  username,
  avatar,
  bio,
  banner
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
        banner
      };
    }
  );
}
