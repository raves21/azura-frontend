import { TCollection } from "@/utils/types/social/social";
import CollectionPhoto from "../../collection/CollectionPhoto";
import { LibraryBig } from "lucide-react";
import UserAvatar from "../../../UserAvatar";
import { cn } from "@/lib/utils";
import { EntityOwner } from "@/utils/types/social/shared";

type CollectionAttachmentProps = {
  collection: TCollection;
  owner: EntityOwner;
};

export default function CollectionAttachment({
  collection,
  owner,
}: CollectionAttachmentProps) {
  let attachmentBg: string | null | undefined;
  let attachmentPreviewPosters = collection.previewPosters
    .map((poster) => poster.posterImage)
    .filter(Boolean) as string[];

  if (collection.previewPosters.length !== 0) {
    const previewCoverImage = collection.previewPosters
      .map((poster) => poster.coverImage)
      .find(Boolean);
    if (!previewCoverImage) {
      attachmentBg = collection.previewPosters
        .map((poster) => poster.posterImage)
        .find(Boolean);
    } else {
      attachmentBg = previewCoverImage;
    }
  } else {
    attachmentBg = collection.photo;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="relative w-full h-32 overflow-hidden bg-gray-800 rounded-lg mobile-m:h-36 xl:h-56"
    >
      <div className="absolute size-full">
        <div className="absolute z-10 rounded-lg backdrop-blur-[1.5px] bg-black/70 size-full" />
        <img
          src={attachmentBg ?? "/no-image-2.png"}
          className="absolute object-cover size-full"
        />
      </div>
      <div className="absolute z-20 flex items-center gap-3 px-3 mobile-m:gap-5 sm:gap-6 md:px-5 size-full">
        {collection.photo ? (
          <CollectionPhoto
            type="photo"
            photo={collection.photo}
            className="h-[65%] w-auto rounded-lg"
          />
        ) : (
          <CollectionPhoto
            type="previewPosters"
            previewPosters={attachmentPreviewPosters}
            className="h-[65%] w-auto rounded-lg"
          />
        )}
        <div className="flex flex-col flex-grow gap-[5px] mobile-m:gap-2">
          <div className="flex items-center gap-1">
            <LibraryBig className="stroke-blue-500 size-4 mobile-m:size-5 shrink-0" />
            <p className="mr-auto text-sm font-semibold mobile-m:text-lg sm:text-xl line-clamp-1">
              {collection.name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] mobile-l:text-xs">
            <UserAvatar src={owner.avatar} imageClassName="size-4 md:size-4" />
            <p className={cn("font-medium mobile-m:text-xs line-clamp-1")}>
              {owner.handle}
            </p>
          </div>
          <p className="text-xxs mobile-m:text-xs mobile-m:mt-1 line-clamp-2 sm:line-clamp-3 text-socialTextSecondary sm:text-[14px]">
            {collection.description}
          </p>
        </div>
      </div>
    </div>
  );
}
