import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/custom-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import MediaCardSkeleton from "../MediaCardSkeleton";

export default function CategoryCarouselSkeleton() {
  return (
    <div className="w-full pt-5 space-y-6 text-gray-400">
      <div className="flex items-center justify-between w-full">
        <Skeleton className="text-lg font-semibold sm:text-xl lg:text-2xl bg-gray-700">
          Lorem, ipsum.
        </Skeleton>
        <Skeleton className="bg-gray-700 text-xs md:text-base group-hover:text-mainAccent whitespace-nowrap lg:px-4 px-3 py-2">
          See All
        </Skeleton>
      </div>

      <Carousel
        opts={{
          slidesToScroll: 3,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, i) => (
            <CarouselItem
              key={i}
              className="basis-1/3 mobile-m:basis-[30%] 570:basis-1/4 sm:basis-1/5 xl:basis-1/6"
            >
              <MediaCardSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          carouselType="category-carousel"
          className="absolute left-0 border-none bg-gradient-to-r from-darkBg from-10% via-darkBg/80 via-50% to-transparent"
        />
        <CarouselNext
          carouselType="category-carousel"
          className="absolute right-0 border-none bg-gradient-to-l from-darkBg from-10% via-darkBg/80 via-50% to-transparent"
        />
      </Carousel>
    </div>
  );
}
