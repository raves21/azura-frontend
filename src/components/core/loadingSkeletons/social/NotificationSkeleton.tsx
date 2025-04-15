import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationSkeleton() {
  return (
    <div className="w-full hover:bg-socialPrimaryHover items-start flex text-sm mobile-m:text-base px-3 py-4 gap-4 570:gap-6 mobile-m:px-4 mobile-m:py-5 md:p-5">
      <Skeleton className="size-14 sm:size-16 md:size-[68px] rounded-full bg-gray-700" />
      <div className="flex flex-col gap-3 justify-between flex-grow">
        <Skeleton className="line-clamp-2 bg-gray-700 text-sm mobile-m:text-md sm:text-base">
          Lorem ipsum dolor sit amet,
        </Skeleton>
        <Skeleton className="bg-gray-700 text-xs mobile-m:text-sm md:text-base">
          2 days ago
        </Skeleton>
      </div>
    </div>
  );
}
