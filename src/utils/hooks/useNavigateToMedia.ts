import { toggleMediaPortal } from "@/services/media/sharedFunctions";
import { useNavigate, useLocation, LinkProps } from "@tanstack/react-router";
import { useMediaPortalStore } from "../stores/useMediaPortal";
import { MediaType } from "../types/shared";
import { useGlobalStore } from "../stores/useGlobalStore";

type HandleNavigateToMediaArgs = {
  from: "mediaPortal" | "sheet";
  type: MediaType;
  navigationLinkProps: LinkProps;
};

export function useNavigateToMedia() {
  const isMediaPortalOpen = useMediaPortalStore(
    (state) => state.isMediaPortalOpen
  );
  const toggleOpenSheet = useGlobalStore((state) => state.toggleOpenSheet);
  const navigate = useNavigate();
  const location = useLocation();

  function handleNavigateToMedia({
    from,
    navigationLinkProps,
    type,
  }: HandleNavigateToMediaArgs) {
    const currentRoute = location.pathname;
    if (currentRoute.split("/")[1].toUpperCase() !== type) {
      navigate(navigationLinkProps);
    }
    if (from === "mediaPortal") {
      toggleMediaPortal(isMediaPortalOpen);
    } else {
      toggleOpenSheet(null);
    }
  }

  return { handleNavigateToMedia };
}
