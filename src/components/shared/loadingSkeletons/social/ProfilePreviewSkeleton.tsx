import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePreviewSkeleton() {
  return (
    <Skeleton className="h-[376px] bg-socialPrimary flex flex-col w-full gap-8 overflow-hidden text-base rounded-lg">
      <Skeleton className="relative top-0 w-full h-24 bg-gray-700">
        <Skeleton className="absolute inset-0 object-cover bg-gray-600 size-full" />
        <Skeleton className="absolute -translate-x-1/2 rounded-full bg-gray-600 -bottom-[30%] size-16 left-1/2" />
      </Skeleton>
      <div className="flex flex-col items-center gap-3 px-3 mt-4">
        <Skeleton className="w-[50%] h-4 bg-gray-600" />
        <Skeleton className="w-[40%] h-3 bg-gray-600" />
      </div>
    </Skeleton>
  );
}
