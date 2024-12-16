import { TCollection } from "@/utils/types/social/social";
import PreviewContainer from "./PreviewContainer";
import CollectionInfoHeader from "../collection/collectionInfoHeader/CollectionInfoHeader";
import Media from "../collection/collectionItem/Media";

type CollectionPreviewProps = {
  collection: TCollection;
};

export default function CollectionPreview({
  collection,
}: CollectionPreviewProps) {
  return (
    <PreviewContainer>
      <section className="flex flex-col w-full gap-8 p-3 mt-16 mb-20 rounded-lg sm:p-5">
        <CollectionInfoHeader collection={collection} />
        <div className="grid grid-cols-2 570:grid-cols-3 gap-x-4 pt-8 gap-y-5 border-t-[0.5px] border-socialTextSecondary/40">
          {collection.previewMedias.map((previewMedia, index) => (
            <Media
              linkProps={{
                //* this is just temporary
                to: "/anime",
              }}
              image={previewMedia.posterImage || previewMedia.coverImage}
              key={index}
              title={previewMedia.title}
              type={previewMedia.type}
              year={previewMedia.year}
            />
          ))}
        </div>
      </section>
    </PreviewContainer>
  );
}
