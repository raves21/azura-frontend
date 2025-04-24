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
        "z-[700] fixed w-dvw h-[calc(100dvh-69.8px)] md:h-[calc(100dvh-73.8px)] flex-col",
        isMediaPortalOpen ? "flex" : "hidden"
      )}
    >
      <MediaPortalMedia
        isMobile
        type="TV"
        image="/media_portal/tv_mobile.jpeg"
      />
      <MediaPortalMedia
        isMobile
        type="ANIME"
        image="/media_portal/anime_mobile.jpg"
      />
      <MediaPortalMedia
        isMobile
        type="MOVIE"
        image="/media_portal/movie_mobile.jpg"
      />
    </div>
  );
}
