import { AnilistAnime } from "../../utils/types/anime_anilist";
import { AniwatchAnime } from "../../utils/types/anime_aniwatch";
import { Link } from "@tanstack/react-router";

type AnimeCardProps = {
  anilistAnime?: AnilistAnime;
  aniwatchAnime?: AniwatchAnime;
};

export default function AnimeCard({
  anilistAnime,
  aniwatchAnime,
}: AnimeCardProps) {
  if (anilistAnime) {
    return (
      <Link className="space-y-2 group">
        <div className="relative aspect-[3/4] overflow-hidden text-white bg-gray-600 rounded-xl">
          {anilistAnime.image && (
            <>
              <div className="absolute z-10 grid transition-all opacity-0 place-items-center size-full bg-mainAccent/40 group-hover:opacity-100">
                <div className="grid bg-white rounded-full size-12 place-items-center">
                  <svg className="size-[50%]" fill="#c026d3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                </div>
              </div>
              {/* <div className="absolute z-10 transition-all opacity-0 size-full bg-gradient-to-t from-mainAccent/50 to-transparent from-[percentage:0%_1%] group-hover:opacity-100"></div> */}
              <img
                loading="lazy"
                src={anilistAnime.image}
                className="object-cover transition-all size-full group-hover:scale-105"
                alt={anilistAnime.title.english}
              />
            </>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-white line-clamp-1">
            {anilistAnime.title.english}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <p>{anilistAnime.releaseDate}</p>
            <div className="bg-gray-400 rounded-full size-1"></div>
            <p>{anilistAnime.totalEpisodes} episodes</p>
          </div>
        </div>
      </Link>
    );
  } else if (aniwatchAnime) {
    return (
      <Link className="space-y-2 group">
        <div className="relative overflow-hidden text-white bg-gray-600 rounded-xl">
          {aniwatchAnime.poster && (
            <>
              {/* <div className="absolute z-10 transition-all opacity-0 size-full bg-darkBg/20 group-hover:opacity-100"></div> */}
              <img
                loading="lazy"
                src={aniwatchAnime.poster}
                className="object-cover transition-all size-full group-hover:scale-105"
                alt={aniwatchAnime.name}
              />
            </>
          )}
        </div>
        <div>
          <p className="font-medium text-white line-clamp-1">
            {aniwatchAnime.name}
          </p>
          {/* <div className="flex items-center gap-2 text-sm text-gray-400">
            <p>&nbsp;</p>
            <div className="bg-gray-400 rounded-full size-1"></div>
            <p>&nbsp;</p>
          </div> */}
        </div>
      </Link>
    );
  }
}
