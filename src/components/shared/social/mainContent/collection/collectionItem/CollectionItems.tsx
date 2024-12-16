import { TCollectionItem } from "@/utils/types/social/social";
import Media from "./Media";

type CollectionItemsProps = {
  collectionItems: TCollectionItem[];
};

export default function CollectionItems({
  collectionItems,
}: CollectionItemsProps) {
  return (
    <div className="grid grid-cols-2 570:grid-cols-3 gap-x-4 gap-y-5">
      {collectionItems.map((collectionItem) => (
        <Media
          linkProps={{
            //* this is just temporary
            to: "/anime",
          }}
          image={
            collectionItem.media.posterImage || collectionItem.media.coverImage
          }
          key={collectionItem.id}
          title={collectionItem.media.title}
          type={collectionItem.media.type}
          year={collectionItem.media.year}
        />
      ))}
    </div>
  );
}
