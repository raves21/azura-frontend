import { LoaderCircle } from "lucide-react";

export default function VideoPlayerSkeleton() {
  return (
    <div className="bg-gray-800 w-dvw ml-[calc(-50vw+50%)] lg:w-full flex items-center justify-center gap-5 sm:gap-8 flex-wrap lg:ml-auto aspect-video rounded-lg">
      <img
        src="/azura-logo-with-label.svg"
        className="w-[100px] sm:w-[180px] lg:w-[150px] xl:w-[200px]"
      />
      <LoaderCircle className="animate-spin size-8 sm:size-14 mt-1 stroke-mainAccent" />
    </div>
  );
}
