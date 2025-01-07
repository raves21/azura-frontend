import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileSkeleton() {
  return (
    <main className="flex flex-col w-full gap-3 pb-10 text-transparent no-select">
      <div className="flex flex-col w-full gap-2 overflow-hidden rounded-lg mobile-m:gap-3 bg-socialPrimary">
        <Skeleton className="relative w-full bg-gray-700 h-28 md:h-48 sm:h-44">
          <Skeleton className="absolute z-10 bg-gray-700 sm:size-24 rounded-full size-20 lg:size-28 border-4 border-socialPrimary -bottom-[40%] md:-bottom-[35%] left-3" />
        </Skeleton>
        <div className="flex flex-col items-start gap-4 px-3 sm:px-5">
          <Skeleton className="self-end px-4 py-2 bg-gray-700 rounded-full">
            Edit Profile
          </Skeleton>
          <div className="flex flex-col gap-2 sm:mt-4">
            <Skeleton className="font-semibold bg-gray-700 text-md mobile-m:text-base sm:text-lg">
              lorem ipsum dolor sit amet
            </Skeleton>
            <Skeleton className="text-sm bg-gray-700 w-min mobile-m:text-md sm:text-base">
              @loremipsum
            </Skeleton>
          </div>
          <Skeleton className="text-sm bg-gray-700 mobile-m:text-md sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Skeleton>
          <div className="flex gap-6 text-sm mobile-m:text-md sm:text-base">
            <Skeleton className="bg-gray-700">
              <span className="font-semibold">100&nbsp;</span>
              <span>following</span>
            </Skeleton>
            <Skeleton className="bg-gray-700">
              <span className="font-semibold">100&nbsp;</span>
              <span>following</span>
            </Skeleton>
          </div>
        </div>
        <div className="flex w-full mt-4 text-sm mobile-m:text-md sm:text-base">
          <div className="grid flex-1 py-4 place-items-center">
            <Skeleton className="bg-gray-700">Lorem Ipsum</Skeleton>
          </div>
          <div className="grid flex-1 py-4 place-items-center">
            <Skeleton className="bg-gray-700">Lorem Ipsum</Skeleton>
          </div>
        </div>
      </div>
    </main>
  );
}
