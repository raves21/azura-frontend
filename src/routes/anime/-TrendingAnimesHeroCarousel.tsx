import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/anime-carousel";
import { Anime } from "../../utils/types/animeAnilist";
import TrendingCarouselItem from "./-TrendingCarouselItem";

type TrendingAnimeCarouselProps = {
  animeList: Anime[];
};

export default function TrendingAnimesHeroCarousel({
  animeList,
}: TrendingAnimeCarouselProps) {
  return (
    <Carousel>
      <CarouselContent>
        {animeList.map((anime, i) => {
          return (
            <CarouselItem key={i} className="relative w-full">
              <TrendingCarouselItem
                genres={anime.genres}
                image={anime.image}
                cover={anime.cover}
                description={anime.description}
                title={anime.title.english}
                id={anime.id}
                trendingRank={i + 1}
                type={anime.type}
              />
              <div className="absolute inset-0 w-dvw left-1/2 ml-[-50vw]">
                <div className="absolute bg-black/60 size-full backdrop-blur-sm"></div>
                <div className="absolute bg-gradient-to-t from-darkBg from-[percentage:0%_1%] via-transparent to-transparent size-full"></div>
                <img
                  src={anime.cover ?? anime.image}
                  className="object-cover size-full"
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 ml-5 border-none bg-black/40 hover:bg-mainAccent" />
      <CarouselNext className="absolute right-0 mr-5 border-none bg-black/40 hover:bg-mainAccent" />
    </Carousel>
  );
}
