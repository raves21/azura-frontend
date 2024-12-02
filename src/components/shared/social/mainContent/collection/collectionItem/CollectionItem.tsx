import { MediaType } from "@/utils/types/social/shared";
import { Link } from "@tanstack/react-router";
import { Cat, Tv, Clapperboard } from "lucide-react";

type CollectionItemProps = {
  type: MediaType;
  image: string | undefined;
  title: string;
  year: string;
};

export default function CollectionItem({
  type,
  image,
  title,
  year,
}: CollectionItemProps) {
  return (
    <Link className="space-y-3 group">
      <div className="relative aspect-[3/4] min-h-[130px] overflow-hidden bg-gray-600 rounded-md lg:rounded-xl">
        {image && (
          <>
            <div className="absolute inset-0 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 size-full bg-mainAccent/40"></div>
            <img
              loading="lazy"
              src={image}
              className="object-cover transition-all duration-300 size-full group-hover:scale-105"
              alt={title}
            />
          </>
        )}
      </div>
      <div className="space-y-2">
        <p className="text-xs mobile-l:text-sm font-medium text-[#E0E0E0] line-clamp-2">
          {title}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {type === "ANIME" ? (
            <Cat className="size-4 stroke-mainAccent" />
          ) : type === "MOVIE" ? (
            <Clapperboard className="size-4 stroke-cyan-500" />
          ) : (
            <Tv className="size-4 stroke-lime-500" />
          )}
          {year && <p>{year}</p>}
        </div>
      </div>
    </Link>
  );
}
