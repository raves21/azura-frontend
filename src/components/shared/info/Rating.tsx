import React from "react";
import { getRatingScore } from "@/utils/functions/reusable_functions";
import { cn } from "@/lib/utils";

type InfoPageVariant = {
  variant: "infoPage";
  isMobile: boolean;
};

type WatchPageVariant = {
  variant: "watchPage";
};

type StarsRatingProps = {
  starsFillWidthRef: React.MutableRefObject<HTMLDivElement | null>;
  rating: number | undefined | null;
  starsFillWidthPercentage: number;
  className?: string;
  starsClassName?: string;
  ratingLabelClassName?: string;
} & (InfoPageVariant | WatchPageVariant);

export default function Rating({
  starsFillWidthPercentage,
  starsFillWidthRef,
  rating,
  className,
  starsClassName,
  ratingLabelClassName,
  variant,
  ...props
}: StarsRatingProps) {
  const infoPageProps =
    variant === "infoPage" ? (props as InfoPageVariant) : null;

  return (
    <div
      className={cn(
        "gap-4 flex lg:my-1 items-center",
        variant === "infoPage"
          ? {
              "flex lg:hidden ml-0": infoPageProps?.isMobile,
              "hidden lg:flex ml-2": !infoPageProps?.isMobile,
            }
          : "flex gap-2 mobile-l:gap-4 xl:ml-2",
        className
      )}
    >
      <div
        style={{
          WebkitMaskImage: 'url("/five-stars.svg")',
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
        }}
        className={cn(
          "relative w-32 h-6 bg-gray-500 lg:-ml-2",
          {
            "w-20 h-full mobile-m:w-24 sm:w-28 lg:w-32 lg:h-5 xl:h-6": variant === "watchPage",
            "w-24": variant === "infoPage" && infoPageProps?.isMobile,
          },
          starsClassName
        )}
      >
        <div
          ref={starsFillWidthRef}
          style={{
            width: `${starsFillWidthPercentage}%`,
          }}
          className={`absolute bg-amber-400 h-full`}
        ></div>
      </div>
      <p
        className={cn(
          "font-semibold lg:text-lg",
          {
            "text-xs mobile-l:text-sm sm:text-base md:text-lg": variant === "watchPage",
          },
          ratingLabelClassName
        )}
      >
        <span className="text-mainAccent">
          {rating ? `${getRatingScore(rating)}` : "?"}
        </span>
        /5
      </p>
    </div>
  );
}