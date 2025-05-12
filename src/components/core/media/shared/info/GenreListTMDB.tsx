import { cn } from "@/lib/utils";
import { TMDBGenre } from "@/utils/types/media/shared";
import { Link, LinkProps, useMatchRoute } from "@tanstack/react-router";

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
  genres: TMDBGenre[];
} & (InfoPageProps | WatchPageProps);

export default function GenreListTMDB({ genres, ...props }: Props) {
  const matchRoute = useMatchRoute();
  const isMovieRoute = matchRoute({ to: "/movie", fuzzy: true });

  function getGenreLinkProps(genreId: number): LinkProps {
    if (isMovieRoute) {
      return {
        to: "/movie/catalog",
        search: {
          genres: [genreId],
        },
      };
    }
    return {
      to: "/tv/catalog",
      search: {
        genres: [genreId],
      },
    };
  }

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
          {genres.length !== 0
            ? genres.map((genre, i) => (
                <Link
                  {...getGenreLinkProps(genre.id)}
                  key={i}
                  className="hover:text-mainAccent"
                >
                  {i === genres.length - 1 ? `${genre.name}` : `${genre.name},`}
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
        {genres.length !== 0 &&
          genres.map((genre) => (
            <Link
              {...getGenreLinkProps(genre.id)}
              key={genre.id}
              className="px-3 py-2 transition-colors border rounded-full border-mainAccent/75 hover:text-mainAccent/75"
            >
              {genre.name}
            </Link>
          ))}
      </ul>
    );
  }
}
