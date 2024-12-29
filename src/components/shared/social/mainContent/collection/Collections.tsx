import { TCollection } from "@/utils/types/social/social";
import Collection from "./Collection";

type CollectionsProps = {
  collections: TCollection[];
};

export default function Collections({ collections }: CollectionsProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-2 p-3 pb-8 rounded-lg mobile-l:gap-3 sm:p-5 sm:grid-cols-3 bg-socialPrimary">
      {collections.map((collection) => (
        <Collection
          linkProps={{
            to: "/social/$userHandle/collections/$collectionId",
            params: {
              userHandle: "elonmusk",
              collectionId: "661268fc-54e4-49d1-889c-7cbed98104cb",
            },
          }}
          key={collection.id}
          name={collection.name}
          previewPosters={
            collection.previewMedias
              .map((previewMedia) => previewMedia.posterImage)
              .filter(Boolean) as string[]
          }
          photo={collection.photo}
        />
      ))}
    </div>
  );
}
