import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { getAnimeRating } from "@/services/media/sharedFunctions";
import { Anime, AnimeStatus } from "@/utils/types/media/anime/animeAnilist";
import { animeStatusLabels } from "@/utils/variables/media/anime";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

type AnimeSearchDialogResultCardProps = {
  anime: Anime;
};

export default function AnimeSearchDialogResultCard({
  anime,
}: AnimeSearchDialogResultCardProps) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  return (
    <Link
      to={`/anime/${anime.id}`}
      onClick={() => toggleOpenDialog(null)}
      className="flex w-full gap-4 px-3 py-2 hover:bg-gray-900/70"
    >
      <div className="aspect-[3/4] h-min w-[90px] bg-gray-600 rounded-md">
        <img
          src={anime.image}
          alt={anime.title.english ?? anime.title.romaji}
          className="object-cover rounded-md size-full"
        />
      </div>
      <div className="flex flex-col justify-center w-full gap-3">
        <p className="text-lg font-semibold line-clamp-1">
          {anime.title.english ?? anime.title.romaji}
        </p>
        <div className="w-full space-y-3 text-sm text-gray-400">
          <div className="flex items-center gap-[6px]">
            {![
              AnimeStatus.CANCELLED,
              AnimeStatus.NOT_YET_RELEASED,
              AnimeStatus.NotYetAired,
            ].includes(anime.status) && (
              <>
                <p>
                  {anime.totalEpisodes}&nbsp;
                  {anime.totalEpisodes > 1 ? "episodes" : "episode"}
                </p>
                <div className="bg-gray-400 rounded-full size-1" />
              </>
            )}
            <p>{animeStatusLabels[anime.status]}</p>
          </div>
          {![
            AnimeStatus.CANCELLED,
            AnimeStatus.NOT_YET_RELEASED,
            AnimeStatus.NotYetAired,
          ].includes(anime.status) && (
            <div className="flex items-center gap-[6px]">
              {anime.releaseDate && (
                <>
                  <p>{anime.releaseDate}</p>
                  <div className="bg-gray-400 rounded-full size-1" />
                </>
              )}
              <p>{anime.type}</p>
              <div className="bg-gray-400 rounded-full size-1" />

              <div className="flex items-center gap-1">
                <Star className="size-4" />
                <p>{getAnimeRating(anime.rating)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
