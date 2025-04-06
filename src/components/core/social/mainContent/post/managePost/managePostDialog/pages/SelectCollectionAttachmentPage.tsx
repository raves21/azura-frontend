import { useCurrentUserCollections } from "@/services/social/queries/socialQueries";
import AttachmentCollectionListItem from "../postAttachment/collectionAttachment/AttachmentCollectionListItem";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { Fragment } from "react/jsx-runtime";

export default function SelectCollectionAttachmentPage() {
  const {
    data: currentUserCollections,
    isLoading: isCurrentUserCollectionsLoading,
    error: currentUserCollectionsError,
    fetchNextPage,
    isFetchingNextPage,
  } = useCurrentUserCollections();

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  if (isCurrentUserCollectionsLoading) {
    return (
      <div className="size-full flex flex-col overflow-y-auto gap-4 px-3 py-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="size-24 bg-gray-700 aspect-square" />
        ))}
      </div>
    );
  }

  if (currentUserCollectionsError) {
    return (
      <div className="size-full text-center grid place-items-center text-lg font-medium">
        An error occured while fetching your collections.
      </div>
    );
  }

  if (currentUserCollections) {
    return (
      <div className="size-full flex flex-col overflow-y-auto py-2">
        {currentUserCollections.pages[0].data.length === 0 ? (
          //todo
          <div></div>
        ) : (
          currentUserCollections.pages.map((page) => (
            <Fragment key={page.page}>
              {page.data.map((collection) => (
                <AttachmentCollectionListItem
                  collection={collection}
                  key={collection.id}
                />
              ))}
              <div ref={bottomPageRef} key="bottom page ref">
                {isFetchingNextPage && (
                  <div className="mx-3 mb-3">
                    <Skeleton className="size-24 bg-gray-700 aspect-square" />
                  </div>
                )}
              </div>
            </Fragment>
          ))
        )}
      </div>
    );
  }
}
