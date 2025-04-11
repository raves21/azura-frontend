import { useCollectionItems } from "@/services/social/queries/socialQueries";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { Fragment } from "react/jsx-runtime";
import MediaSkeleton from "@/components/core/loadingSkeletons/media/MediaSkeleton";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import CollectionItem from "./CollectionItem";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { useParams } from "@tanstack/react-router";

type Props = {
  collectionId: string;
};

export default function CollectionItems({ collectionId }: Props) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { userHandle } = useParams({
    from: "/_protected/social/$userHandle/collections/$collectionId/",
  });

  const {
    data: collectionItems,
    isLoading: isCollectionItemsLoading,
    error: collectionItemsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useCollectionItems({
    collectionId,
    isCurrentUser: currentUser ? userHandle === currentUser.handle : false,
  });

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);
  const { isTabletExtraSmallUp } = useWindowBreakpoints();

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
                <CollectionItem
                  key={collectionItem.id}
                  collectionItem={collectionItem}
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
            Array.from({ length: isTabletExtraSmallUp ? 3 : 2 }).map((_, i) => (
              <MediaSkeleton key={i} />
            ))}
        </div>
      </>
    );
  }
}
