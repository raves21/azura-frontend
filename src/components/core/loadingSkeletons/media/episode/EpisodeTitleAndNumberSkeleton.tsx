import { Skeleton } from "@/components/ui/skeleton";

export default function EpisodeTitleAndNumberSkeleton() {
  return (
    <div className="flex flex-col w-full gap-1 mt-2 lg:px-0">
      <Skeleton className="self-start text-lg font-semibold   bg-gray-800 sm:text-xl">
        Episode 10
      </Skeleton>
      <Skeleton className="self-start font-medium   bg-gray-800 sm:text-lg line-clamp-1 ">
        Lorem ipsum dolor sit amet
      </Skeleton>
    </div>
  );
}
