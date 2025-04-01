import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { TCollection } from "@/utils/types/social/social";
import CollectionPreviewDialog from "@/components/core/social/mainContent/previewPopup/CollectionPreviewDialog";
import { LibraryBig, X } from "lucide-react";
import CollectionPhoto from "@/components/core/social/mainContent/collection/CollectionPhoto";
import { getPreviewPosters } from "@/services/social/functions/socialFunctions";

type Props = {
  collection: TCollection;
};

export default function CollectionAttachment({ collection }: Props) {
  const toggleOpenDialogSecondary = useGlobalStore(
    (state) => state.toggleOpenDialogSecondary
  );
  const setCollectionAttachment = useManagePostStore(
    (state) => state.setCollectionAttachment
  );

  return (
    <button
      onClick={() =>
        toggleOpenDialogSecondary(
          <CollectionPreviewDialog
            collection={collection}
            isSecondaryDialog={true}
          />
        )
      }
      className="relative hover:cursor-pointer hover:border-mainAccent transition-colors duration-300 text-start rounded-lg w-[55%] flex gap-3 p-3 border-[0.5px] border-socialTextSecondary"
    >
      <div className="rounded-md bg-blue-500 px-2 py-1 flex items-center gap-1 absolute -top-[14px] -right-4">
        <LibraryBig className="stroke-mainWhite size-3" />
        <p className="text-xs font-medium">Collection</p>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setCollectionAttachment(null);
        }}
        className="box-content hover:bg-mainAccent absolute p-1 rounded-full -top-3 -left-2 bg-socialTextSecondary"
      >
        <X className="stroke-mainWhite size-4" />
      </div>
      {collection.photo ? (
        <CollectionPhoto
          className="size-16"
          type="photo"
          photo={collection.photo}
        />
      ) : (
        <CollectionPhoto
          className="size-16"
          type="previewPosters"
          previewPosters={getPreviewPosters(collection.previewMedias)}
        />
      )}
      <div className="flex flex-col gap-1">
        <p className="font-medium line-clamp-1">{collection.name}</p>
        <p className="text-xs line-clamp-2 text-socialTextSecondary">
          {collection.description || (
            <em className="font-light">No description</em>
          )}
        </p>
      </div>
    </button>
  );
}
