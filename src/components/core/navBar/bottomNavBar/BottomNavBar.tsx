import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { MediaType } from "@/utils/types/shared";
import {
  Link,
  LinkProps,
  useLocation,
  useMatchRoute,
} from "@tanstack/react-router";
import {
  Cat,
  Clapperboard,
  LayoutGrid,
  Settings,
  Tv,
  UsersRound,
} from "lucide-react";
import { ReactNode } from "react";
import AzuraLogo from "../../shared/AzuraLogo";
import { cn } from "@/lib/utils";

type Props = {
  type: MediaType;
};

export default function BottomNavBar({ type }: Props) {
  const { isDesktopSmallUp } = useWindowBreakpoints();
  const matchRoute = useMatchRoute();
  const location = useLocation();
  const isMovieRoute = matchRoute({ to: "/movie", fuzzy: true });
  const isAnimeRoute = matchRoute({ to: "/anime", fuzzy: true });
  const isTVRoute = matchRoute({ to: "/tv", fuzzy: true });
  const isCatalogRoute = location.pathname.includes("catalog");
  const isSocialRoute = matchRoute({ to: "/social", fuzzy: true });

  let mediaRouteComponent: ReactNode;
  let mediaCatalogRoute: LinkProps;
  switch (type) {
    case "ANIME":
      mediaRouteComponent = (
        <Link
          to="/anime"
          className={cn("flex flex-col items-center gap-1", {
            "fill-mainWhite font-medium": isAnimeRoute && !isCatalogRoute,
          })}
        >
          <Cat className="size-5" />
          <p className="text-2xs">Anime</p>
        </Link>
      );
      mediaCatalogRoute = {
        to: "/anime/catalog",
      };
      break;
    case "MOVIE":
      mediaRouteComponent = (
        <Link
          to="/movie"
          className={cn("flex flex-col items-center gap-1", {
            "fill-mainWhite font-medium": isMovieRoute && !isCatalogRoute,
          })}
        >
          <Clapperboard className="size-5" />
          <p className="text-2xs">Movie</p>
        </Link>
      );
      mediaCatalogRoute = {
        to: "/movie/catalog",
      };
      break;
    case "TV":
      mediaRouteComponent = (
        <Link
          to="/tv"
          className={cn("flex flex-col items-center gap-1", {
            "fill-mainWhite font-medium": isTVRoute && !isCatalogRoute,
          })}
        >
          <Tv className="size-5" />
          <p className="text-2xs">TV</p>
        </Link>
      );
      mediaCatalogRoute = {
        to: "/tv/catalog",
      };
      break;
  }

  if (!isDesktopSmallUp) {
    return (
      <div className="w-dvw fixed bottom-0 font-montserrat z-[45] px-5 border-t-[0.5px] border-gray-700 pb-6 pt-[7px] bg-darkBg flex items-center justify-between">
        {mediaRouteComponent}
        <Link
          {...mediaCatalogRoute}
          className="flex flex-col items-center gap-1"
        >
          <LayoutGrid
            className={cn("size-5 pl-px", {
              "fill-mainWhite font-medium": isCatalogRoute,
            })}
          />
          <p className="text-2xs">Catalog</p>
        </Link>
        <div className="size-5 bg-transparent" />
        <button className="absolute bottom-[22px] left-1/2 -translate-x-1/2 rotate-180">
          <AzuraLogo className="size-[58px]" />
        </button>
        <Link
          to="/social"
          className={cn("flex flex-col items-center gap-1", {
            "fill-mainWhite font-medium": isSocialRoute,
          })}
        >
          <UsersRound className="size-5" />
          <p className="text-2xs">Social</p>
        </Link>
        <Link className="flex flex-col items-center gap-1">
          <Settings className="size-5" />
          <p className="text-2xs">Settings</p>
        </Link>
      </div>
    );
  }
  return null;
}
