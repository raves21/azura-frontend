import { TCollectionItem } from "@/utils/types/social/social";
import Media from "@/components/core/shared/Media";
import CollectionItemPreviewDialog from "../../../previewPopup/collectionItem/CollectionItemPreviewDialog";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useShallow } from "zustand/react/shallow";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useParams } from "@tanstack/react-router";
import { useDeleteCollectionItem } from "@/services/social/queries/socialQueries";

type Props = {
  collectionItem: TCollectionItem;
};

export default function CollectionItem({ collectionItem }: Props) {
  const [toggleOpenDialog, toggleOpenDrawer] = useGlobalStore(
    useShallow((state) => [state.toggleOpenDialog, state.toggleOpenDrawer])
  );
  const { isTabletUp } = useWindowBreakpoints();
  const { userHandle, collectionId } = useParams({
    from: "/_protected/social/$userHandle/collections/$collectionId/",
  });

  const { mutateAsync: deleteCollectionItem } = useDeleteCollectionItem({
    collectionId,
    media: collectionItem.media,
  });

  function openCollectionItemPreviewPopup(collectionItem: TCollectionItem) {
    if (isTabletUp) {
      toggleOpenDialog(
        <CollectionItemPreviewDialog
          collectionOwnerHandle={userHandle}
          media={collectionItem.media}
          deleteAction={() =>
            deleteCollectionItem({
              collectionId,
              media: collectionItem.media,
            })
          }
          mutationKey={[
            "deleteCollectionItem",
            collectionItem.collectionId,
            collectionItem.media.id,
            collectionItem.media.type,
          ]}
        />
      );
    } else {
      toggleOpenDrawer(
        <CollectionItemPreviewDialog
          collectionOwnerHandle={userHandle}
          media={collectionItem.media}
          deleteAction={() =>
            deleteCollectionItem({
              collectionId,
              media: collectionItem.media,
            })
          }
          mutationKey={[
            "deleteCollectionItem",
            collectionItem.collectionId,
            collectionItem.media.id,
            collectionItem.media.type,
          ]}
        />
      );
    }
  }

  return (
    <Media
      isCollectionItem={true}
      onClick={() => openCollectionItemPreviewPopup(collectionItem)}
      image={
        collectionItem.media.posterImage || collectionItem.media.coverImage
      }
      key={collectionItem.id}
      title={collectionItem.media.title}
      type={collectionItem.media.type}
      year={collectionItem.media.year}
    />
  );
}
