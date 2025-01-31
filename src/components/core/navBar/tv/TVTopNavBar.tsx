import SocialSearchDialog from "../../social/searchDialog/SocialSearchDialog";
import { ReactNode } from "react";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import TVTopNavBarDesktop from "./TVTopNavBarDesktop";
import TVTopNavBarMobile from "./TVTopNavBarMobile";
import { useMatchRoute } from "@tanstack/react-router";
import TVSearchDialog from "../../media/tv/search/TVSearchDialog";

export default function TVTopNavBar() {
  const { isDesktopSmall } = useWindowBreakpoints();
  const matchRoute = useMatchRoute();
  const isTVRoute = matchRoute({ to: "/tv", fuzzy: true });
  const isTVCatalogRoute = matchRoute({ to: "/tv/catalog", fuzzy: true });
  const isSocialRoute = matchRoute({ to: "/social", fuzzy: true });

  let searchDialogComponent: ReactNode;

  if (isTVRoute) {
    searchDialogComponent = <TVSearchDialog />;
  } else {
    searchDialogComponent = <SocialSearchDialog />;
  }

  return (
    <header className="font-montserrat">
      {isDesktopSmall ? (
        <TVTopNavBarDesktop
          isTVCatalogRoute={!!isTVCatalogRoute}
          isTVRoute={!!isTVRoute}
          isSocialRoute={!!isSocialRoute}
          searchDialogComponent={searchDialogComponent}
        />
      ) : (
        <TVTopNavBarMobile
          isMovieCatalogRoute={!!isTVCatalogRoute}
          isMovieRoute={!!isTVRoute}
          isSocialRoute={!!isSocialRoute}
          searchDialogComponent={searchDialogComponent}
        />
      )}
    </header>
  );
}
