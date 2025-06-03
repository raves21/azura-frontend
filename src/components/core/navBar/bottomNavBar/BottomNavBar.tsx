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
import { useMediaPortalStore } from "@/utils/stores/useMediaPortal";
import { toggleMediaPortal } from "@/utils/functions/media/sharedFunctions";

type Props = {
  type: MediaType;
};

export default function BottomNavBar({ type }: Props) {
  const matchRoute = useMatchRoute();
  const location = useLocation();
  const isMovieRoute = matchRoute({ to: "/movie", fuzzy: true });
  const isAnimeRoute = matchRoute({ to: "/anime", fuzzy: true });
  const isTVRoute = matchRoute({ to: "/tv", fuzzy: true });
  const isCatalogRoute = location.pathname.includes("catalog");
  const isSocialRoute = matchRoute({ to: "/social", fuzzy: true });
  const isAccountRoute = matchRoute({ to: "/settings", fuzzy: true });
  const isMediaPortalOpen = useMediaPortalStore(
    (state) => state.isMediaPortalOpen
  );

  let mediaRouteComponent: ReactNode;
  let mediaCatalogRoute: LinkProps;
  switch (type) {
    case "ANIME":
      mediaRouteComponent = (
        <Link
          to="/anime"
          className={cn("flex flex-col items-center gap-1 flex-1", {
            "stroke-mainAccent text-mainAccent font-medium":
              isAnimeRoute && !isCatalogRoute,
          })}
        >
          <Cat className="size-5 md:size-6" />
          <p>Anime</p>
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
          className={cn("flex flex-col items-center gap-1 flex-1", {
            "stroke-mainAccent text-mainAccent font-medium":
              isMovieRoute && !isCatalogRoute,
          })}
        >
          <Clapperboard className="size-5 md:size-6" />
          <p>Movie</p>
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
          className={cn("flex flex-col items-center gap-1 flex-1", {
            "stroke-mainAccent text-mainAccent font-medium":
              isTVRoute && !isCatalogRoute,
          })}
        >
          <Tv className="size-5 md:size-6" />
          <p>TV</p>
        </Link>
      );
      mediaCatalogRoute = {
        to: "/tv/catalog",
      };
      break;
  }

  return (
    <div
      className={cn(
        "lg:hidden w-dvw text-2xs fixed bottom-0 font-montserrat z-[45] border-t-[0.5px] border-gray-700 pb-6 pt-[7px] bg-darkBg flex items-center justify-between",
        { "z-[701]": isMediaPortalOpen }
      )}
    >
      {mediaRouteComponent}
      <Link
        {...mediaCatalogRoute}
        className="flex flex-col items-center gap-1 flex-1"
      >
        <LayoutGrid
          className={cn("size-5 md:size-6 pl-px", {
            "stroke-mainAccent font-medium": isCatalogRoute,
          })}
        />
        <p className={cn({ "text-mainAccent": isCatalogRoute })}>Catalog</p>
      </Link>
      <div className="h-full w-12 mobile-m:w-16 mobile-l:w-20 md:w-28 bg-transparent" />
      <button
        onClick={() => toggleMediaPortal(isMediaPortalOpen)}
        className="fixed bottom-[22px] left-1/2 -translate-x-1/2 rotate-180"
      >
        <AzuraLogo className="size-[58px]" />
      </button>
      <Link
        to="/social"
        className={cn("flex flex-col items-center gap-1 flex-1", {
          "stroke-mainAccent text-mainAccent font-medium": isSocialRoute,
        })}
      >
        <UsersRound className="size-5 md:size-6" />
        <p>Social</p>
      </Link>
      <Link
        to="/settings"
        className={cn("flex flex-col items-center gap-1 flex-1", {
          "stroke-mainAccent text-mainAccent font-medium": isAccountRoute,
        })}
      >
        <Settings className="size-5 md:size-6" />
        <p>Settings</p>
      </Link>
    </div>
  );
}
