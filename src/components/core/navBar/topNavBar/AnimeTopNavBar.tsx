import { useMatchRoute } from "@tanstack/react-router";
import AnimeSearchDialog from "../../media/anime/search/AnimeSearchDialog";
import SocialSearchDialog from "../../social/searchDialog/SocialSearchDialog";
import { ReactNode } from "react";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import MobileTopNavBar from "./shared/MobileTopNavBar";
import DesktopTopNavBar from "./shared/DesktopTopNavBar";

export default function AnimeTopNavBar() {
  const { isDesktopSmallUp } = useWindowBreakpoints();
  const matchRoute = useMatchRoute();
  const isAnimeRoute = matchRoute({ to: "/anime", fuzzy: true });
  const isAnimeCatalogRoute = matchRoute({ to: "/anime/catalog", fuzzy: true });

  let searchDialogComponent: ReactNode;

  if (isAnimeRoute) {
    searchDialogComponent = <AnimeSearchDialog />;
  } else {
    searchDialogComponent = <SocialSearchDialog />;
  }

  return (
    <header className="font-montserrat">
      {isDesktopSmallUp ? (
        <DesktopTopNavBar
          type="ANIME"
          isAnimeCatalogRoute={!!isAnimeCatalogRoute}
          isAnimeRoute={!!isAnimeRoute}
          searchDialogComponent={searchDialogComponent}
        />
      ) : (
        <MobileTopNavBar searchDialogComponent={searchDialogComponent} />
      )}
    </header>
  );
}
