import PostsSkeleton from "@/components/shared/loadingSkeletons/social/PostsSkeleton";
import Post from "@/components/shared/social/mainContent/post/Post";
import { useUserProfilePosts } from "@/services/social/queries/socialQueries";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { useAuthStore } from "@/utils/stores/authStore";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/$userHandle/")({
  component: () => <UserProfilePage />,
});

function UserProfilePage() {
  const { userHandle } = Route.useParams();
  useCustomScrollRestoration(`userProfilePage-${userHandle}`);
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;

  const {
    data: userProfilePosts,
    isLoading: isUserProfilePostsLoading,
    error: userProfilePostsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useUserProfilePosts(userHandle, currentUser.handle);

  const ref = useFetchNextPageInView(fetchNextPage);

  if (isUserProfilePostsLoading) {
    return <PostsSkeleton loadingType="loadingAllPosts" />;
  }

  if (userProfilePostsError) {
    return (
      <div className="w-full pb-24 text-lg font-medium text-center pt-28">
        There was an error fetching the feed.
      </div>
    );
  }

  if (userProfilePosts) {
    const isEmpty = userProfilePosts.pages[0].data.length === 0;

    if (isEmpty) {
      return (
        <p className="grid pb-24 mt-16 text-lg font-medium place-items-center">
          No posts yet.
        </p>
      );
    }

    return (
      <div className="flex flex-col w-full gap-3 pb-24">
        {userProfilePosts.pages.map((page) => (
          <>
            {page.data.map((post) => (
              <Post post={post} fromState="user-page" />
            ))}
            {isFetchingNextPage && (
              <div ref={ref}>
                <PostsSkeleton loadingType="fetchingNextPage" />
              </div>
            )}
          </>
        ))}
      </div>
    );
  }
}
