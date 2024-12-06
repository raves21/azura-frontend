import { TCollection } from "@/utils/types/social/social";

type CollectionAttachmentProps = {
  collection: TCollection;
};

export default function CollectionAttachment({
  collection,
}: CollectionAttachmentProps) {
  let coverImage: string | null | undefined;
  if (collection.photo) {
    coverImage = collection.photo;
  } else {
    coverImage = collection.previewPosters
      .map((poster) => poster.coverImage)
      .find(Boolean);
  }

  return (
    <div className="w-full overflow-hidden rounded-lg h-52">
      <div className="relative size-full">
        {coverImage && (
          <img
            src={coverImage}
            className="absolute inset-0 object-cover size-full"
          />
        )}
      </div>
    </div>
  );
}
