import { Media } from "@/utils/types/social/social";
import Description from "@/components/shared/info/Description";
import { Circle, Cat, Clapperboard, Tv, Star } from "lucide-react";
import PreviewContainer from "./PreviewContainer";

type MediaPreviewProps = {
  media: Media;
};

export default function MediaPreview({ media }: MediaPreviewProps) {
  const { coverImage, description, posterImage, year, rating, title, type } =
    media;
  const heroImage = coverImage ?? posterImage ?? "/no-image-2.jpg";

  return (
    <PreviewContainer>
      <div className="absolute w-full h-72 mobile-m:h-80">
        <div className="absolute z-10 size-full bg-gradient-to-t from-gray-950 to-transparent from-[8%]" />
        <img src={heroImage} className="absolute object-cover size-full" />
      </div>
      <div className="z-20 flex flex-col w-full gap-3 px-2 pb-20 mt-64 sm:px-6">
        <h1 className="text-2xl font-semibold mobile-m:text-3xl line-clamp-2 h-fit">
          {title}
        </h1>
        <div className="flex flex-wrap items-center w-full gap-3 text-sm mobile-m:text-base">
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
          className="w-full text-sm mobile-m:text-base"
        />
      </div>
    </PreviewContainer>
  );
}
