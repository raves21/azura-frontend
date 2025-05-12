import SocialSearchDialog from "../../social/searchDialog/SocialSearchDialog";
import { ReactNode } from "react";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useMatchRoute } from "@tanstack/react-router";
import TVSearchDialog from "../../media/tv/search/TVSearchDialog";
import MobileTopNavBar from "./shared/MobileTopNavBar";
import DesktopTopNavBar from "./shared/DesktopTopNavBar";

export default function TVTopNavBar() {
  const { isDesktopSmallUp } = useWindowBreakpoints();
  const matchRoute = useMatchRoute();
  const isTVRoute = matchRoute({ to: "/tv", fuzzy: true });
  const isTVCatalogRoute = matchRoute({ to: "/tv/catalog", fuzzy: true });

  let searchDialogComponent: ReactNode;

  if (isTVRoute) {
    searchDialogComponent = <TVSearchDialog />;
  } else {
    searchDialogComponent = <SocialSearchDialog />;
  }

  return (
    <header className="font-montserrat">
      {isDesktopSmallUp ? (
        <DesktopTopNavBar
          type="TV"
          isTVCatalogRoute={!!isTVCatalogRoute}
          isTVRoute={!!isTVRoute}
          searchDialogComponent={searchDialogComponent}
        />
      ) : (
        <MobileTopNavBar searchDialogComponent={searchDialogComponent} />
      )}
    </header>
  );
}
