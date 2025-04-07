import { cn } from "@/lib/utils";
import { AnimeGenre } from "@/utils/types/media/anime/animeAnilist";
import { Link } from "@tanstack/react-router";

type InfoPageProps = {
  variant: "infoPage";
  className?: string;
  genreListContainerClassName?: string;
};

type WatchPageProps = {
  variant: "watchPage";
  className?: string;
  isMobile: boolean;
};

type Props = {
  genres: AnimeGenre[] | undefined;
} & (InfoPageProps | WatchPageProps);

export default function GenreListAnime({ genres, ...props }: Props) {
  if (props.variant === "infoPage") {
    return (
      <div className={cn("flex gap-2", props.className)}>
        <p className="text-gray-400">Genres:</p>
        <ul
          className={cn(
            "flex flex-wrap gap-1",
            props.genreListContainerClassName
          )}
        >
          {genres
            ? genres.map((genre, i) => (
                <Link
                  to="/anime/catalog"
                  search={{
                    genres: [genre],
                  }}
                  key={i}
                  className="hover:text-mainAccent"
                >
                  {i === genres.length - 1 ? `${genre}` : `${genre},`}
                </Link>
              ))
            : "N/A"}
        </ul>
      </div>
    );
  } else {
    return (
      <ul
        className={cn(
          "flex-wrap gap-2 text-xs mobile-m:gap-3 sm:text-sm",
          { "flex lg:hidden": props.isMobile },
          { "lg:flex hidden": !props.isMobile },
          props.className
        )}
      >
        {genres &&
          genres.map((genre) => (
            <Link
              to="/anime/catalog"
              search={{
                genres: [genre],
              }}
              key={genre}
              className="px-3 py-2 transition-colors border rounded-full border-mainAccent/75 hover:text-mainAccent/75"
            >
              {genre}
            </Link>
          ))}
      </ul>
    );
  }
}
