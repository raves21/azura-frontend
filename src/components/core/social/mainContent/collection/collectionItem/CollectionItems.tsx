import Media from "./Media";
import { useCollectionItems } from "@/services/social/queries/socialQueries";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { Fragment } from "react/jsx-runtime";
import MediaSkeleton from "@/components/core/loadingSkeletons/social/MediaSkeleton";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import MediaPreview from "../../previewPopup/MediaPreview";

type CollectionItemsProps = {
  collectionId: string;
};

export default function CollectionItems({
  collectionId,
}: CollectionItemsProps) {
  const {
    data: collectionItems,
    isLoading: isCollectionItemsLoading,
    error: collectionItemsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useCollectionItems(collectionId);

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  const { isTabletEXtraSmall } = useWindowBreakpoints();

  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  if (isCollectionItemsLoading) {
    return (
      <div className="grid grid-cols-2 570:grid-cols-3 gap-x-4 gap-y-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <MediaSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (collectionItemsError) {
    return (
      <div className="grid place-items-center py-5 text-lg">
        An error occured.
      </div>
    );
  }

  if (collectionItems) {
    if (collectionItems.pages[0].data.length === 0) {
      return (
        <div className="grid place-items-center py-5 text-lg">
          No items yet.
        </div>
      );
    }
    return (
      <>
        <div className="grid grid-cols-2 570:grid-cols-3 gap-x-4 gap-y-5">
          {collectionItems.pages.map((page) => (
            <Fragment key={page.page}>
              {page.data.map((collectionItem) => (
                <Media
                  linkProps={{}}
                  onClick={() =>
                    toggleOpenDialog(
                      <MediaPreview media={collectionItem.media} />
                    )
                  }
                  image={
                    collectionItem.media.posterImage ||
                    collectionItem.media.coverImage
                  }
                  key={collectionItem.id}
                  title={collectionItem.media.title}
                  type={collectionItem.media.type}
                  year={collectionItem.media.year}
                />
              ))}
            </Fragment>
          ))}
        </div>
        <div
          ref={bottomPageRef}
          key="bottom of page"
          className="grid grid-cols-2 570:grid-cols-3 gap-x-4 gap-y-5"
        >
          {isFetchingNextPage &&
            Array.from({ length: isTabletEXtraSmall ? 3 : 2 }).map((_, i) => (
              <MediaSkeleton key={i} />
            ))}
        </div>
      </>
    );
  }
}
