import { Skeleton } from "@/components/ui/skeleton";
import InfoDetailsSkeleton from "./InfoDetailsSkeleton";
import InfoSectionPosterSkeleton from "./InfoSectionPosterSkeleton";
import RatingSkeleton from "./RatingSkeleton";
import TitleSkeleton from "./TitleSkeleton";
import GenreListSkeleton from "./GenreListSkeleton";
import PlayNowButtonSkeleton from "./PlayNowButtonSkeleton";
import DescriptionSkeleton from "./DescriptionSkeleton";

export default function InfoPageHeroSkeleton() {
  return (
    <section className="relative flex justify-center w-full text-sm md:text-base">
      <div className="flex flex-col items-center w-full gap-2 pt-32 pb-12 lg:pt-36 lg:gap-14 lg:flex-row lg:items-start">
        <InfoSectionPosterSkeleton variant="infoPage" />
        <div className="relative flex flex-col items-center flex-1 gap-3 mt-3 lg:mt-0 lg:items-start">
          <TitleSkeleton variant="infoPage" />
          <RatingSkeleton variant="infoPage" isMobile={false} />
          <InfoDetailsSkeleton isMobile={false}>
            <div className="flex gap-10">
              <Skeleton className="bg-gray-800 h-[20px] w-[90px]" />
              <Skeleton className="bg-gray-800 h-[20px] w-[70px]" />
              <Skeleton className="bg-gray-800 h-[20px] w-[120px]" />
            </div>
            <GenreListSkeleton variant="infoPage" />
          </InfoDetailsSkeleton>
          <Skeleton className="bg-gray-800 h-[20px] w-[110px]" />
          <div className="flex gap-5 my-3">
            <PlayNowButtonSkeleton />
            <PlayNowButtonSkeleton />
          </div>
          <DescriptionSkeleton
            className="w-full gap-3 mt-5 lg:mt-0 lg:w-[75%] xl:w-[70%]"
            showDescriptionLabel
          />
          <InfoDetailsSkeleton className="mt-14" isMobile>
            <div className="flex flex-col gap-3">
              <Skeleton className="bg-gray-800 h-[20px] w-[90px]" />
              <Skeleton className="bg-gray-800 h-[20px] w-[90px]" />
              <Skeleton className="bg-gray-800 h-[20px] w-[90px]" />
            </div>
            <GenreListSkeleton variant="infoPage" />
            <div className="flex items-center gap-2">
              <Skeleton className="text-transparent bg-gray-800">Score:</Skeleton>
              <RatingSkeleton variant="infoPage" isMobile />
            </div>
          </InfoDetailsSkeleton>
        </div>
      </div>
    </section>
  );
}
