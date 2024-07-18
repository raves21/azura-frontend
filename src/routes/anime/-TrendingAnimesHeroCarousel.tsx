import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/anime-carousel";
import { Anime } from "../../utils/types/animeAnilist";
import AnimeHeroComponent from "./-AnimeHeroComponent";

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
            <CarouselItem key={i}>
              <AnimeHeroComponent
                fromCarousel={true}
                image={anime.image}
                cover={anime.cover}
                description={anime.description}
                title={anime.title.english}
                id={anime.id}
                trendingRank={i + 1}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 ml-3 border-none bg-black/40 hover:bg-mainAccent" />
      <CarouselNext className="absolute right-0 mr-3 border-none bg-black/40 hover:bg-mainAccent" />
    </Carousel>
  );
}
