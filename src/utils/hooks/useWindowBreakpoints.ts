import { useWindowWidth } from "./useWindowWidth";

export default function useWindowBreakpoints() {
  const windowWidth = useWindowWidth();
  const isMobileSmall = windowWidth >= 320;
  const isMobileMedium = windowWidth >= 375;
  const isMobileLarge = windowWidth >= 425;
  const isTabletSmall = windowWidth >= 640;
  const isTablet = windowWidth >= 768;
  const isDesktopSmall = windowWidth >= 1024;
  const isDesktop = windowWidth >= 1440;

  return {
    isMobileSmall,
    isMobileMedium,
    isMobileLarge,
    isTabletSmall,
    isTablet,
    isDesktopSmall,
    isDesktop,
  };
}
