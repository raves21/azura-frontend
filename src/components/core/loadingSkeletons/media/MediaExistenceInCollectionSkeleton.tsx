import { Skeleton } from "@/components/ui/skeleton";

export default function MediaExistenceInCollectionSkeleton() {
  return (
    <div className="w-full px-5 py-5">
      <Skeleton className="font-medium h-[20px] w-[50%] bg-gray-700" />
    </div>
  );
}
