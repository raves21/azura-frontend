import UserListItemSkeleton from "@/components/core/loadingSkeletons/social/UserListItemSkeleton";
import BackButton from "@/components/core/shared/BackButton";
import UserListItem from "@/components/core/social/shared/UserListItem";
import { useFollowingList } from "@/services/social/queries/socialQueries";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { useCurrentUser } from "@/services/auth/authQueries";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute(
  "/_protected/social/$userHandle/following/"
)({
  component: () => <FollowingPage />,
});

function FollowingPage() {
  const { userHandle } = Route.useParams();
  const { data: currentUser } = useCurrentUser();

  const {
    data: followingList,
    isPending: isFollowingListPending,
    error: followingListError,
    isFetchingNextPage,
    fetchNextPage,
  } = useFollowingList({ currentUserHandle: currentUser?.handle, userHandle });

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  if (!currentUser) return <Navigate to="/login" replace />;

  if (isFollowingListPending) {
    return (
      <div className="bg-socialPrimary w-full flex flex-col gap-5 rounded-lg pb-8">
        <div className="flex items-center gap-6 p-3 text-base font-semibold mobile-l:text-lg sm:p-5 sm:text-xl">
          <BackButton />
          <p>
            <span>@{userHandle}'s</span> following
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

  if (followingListError) {
    return (
      <div className="bg-socialPrimary w-full flex flex-col gap-5 rounded-lg pb-8">
        <div className="flex items-center gap-6 p-3 text-base font-semibold mobile-l:text-lg sm:p-5 sm:text-xl">
          <BackButton />
          <p>
            <span>@{userHandle}'s</span> following
          </p>
        </div>
        <p className="w-full py-24 text-center font-medium text-xl">
          An error occured.
        </p>
      </div>
    );
  }

  if (followingList) {
    return (
      <div className="bg-socialPrimary w-full flex flex-col gap-5 rounded-lg pb-8">
        <div className="flex items-center gap-6 p-3 text-base font-semibold mobile-l:text-lg sm:p-5 sm:text-xl">
          <BackButton />
          <p>
            <span>@{userHandle}'s</span> following
          </p>
        </div>
        <div className="w-full flex flex-col">
          {followingList.pages[0].data.length === 0 ? (
            <p className="w-full py-24 text-center font-medium text-xl">
              No following.
            </p>
          ) : (
            followingList.pages.map((page) => (
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
