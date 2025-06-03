import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useCurrentUser } from "@/services/auth/authQueries";
import UserCollectionsSkeleton from "@/components/core/loadingSkeletons/social/UserCollectionsSkeleton";
import Collection from "@/components/core/social/mainContent/collection/Collection";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { Fragment } from "react/jsx-runtime";
import { getPreviewPosters } from "@/services/social/functions/sharedFunctions";
import { ChevronRight, Plus } from "lucide-react";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ManageCollectionDialog from "@/components/core/social/mainContent/collection/manageCollectionDialog/ManageCollectionDialog";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useUserCollections } from "@/services/social/queries/socialQueries";

export const Route = createFileRoute(
  "/_protected/social/$userHandle/collections/"
)({
  component: () => <CollectionsPage />,
});

function CollectionsPage() {
  const { userHandle } = Route.useParams();
  useCustomScrollRestoration(`userProfilePage-${userHandle}`);
  const { data: currentUser } = useCurrentUser();

  const {
    data: userCollections,
    isLoading: isUserCollectionsLoading,
    error: userCollectionsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useUserCollections({
    userHandle,
    currentUserHandle: currentUser?.handle,
  });

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);
  const { isTabletUp } = useWindowBreakpoints();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

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
      <div className="flex flex-col gap-4 w-full p-3 pb-8 rounded-lg sm:p-5 bg-socialPrimary">
        {currentUser.handle === userHandle &&
          (isTabletUp ? (
            <button
              onClick={() =>
                toggleOpenDialog(<ManageCollectionDialog type="create" />)
              }
              className="self-end rounded-xl transition-colors flex items-center gap-2 py-2 group px-3 border border-mainAccent hover:bg-mainAccent disabled:border-gray-700 text-md"
            >
              <Plus className="group-hover:stroke-mainWhite group-disabled:stroke-gray-700 transition-colors stroke-mainAccent size-3 sm:size-4" />
              <p className="group-hover:text-mainWhite group-disabled:text-gray-700 text-mainAccent transition-colors">
                Add Collection
              </p>
            </button>
          ) : (
            <button
              onClick={() =>
                toggleOpenDialog(<ManageCollectionDialog type="create" />)
              }
              className="w-full py-2 flex justify-between items-center group mt-1"
            >
              <div className="flex items-center gap-2">
                <Plus className="group-disabled:stroke-gray-700 transition-colors stroke-mainWhite size-4 group-hover:stroke-mainAccent" />
                <p className="text-mainWhite group-disabled:text-gray-700 group-hover:text-mainAccent transition-colors group-hover: stroke-mainAccent">
                  Add Collection
                </p>
              </div>
              <ChevronRight className="size-4 group-hover:stroke-mainAccent stroke-mainWhite" />
            </button>
          ))}
        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 mobile-l:gap-3">
          {userCollections.pages.map((page) => (
            <Fragment key={page.page}>
              {page.data.map((collection) => (
                <Collection
                  linkProps={{
                    to: "/social/$userHandle/collections/$collectionId",
                    params: {
                      userHandle: userHandle,
                      collectionId: collection.id,
                    },
                  }}
                  key={collection.id}
                  name={collection.name}
                  previewPosters={getPreviewPosters(collection.previewMedias)}
                  photo={collection.photo}
                />
              ))}
              {isFetchingNextPage && (
                <div ref={bottomPageRef} key={"bottom of page"}>
                  <UserCollectionsSkeleton />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
}
