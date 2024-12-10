import { useGlobalStore } from "@/utils/stores/globalStore";
import { Media } from "@/utils/types/social/social";
import { Cat, Circle, Clapperboard, Star, Tv } from "lucide-react";
import MediaAttachmentPreviewDialog from "./MediaAttachmentPreviewDialog";

type MediaAttachmentProps = {
  media: Media;
};

export default function MediaAttachment({ media }: MediaAttachmentProps) {
  const { coverImage, posterImage, title, rating, type, year, description } =
    media;
  let attachmentBg = coverImage ?? posterImage ?? "/no-image-2.jpg";
  let attachmentPoster = posterImage ?? coverImage ?? "/no-image.png";
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        toggleOpenDialog(<MediaAttachmentPreviewDialog media={media} />);
      }}
      className="relative w-full h-56 overflow-hidden bg-gray-800 rounded-lg"
    >
      <div className="absolute size-full">
        <div className="absolute z-10 backdrop-blur-sm bg-black/70 size-full" />
        <img src={attachmentBg} className="absolute object-cover size-full" />
      </div>
      <div className="absolute z-20 flex items-center gap-6 px-5 size-full">
        <img
          className="h-[65%] aspect-[1/1] object-cover rounded-lg"
          src={attachmentPoster}
        />
        <div className="flex flex-col flex-grow gap-2">
          <p className="text-xl font-semibold line-clamp-1 whitespace-nowrap">
            {title}
          </p>
          <div className="flex items-center gap-2 text-xs font-medium">
            <div className="flex items-center gap-[5px]">
              {type === "ANIME" && <Cat className="size-4 stroke-mainAccent" />}
              {type === "MOVIE" && (
                <Clapperboard className="size-4 stroke-cyan-500" />
              )}
              {type === "TV" && <Tv className="size-4 stroke-lime-500" />}
              <p>
                {type === "ANIME" ? "Anime" : type === "MOVIE" ? "Movie" : "TV"}
              </p>
            </div>
            <Circle className="size-1 stroke-none fill-gray-400" />
            <p>{year}</p>
            <Circle className="size-1 stroke-none fill-gray-400" />
            <div className="flex items-center gap-1">
              <Star className="size-[14px] stroke-none fill-yellow-500" />
              <p>{rating}</p>
            </div>
          </div>
          <p className="line-clamp-3 text-socialTextSecondary">{description}</p>
        </div>
      </div>
    </div>
  );
}
