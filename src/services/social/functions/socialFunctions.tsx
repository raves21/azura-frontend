import { queryClient } from "@/Providers";
import { useAuthStore } from "@/utils/stores/authStore";
import { PostsRequest, TPostInfo } from "@/utils/types/social/social";
import { QueryFilters, InfiniteData } from "@tanstack/react-query";
import { isEqual } from "radash";

export async function likePostCacheMutation(postId: string) {
  const queryFilter: QueryFilters = { queryKey: ["forYouFeed"] };
  await queryClient.cancelQueries(queryFilter);
  queryClient.setQueriesData<InfiniteData<PostsRequest, unknown>>(
    queryFilter,
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
              totalLikes: post.totalLikes + 1,
              isLikedByCurrentUser: true,
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

export async function unlikePostCacheMutation(postId: string) {
  const queryFilter: QueryFilters = { queryKey: ["forYouFeed"] };
  await queryClient.cancelQueries(queryFilter);
  queryClient.setQueriesData<InfiniteData<PostsRequest, unknown>>(
    queryFilter,
    (oldData) => {
      if (!oldData) return undefined;

      const newPages = oldData.pages.map((page) => ({
        ...page,
        data: page.data.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              totalLikes: post.totalLikes - 1,
              isLikedByCurrentUser: false,
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

export async function postInfoPageLikePostCacheMutation(postId: string) {
  queryClient.setQueryData<TPostInfo>(["postInfo", postId], (oldData) => {
    if (!oldData) return undefined;

    const currentUser = useAuthStore.getState().currentUser!;

    return {
      ...oldData,
      totalLikes: oldData.totalLikes + 1,
      isLikedByCurrentUser: true,
      postFirstLiker: oldData.postFirstLiker ?? {
        avatar: currentUser.avatar,
        username: currentUser.username,
      },
    };
  });
}

export async function postInfoPageUnLikePostCacheMutation(postId: string) {
  queryClient.setQueryData<TPostInfo>(["postInfo", postId], (oldData) => {
    if (!oldData) return undefined;

    const currentUser = useAuthStore.getState().currentUser!;

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
