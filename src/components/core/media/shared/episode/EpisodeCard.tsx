import { Link, LinkProps } from "@tanstack/react-router";
import { forwardRef, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import EpisodePlayIcon from "./EpisodePlayIcon";

type EpisodeCardProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  image: string | null | undefined;
  replace?: boolean;
  episodeImageFallback: string | undefined;
  className?: string;
  isCurrentlyWatched?: boolean;
  linkProps?: LinkProps;
  episodeNumber: string;
  episodeTitle: string;
};

const EpisodeCard = forwardRef<HTMLAnchorElement, EpisodeCardProps>(
  (
    {
      image,
      replace,
      episodeImageFallback,
      className,
      isCurrentlyWatched,
      linkProps,
      episodeNumber,
      episodeTitle
    },
    ref
  ) => {
    return (
      <Link
        {...linkProps}
        disabled={isCurrentlyWatched}
        ref={ref}
        replace={replace}
        className={cn(
          "relative flex flex-col gap-2 text-xs md:text-sm aspect-[4/3] group",
          className
        )}
      >
        <div className="relative flex-1">
          <div className="absolute font-semibold z-20 px-2 py-[3px] bottom-1 left-1 text-[#E0E0E0] rounded-md bg-black/60">
            {episodeNumber}
          </div>
          <div
            className={cn(
              "absolute z-10 grid transition-all rounded-lg place-items-center size-full bg-mainAccent/40",
              isCurrentlyWatched
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            )}
          >
            {isCurrentlyWatched && <EpisodePlayIcon />}
          </div>
          <div className="bg-gray-700 rounded-lg size-full">
            <img
              src={image || episodeImageFallback || "/no-image-2.jpg"}
              onError={(e) =>
                (e.currentTarget.src =
                  episodeImageFallback || "/no-image-2.jpg")
              }
              className="absolute inset-0 object-cover rounded-lg size-full"
            />
          </div>
        </div>
        <div>
          <p className="line-clamp-1">{episodeTitle}</p>
        </div>
      </Link>
    );
  }
);

export default EpisodeCard;
