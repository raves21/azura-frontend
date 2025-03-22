import CustomCheckBox from "@/components/core/CustomCheckBox";
import { toggleCollectionItem_MediaExistenceInCollectionsCacheMutation } from "@/services/social/functions/cacheMutations";
import {
  useAddCollectionItem,
  useDeleteCollectionItem,
} from "@/services/social/queries/socialQueries";
import { useDebounceOnClick } from "@/utils/hooks/useDebounceOnClick";
import { ToggleCollectionItemProperties } from "@/utils/types/media/shared";

type MediaExistenceInCollectionProps = {
  collectionName: string;
  doesGivenMediaExist: boolean;
} & ToggleCollectionItemProperties;

export default function MediaExistenceInCollection({
  collectionName,
  doesGivenMediaExist,
  collectionId,
  coverImage,
  description,
  mediaId,
  mediaType,
  posterImage,
  rating,
  status,
  title,
  year,
}: MediaExistenceInCollectionProps) {
  const { mutateAsync: addCollectionItem } = useAddCollectionItem();
  const { mutateAsync: deleteCollectionItem } = useDeleteCollectionItem();

  function handleToggleButton() {
    if (doesGivenMediaExist) {
      toggleCollectionItem_MediaExistenceInCollectionsCacheMutation({
        collectionId,
        mediaId,
        mediaType,
        type: "remove",
      });
    } else {
      toggleCollectionItem_MediaExistenceInCollectionsCacheMutation({
        collectionId,
        mediaId,
        mediaType,
        type: "add",
      });
    }
  }

  async function toggleMediaToCollection() {
    if (doesGivenMediaExist) {
      await addCollectionItem({
        collectionId,
        coverImage,
        description,
        mediaId,
        mediaType,
        posterImage,
        rating,
        status,
        title,
        year,
      });
    } else {
      await deleteCollectionItem({
        collectionId,
        mediaId,
        mediaType,
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
