import { Skeleton } from "@/components/ui/skeleton";

export default function UserListItemSkeleton() {
  return (
    <div className="flex flex-col w-full gap-[10px] py-3 px-2 sm:px-5">
      <div className="flex w-full">
        <Skeleton className="object-cover bg-gray-800 rounded-full size-12 md:size-14" />
        <div className="flex-grow pl-2 space-y-1 text-sm text-start sm:pl-4">
          <Skeleton className="font-semibold bg-gray-800 w-min whitespace-nowrap">
            lorem ipsum dolor
          </Skeleton>
          <Skeleton className="bg-gray-800 w-min whitespace-nowrap">
            lorem ipsum
          </Skeleton>
        </div>
        <Skeleton className="bg-gray-800 w-[90px] py-3 h-min ml-auto text-xs font-semibold border-gray-800 hover:border-gray-900 rounded-full">
          Follow
        </Skeleton>
      </div>
      <Skeleton className="w-min ml-[54px] sm:ml-16 md:ml-[71px] whitespace-nowrap bg-gray-800">
        Lorem ipsum dolor
      </Skeleton>
    </div>
  );
}
