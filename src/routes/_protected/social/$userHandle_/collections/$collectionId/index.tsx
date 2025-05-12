import CollectionPhotoSkeleton from "@/components/core/loadingSkeletons/social/CollectionPhotoSkeleton";
import BackButton from "@/components/core/shared/BackButton";
import CollectionActions from "@/components/core/social/mainContent/collection/collectionInfo/CollectionActions";
import CollectionEditButton from "@/components/core/social/mainContent/collection/collectionInfo/CollectionEditButton";
import CollectionInfo from "@/components/core/social/mainContent/collection/collectionInfo/CollectionInfo";
import CollectionItems from "@/components/core/social/mainContent/collection/collectionInfo/collectionItems/CollectionItems";
import { Skeleton } from "@/components/ui/skeleton";
import { useCollectionInfo } from "@/services/social/queries/socialQueries";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useCurrentUser } from "@/services/auth/authQueries";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Circle } from "lucide-react";

export const Route = createFileRoute(
  "/_protected/social/$userHandle/collections/$collectionId/"
)({
  component: () => <CollectionInfoPage />,
});

function CollectionInfoPage() {
  useCustomScrollRestoration();

  const { collectionId, userHandle } = Route.useParams();
  const { data: currentUser } = useCurrentUser();

  const {
    data: collectionInfo,
    isLoading: isCollectionInfoLoading,
    error: collectionInfoError,
  } = useCollectionInfo(collectionId);

  if (!currentUser) return <Navigate to="/login" replace />;

  if (isCollectionInfoLoading) {
    return (
      <section className="flex flex-col w-full gap-8 p-3 mb-20 rounded-lg sm:p-5 bg-socialPrimary">
        <BackButton
          linkProps={{
            to: "/social/$userHandle/collections",
            params: {
              userHandle,
            },
          }}
        />
        <div className="flex flex-col gap-6 sm:flex-row">
          <CollectionPhotoSkeleton className="mx-auto sm:mx-0 sm:size-48" />
          <div className="flex flex-col items-center gap-5 sm:items-start">
            <Skeleton className="text-xl bg-gray-700 text-center 570:px-12 sm:px-0 lg:text-3xl sm:text-start mobile-m:text-2xl line-clamp-3">
              lorem ipsum dolor
            </Skeleton>
            <div className="flex items-center gap-3">
              <Skeleton className="flex items-center bg-gray-700 gap-2 mt-auto group">
                <div className="size-6" />
                <Skeleton className="bg-gray-700 overflow-hidden text-sm font-semibold whitespace-nowrap group-hover:underline max-w-44 text-ellipsis">
                  lorem ipsum
                </Skeleton>
              </Skeleton>
              <Circle className="size-[6px] stroke-none fill-gray-700" />
              <Skeleton className="flex items-center bg-gray-700">
                <p>LOREM</p>
              </Skeleton>
            </div>
            <Skeleton className="bg-gray-700 text-sm line-clamp-4 sm:line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
              veritatis.
            </Skeleton>
          </div>
        </div>
        <CollectionActions disabled={true} />
        <CollectionItems collectionId={collectionId} />
      </section>
    );
  }

  if (collectionInfoError) {
    return (
      <div className="w-full grid place-items-center pt-8 mb-20 sm:p-12 text-lg">
        An error occured while fetching this collection.
      </div>
    );
  }

  if (collectionInfo) {
    return (
      <section className="flex flex-col w-full gap-8 p-3 mb-20 rounded-lg sm:p-5 bg-socialPrimary">
        <div className="w-full flex items-center justify-between">
          <BackButton
            linkProps={{
              to: "/social/$userHandle/collections",
              params: {
                userHandle,
              },
            }}
          />
          {currentUser.handle === userHandle && (
            <CollectionEditButton collection={collectionInfo} />
          )}
        </div>
        <CollectionInfo collection={collectionInfo} />
        <CollectionActions disabled={false} collection={collectionInfo} />
        <CollectionItems collectionId={collectionId} />
      </section>
    );
  }
}
