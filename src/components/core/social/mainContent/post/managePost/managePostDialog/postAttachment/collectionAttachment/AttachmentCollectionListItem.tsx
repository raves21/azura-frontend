import { TCollection } from "@/utils/types/social/social";
import CollectionPhoto from "@/components/core/social/mainContent/collection/CollectionPhoto";
import { getPreviewPosters } from "@/services/social/functions/socialFunctions";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { useShallow } from "zustand/react/shallow";

type Props = {
  collection: TCollection;
};

export default function AttachmentCollectionListItem({ collection }: Props) {
  const [setCollectionAttachment, setManagePostPage, setMediaAttachment] =
    useManagePostStore(
      useShallow((state) => [
        state.setCollectionAttachment,
        state.setManagePostPage,
        state.setMediaAttachment,
      ])
    );

  return (
    <button
      onClick={() => {
        setMediaAttachment(null);
        setCollectionAttachment(collection);
        setManagePostPage("managePost");
      }}
      className="hover:bg-socialPrimaryHover text-start w-full px-3 py-4 flex gap-4"
    >
      {collection.photo ? (
        <CollectionPhoto
          className="size-24"
          type="photo"
          photo={collection.photo}
        />
      ) : (
        <CollectionPhoto
          className="size-24"
          type="previewPosters"
          previewPosters={getPreviewPosters(collection.previewMedias)}
        />
      )}
      <div className="flex flex-col w-full gap-3">
        <p className="text-lg font-medium line-clamp-2">{collection.name}</p>
        <p className="line-clamp-3 text-md font-light">
          {collection.description ?? (
            <em className="text-sm text-socialTextSecondary">No description</em>
          )}
        </p>
      </div>
    </button>
  );
}
