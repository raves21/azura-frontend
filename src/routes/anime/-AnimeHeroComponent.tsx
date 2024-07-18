import { Anime, AnimeInfo } from "@/utils/types/animeAnilist";
import { Play } from "lucide-react";
import { Link } from "@tanstack/react-router";

type AnimeHeroComponentProps = {
  anime?: Anime;
  animeInfo?: AnimeInfo;
  index?: number;
};

export default function AnimeHeroComponent({
  anime,
  animeInfo,
  index,
}: AnimeHeroComponentProps) {
  if (anime && index) {
    return (
      <div className="relative flex items-center gap-16 pt-12 h-[80dvh] w-screen pl-24">
        <div className="absolute inset-0 size-full z-[-1]">
          <div className="absolute z-10 bg-black/60 size-full backdrop-blur-sm"></div>
          {/* <div className="absolute z-10 bg-gradient-to-b from-darkBg via-transparent to-transparent size-full"></div> */}
          <div className="absolute z-10 bg-gradient-to-t from-darkBg from-[percentage:0%_1%] via-transparent to-transparent size-full"></div>
          <img
            src={anime.cover ?? anime.image}
            className="object-cover size-full"
          />
        </div>
        <div className="aspect-[3/4] h-[350px] rounded-xl overflow-hidden">
          <img src={anime.image} className="object-cover"></img>
        </div>
        <div className="flex flex-col justify-center gap-10">
          <div className="w-[50vw] flex flex-col">
            {index && (
              <p>
                <span className="text-xl font-bold text-mainAccent">
                  #{index}
                </span>{" "}
                in trending
              </p>
            )}
            <p className="mt-2 text-4xl font-bold">{anime.title.english}</p>
            <p className="mt-4 line-clamp-4">
              {anime.description.replace(/<[^>]*>/g, "")}
            </p>
          </div>
          <div className="flex gap-12">
            <Link
              to="/anime/info/$animeId"
              params={{ animeId: anime.id }}
              className="flex items-center gap-2 px-5 py-2 text-white rounded-full bg-mainAccent"
            >
              <Play size={20} />
              <p className="font-medium">Watch Now</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (animeInfo) {
    return (
      <div
        className={`relative flex items-center gap-16 pt-12 h-[80dvh] w-screen pl-24`}
      >
        <div className="absolute inset-0 size-full">
          <div className="absolute z-10 bg-black/60 size-full backdrop-blur-sm"></div>
          {/* <div className="absolute z-10 bg-gradient-to-b from-darkBg via-transparent to-transparent size-full"></div> */}
          <div className="absolute z-10 bg-gradient-to-t from-darkBg from-[percentage:0%_1%] via-transparent to-transparent size-full"></div>
          <img
            src={animeInfo.cover ?? animeInfo.image}
            className="object-cover size-full"
          />
        </div>
        <div className="aspect-[3/4] h-[350px] rounded-xl overflow-hidden z-10">
          <img src={animeInfo.image} className="object-cover"></img>
        </div>
        <div className="z-10 flex flex-col justify-center gap-10">
          <div className="w-[50vw] flex flex-col">
            <p className="mt-2 text-4xl font-bold">{animeInfo.title.english}</p>
            <p className="mt-4 line-clamp-4">
              {animeInfo.description.replace(/<[^>]*>/g, "")}
            </p>
          </div>
          <div className="flex gap-12">
            <button className="flex items-center gap-2 px-5 py-2 text-white rounded-full bg-mainAccent">
              <Play size={20} />
              <p className="font-medium">Start Watching</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
