import { Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/anime-carousel";
import { AnilistAnime } from "../../utils/types/anime_anilist";

type TrendingAnimeCarouselProps = {
  animeList: AnilistAnime[];
};

export default function TrendingAnimesHeroCarousel({
  animeList,
}: TrendingAnimeCarouselProps) {
  return (
    <Carousel className="relative">
      <CarouselContent className="h-[80dvh] ">
        {animeList.map((anime, i) => {
          return (
            <CarouselItem
              key={i}
              className="relative flex items-center gap-16 pt-12 pl-24"
            >
              <div className="absolute top-0 left-0 size-full z-[-1]">
                <div className="absolute z-10 bg-black/60 size-full"></div>
                {/* <div className="absolute z-10 bg-gradient-to-b from-darkBg via-transparent to-transparent size-full"></div> */}
                <div className="absolute z-10 bg-gradient-to-t from-darkBg from-[percentage:0%_1%] via-transparent to-transparent size-full"></div>
                <img
                  src={anime.cover}
                  className="object-cover size-full blur-sm"
                />
              </div>
              <div className="aspect-[3/4] h-[350px] rounded-xl overflow-hidden">
                <img src={anime.image} className="object-cover"></img>
              </div>
              <div className="flex flex-col justify-center gap-10">
                <div className="w-[50vw] flex flex-col gap-4">
                  <p className="text-4xl font-bold">{anime.title.romaji}</p>
                  <p className="line-clamp-4">
                    {anime.description.replace(/<[^>]*>/g, "")}
                  </p>
                </div>
                <div className="flex gap-12">
                  <button className="flex items-center gap-2 px-5 py-2 text-white rounded-full bg-fuchsia-600">
                    <Play size={20} />
                    <p>Watch Now</p>
                  </button>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 ml-3 border-none bg-black/40 hover:bg-fuchsia-600" />
      <CarouselNext className="absolute right-0 mr-3 border-none bg-black/40 hover:bg-fuchsia-600" />
    </Carousel>
  );
}
