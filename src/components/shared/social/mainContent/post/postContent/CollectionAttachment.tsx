import { TCollection } from "@/utils/types/social/social";
import CollectionPhoto from "../../collection/CollectionPhoto";
import { LibraryBig, SquareArrowOutUpRight } from "lucide-react";
import UserAvatar from "../../../UserAvatar";
import { cn } from "@/lib/utils";
import { useMatchRoute } from "@tanstack/react-router";
import { EntityOwner } from "@/utils/types/social/shared";

type CollectionAttachmentProps = {
  collection: TCollection;
  owner: EntityOwner;
};

export default function CollectionAttachment({
  collection,
  owner,
}: CollectionAttachmentProps) {
  const matchRoute = useMatchRoute();
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
      className="relative w-full h-56 overflow-hidden bg-gray-800 rounded-lg"
    >
      <div className="absolute size-full">
        <div className="absolute z-10 backdrop-blur-sm bg-black/70 size-full" />
        <img
          src={attachmentBg ?? "/no-image-2.png"}
          className="absolute object-cover size-full"
        />
      </div>
      <div className="absolute z-20 flex items-center gap-6 px-5 size-full">
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
        <div className="flex flex-col flex-grow gap-3">
          <div className="flex items-center gap-1">
            <LibraryBig className="stroke-blue-500 size-5 shrink-0" />
            <p className="mr-auto text-xl font-semibold line-clamp-1">
              Lorem ipsum
            </p>
            <SquareArrowOutUpRight className="transition-colors shrink-0 size-5 stroke-mainWhite hover:stroke-mainAccent" />
          </div>
          <div className="flex items-center gap-2">
            <UserAvatar src={owner.avatar} className={cn("size-4")} />
            <p
              className={cn("font-medium text-xs", {
                "text-sm": matchRoute({ to: "/social/$userName/post/$postId" }),
              })}
            >
              {owner.handle}
            </p>
          </div>
          <p className="mt-1 line-clamp-3 text-socialTextSecondary text-[14px]">
            {collection.description}
          </p>
        </div>
      </div>
    </div>
  );
}
