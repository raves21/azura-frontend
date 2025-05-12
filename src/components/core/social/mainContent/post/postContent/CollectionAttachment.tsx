import { TCollection } from "@/utils/types/social/social";
import CollectionPhoto from "../../collection/CollectionPhoto";
import { LibraryBig } from "lucide-react";
import UserAvatar from "../../../shared/UserAvatar";
import { cn } from "@/lib/utils";
import CollectionPreviewDialog from "../../previewPopup/collection/CollectionPreviewDialog";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { getPreviewPosters } from "@/services/social/functions/socialFunctions";
import { toggleDialogOrDrawer } from "@/utils/functions/sharedFunctions";

type Props = {
  collection: TCollection;
};

export default function CollectionAttachment({ collection }: Props) {
  let attachmentBg: string | null | undefined;

  if (collection.previewMedias.length !== 0) {
    const previewCoverImage = collection.previewMedias
      .map((poster) => poster.coverImage)
      .find(Boolean);
    if (!previewCoverImage) {
      attachmentBg = collection.previewMedias
        .map((poster) => poster.posterImage)
        .find(Boolean);
    } else {
      attachmentBg = previewCoverImage;
    }
  } else {
    attachmentBg = collection.photo;
  }

  const { isTabletUp } = useWindowBreakpoints();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        toggleDialogOrDrawer({
          content: <CollectionPreviewDialog collection={collection} />,
          isTabletUp,
          isSecondaryDialog: false,
        });
      }}
      className="relative w-full overflow-hidden bg-gray-800 rounded-lg hover:cursor-pointer h-36 mobile-m:h-40 sm:h-44 md:h-48 xl:h-56"
    >
      <div className="absolute size-full">
        <div className="absolute z-10 rounded-lg backdrop-blur-[1.5px] bg-black/70 size-full" />
        <img
          src={attachmentBg ?? "/no-image-2.png"}
          className="absolute object-cover size-full"
        />
      </div>
      <div className="absolute z-20 flex items-center gap-3 px-3 sm:px-5 mobile-m:gap-5 md:px-5 size-full">
        {collection.photo ? (
          <CollectionPhoto
            type="photo"
            photo={collection.photo}
            className="h-[60%] mobile-m:h-[65%] w-auto rounded-lg"
          />
        ) : (
          <CollectionPhoto
            type="previewPosters"
            previewPosters={getPreviewPosters(collection.previewMedias)}
            className="h-[60%] mobile-m:h-[65%] w-auto rounded-lg"
          />
        )}
        <div className="flex flex-col flex-grow gap-2 sm:gap-3">
          <div className="flex items-center gap-1">
            <LibraryBig className="stroke-blue-500 size-4 mobile-m:size-5 shrink-0" />
            <p className="mr-auto text-sm font-semibold mobile-m:text-lg sm:text-xl line-clamp-1">
              {collection.name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] mobile-l:text-xs">
            <UserAvatar
              src={collection.owner.avatar || "/sample-user-pfp.png"}
              imageClassName="size-4 md:size-4"
            />
            <p
              className={cn(
                "font-medium mobile-m:text-xs sm:text-sm line-clamp-1"
              )}
            >
              {collection.owner.username}
            </p>
          </div>
          <p className="text-2xs mobile-m:text-xs md:text-sm mobile-m:mt-1 line-clamp-2 text-socialTextSecondary sm:text-[14px]">
            {collection.description}
          </p>
        </div>
      </div>
    </div>
  );
}
