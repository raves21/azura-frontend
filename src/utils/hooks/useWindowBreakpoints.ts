import { useWindowWidth } from "./useWindowWidth";

export default function useWindowBreakpoints() {
  const windowWidth = useWindowWidth();
  const isMobileSmallUp = windowWidth >= 320;
  const isMobileMediumUp = windowWidth >= 375;
  const isMobileLargeUp = windowWidth >= 425;
  const isTabletExtraSmallUp = windowWidth >= 570;
  const isTabletSmallUp = windowWidth >= 640;
  const isTabletUp = windowWidth >= 768;
  const isDesktopSmallUp = windowWidth >= 1024;
  const isDesktopMediumUp = windowWidth >= 1280;
  const isDesktopLargeUp = windowWidth >= 1440;

  return {
    isMobileSmallUp,
    isMobileMediumUp,
    isMobileLargeUp,
    isTabletExtraSmallUp,
    isTabletSmallUp,
    isTabletUp,
    isDesktopSmallUp,
    isDesktopMediumUp,
    isDesktopLargeUp,
  };
}
