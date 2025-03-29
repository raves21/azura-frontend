import { Skeleton } from "@/components/ui/skeleton";

export default function UserCollectionsSkeleton() {
  return (
    <div className="grid w-full grid-cols-2 gap-2 p-3 pb-8 rounded-lg mobile-l:gap-3 sm:p-5 sm:grid-cols-3 bg-socialPrimary">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton
          key={i}
          className="bg-gray-700 rounded-lg aspect-[1/1] size-auto"
        />
      ))}
    </div>
  );
}
