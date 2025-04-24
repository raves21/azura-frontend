import { cn } from "@/lib/utils";
import { useMediaPortalStore } from "@/utils/stores/useMediaPortal";
import MediaPortalMedia from "./MediaPortalMedia";

export default function MediaPortalMobile() {
  const isMediaPortalOpen = useMediaPortalStore(
    (state) => state.isMediaPortalOpen
  );

  return (
    <div
      className={cn(
        "z-[700] fixed w-dvw h-[calc(100%-80px)] bottom-0",
        isMediaPortalOpen ? "flex" : "hidden"
      )}
    >
      <MediaPortalMedia
        isMobile={false}
        type="TV"
        image="/media_portal/tv_desktop.jpg"
      />
      <MediaPortalMedia
        isMobile={false}
        type="ANIME"
        image="/media_portal/anime_desktop.png"
      />
      <MediaPortalMedia
        isMobile={false}
        type="MOVIE"
        image="/media_portal/movie_desktop.jpg"
      />
    </div>
  );
}
