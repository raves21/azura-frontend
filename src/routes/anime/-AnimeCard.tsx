import { Anime } from "../../utils/types/anime_anilist";
import { Link } from "@tanstack/react-router";

type AnimeCardProps = {
  anime: Anime;
};

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link
      to="/anime/info/$animeId"
      className="space-y-2 group"
      params={{
        animeId: anime.id,
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden text-white bg-gray-600 rounded-xl">
        {anime.image && (
          <>
            <div className="absolute z-10 grid transition-all opacity-0 place-items-center size-full bg-mainAccent/40 group-hover:opacity-100">
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
            {/* <div className="absolute z-10 transition-all opacity-0 size-full bg-gradient-to-t from-mainAccent/50 to-transparent from-[percentage:0%_1%] group-hover:opacity-100"></div> */}
            <img
              loading="lazy"
              src={anime.image}
              className="object-cover transition-all size-full group-hover:scale-105"
              alt={anime.title.english}
            />
          </>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-white line-clamp-1">
          {anime.title.english}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <p>{anime.releaseDate}</p>
          <div className="bg-gray-400 rounded-full size-1"></div>
          <p>{anime.totalEpisodes} episodes</p>
        </div>
      </div>
    </Link>
  );
}
