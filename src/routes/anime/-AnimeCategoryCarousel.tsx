import { ChevronRight } from "lucide-react";
import { Anime } from "@/utils/types/animeAnilist";
import { Link } from "@tanstack/react-router";
import AnimeCard from "./-AnimeCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/custom-carousel";

type AnimeCategoryCarouselProps = {
  animeList: Anime[];
  categoryName: string;
};

export default function AnimeCategoryCarousel({
  animeList,
  categoryName,
}: AnimeCategoryCarouselProps) {

  return (
    <div className="w-full px-3 pt-5 space-y-6 text-gray-400 lg:px-24 sm:px-6">
      <div className="flex justify-between w-full">
        <p className="text-lg font-semibold sm:text-xl lg:text-2xl">{categoryName}</p>
        <Link className="flex items-center gap-1 px-2 py-1 transition-all duration-300 border border-gray-400 rounded-full sm:px-3 sm:py-2 lg:px-4 group hover:border-mainAccent">
          <p className="text-xs transition-all duration-300 md:text-base group-hover:text-mainAccent whitespace-nowrap">
            See All
          </p>
          <ChevronRight className="transition-colors duration-300 size-4 md:size-5 lg:size-6 group-hover:stroke-mainAccent" />
        </Link>
      </div>

      <Carousel opts={{
        slidesToScroll: 3,
        dragFree: true
      }} className="w-full">
        <CarouselContent className="">
          {animeList.map((anime) => {
            return (
              <CarouselItem key={anime.id} className="basis-1/3 mobile-m:basis-[30%] 570:basis-1/4 sm:basis-1/5 xl:basis-1/6">
                <AnimeCard key={anime.id} anime={anime} className="min-h-fit max-h-[250px]"/>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious carouselType="category-carousel" className="absolute left-0 border-none bg-gradient-to-r from-darkBg from-10% via-darkBg/80 via-50% to-transparent" />
        <CarouselNext carouselType="category-carousel" className="absolute right-0 border-none bg-gradient-to-l from-darkBg from-10% via-darkBg/80 via-50% to-transparent" />
      </Carousel>
    </div>
  );
}
