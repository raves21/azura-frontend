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
    console.log("ANILIST");
    return (
      <Link className="space-y-2 group">
        <div className="relative aspect-[3/4] bg-gray-600 rounded-xl text-white overflow-hidden">
          {anilistAnime.image && (
            <>
              {/* <div className="absolute z-10 transition-all opacity-0 size-full bg-darkBg/20 group-hover:opacity-100"></div> */}
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
          <p className="font-medium text-white line-clamp-1">
            {anilistAnime.title.romaji}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
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
        <div className="relative aspect-[3/4] bg-gray-600 rounded-xl text-white overflow-hidden">
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
