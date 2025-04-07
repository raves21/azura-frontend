import CustomCheckBox from "@/components/core/CustomCheckBox";
import { toggleMediaExistenceInCollectionCacheMutation } from "@/services/social/functions/cacheMutations";
import {
  useAddCollectionItem,
  useDeleteCollectionItem,
} from "@/services/social/queries/socialQueries";
import { useDebounceOnClick } from "@/utils/hooks/useDebounceOnClick";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { Media } from "@/utils/types/social/social";

type Props = {
  collectionName: string;
  doesGivenMediaExist: boolean;
  collectionId: string;
  media: Media;
};

export default function MediaExistenceInCollection({
  collectionName,
  doesGivenMediaExist,
  collectionId,
  media,
}: Props) {
  const { mutateAsync: addCollectionItem } = useAddCollectionItem();
  const { mutateAsync: deleteCollectionItem } = useDeleteCollectionItem({
    collectionId,
    media,
  });
  const currentUser = useAuthStore((state) => state.currentUser);

  function handleToggleButton() {
    if (doesGivenMediaExist) {
      toggleMediaExistenceInCollectionCacheMutation({
        collectionId,
        mediaId: media.id,
        mediaType: media.type,
        type: "remove",
      });
    } else {
      toggleMediaExistenceInCollectionCacheMutation({
        collectionId,
        mediaId: media.id,
        mediaType: media.type,
        type: "add",
      });
    }
  }

  async function toggleMediaToCollection() {
    if (doesGivenMediaExist) {
      await addCollectionItem({
        collectionId,
        media,
        currentUserHandle: currentUser?.handle,
      });
    } else {
      await deleteCollectionItem({
        collectionId,
        media,
      });
    }
  }

  useDebounceOnClick({
    action: () => toggleMediaToCollection(),
    toggleState: doesGivenMediaExist,
    skipFirstRender: true,
  });

  return (
    <button
      className="flex items-center justify-between w-full px-5 py-5 hover:bg-socialPrimaryHover"
      onClick={handleToggleButton}
    >
      <p className="font-medium text-mainWhite line-clamp-1">
        {collectionName}
      </p>
      <CustomCheckBox
        isChecked={doesGivenMediaExist}
        className="h-full shrink-0"
      />
    </button>
  );
}
