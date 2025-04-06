import { MediaType } from "@/utils/types/social/shared";
import { LinkProps, Link } from "@tanstack/react-router";
import { Cat, Tv, Clapperboard } from "lucide-react";

type CollectionItemProps = {
  isCollectionItem: true;
  onClick: () => void;
};

type NotCollectionItemProps = {
  isCollectionItem: false;
  linkProps: LinkProps;
};

type Props = {
  type: MediaType;
  image: string | null;
  title: string;
  year: string | null;
} & (CollectionItemProps | NotCollectionItemProps);

export default function Media({ type, image, title, year, ...props }: Props) {
  if (props.isCollectionItem) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          props.onClick();
        }}
        className="block space-y-3 group"
      >
        <div className="relative aspect-[3/4] min-h-[130px] overflow-hidden rounded-md lg:rounded-xl">
          <div className="absolute inset-0 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 size-full bg-mainAccent/40"></div>
          <img
            src={image || "/no-image-2.jpg"}
            onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
            className="object-cover transition-all duration-300 size-full group-hover:scale-105"
            alt={title}
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-center mobile-l:text-sm font-medium text-[#E0E0E0] line-clamp-2">
            {title}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
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
      </button>
    );
  } else {
    return (
      <Link {...props.linkProps} className="block space-y-3 group">
        <div className="relative aspect-[3/4] min-h-[130px] overflow-hidden rounded-md lg:rounded-xl">
          <div className="absolute inset-0 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 size-full bg-mainAccent/40"></div>
          <img
            src={image || "/no-image-2.jpg"}
            onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
            className="object-cover transition-all duration-300 size-full group-hover:scale-105"
            alt={title}
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-center mobile-l:text-sm font-medium text-[#E0E0E0] line-clamp-2">
            {title}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
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
}
