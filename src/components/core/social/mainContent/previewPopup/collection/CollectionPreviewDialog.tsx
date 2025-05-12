import { TCollection } from "@/utils/types/social/social";
import CollectionInfo from "../../collection/collectionInfo/CollectionInfo";
import Media from "../../../../media/shared/Media";
import CollectionPreviewContainer from "./CollectionPreviewContainer";

type Props = {
  collection: TCollection;
  isSecondaryDialog?: boolean;
};

export default function CollectionPreviewDialog({
  collection,
  isSecondaryDialog,
}: Props) {
  return (
    <CollectionPreviewContainer
      collectionOwnerHandle={collection.owner.handle}
      collectionId={collection.id}
      isSecondaryDialog={isSecondaryDialog}
    >
      <section className="flex flex-col w-full gap-8 p-3 mt-16 mb-20 rounded-lg sm:p-5">
        <CollectionInfo collection={collection} />
        {collection.previewMedias.length !== 0 ? (
          <div className="grid grid-cols-2 570:grid-cols-3 gap-x-4 pt-8 gap-y-5 border-t-[0.5px] border-socialTextSecondary/40">
            {collection.previewMedias.map((previewMedia, index) => (
              <Media
                isCollectionItem={true}
                onClick={() => {}}
                image={previewMedia.posterImage}
                key={index}
                title={previewMedia.title}
                type={previewMedia.type}
                year={previewMedia.year}
              />
            ))}
          </div>
        ) : (
          <div className="grid place-items-center border-t-[0.5px] pt-12 text-lg font-medium border-socialTextSecondary/40">
            No items yet.
          </div>
        )}
      </section>
    </CollectionPreviewContainer>
  );
}
