import { useGlobalStore } from "@/utils/stores/globalStore";
import { Media } from "@/utils/types/social/social";
import { Cat, Circle, Clapperboard, Tv } from "lucide-react";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import { useShallow } from "zustand/react/shallow";
import MediaAttachmentPreview from "./MediaAttachmentPreview";

type MediaAttachmentProps = {
  media: Media;
};

export default function MediaAttachment({ media }: MediaAttachmentProps) {
  const { coverImage, posterImage, title, type, year, description } = media;
  let attachmentBg = coverImage ?? posterImage ?? "/no-image-2.jpg";
  let attachmentPoster = posterImage ?? coverImage ?? "/no-image.png";

  const windowWidth = useWindowWidth();
  const [toggleOpenDialog, toggleOpenDrawer] = useGlobalStore(
    useShallow((state) => [state.toggleOpenDialog, state.toggleOpenDrawer])
  );

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (windowWidth < 1024) {
          toggleOpenDrawer(<MediaAttachmentPreview media={media} />);
        } else {
          toggleOpenDialog(<MediaAttachmentPreview media={media} />);
        }
      }}
      className="relative w-full h-32 overflow-hidden bg-gray-800 rounded-lg mobile-m:h-36 xl:h-56"
    >
      <div className="absolute size-full">
        <div className="absolute z-10 backdrop-blur-[1.5px] bg-black/70 size-full" />
        <img src={attachmentBg} className="absolute object-cover size-full" />
      </div>
      <div className="absolute z-20 flex items-center gap-3 px-3 mobile-m:gap-5 sm:gap-6 md:px-5 size-full">
        <img
          className="h-[65%] aspect-[1/1] object-cover rounded-lg"
          src={attachmentPoster}
        />
        <div className="flex flex-col flex-grow gap-[5px] mobile-m:gap-2">
          <p className="text-sm font-semibold mobile-m:text-xl sm:text-xl line-clamp-1 whitespace-nowrap">
            {title}
          </p>
          <div className="flex items-center gap-2 text-xxs mobile-m:text-xs">
            <div className="flex items-center gap-[5px]">
              {type === "ANIME" && <Cat className="size-4 stroke-mainAccent" />}
              {type === "MOVIE" && (
                <Clapperboard className="size-4 stroke-cyan-500" />
              )}
              {type === "TV" && <Tv className="size-4 stroke-lime-500" />}
              <p>{type}</p>
            </div>
            <Circle className="size-1 stroke-none fill-gray-400" />
            <p>{year}</p>
          </div>
          <p className="text-xxs mobile-m:text-xs line-clamp-2 sm:line-clamp-3 text-socialTextSecondary">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
