import SocialSearchDialog from "../../social/searchDialog/SocialSearchDialog";
import { ReactNode } from "react";
import MovieSearchDialog from "../../media/movie/search/MovieSearchDialog";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import MovieTopNavBarDesktop from "./MovieTopNavBarDesktop";
import MovieTopNavBarMobile from "./MovieTopNavBarMobile";
import { useMatchRoute } from "@tanstack/react-router";

export default function MovieTopNavBar() {
  const { isDesktopSmallUp } = useWindowBreakpoints();
  const matchRoute = useMatchRoute();
  const isMovieRoute = matchRoute({ to: "/movie", fuzzy: true });
  const isMovieCatalogRoute = matchRoute({ to: "/movie/catalog", fuzzy: true });
  const isSocialRoute = matchRoute({ to: "/social", fuzzy: true });

  let searchDialogComponent: ReactNode;

  if (isMovieRoute) {
    searchDialogComponent = <MovieSearchDialog />;
  } else {
    searchDialogComponent = <SocialSearchDialog />;
  }

  return (
    <header className="font-montserrat">
      {isDesktopSmallUp ? (
        <MovieTopNavBarDesktop
          isMovieCatalogRoute={!!isMovieCatalogRoute}
          isMovieRoute={!!isMovieRoute}
          isSocialRoute={!!isSocialRoute}
          searchDialogComponent={searchDialogComponent}
        />
      ) : (
        <MovieTopNavBarMobile
          isMovieCatalogRoute={!!isMovieCatalogRoute}
          isMovieRoute={!!isMovieRoute}
          isSocialRoute={!!isSocialRoute}
          searchDialogComponent={searchDialogComponent}
        />
      )}
    </header>
  );
}
