import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Link } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import SideMenuSheet from "../../../sideMenuSheet/SideMenuSheet";
import { ReactNode } from "react";
import { useScrolledState } from "@/utils/hooks/useScrolledState";
import AzuraLogo from "@/components/core/shared/AzuraLogo";
import { useMediaPortalStore } from "@/utils/stores/useMediaPortal";
import { useShallow } from "zustand/react/shallow";

type Props = {
  isTVRoute: boolean;
  isTVCatalogRoute: boolean;
  isSocialRoute: boolean;
  searchDialogComponent: ReactNode;
};

export default function TVTopNavBarDesktop({
  isTVRoute,
  isTVCatalogRoute,
  isSocialRoute,
  searchDialogComponent,
}: Props) {
  const [toggleOpenSheet, toggleOpenDialog] = useGlobalStore((state) => [
    state.toggleOpenSheet,
    state.toggleOpenDialog,
  ]);
  const { isScrolledDown } = useScrolledState();

  const [
    setIsMediaPortalOpen,
    isMediaPortalOpen,
    setMediaPortalAnimationStatus,
  ] = useMediaPortalStore(
    useShallow((state) => [
      state.setIsMediaPortalOpen,
      state.isMediaPortalOpen,
      state.setMediaPortalAnimationStatus,
    ])
  );

  function toggleMediaPortal(isMediaPortalOpen: boolean) {
    if (isMediaPortalOpen) {
      setMediaPortalAnimationStatus("exit");

      //give delay when closing media portal since its animation takes 600ms to complete
      setTimeout(() => {
        setIsMediaPortalOpen(false);
      }, 600);
    } else {
      setMediaPortalAnimationStatus("intro");
      setIsMediaPortalOpen(true);
    }
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
          <Link
            to="/tv"
            className={cn(
              "p-[6px]",
              {
                "text-mainWhite": isTVRoute,
              },
              { "text-gray-300": isTVCatalogRoute }
            )}
          >
            TV
          </Link>
          <Link
            to="/tv/catalog"
            className={cn("p-[6px]", {
              "text-mainWhite": isTVCatalogRoute,
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
