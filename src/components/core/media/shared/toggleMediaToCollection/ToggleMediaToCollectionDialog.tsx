import { useMediaExistenceInCollections } from "@/services/social/queries/socialQueries";
import { Fragment } from "react/jsx-runtime";
import MediaExistenceInCollection from "./MediaExistenceInCollection";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Plus, X } from "lucide-react";
import MediaExistenceInCollectionSkeleton from "@/components/core/loadingSkeletons/media/MediaExistenceInCollectionSkeleton";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { ToggleCollectionItemProperties } from "@/utils/types/media/shared";
import ManageCollectionDialog from "@/components/core/social/mainContent/collection/manageCollectionDialog/ManageCollectionDialog";
import { useShallow } from "zustand/react/shallow";

type ToggleMediaToCollectionDialogProps = Omit<
  ToggleCollectionItemProperties,
  "collectionId"
>;

export default function ToggleMediaToCollectionDialog({
  mediaId,
  mediaType,
  coverImage,
  description,
  posterImage,
  rating,
  status,
  title,
  year,
}: ToggleMediaToCollectionDialogProps) {
  const {
    data: mediaExistenceInCollections,
    isFetching: isMediaExistenceInCollectionsFetching,
    error: mediaExistenceInCollectionsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useMediaExistenceInCollections(mediaId, mediaType);

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  const [toggleOpenDialog, toggleOpenDialogSecondary] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialog,
      state.toggleOpenDialogSecondary,
    ])
  );

  if (isMediaExistenceInCollectionsFetching) {
    return (
      <div className="aspect-square relative bg-socialPrimary w-[500px] text-mainWhite rounded-lg flex flex-col">
        <div className="grid py-6 text-lg font-medium border-b-[0.5px] place-items-center border-socialTextSecondary">
          <p>Add to collection</p>
          <button
            onClick={() => toggleOpenDialog(null)}
            className="group absolute top-5 right-5 w-min rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <X className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <MediaExistenceInCollectionSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (mediaExistenceInCollectionsError) {
    return (
      <div className="aspect-square relative bg-socialPrimary w-[500px] text-mainWhite rounded-lg flex flex-col">
        <div className="grid py-6 font-semibold border-b-[0.5px] place-items-center border-socialTextSecondary">
          <p>Add to collection</p>
          <button
            onClick={() => toggleOpenDialog(null)}
            className="group absolute top-4 right-4 w-min rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <X className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        </div>
        <div className="grid flex-grow place-items-center">
          <p className="text-lg font-medium text-socialTextSecondary">
            An error occured.
          </p>
        </div>
      </div>
    );
  }

  if (mediaExistenceInCollections) {
    return (
      <div className="aspect-square relative bg-socialPrimary w-[500px] overflow-hidden text-mainWhite rounded-lg flex flex-col">
        <div className="grid py-6 font-semibold border-b-[0.5px] place-items-center border-socialTextSecondary">
          <p>Add to collection</p>
          <button
            onClick={() => toggleOpenDialog(null)}
            className="group absolute top-4 right-4 w-min rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <X className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        </div>
        <div className="flex flex-col flex-grow overflow-auto">
          {mediaExistenceInCollections.pages[0].data.length === 0 ? (
            <p className="py-12 text-lg font-medium text-center text-socialTextSecondary">
              No collections yet.
            </p>
          ) : (
            mediaExistenceInCollections.pages.map((page) => (
              <Fragment key={page.page}>
                {page.data.map((collection) => (
                  <MediaExistenceInCollection
                    key={collection.id}
                    collectionName={collection.name}
                    doesGivenMediaExist={collection.doesGivenMediaExist}
                    collectionId={collection.id}
                    coverImage={coverImage}
                    description={description}
                    mediaId={mediaId}
                    mediaType={mediaType}
                    posterImage={posterImage}
                    rating={rating}
                    status={status}
                    title={title}
                    year={year}
                  />
                ))}
                <div ref={bottomPageRef} key={"bottom of page"}>
                  {isFetchingNextPage && (
                    <>
                      <MediaExistenceInCollectionSkeleton />
                      <MediaExistenceInCollectionSkeleton />
                    </>
                  )}
                </div>
              </Fragment>
            ))
          )}
        </div>
        <div className="w-full p-4">
          <button
            onClick={() =>
              toggleOpenDialogSecondary(
                <ManageCollectionDialog type="create" />
              )
            }
            className="flex items-center justify-center w-full gap-4 py-3 border rounded-full border-socialTextSecondary hover:border-mainAccent group"
          >
            <Plus className="stroke-mainWhite size-5 group-hover:stroke-mainAccent" />
            <p className="font-semibold text-mainWhite group-hover:text-mainAccent">
              New collection
            </p>
          </button>
        </div>
      </div>
    );
  }
}
