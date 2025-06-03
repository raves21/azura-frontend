import UserListItemSkeleton from "@/components/core/loadingSkeletons/social/UserListItemSkeleton";
import BackButton from "@/components/core/shared/BackButton";
import UserListItem from "@/components/core/social/shared/UserListItem";
import { useDiscoverPeople } from "@/services/social/api/queries";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/_protected/social/discover-people/")({
  component: () => <DiscoverPeopleRoute />,
});

function DiscoverPeopleRoute() {
  const {
    data: discoverPeople,
    isLoading: isDiscoverPeopleLoading,
    error: discoverPeopleError,
    fetchNextPage,
    isFetchingNextPage,
  } = useDiscoverPeople();

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  if (isDiscoverPeopleLoading) {
    return (
      <section className="flex flex-col w-full gap-3">
        <div className="flex items-center gap-6 p-3 text-base font-semibold rounded-lg mobile-l:text-lg sm:p-5 sm:text-xl bg-socialPrimary">
          <BackButton />
          <p>Discover People</p>
        </div>
        <div className="flex flex-col w-full gap-3 p-5 rounded-lg bg-socialPrimary">
          {Array.from({ length: 3 }).map((_, i) => (
            <UserListItemSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (discoverPeopleError) {
    return (
      <div className="grid w-full gap-3 py-12 text-lg text-gray-300 place-items-center">
        <p>An error occured. Please try again later.</p>
      </div>
    );
  }

  if (discoverPeople) {
    return (
      <section className="flex flex-col w-full gap-3">
        <div className="flex items-center gap-6 p-3 text-base font-semibold rounded-lg mobile-l:text-lg sm:p-5 sm:text-xl bg-socialPrimary">
          <BackButton />
          <p>Discover People</p>
        </div>
        <div className="flex flex-col w-full gap-3 overflow-hidden rounded-lg bg-socialPrimary">
          {discoverPeople.pages.map((page) => (
            <Fragment key={page.page}>
              {page.data.map((userPreview) => (
                <UserListItem
                  key={userPreview.id}
                  {...userPreview}
                  className="py-5"
                />
              ))}
            </Fragment>
          ))}
          <div ref={bottomPageRef}>
            {isFetchingNextPage &&
              Array.from({ length: 2 }).map((_, i) => (
                <UserListItemSkeleton key={i} />
              ))}
          </div>
        </div>
      </section>
    );
  }
}
