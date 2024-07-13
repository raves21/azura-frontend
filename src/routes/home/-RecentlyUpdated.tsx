import { ChevronRight } from "lucide-react";
import { AniwatchAnime } from "../../utils/types/anime_aniwatch";
import AnimeCard from "./-AnimeCard";

type RecentlyUpdatedAnimesProps = {
  animeList: AniwatchAnime[];
};

export default function RecentlyUpdatedAnimes({ animeList }: RecentlyUpdatedAnimesProps) {
  return (
    <div className="px-24 pt-5 space-y-6 text-gray-400 min-h-dvh">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold">Recently Updated</p>
        <button className="flex items-center gap-3 py-2 pl-4 pr-3 border border-gray-400 rounded-full">
          <p>See All</p>
          <ChevronRight className="size-6" />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-x-4 gap-y-6">
        {animeList.map((anime, i) => {
          return <AnimeCard key={i} aniwatchAnime={anime} />;
            // return <div className="bg-purple-500 size-20"></div>
        })}
      </div>
    </div>
  );
}
