import { useMediaExistenceInCollections } from "@/services/social/queries/socialQueries";
import { Fragment } from "react/jsx-runtime";
import MediaExistenceInCollection from "./MediaExistenceInCollection";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Plus } from "lucide-react";
import MediaExistenceInCollectionSkeleton from "@/components/core/loadingSkeletons/media/MediaExistenceInCollectionSkeleton";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import ManageCollectionDialog from "@/components/core/social/mainContent/collection/manageCollectionDialog/ManageCollectionDialog";
import { useShallow } from "zustand/react/shallow";
import { Media } from "@/utils/types/social/social";
import GlobalDialogHeader from "@/components/global/shared/GlobalDialogHeader";
import GlobalDialogHeaderTitle from "@/components/global/shared/GlobalDialogHeaderTitle";
import GlobalDialogHeaderCloseButton from "@/components/global/shared/GlobalDialogHeaderCloseButton";

type Props = {
  media: Media;
};

export default function ToggleMediaToCollectionDialog({ media }: Props) {
  const {
    data: mediaExistenceInCollections,
    isFetching: isMediaExistenceInCollectionsFetching,
    error: mediaExistenceInCollectionsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useMediaExistenceInCollections({
    mediaId: media.id,
    mediaType: media.type,
  });

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  const [toggleOpenDialog, toggleOpenDialogSecondary] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialog,
      state.toggleOpenDialogSecondary,
    ])
  );

  if (isMediaExistenceInCollectionsFetching) {
    return (
      <div className="md:aspect-square relative w-dvw h-dvh md:h-[500px] bg-socialPrimary md:w-[500px] overflow-hidden text-mainWhite rounded-lg flex flex-col">
        <GlobalDialogHeader>
          <GlobalDialogHeaderTitle>Add to collection</GlobalDialogHeaderTitle>
          <GlobalDialogHeaderCloseButton
            onClick={() => toggleOpenDialog(null)}
          />
        </GlobalDialogHeader>
        {Array.from({ length: 3 }).map((_, i) => (
          <MediaExistenceInCollectionSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (mediaExistenceInCollectionsError) {
    return (
      <div className="md:aspect-square relative w-dvw h-dvh md:h-[500px] bg-socialPrimary md:w-[500px] overflow-hidden text-mainWhite rounded-lg flex flex-col">
        <GlobalDialogHeader>
          <GlobalDialogHeaderTitle>Add to collection</GlobalDialogHeaderTitle>
          <GlobalDialogHeaderCloseButton
            onClick={() => toggleOpenDialog(null)}
          />
        </GlobalDialogHeader>
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
      <div className="md:aspect-square relative w-dvw h-dvh md:h-[500px] bg-socialPrimary md:w-[500px] overflow-hidden text-mainWhite rounded-lg flex flex-col">
        <GlobalDialogHeader>
          <GlobalDialogHeaderTitle>Add to collection</GlobalDialogHeaderTitle>
          <GlobalDialogHeaderCloseButton
            onClick={() => toggleOpenDialog(null)}
          />
        </GlobalDialogHeader>
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
                    media={media}
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
