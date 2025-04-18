import { useMatchRoute } from "@tanstack/react-router";
import AnimeSearchDialog from "../../../media/anime/search/AnimeSearchDialog";
import SocialSearchDialog from "../../../social/searchDialog/SocialSearchDialog";
import { ReactNode } from "react";
import AnimeTopNavBarDesktop from "./AnimeTopNavBarDesktop";
import AnimeTopNavBarMobile from "./AnimeTopNavBarMobile";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";

export default function AnimeTopNavBar() {
  const { isDesktopSmallUp } = useWindowBreakpoints();
  const matchRoute = useMatchRoute();
  const isAnimeRoute = matchRoute({ to: "/anime", fuzzy: true });
  const isAnimeCatalogRoute = matchRoute({ to: "/anime/catalog", fuzzy: true });
  const isSocialRoute = matchRoute({ to: "/social", fuzzy: true });

  let searchDialogComponent: ReactNode;

  if (isAnimeRoute) {
    searchDialogComponent = <AnimeSearchDialog />;
  } else {
    searchDialogComponent = <SocialSearchDialog />;
  }

  return (
    <header className="font-montserrat">
      {isDesktopSmallUp ? (
        <AnimeTopNavBarDesktop
          isAnimeCatalogRoute={!!isAnimeCatalogRoute}
          isAnimeRoute={!!isAnimeRoute}
          isSocialRoute={!!isSocialRoute}
          searchDialogComponent={searchDialogComponent}
        />
      ) : (
        <AnimeTopNavBarMobile
          isAnimeCatalogRoute={!!isAnimeCatalogRoute}
          isAnimeRoute={!!isAnimeRoute}
          isSocialRoute={!!isSocialRoute}
          searchDialogComponent={searchDialogComponent}
        />
      )}
    </header>
  );
}
