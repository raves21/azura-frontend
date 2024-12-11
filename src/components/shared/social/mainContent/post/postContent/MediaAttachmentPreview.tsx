import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import { useGlobalStore } from "@/utils/stores/globalStore";
import { Media } from "@/utils/types/social/social";
import Description from "@/components/shared/info/Description";
import {
  X,
  SquareArrowOutUpRight,
  Circle,
  Cat,
  Clapperboard,
  Tv,
  Star,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

type MediaAttachmentPreviewProps = {
  media: Media;
};

export default function MediaAttachmentPreview({
  media,
}: MediaAttachmentPreviewProps) {
  const { coverImage, description, posterImage, year, rating, title, type } =
    media;
  const heroImage = coverImage ?? posterImage ?? "/no-image-2.jpg";

  const windowWidth = useWindowWidth();
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [toggleOpenDialog, toggleOpenDrawer] = useGlobalStore(
    useShallow((state) => [state.toggleOpenDialog, state.toggleOpenDrawer])
  );
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
  }, []);

  function closePopup() {
    if (windowWidth < 1024) {
      toggleOpenDrawer(null);
    } else {
      toggleOpenDialog(null);
    }
  }

  return (
    <div
      ref={containerRef}
      className="text-gray-300 overflow-y-auto aspect-[5/4] flex flex-col relative h-[550px] rounded-lg bg-gray-950"
    >
      <button
        onClick={closePopup}
        style={{
          marginLeft:
            windowWidth < 1024 ? containerWidth - 40 : containerWidth - 10,
          marginTop: 12,
        }}
        className="fixed z-30 group"
      >
        <div className="absolute bg-mainAccent/20 group-hover:opacity-100 transition-opacity opacity-0 size-[150%] rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2" />
        <X className="transition-colors size-8 stroke-mainWhite group-hover:stroke-mainAccent" />
      </button>
      <button className="absolute z-30 group top-4 left-4">
        <div className="absolute bg-mainAccent/20 group-hover:opacity-100 transition-opacity opacity-0 size-[180%] rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2" />
        <SquareArrowOutUpRight className="transition-colors size-7 stroke-mainWhite group-hover:stroke-mainAccent" />
      </button>
      <div className="absolute w-full h-80">
        <div className="absolute z-10 size-full bg-gradient-to-t from-gray-950 to-transparent from-[8%]" />
        <img src={heroImage} className="absolute object-cover size-full" />
      </div>
      <div className="z-20 flex flex-col w-full gap-3 px-2 pb-24 mt-64 sm:px-6">
        <h1 className="text-3xl font-semibold line-clamp-2 h-fit">{title}</h1>
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
