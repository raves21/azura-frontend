import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { ReactNode } from "react";
import { useScrolledState } from "@/utils/hooks/useScrolledState";
import AzuraLogo from "@/components/core/shared/AzuraLogo";
import { useMediaPortalStore } from "@/utils/stores/useMediaPortal";
import { toggleMediaPortal } from "@/services/media/sharedFunctions";
import SideMenuSheet from "@/components/core/sideMenuSheet/SideMenuSheet";

type MovieProps = {
  type: "MOVIE";
  isMovieRoute: boolean;
  isMovieCatalogRoute: boolean;
};

type AnimeProps = {
  type: "ANIME";
  isAnimeRoute: boolean;
  isAnimeCatalogRoute: boolean;
};
type TVProps = {
  type: "TV";
  isTVRoute: boolean;
  isTVCatalogRoute: boolean;
};

type Props = {
  searchDialogComponent: ReactNode;
} & (MovieProps | AnimeProps | TVProps);

export default function DesktopTopNavBar({
  searchDialogComponent,
  ...props
}: Props) {
  const [toggleOpenSheet, toggleOpenDialog] = useGlobalStore((state) => [
    state.toggleOpenSheet,
    state.toggleOpenDialog,
  ]);
  const { isScrolledDown } = useScrolledState();

  const isMediaPortalOpen = useMediaPortalStore(
    (state) => state.isMediaPortalOpen
  );

  const matchRoute = useMatchRoute();
  const isAccountRoute = matchRoute({ to: "/account", fuzzy: true });
  const isSocialRoute = matchRoute({ to: "/social", fuzzy: true });

  let mediaRouteComponent: ReactNode;
  let mediaCatalogRouteComponent: ReactNode;

  switch (props.type) {
    case "ANIME":
      mediaRouteComponent = (
        <Link
          to="/anime"
          className={cn(
            "p-[6px]",
            {
              "text-mainWhite": props.isAnimeRoute,
            },
            { "text-gray-300": props.isAnimeCatalogRoute }
          )}
        >
          Anime
        </Link>
      );
      mediaCatalogRouteComponent = (
        <Link
          to="/anime/catalog"
          className={cn("p-[6px]", {
            "text-mainWhite": props.isAnimeCatalogRoute,
          })}
        >
          Catalog
        </Link>
      );
      break;
    case "MOVIE":
      mediaRouteComponent = (
        <Link
          to="/movie"
          className={cn(
            "p-[6px]",
            {
              "text-mainWhite": props.isMovieRoute,
            },
            { "text-gray-300": props.isMovieCatalogRoute }
          )}
        >
          Movie
        </Link>
      );
      mediaCatalogRouteComponent = (
        <Link
          to="/movie/catalog"
          className={cn("p-[6px]", {
            "text-mainWhite": props.isMovieCatalogRoute,
          })}
        >
          Catalog
        </Link>
      );
      break;
    case "TV":
      mediaRouteComponent = (
        <Link
          to="/tv"
          className={cn(
            "p-[6px]",
            {
              "text-mainWhite": props.isTVRoute,
            },
            { "text-gray-300": props.isTVCatalogRoute }
          )}
        >
          TV
        </Link>
      );
      mediaCatalogRouteComponent = (
        <Link
          to="/tv/catalog"
          className={cn("p-[6px]", {
            "text-mainWhite": props.isTVCatalogRoute,
          })}
        >
          Catalog
        </Link>
      );
      break;
  }

  return (
    <div
      className={cn(
        "fixed left-1/2 ml-[-50vw] w-dvw z-[45]  transition-all duration-300",
        { "bg-darkBg/80": isScrolledDown }
      )}
    >
      <div
        className={`flex font-medium items-center justify-between mx-auto px-2 lg:max-w-[1000px] xl:max-w-[1200px] 1440:max-w-[1300px] 2xl:max-w-[1400px] 1600:max-w-[1450px] py-4`}
      >
        <button
          className="p-[6px]"
          onClick={() => toggleOpenSheet(<SideMenuSheet />)}
        >
          <Menu />
        </button>
        <div className="flex items-center gap-12 text-sm text-gray-300 text-gray-30">
          {mediaRouteComponent}
          {mediaCatalogRouteComponent}
          <button onClick={() => toggleMediaPortal(isMediaPortalOpen)}>
            <AzuraLogo className="size-12" />
          </button>
          <Link
            to="/social"
            className={cn("p-[6px]", {
              "text-mainWhite": isSocialRoute,
            })}
          >
            Social
          </Link>
          <Link
            to="/account"
            className={cn("p-[6px]", { "text-mainWhite": isAccountRoute })}
          >
            Account
          </Link>
        </div>
        <button
          onClick={() => toggleOpenDialog(searchDialogComponent)}
          className="p-[6px]"
        >
          <Search />
        </button>
      </div>
    </div>
  );
}
