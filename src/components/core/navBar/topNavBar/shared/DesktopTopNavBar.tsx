import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { Circle, Menu, Search } from "lucide-react";
import { ReactNode } from "react";
import { useScrolledState } from "@/utils/hooks/useScrolledState";
import AzuraLogo from "@/components/core/shared/AzuraLogo";
import { useMediaPortalStore } from "@/utils/stores/useMediaPortal";
import { toggleMediaPortal } from "@/utils/functions/media/sharedFunctions";
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
  const isAccountRoute = matchRoute({ to: "/settings", fuzzy: true });
  const isSocialRoute = matchRoute({ to: "/social", fuzzy: true });

  let mediaRouteComponent: ReactNode;
  let mediaCatalogRouteComponent: ReactNode;

  switch (props.type) {
    case "ANIME":
      mediaRouteComponent = (
        <Link
          onClick={() => toggleMediaPortal(true)}
          to="/anime"
          className={cn(
            "p-[6px] hover:text-mainAccent transition-colors",
            {
              "text-mainWhite font-medium underline underline-offset-8 decoration-mainAccent decoration-2":
                props.isAnimeRoute,
            },
            {
              "text-gray-300 font-normal no-underline":
                props.isAnimeCatalogRoute,
            }
          )}
        >
          Anime
        </Link>
      );
      mediaCatalogRouteComponent = (
        <Link
          onClick={() => toggleMediaPortal(true)}
          to="/anime/catalog"
          className={cn("p-[6px] hover:text-mainAccent transition-colors", {
            "text-mainWhite font-medium underline underline-offset-8 decoration-mainAccent decoration-2":
              props.isAnimeCatalogRoute,
          })}
        >
          Catalog
        </Link>
      );
      break;
    case "MOVIE":
      mediaRouteComponent = (
        <Link
          onClick={() => toggleMediaPortal(true)}
          to="/movie"
          className={cn(
            "p-[6px] hover:text-mainAccent transition-colors",
            {
              "text-mainWhite font-medium underline underline-offset-8 decoration-mainAccent decoration-2":
                props.isMovieRoute,
            },
            {
              "text-gray-300 font-normal no-underline":
                props.isMovieCatalogRoute,
            }
          )}
        >
          Movie
        </Link>
      );
      mediaCatalogRouteComponent = (
        <Link
          onClick={() => toggleMediaPortal(true)}
          to="/movie/catalog"
          className={cn("p-[6px] hover:text-mainAccent transition-colors", {
            "text-mainWhite font-medium underline underline-offset-8 decoration-mainAccent decoration-2":
              props.isMovieCatalogRoute,
          })}
        >
          Catalog
        </Link>
      );
      break;
    case "TV":
      mediaRouteComponent = (
        <Link
          onClick={() => toggleMediaPortal(true)}
          to="/tv"
          className={cn(
            "p-[6px] hover:text-mainAccent transition-colors",
            {
              "text-mainWhite font-medium underline underline-offset-8 decoration-mainAccent decoration-2":
                props.isTVRoute,
            },
            { "text-gray-300 font-normal no-underline": props.isTVCatalogRoute }
          )}
        >
          TV
        </Link>
      );
      mediaCatalogRouteComponent = (
        <Link
          onClick={() => toggleMediaPortal(true)}
          to="/tv/catalog"
          className={cn("p-[6px] hover:text-mainAccent transition-colors", {
            "text-mainWhite font-medium underline underline-offset-8 decoration-mainAccent decoration-2":
              props.isTVCatalogRoute,
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
          className="p-[6px] relative group"
          onClick={() => {
            toggleOpenSheet(<SideMenuSheet />)
            toggleMediaPortal(true)
          }}
        >
          <Menu />
          <Circle className="fill-mainAccent/30 -z-10 stroke-none size-[190%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </button>
        <div className="flex items-center gap-12 text-sm text-gray-300 text-gray-30">
          {mediaRouteComponent}
          {mediaCatalogRouteComponent}
          <button onClick={() => toggleMediaPortal(isMediaPortalOpen)}>
            <AzuraLogo className="size-12" />
          </button>
          <Link
            onClick={() => toggleMediaPortal(true)}
            to="/social"
            className={cn("p-[6px] hover:text-mainAccent transition-colors", {
              "text-mainWhite font-medium underline underline-offset-8 decoration-mainAccent decoration-2":
                isSocialRoute,
            })}
          >
            Social
          </Link>
          <Link
            onClick={() => toggleMediaPortal(true)}
            to="/settings"
            className={cn("p-[6px] hover:text-mainAccent transition-colors", {
              "text-mainWhite font-medium underline underline-offset-8 decoration-mainAccent decoration-2":
                isAccountRoute,
            })}
          >
            Settings
          </Link>
        </div>
        <button
          onClick={() => {
            toggleMediaPortal(true)
            toggleOpenDialog(searchDialogComponent)}}
          className="p-[6px] relative group"
        >
          <Search />
          <Circle className="fill-mainAccent/30 -z-10 stroke-none size-[190%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </button>
      </div>
    </div>
  );
}
