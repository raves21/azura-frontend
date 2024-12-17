import { useGlobalStore } from "@/utils/stores/globalStore";
import { Media } from "@/utils/types/social/social";
import { Cat, Circle, Clapperboard, Tv } from "lucide-react";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import { useShallow } from "zustand/react/shallow";
import MediaPreview from "../../previewPopup/MediaPreview";

type MediaAttachmentProps = {
  media: Media;
};

export default function MediaAttachment({ media }: MediaAttachmentProps) {
  const { coverImage, posterImage, title, type, year } = media;
  media.description = media.description.replace("\\", "");
  let attachmentBg = coverImage ?? posterImage ?? "/no-image-2.jpg";
  let attachmentPoster = posterImage ?? coverImage ?? "/no-image.png";

  const windowWidth = useWindowWidth();
  const [toggleOpenDialog, toggleOpenDrawer] = useGlobalStore(
    useShallow((state) => [state.toggleOpenDialog, state.toggleOpenDrawer])
  );

  function openMediaPreviewPopup(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    e.stopPropagation();
    if (windowWidth < 768) {
      toggleOpenDrawer(<MediaPreview media={media} />);
    } else {
      toggleOpenDialog(<MediaPreview media={media} />);
    }
  }

  return (
    <div
      onClick={openMediaPreviewPopup}
      className="relative w-full overflow-hidden bg-gray-800 rounded-lg hover:cursor-pointer h-36 mobile-m:h-40 sm:h-44 md:h-48 xl:h-56"
    >
      <div className="absolute size-full">
        <div className="absolute z-10 backdrop-blur-[1.5px] bg-black/70 size-full" />
        <img src={attachmentBg} className="absolute object-cover size-full" />
      </div>
      <div className="absolute z-20 flex items-center gap-3 px-3 mobile-m:gap-5 sm:px-5 size-full">
        <img
          className="h-[60%] mobile-m:h-[65%] aspect-[3/4] object-cover rounded-lg"
          src={attachmentPoster}
        />
        <div className="flex flex-col flex-grow gap-2 sm:gap-3">
          <p className="text-sm font-semibold mobile-m:text-base sm:text-xl line-clamp-1">
            {title}
          </p>
          <div className="flex items-center gap-2 text-2xs mobile-m:text-xs md:text-sm">
            <div className="flex items-center gap-[5px]">
              {type === "ANIME" && (
                <Cat className="size-4 sm:size-[18px] stroke-mainAccent" />
              )}
              {type === "MOVIE" && (
                <Clapperboard className="size-4 sm:size-[18px] stroke-cyan-500" />
              )}
              {type === "TV" && (
                <Tv className="size-4 sm:size-[18px] stroke-lime-500" />
              )}
              <p>{type}</p>
            </div>
            <Circle className="size-1 stroke-none fill-gray-400" />
            <p>{year}</p>
          </div>
          <p className="text-2xs mobile-m:text-xs md:text-sm line-clamp-2 text-socialTextSecondary">
            {media.description || "No overview available"}
          </p>
        </div>
      </div>
    </div>
  );
}
