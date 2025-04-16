import UserListItemSkeleton from "@/components/core/loadingSkeletons/social/UserListItemSkeleton";
import BackButton from "@/components/core/shared/BackButton";
import UserListItem from "@/components/core/social/shared/UserListItem";
import { useFollowerList } from "@/services/social/queries/socialQueries";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute(
  "/_protected/social/$userHandle/followers/"
)({
  component: () => <FollowersPage />,
});

function FollowersPage() {
  const { userHandle } = Route.useParams();
  const currentUser = useAuthStore((state) => state.currentUser);

  const {
    data: followerList,
    isPending: isFollowerListPending,
    error: followerListError,
    isFetchingNextPage,
    fetchNextPage,
  } = useFollowerList({ currentUserHandle: currentUser?.handle, userHandle });

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  if (!currentUser) return <Navigate to="/login" replace />;

  if (isFollowerListPending) {
    return (
      <div className="bg-socialPrimary w-full flex flex-col gap-5 rounded-lg pb-8">
        <div className="flex items-center gap-6 p-3 text-base font-semibold mobile-l:text-lg sm:p-5 sm:text-xl">
          <BackButton />
          <p>
            <span>@{userHandle}'s</span> followers
          </p>
        </div>
        <div className="w-full flex flex-col">
          {Array.from({ length: 3 }).map((_, i) => (
            <UserListItemSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (followerListError) {
    return (
      <div className="bg-socialPrimary w-full flex flex-col gap-5 rounded-lg pb-8">
        <div className="flex items-center gap-6 p-3 text-base font-semibold mobile-l:text-lg sm:p-5 sm:text-xl">
          <BackButton />
          <p>
            <span>@{userHandle}'s</span> followers
          </p>
        </div>
        <p className="w-full py-24 text-center font-medium text-xl">
          An error occured.
        </p>
      </div>
    );
  }

  if (followerList) {
    return (
      <div className="bg-socialPrimary w-full flex flex-col gap-5 rounded-lg pb-8">
        <div className="flex items-center gap-6 p-3 text-base font-semibold mobile-l:text-lg sm:p-5 sm:text-xl">
          <BackButton />
          <p>
            <span>@{userHandle}'s</span> followers
          </p>
        </div>
        <div className="w-full flex flex-col">
          {followerList.pages[0].data.length === 0 ? (
            <p className="w-full py-24 text-center font-medium text-xl">
              No following.
            </p>
          ) : (
            followerList.pages.map((page) => (
              <Fragment key={page.page}>
                {page.data.map((userPreview) => (
                  <UserListItem key={userPreview.id} {...userPreview} />
                ))}
              </Fragment>
            ))
          )}
          <div ref={bottomPageRef}>
            {isFetchingNextPage &&
              Array.from({ length: 2 }).map((_, i) => (
                <UserListItemSkeleton key={i} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}
