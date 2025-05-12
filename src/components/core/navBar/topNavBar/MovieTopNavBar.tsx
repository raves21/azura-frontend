import SocialSearchDialog from "../../social/searchDialog/SocialSearchDialog";
import { ReactNode } from "react";
import MovieSearchDialog from "../../media/movie/search/MovieSearchDialog";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useMatchRoute } from "@tanstack/react-router";
import MobileTopNavBar from "./shared/MobileTopNavBar";
import DesktopTopNavBar from "./shared/DesktopTopNavBar";

export default function MovieTopNavBar() {
  const { isDesktopSmallUp } = useWindowBreakpoints();
  const matchRoute = useMatchRoute();
  const isMovieRoute = matchRoute({ to: "/movie", fuzzy: true });
  const isMovieCatalogRoute = matchRoute({ to: "/movie/catalog", fuzzy: true });

  let searchDialogComponent: ReactNode;

  if (isMovieRoute) {
    searchDialogComponent = <MovieSearchDialog />;
  } else {
    searchDialogComponent = <SocialSearchDialog />;
  }

  return (
    <header className="font-montserrat">
      {isDesktopSmallUp ? (
        <DesktopTopNavBar
          type="MOVIE"
          isMovieCatalogRoute={!!isMovieCatalogRoute}
          isMovieRoute={!!isMovieRoute}
          searchDialogComponent={searchDialogComponent}
        />
      ) : (
        <MobileTopNavBar searchDialogComponent={searchDialogComponent} />
      )}
    </header>
  );
}
