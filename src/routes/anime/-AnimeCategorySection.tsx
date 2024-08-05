import { ChevronRight } from "lucide-react";
import { Anime } from "../../utils/types/animeAnilist";
import AnimeCard from "./-AnimeCard";
import { Link } from "@tanstack/react-router";

type AnimeCategorySectionProps = {
  animeList: Anime[];
  categoryName: string
};

export default function AnimeCategorySection({ animeList, categoryName }: AnimeCategorySectionProps) {

    return (
    <div className="w-full px-24 pt-5 space-y-6 text-gray-400">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold">{categoryName}</p>
        <Link className="flex items-center gap-3 py-2 pl-4 pr-3 transition-all duration-300 border border-gray-400 rounded-full group hover:border-mainAccent">
          <p className="transition-all duration-300 group-hover:text-mainAccent">See All</p>
          <ChevronRight className="size-6"/>
        </Link>
      </div>
      <div className="grid grid-cols-6 gap-x-4 gap-y-6">
        {animeList.map((anime, i) => {
          return <AnimeCard key={i} anime={anime} />;
        })}
      </div>
    </div>
  );
}
