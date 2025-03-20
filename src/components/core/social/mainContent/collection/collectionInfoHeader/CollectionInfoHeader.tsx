import CollectionDetails from "./CollectionDetails";
import CollectionPhoto from "../CollectionPhoto";
import { TCollection } from "@/utils/types/social/social";
import { getPreviewPosters } from "@/services/social/functions/socialFunctions";

type CollectionInfoHeaderProps = {
  collection: TCollection;
};

export default function CollectionInfoHeader({
  collection,
}: CollectionInfoHeaderProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      {collection.photo ? (
        <CollectionPhoto
          type="photo"
          photo={collection.photo}
          className="mx-auto sm:mx-0 sm:size-48"
        />
      ) : (
        <CollectionPhoto
          type="previewPosters"
          previewPosters={getPreviewPosters(collection.previewMedias)}
          className="mx-auto sm:mx-0 sm:size-48"
        />
      )}
      <CollectionDetails
        name={collection.name}
        description={collection.description}
        owner={collection.owner}
        privacy={collection.privacy}
      />
    </div>
  );
}
