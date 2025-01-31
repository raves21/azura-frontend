import { Skeleton } from "@/components/ui/skeleton";

export default function VideoPlayerSkeleton() {
  return (
    <Skeleton className="bg-gray-800 w-dvw ml-[calc(-50vw+50%)] lg:w-full lg:ml-auto aspect-video rounded-lg" />
  );
}
