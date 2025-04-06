import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { Media } from "@/utils/types/social/social";
import { Cat, Clapperboard, Tv, X } from "lucide-react";
import MediaPreviewDialog from "@/components/core/social/mainContent/previewPopup/media/MediaPreviewDialog";

type Props = {
  media: Media;
};

export default function MediaAttachment({ media }: Props) {
  const setMediaAttachment = useManagePostStore(
    (state) => state.setMediaAttachment
  );

  const toggleOpenDialogSecondary = useGlobalStore(
    (state) => state.toggleOpenDialogSecondary
  );

  return (
    <button
      onClick={() =>
        toggleOpenDialogSecondary(<MediaPreviewDialog media={media} />)
      }
      className="relative hover:border-mainAccent text-start rounded-lg w-[55%] flex items-center gap-3 p-3 border-[0.5px] border-socialTextSecondary"
    >
      {media.type === "ANIME" ? (
        <div className="rounded-md bg-mainAccent px-2 py-1 flex items-center gap-1 absolute -top-[14px] -right-4">
          <Cat className="stroke-mainWhite size-3" />
          <p className="text-xs font-medium">Anime</p>
        </div>
      ) : media.type === "MOVIE" ? (
        <div className="rounded-md bg-cyan-500 px-2 py-1 flex items-center gap-1 absolute -top-[14px] -right-4">
          <Clapperboard className="stroke-socialPrimary size-3" />
          <p className="text-xs font-medium text-socialPrimary">Movie</p>
        </div>
      ) : (
        <div className="rounded-md bg-lime-500 px-2 py-1 flex items-center gap-1 absolute -top-[14px] -right-4">
          <Tv className="stroke-socialPrimary size-3" />
          <p className="text-xs font-medium text-socialPrimary">TV</p>
        </div>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setMediaAttachment(null);
        }}
        className="box-content hover:bg-mainAccent hover:cursor-pointer absolute p-1 rounded-full -top-3 -left-2 bg-socialTextSecondary"
      >
        <X className="stroke-mainWhite size-4" />
      </div>
      <img
        src={media.posterImage ?? "/no-image-2.jpg"}
        className="aspect-[3/4] h-16 object-cover rounded-md"
      />
      <div className="flex flex-col gap-1">
        <p className="font-medium line-clamp-1">{media.title}</p>
        <p className="text-xs line-clamp-2 text-socialTextSecondary">
          {media.description}
        </p>
      </div>
    </button>
  );
}
