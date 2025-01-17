import { createFileRoute, Navigate, useParams } from "@tanstack/react-router";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useUserCollections } from "@/services/social/queries/socialQueries";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import UserCollectionsSkeleton from "@/components/core/loadingSkeletons/social/UserCollectionsSkeleton";
import Collection from "@/components/core/social/mainContent/collection/Collection";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute(
  "/_protected/social/$userHandle/collections/"
)({
  component: () => <CollectionsPage />
});

function CollectionsPage() {
  const { userHandle } = useParams({ from: "/_protected/social/$userHandle" });
  useCustomScrollRestoration(`userProfilePage-${userHandle}`);
  const currentUser = useAuthStore((state) => state.currentUser);

  const {
    data: userCollections,
    isLoading: isUserCollectionsLoading,
    error: userCollectionsError,
    isFetchingNextPage,
    fetchNextPage
  } = useUserCollections(userHandle, currentUser?.handle);

  const ref = useFetchNextPageInView(fetchNextPage);

  if (!currentUser) return <Navigate to="/login" replace />;

  if (isUserCollectionsLoading) {
    return <UserCollectionsSkeleton />;
  }

  if (userCollectionsError) {
    return (
      <div className="w-full pb-24 text-lg font-medium text-center text-mainWhite pt-28">
        There was an error fetching the collections.
      </div>
    );
  }

  if (userCollections) {
    const isEmpty = userCollections.pages[0].data.length === 0;

    if (isEmpty) {
      return (
        <p className="grid pb-24 mt-16 text-lg font-medium place-items-center">
          No collections yet.
        </p>
      );
    }

    return (
      <div className="grid w-full grid-cols-2 gap-2 p-3 pb-8 rounded-lg sm:grid-cols-3 mobile-l:gap-3 sm:p-5 bg-socialPrimary">
        {userCollections.pages.map((page) => (
          <Fragment key={page.page}>
            {page.data.map((collection) => (
              <Collection
                linkProps={{
                  to: "/social/$userHandle/collections/$collectionId",
                  params: {
                    userHandle: userHandle,
                    collectionId: collection.id
                  }
                }}
                key={collection.id}
                name={collection.name}
                previewPosters={
                  collection.previewMedias
                    .map((previewMedia) => previewMedia.posterImage)
                    .filter(Boolean) as string[]
                }
                photo={collection.photo}
              />
            ))}
            {isFetchingNextPage && (
              <div ref={ref} key={"bottom of page"}>
                <UserCollectionsSkeleton />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    );
  }
}
