import PostsSkeleton from "@/components/core/loadingSkeletons/social/PostsSkeleton";
import Post from "@/components/core/social/mainContent/post/Post";
import { useUserProfilePosts } from "@/services/social/queries/socialQueries";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { useCurrentUser } from "@/services/auth/authQueries";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/_protected/social/$userHandle/")({
  component: () => <UserProfilePage />,
});

function UserProfilePage() {
  const { userHandle } = Route.useParams();
  useCustomScrollRestoration(`userProfilePage-${userHandle}`);
  const { data: currentUser } = useCurrentUser();

  const {
    data: userProfilePosts,
    isLoading: isUserProfilePostsLoading,
    error: userProfilePostsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useUserProfilePosts(userHandle, currentUser?.handle);

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  if (!currentUser) return <Navigate to="/login" replace />;

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
          <Fragment key={page.page}>
            {page.data.map((post) => (
              <Post key={post.id} post={post} fromState="user-page" />
            ))}
            {isFetchingNextPage && (
              <div ref={bottomPageRef} key={"bottom of page"}>
                <PostsSkeleton loadingType="fetchingNextPage" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    );
  }
}
