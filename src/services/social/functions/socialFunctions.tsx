import { queryClient } from "@/Providers";
import { useAuthStore } from "@/utils/stores/authStore";
import { EntityOwner, EntityPrivacy } from "@/utils/types/social/shared";
import {
  Media,
  PostsRequest,
  TCollection,
  TPost,
  TPostInfo,
} from "@/utils/types/social/social";
import { QueryFilters, InfiniteData, QueryKey } from "@tanstack/react-query";
import { isEqual } from "radash";

const POSTS_QUERY_FILTER: QueryFilters = {
  predicate(query) {
    return query.queryKey.includes("posts");
  },
};

type CreatePostPostsCacheMutation = {
  queryFilter: QueryFilters;
  variables: {
    content: string;
    media: Media | null;
    privacy: EntityPrivacy;
    owner: EntityOwner;
  };
  result: { collection: TCollection | null; createdAt: Date; id: string };
};

export async function createPostPostsCacheMutation({
  queryFilter,
  variables,
  result,
}: CreatePostPostsCacheMutation) {
  const { content, media, owner, privacy } = variables;
  const { collection, createdAt, id } = result;
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

  invalidateQueryBeforeLoad(queryFilter.queryKey);
}

type LikeUnlikePostCacheMutation = {
  postId: string;
  type: "like" | "unlike";
};

export async function postReactionCacheMutation({
  postId,
  type,
}: LikeUnlikePostCacheMutation) {
  await queryClient.cancelQueries(POSTS_QUERY_FILTER);
  queryClient.setQueriesData<InfiniteData<PostsRequest, unknown>>(
    POSTS_QUERY_FILTER,
    (oldData) => {
      //this return undefined statement and all other ones like these below
      //serves no purpose other than to keep typescript happy.
      //of course this will not be executed because in order to like/unlike a post,
      //the cache with the queryFilter's queryKey must first exist.
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

export async function postInfoPagePostReactionCacheMutation({
  postId,
  type,
}: PostInfoPageLikeUnlikePostCacheMutationArgs) {
  queryClient.setQueryData<TPostInfo>(["postInfo", postId], (oldData) => {
    if (!oldData) return undefined;

    const currentUser = useAuthStore.getState().currentUser!;

    if (type === "like") {
      return {
        ...oldData,
        totalLikes: oldData.totalLikes + 1,
        isLikedByCurrentUser: true,
        postFirstLiker: oldData.postFirstLiker ?? {
          avatar: currentUser.avatar,
          username: currentUser.username,
        },
      };
    }

    return {
      ...oldData,
      totalLikes: oldData.totalLikes - 1,
      isLikedByCurrentUser: false,
      postFirstLiker: isEqual(oldData.postFirstLiker, {
        avatar: currentUser.avatar,
        username: currentUser.username,
      })
        ? null
        : oldData.postFirstLiker,
    };
  });
}

type PostInfoPageTotalCommentsCacheMutationArgs = {
  postId: string;
  incrementTotalComments: boolean;
};

export async function postInfoPageTotalCommentsCacheMutation({
  postId,
  incrementTotalComments,
}: PostInfoPageTotalCommentsCacheMutationArgs) {
  queryClient.setQueryData<TPostInfo>(["postInfo", postId], (oldData) => {
    if (!oldData) return undefined;

    return {
      ...oldData,
      totalComments: incrementTotalComments
        ? oldData.totalComments + 1
        : oldData.totalComments - 1,
    };
  });
}

type PostTotalCommentsCacheMutationArgs = {
  postId: string;
  incrementTotalComments: boolean;
};

export async function postTotalCommentsCacheMutation({
  postId,
  incrementTotalComments,
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

export function invalidateQueryBeforeLoad(queryKey?: QueryKey) {
  //to handle a rare scenario where a user creates a post/comment/collection
  //before the posts/comments/collection it is loaded
  queryClient.invalidateQueries({
    queryKey,
    predicate(query) {
      return !query.state.data;
    },
  });
}
