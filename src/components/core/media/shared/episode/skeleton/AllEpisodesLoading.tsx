import { Skeleton } from "@/components/ui/skeleton";
import EpisodeListContainerSkeleton from "./EpisodeListContainerSkeleton";

type AllEpisodesLoading = {
  variant: "infoPage" | "watchPage";
};

export default function AllEpisodesLoading({ variant }: AllEpisodesLoading) {
  return (
    <div className="flex flex-col w-full pt-8 mb-16 space-y-6 text-sm lg:text-base">
      <Skeleton className="self-start p-2 text-lg font-semibold text-transparent bg-gray-800 rounded-full lg:text-xl">
        Episodes
      </Skeleton>
      <EpisodeListContainerSkeleton variant={variant} />
    </div>
  );
}
