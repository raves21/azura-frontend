import { cn } from "@/lib/utils";
import { useScrolledState } from "@/utils/hooks/useScrolledState";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useMatchRoute, useNavigate, Link } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import SideMenuSheet from "../../sideMenuSheet/SideMenuSheet";
import SocialSearchDialog from "../../social/searchDialog/SocialSearchDialog";
import { ReactNode } from "react";
import MovieSearchDialog from "../../media/movie/MovieSearchDialog";

export default function MovieTopNavBar() {
  const { isScrolledDown } = useScrolledState();

  const [toggleOpenDialog, toggleOpenSheet] = useGlobalStore(
    useShallow((state) => [state.toggleOpenDialog, state.toggleOpenSheet])
  );

  const matchRoute = useMatchRoute();
  const navigate = useNavigate();

  let searchDialogComponent: ReactNode;

  if (matchRoute({ to: "/movie", fuzzy: true })) {
    searchDialogComponent = <MovieSearchDialog />;
  } else {
    searchDialogComponent = <SocialSearchDialog />;
  }

  const DesktopHeader = (
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
              "text-mainWhite": matchRoute({ to: "/movie", fuzzy: true })
            },
            { "text-gray-300": matchRoute({ to: "/movie/catalog" }) }
          )}
        >
          Movie
        </Link>
        <Link
          to="/movie/catalog"
          className={cn("p-[6px]", {
            "text-mainWhite": matchRoute({
              to: "/movie/catalog"
            })
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
                      to: "/movie"
                    });
                    toggleOpenDialog(null);
                  }}
                  className="grid flex-1 bg-mainAccent place-items-center"
                >
                  Movi
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
                <button className="grid flex-1 bg-lime-600 place-items-center">
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
            "text-mainWhite": matchRoute({ to: "/social", fuzzy: true })
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
  );

  const MobileHeader = (
    <>
      <div className="flex items-center gap-4 mobile-m:gap-6">
        <Link to="/movie" className="p-1">
          <img
            src="/azura-logo-with-label.svg"
            className="w-24 mobile-m:w-28"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="p-[6px]"
          onClick={() => toggleOpenDialog(searchDialogComponent)}
        >
          <Search className="size-6" />
        </button>
        <button className="p-[2px]">
          <div className="p-[2px] rounded-full bg-mainAccent box-content">
            <div className="box-content overflow-hidden border-2 rounded-full size-6 border-darkBg">
              <img
                src="/sample-user-pfp.png"
                className="object-cover size-full"
              />
            </div>
          </div>
        </button>
      </div>
    </>
  );

  return (
    <header className="font-montserrat">
      <div
        className={`fixed flex z-[45] px-2 sm:px-3 py-4  ${isScrolledDown ? "bg-darkBg" : ""} transition-all duration-300 items-center justify-between w-dvw left-1/2 ml-[-50vw] lg:hidden`}
      >
        {MobileHeader}
      </div>
      <div
        className={`fixed left-1/2 ml-[-50vw] w-dvw z-[45] ${isScrolledDown ? "bg-darkBg/80" : ""} transition-all duration-300 hidden lg:block`}
      >
        {DesktopHeader}
      </div>
    </header>
  );
}
