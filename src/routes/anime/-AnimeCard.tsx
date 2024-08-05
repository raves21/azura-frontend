import { Anime, Status } from "../../utils/types/animeAnilist";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type AnimeCardProps = {
  anime: Anime;
  className?: string;
};

export default function AnimeCard({ anime, className }: AnimeCardProps) {
  return (
    <Link
      to="/anime/$animeId"
      className="space-y-2 group"
      params={{
        animeId: anime.id,
      }}
      state={{
        animeInfoPageNavigationState: {
          id: anime.id,
          image: anime.image,
          cover: anime.cover,
          genres: anime.genres,
          description: anime.description,
          type: anime.type,
        },
      }}
    >
      <div
        className={cn(
          "relative aspect-[3/4] overflow-hidden bg-gray-600 rounded-md lg:rounded-xl",
          className
        )}
      >
        {anime.image && (
          <>
            <div className="absolute z-10 hidden transition-all opacity-0 lg:grid place-items-center size-full bg-mainAccent/40 group-hover:opacity-100">
              <div className="grid bg-white rounded-full size-12 place-items-center">
                <svg
                  className="size-[50%]"
                  fill="#c026d3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
              </div>
            </div>
            <img
              loading="lazy"
              src={anime.image}
              className="object-cover transition-all size-full group-hover:scale-105"
              alt={anime.title.english}
            />
          </>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-[#E0E0E0] line-clamp-2">
          {anime.title.english ?? anime.title.romaji}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {anime.status === Status.NotYetAired ? (
            <p className="line-clamp-1">Not yet aired</p>
          ) : (
            <>
              <p>{anime.releaseDate}</p>
              <div className="bg-gray-400 rounded-full size-1"></div>
              {anime.type === "MOVIE" ? (
                <p className="line-clamp-1">MOVIE</p>
              ) : (
                <>
                  <p className="line-clamp-1 lg:hidden">
                    {anime.totalEpisodes}{" "}
                    {anime.totalEpisodes === 1 ? "ep" : "eps"}
                  </p>
                  <p className="hidden line-clamp-1 lg:block">
                    {anime.totalEpisodes}{" "}
                    {anime.totalEpisodes === 1 ? "episode" : "episodes"}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
