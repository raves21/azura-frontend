import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/custom-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, Play } from "lucide-react";

export default function TrendingHeroCarouselSkeleton() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="w-full">
        <CarouselItem className="relative w-full h-[350px] mobile-m:h-[380px] mobile-l:h-[400px] sm:h-[420px] md:h-[450px] lg:h-[500px] xl:h-[525px]">
          <div className="flex items-end justify-center lg:items-center size-full lg:pt-20">
            <div className="w-full px-2 sm:px-3 lg:max-w-[1000px] xl:max-w-[1200px] 1440:max-w-[1300px] 2xl:max-w-[1400px] 1600:max-w-[1450px]">
              <div className="flex items-center w-full gap-16">
                <Skeleton className="aspect-[3/4] bg-gray-700 w-[230px] rounded-xl overflow-hidden z-10 lg:block hidden">
                  <img
                    src="/no-image-2.jpg"
                    className="object-cover opacity-0 size-full"
                  />
                </Skeleton>
                <div className="z-10 flex-1">
                  <div className="flex flex-col sm:w-[80%] xl:w-[70%] gap-4">
                    <div className="space-y-3">
                      <Skeleton className="mb-auto bg-gray-700 text-lg">
                        <span className="text-2xl font-bold">#1</span> in
                        trending
                      </Skeleton>
                      <Skeleton className="text-xl bg-gray-700 font-bold sm:text-2xl md:text-3xl line-clamp-2">
                        Lorem, ipsum dolor.
                      </Skeleton>
                    </div>
                    <Skeleton className="hidden bg-gray-700 lg:line-clamp-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatem, cupiditate omnis nobis hic quo voluptate alias
                      accusamus dolor minus facilis?
                    </Skeleton>
                    <div className="flex gap-2 sm:gap-4 sm:my-4">
                      <Skeleton className="flex items-center gap-1 bg-gray-700 px-3 py-2 transition-transform rounded-full sm:gap-2 mobile-l:px-4 sm:px-5 hover:scale-[1.02]">
                        <Play size={20} className="opacity-0" />
                        <p className="text-sm opacity-0 font-medium sm:text-base">
                          Play Now
                        </p>
                      </Skeleton>
                      <Skeleton className="hover:scale-[1.02] transition-transform flex items-center gap-1 px-3 py-2 bg-gray-700 rounded-full sm:gap-2 mobile-l:px-4 sm:px-5">
                        <Bookmark size={20} className="opacity-0" />
                        <p className="text-sm opacity-0 font-medium sm:text-base">
                          Collection
                        </p>
                      </Skeleton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 w-full left-1/2 ml-[-50vw] h-full">
            <img
              src="/no-image-2.jpg"
              className="object-cover opacity-0 object-center size-full"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious
        carouselType="hero-carousel"
        className="absolute left-0 ml-2 border-none md:ml-5 xl:ml-6 bg-black/40 hover:bg-mainAccent"
      />
      <CarouselNext
        carouselType="hero-carousel"
        className="absolute right-0 mr-2 border-none md:mr-5 xl:mr-6 bg-black/40 hover:bg-mainAccent"
      />
    </Carousel>
  );
}
