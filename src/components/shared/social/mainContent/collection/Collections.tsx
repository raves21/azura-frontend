import { TCollection } from "@/utils/types/social/social";
import Collection from "./Collection";

type CollectionsProps = {
  collections: TCollection[];
};

export default function Collections({ collections }: CollectionsProps) {
  return (
    <div className="grid w-full grid-cols-3 gap-3 p-5 pb-8 rounded-lg bg-socialPrimary">
      {collections.map((collection) => (
        <Collection
          linkProps={{
            to: "/social/profile/$userName/collections/$collectionId",
            params: {
              userName: "elonmusk",
              collectionId: "661268fc-54e4-49d1-889c-7cbed98104cb",
            },
          }}
          key={collection.id}
          name={collection.name}
          previewPosters={collection.previewPosters}
          photo={collection.photo}
        />
      ))}
    </div>
  );
}
