import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type InfoPageVariant = {
  variant: "infoPage";
  isMobile: boolean;
};

type WatchPageVariant = {
  variant: "watchPage";
};

type RatingSkeletonProps = InfoPageVariant | WatchPageVariant;

export default function RatingSkeleton({
  variant,
  ...props
}: RatingSkeletonProps) {
  const infoPageProps =
    variant === "infoPage" ? (props as InfoPageVariant) : null;
  return (
    <div
      className={cn(
        "gap-4 flex lg:my-1 items-center",
        variant === "infoPage"
          ? {
              "flex lg:hidden ml-0": infoPageProps?.isMobile,
              "hidden lg:flex ml-2": !infoPageProps?.isMobile
            }
          : "flex gap-2 mobile-l:gap-4 xl:ml-2"
      )}
    >
      <Skeleton
        style={{
          WebkitMaskImage: 'url("/five-stars.svg")',
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center"
        }}
        className={cn("relative w-32 h-6 bg-gray-800 lg:-ml-2", {
          "w-20 h-full mobile-m:w-24 sm:w-28 lg:w-32 lg:h-5 xl:h-6":
            variant === "watchPage",
          "w-24": variant === "infoPage" && infoPageProps?.isMobile
        })}
      ></Skeleton>
      <Skeleton
        className={cn("font-semibold lg:text-lg text-transparent bg-gray-800", {
          "text-xs mobile-l:text-sm sm:text-base md:text-lg":
            variant === "watchPage"
        })}
      >
        10/10
      </Skeleton>
    </div>
  );
}
