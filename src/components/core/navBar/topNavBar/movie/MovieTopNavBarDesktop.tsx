import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Link } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import SideMenuSheet from "../../../sideMenuSheet/SideMenuSheet";
import { ReactNode } from "react";
import { useScrolledState } from "@/utils/hooks/useScrolledState";
import AzuraLogo from "@/components/core/shared/AzuraLogo";
import { useMediaPortalStore } from "@/utils/stores/useMediaPortal";
import { toggleMediaPortal } from "@/services/media/sharedFunctions";

type Props = {
  isMovieRoute: boolean;
  isMovieCatalogRoute: boolean;
  isSocialRoute: boolean;
  searchDialogComponent: ReactNode;
};

export default function MovieTopNavBarDesktop({
  isMovieRoute,
  isMovieCatalogRoute,
  isSocialRoute,
  searchDialogComponent,
}: Props) {
  const [toggleOpenSheet, toggleOpenDialog] = useGlobalStore((state) => [
    state.toggleOpenSheet,
    state.toggleOpenDialog,
  ]);
  const { isScrolledDown } = useScrolledState();

  const isMediaPortalOpen = useMediaPortalStore(
    (state) => state.isMediaPortalOpen
  );

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
          <Link
            to="/movie"
            className={cn(
              "p-[6px]",
              {
                "text-mainWhite": isMovieRoute,
              },
              { "text-gray-300": isMovieCatalogRoute }
            )}
          >
            Movie
          </Link>
          <Link
            to="/movie/catalog"
            className={cn("p-[6px]", {
              "text-mainWhite": isMovieCatalogRoute,
            })}
          >
            Catalog
          </Link>
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
          <Link className="p-[6px]">Settings</Link>
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
