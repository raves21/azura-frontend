import { Skeleton } from "@/components/ui/skeleton";
import InfoSectionPosterSkeleton from "./InfoSectionPosterSkeleton";
import RatingSkeleton from "./RatingSkeleton";
import TitleSkeleton from "./TitleSkeleton";
import GenreListSkeleton from "./GenreListSkeleton";
import DescriptionSkeleton from "./DescriptionSkeleton";

export default function WatchInfoPageSkeleton() {
  return (
    <section className="relative flex flex-col w-full gap-6 py-[90px] mt-8 mb-5 justify-center">
      <div className="z-10 flex gap-3 sm:gap-5 md:gap-8 lg:gap-12 size-full">
        <InfoSectionPosterSkeleton variant="watchPage" />
        <section className="z-10 flex flex-col flex-1 gap-2 sm:gap-3">
          <TitleSkeleton variant="watchPage" />
          <div className="flex flex-col gap-2 mobile-m:gap-4">
            <RatingSkeleton variant="watchPage" />
            <div className="flex flex-col gap-2 text-xs sm:text-base mobile-m:gap-3 md:gap-4 lg:gap-8 lg:items-center lg:flex-row">
              <Skeleton className="bg-gray-800 h-[20px] w-[90px]" />
              <Skeleton className="bg-gray-800 h-[20px] w-[90px]" />
              <Skeleton className="bg-gray-800 h-[20px] w-[90px]" />
            </div>
            <GenreListSkeleton isMobile={false} variant="watchPage" />
          </div>
          <DescriptionSkeleton
            showDescriptionLabel={false}
            className="hidden lg:block"
          />
        </section>
      </div>
      <div className="z-10 w-full space-y-4 lg:space-y-0">
        <GenreListSkeleton isMobile variant="watchPage" />
        <DescriptionSkeleton
          showDescriptionLabel={false}
          className="w-full text-sm lg:hidden sm:text-base"
        />
      </div>
    </section>
  );
}
