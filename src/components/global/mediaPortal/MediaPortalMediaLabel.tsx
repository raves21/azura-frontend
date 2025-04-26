import { cn } from "@/lib/utils";
import { useNavigateToMedia } from "@/utils/hooks/useNavigateToMedia";
import { MediaType } from "@/utils/types/shared";
import { LinkProps } from "@tanstack/react-router";
import { Cat, Clapperboard, Tv } from "lucide-react";

type Props = {
  isMobile: boolean;
  type: MediaType;
};

export default function MediaPortalMediaLabel({ isMobile, type }: Props) {
  let label: string;
  let navigationLinkProps: LinkProps;
  switch (type) {
    case "TV":
      label = "TV Series";
      navigationLinkProps = { to: "/tv" };
      break;
    case "ANIME":
      label = "Anime";
      navigationLinkProps = { to: "/anime" };
      break;
    case "MOVIE":
      label = "Movies";
      navigationLinkProps = { to: "/movie" };
      break;
  }

  const { handleNavigateToMedia } = useNavigateToMedia();

  if (isMobile) {
    return (
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 flex flex-col gap-3 sm:gap-4 z-30",
          {
            "right-5 sm:right-8 md:right-10 items-end":
              type === "TV" || type === "MOVIE",
          },
          {
            "left-5 sm:left-8 sm:right-10 items-start": type === "ANIME",
          }
        )}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          {type === "TV" && (
            <Tv className="size-9 sm:size-10 stroke-lime-500" />
          )}
          {type === "ANIME" && (
            <Cat className="size-9 sm:size-10 stroke-mainAccent" />
          )}
          {type === "MOVIE" && (
            <Clapperboard className="size-9 sm:size-10 stroke-cyan-500" />
          )}
          <p
            className={cn("text-3xl sm:text-4xl font-semibold text-mainWhite", {
              "pt-2": type === "MOVIE" || type === "TV",
            })}
          >
            {label}
          </p>
        </div>
        <button
          onClick={() =>
            handleNavigateToMedia({
              from: "mediaPortal",
              navigationLinkProps,
              type,
            })
          }
          className={cn(
            "text-sm sm:text-md md:text-base font-medium px-3 sm:px-4 py-2 rounded-full w-min",
            {
              "bg-lime-500": type === "TV",
              "bg-mainAccent": type === "ANIME",
              "bg-cyan-500": type === "MOVIE",
            }
          )}
        >
          Navigate
        </button>
      </div>
    );
  }
  return (
    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex flex-col items-center gap-5 z-30">
      <div className="flex items-center gap-4">
        {type === "TV" && <Tv className="size-12 stroke-2 stroke-lime-500" />}
        {type === "ANIME" && (
          <Cat className="size-12 stroke-2 stroke-mainAccent" />
        )}
        {type === "MOVIE" && (
          <Clapperboard className="size-12 stroke-2 stroke-cyan-500" />
        )}
        <p
          className={cn(
            "text-4xl font-semibold text-mainWhite whitespace-nowrap",
            {
              "pt-2": type === "MOVIE" || type === "TV",
            }
          )}
        >
          {label}
        </p>
      </div>
      <button
        onClick={() =>
          handleNavigateToMedia({
            from: "mediaPortal",
            navigationLinkProps,
            type,
          })
        }
        className={cn(
          "text-base font-medium px-5 py-2 transition rounded-full w-min",
          {
            "bg-lime-500 hover:shadow-[0_0_10px_3px_#84cc16]": type === "TV",
            "bg-mainAccent hover:shadow-[0_0_10px_3px_#c026d3]":
              type === "ANIME",
            "bg-cyan-500 hover:shadow-[0_0_10px_3px_#06b6d4]": type === "MOVIE",
          }
        )}
      >
        Navigate
      </button>
    </div>
  );
}
