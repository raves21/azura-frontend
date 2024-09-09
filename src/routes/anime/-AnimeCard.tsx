import { Anime, Recommendation, Status } from "../../utils/types/animeAnilist";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type HomePageProps = {
  isHomePage: true;
  anime: Anime;
};

type NotHomePageProps = {
  isHomePage: false;
  recommendation: Recommendation;
};

type AnimeCardProps = {
  className?: string;
} & (HomePageProps | NotHomePageProps);

export default function AnimeCard(props: AnimeCardProps) {
  if (props.isHomePage) {
    return (
      <Link to={`/anime/${props.anime.id}`} className="space-y-2 group">
        <div
          className={cn(
            "relative aspect-[3/4] overflow-hidden bg-gray-600 rounded-md lg:rounded-xl",
            props.className
          )}
        >
          {props.anime.image && (
            <>
              {/* <div className="absolute z-10 hidden transition-all duration-300 opacity-0 lg:grid place-items-center size-full bg-mainAccent/40 group-hover:opacity-100">
                <div className="grid bg-white rounded-full size-12 place-items-center">
                  <svg
                    className="size-[50%] fill-mainAccent"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                  </svg>
                </div>
              </div> */}
              <div className="absolute inset-0 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 size-full bg-mainAccent/40"></div>
              <img
                loading="lazy"
                src={props.anime.image}
                className="object-cover transition-all duration-300 size-full group-hover:scale-105"
                alt={props.anime.title.english}
              />
            </>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs mobile-l:text-sm font-medium text-[#E0E0E0] line-clamp-2">
            {props.anime.title.english ?? props.anime.title.romaji}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {[Status.NotYetAired, Status.NOT_YET_RELEASED].includes(
              props.anime.status
            ) ? (
              <p className="line-clamp-1">Not yet aired</p>
            ) : [Status.CANCELLED, Status.Cancelled].includes(
                props.anime.status
              ) ? (
              <p className="line-clamp-1">Cancelled</p>
            ) : (
              <>
                {props.anime.type && <p>{props.anime.type}</p>}
                {props.anime.releaseDate && props.anime.type && (
                  <div className="bg-gray-400 rounded-full size-1"></div>
                )}
                {props.anime.releaseDate && <p>{props.anime.releaseDate}</p>}
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }
  if (props.recommendation.id) {
    return (
      <Link
        to={`/anime/${props.recommendation.id.toString()}`}
        className="space-y-2 group"
      >
        <div
          className={cn(
            "relative aspect-[3/4] overflow-hidden bg-gray-600 rounded-md lg:rounded-xl",
            props.className
          )}
        >
          {props.recommendation.image && (
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
                src={props.recommendation.image}
                className="object-cover transition-all size-full group-hover:scale-105"
                alt={props.recommendation.title.english}
              />
            </>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-[#E0E0E0] line-clamp-2">
            {props.recommendation.title.english ??
              props.recommendation.title.romaji}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {props.recommendation.status === Status.NotYetAired ||
            props.recommendation.status === Status.NOT_YET_RELEASED ? (
              <p className="line-clamp-1">Not yet aired</p>
            ) : (
              <>
                <p>{props.recommendation.type}</p>
                <div className="bg-gray-400 rounded-full size-1"></div>
                {props.recommendation.type === "MOVIE" ? (
                  <p className="line-clamp-1">MOVIE</p>
                ) : (
                  <>
                    <p className="line-clamp-1 lg:hidden">
                      {props.recommendation.episodes}{" "}
                      {props.recommendation.episodes === 1 ? "ep" : "eps"}
                    </p>
                    <p className="hidden line-clamp-1 lg:block">
                      {props.recommendation.episodes}{" "}
                      {props.recommendation.episodes === 1
                        ? "episode"
                        : "episodes"}
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
  return (
    <div className="space-y-2">
      <div className="bg-gray-600 aspect-[3/4] rounded-md lg:rounded-xl text-center grid place-items-center text-sm">
        Cannot be loaded.
      </div>
      <p>NO DATA</p>
    </div>
  );
}
