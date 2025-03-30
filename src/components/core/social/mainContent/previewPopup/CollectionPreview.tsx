import { TCollection } from "@/utils/types/social/social";
import PreviewContainer from "./PreviewContainer";
import CollectionInfoHeader from "../collection/collectionInfoHeader/CollectionInfoHeader";
import Media from "../collection/collectionItem/Media";

type CollectionPreviewProps = {
  collection: TCollection;
  isSecondaryDialog?: boolean;
};

export default function CollectionPreview({
  collection,
  isSecondaryDialog,
}: CollectionPreviewProps) {
  return (
    <PreviewContainer isSecondaryDialog={isSecondaryDialog}>
      <section className="flex flex-col w-full gap-8 p-3 mt-16 mb-20 rounded-lg sm:p-5">
        <CollectionInfoHeader collection={collection} />
        {collection.previewMedias.length !== 0 ? (
          <div className="grid grid-cols-2 570:grid-cols-3 gap-x-4 pt-8 gap-y-5 border-t-[0.5px] border-socialTextSecondary/40">
            {collection.previewMedias.map((previewMedia, index) => (
              <Media
                linkProps={{}}
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
            Empty.
          </div>
        )}
      </section>
    </PreviewContainer>
  );
}
