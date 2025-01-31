import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import SideMenuSheet from "../../sideMenuSheet/SideMenuSheet";
import { ReactNode } from "react";
import { useScrolledState } from "@/utils/hooks/useScrolledState";

type AnimeTopNavBarDesktopProps = {
  isAnimeRoute: boolean;
  isAnimeCatalogRoute: boolean;
  isSocialRoute: boolean;
  searchDialogComponent: ReactNode;
};

export default function AnimeTopNavBarDesktop({
  isAnimeRoute,
  isAnimeCatalogRoute,
  isSocialRoute,
  searchDialogComponent
}: AnimeTopNavBarDesktopProps) {
  const [toggleOpenSheet, toggleOpenDialog] = useGlobalStore((state) => [
    state.toggleOpenSheet,
    state.toggleOpenDialog
  ]);
  const navigate = useNavigate();
  const { isScrolledDown } = useScrolledState();
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
            to="/anime"
            className={cn(
              "p-[6px]",
              {
                "text-mainWhite": isAnimeRoute
              },
              { "text-gray-300": isAnimeCatalogRoute }
            )}
          >
            Anime
          </Link>
          <Link
            to="/anime/catalog"
            className={cn("p-[6px]", {
              "text-mainWhite": isAnimeCatalogRoute
            })}
          >
            Catalog
          </Link>
          <button
            onClick={() => {
              toggleOpenDialog(
                <div className="flex text-lg font-semibold aspect-video text-mainWhite w-[500px] bg-darkBg">
                  <button
                    onClick={() => {
                      navigate({
                        to: "/anime"
                      });
                      toggleOpenDialog(null);
                    }}
                    className="grid flex-1 bg-mainAccent place-items-center"
                  >
                    Anime
                  </button>
                  <button
                    onClick={() => {
                      navigate({
                        to: "/movie"
                      });
                      toggleOpenDialog(null);
                    }}
                    className="grid flex-1 bg-cyan-600 place-items-center"
                  >
                    Movie
                  </button>
                  <button
                    onClick={() => {
                      navigate({
                        to: "/tv"
                      });
                      toggleOpenDialog(null);
                    }}
                    className="grid flex-1 bg-lime-600 place-items-center"
                  >
                    TV
                  </button>
                </div>
              );
            }}
          >
            <img src="/azura-logo.svg" className="size-12" />
          </button>
          <Link
            to="/social"
            className={cn("p-[6px]", {
              "text-mainWhite": isSocialRoute
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
