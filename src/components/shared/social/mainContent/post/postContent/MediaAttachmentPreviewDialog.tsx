import Description from "@/components/shared/info/Description";
import { useGlobalStore } from "@/utils/stores/globalStore";
import { Media } from "@/utils/types/social/social";
import {
  Cat,
  Circle,
  Clapperboard,
  SquareArrowOutUpRight,
  Star,
  Tv,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MediaAttachmentPreviewDialogProps = {
  media: Media;
};

export default function MediaAttachmentPreviewDialog({
  media,
}: MediaAttachmentPreviewDialogProps) {
  const { coverImage, description, posterImage, year, rating, title, type } =
    media;
  const heroImage = coverImage ?? posterImage ?? "/no-image-2.jpg";

  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-gray-300 overflow-y-auto aspect-[5/4] flex flex-col relative h-[550px] rounded-lg bg-gray-950"
    >
      <button
        onClick={() => toggleOpenDialog(null)}
        style={{
          marginLeft: containerWidth - 10,
          marginTop: 12,
        }}
        className="fixed z-30 group"
      >
        <X className="transition-colors size-8 stroke-mainWhite group-hover:stroke-mainAccent" />
      </button>
      <button>
        <SquareArrowOutUpRight className="absolute z-30 transition-colors size-7 stroke-mainWhite hover:stroke-mainAccent top-4 left-4" />
      </button>
      <div className="absolute w-full h-80">
        <div className="absolute z-10 size-full bg-gradient-to-t from-gray-950 to-transparent from-[8%]" />
        <img src={heroImage} className="absolute object-cover size-full" />
      </div>
      <div className="flex flex-col w-full gap-3 px-6 mt-64">
        <h1 className="z-20 pb-1 text-5xl font-semibold line-clamp-2 h-fit">
          {title}
        </h1>
        <div className="flex flex-wrap items-center w-full gap-3">
          <p>{year}</p>
          <Circle className="size-1 stroke-none fill-gray-400" />
          <div className="flex items-center gap-[5px]">
            {type === "ANIME" && <Cat className="size-4 stroke-mainAccent" />}
            {type === "MOVIE" && (
              <Clapperboard className="size-4 stroke-cyan-500" />
            )}
            {type === "TV" && <Tv className="size-4 stroke-lime-500" />}
            <p>{type}</p>
          </div>
          <Circle className="size-1 stroke-none fill-gray-400" />
          <div className="flex items-center gap-1">
            <Star className="size-[14px] stroke-none fill-yellow-500" />
            <p>{rating}</p>
          </div>
        </div>
        <Description
          description={description}
          showDescriptionLabel={false}
          className="w-full"
        />
      </div>
    </div>
  );
}
