import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import MediaPortalDesktop from "./MediaPortalDesktop";
import MediaPortalMobile from "./MediaPortalMobile";

export default function MediaPortal() {
  const { isDesktopSmallUp } = useWindowBreakpoints();

  if (isDesktopSmallUp) {
    return <MediaPortalDesktop />;
  }
  return <MediaPortalMobile />;
}
