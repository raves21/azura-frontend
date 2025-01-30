import { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import EpisodeCardSkeleton from "./EpisodeCardSkeleton";

type EpisodeListContainerSkeletonProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    variant: "infoPage" | "watchPage";
  };

export default function EpisodeListContainerSkeleton({
  variant
}: EpisodeListContainerSkeletonProps) {
  return (
    <div
      className={cn(
        "max-h-[350px] lg:max-h-fit overflow-y-auto text-gray-400 grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-4",
        {
          "lg:grid-cols-5 xl:grid-cols-6 lg:gap-x-4 lg:gap-y-6":
            variant === "infoPage"
        },
        { "lg:grid-cols-2": variant === "watchPage" }
      )}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <EpisodeCardSkeleton key={i} />
      ))}
    </div>
  );
}
