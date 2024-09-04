import { Anime } from "@/utils/types/animeAnilist";
import AnimeCard from "../-AnimeCard";

type FilterAnimeListProps = {
  animeList: Anime[];
};

export default function FilteredAnimes({ animeList }: FilterAnimeListProps) {
  return (
    <div className="grid w-full grid-cols-6 gap-x-5 gap-y-6">
      {animeList.map((anime, i) => (
        <AnimeCard key={anime.id ?? i} anime={anime} isHomePage />
      ))}
    </div>
  );
}
