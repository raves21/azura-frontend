import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { MediaScraperResponse } from "@/utils/types/media/shared";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "@tanstack/react-router";
import axios from "axios";

export function getTMDBImageURL(imagePath: string) {
  return `https://image.tmdb.org/t/p/original${imagePath}`;
}

export function getTMDBReleaseYear(releaseDate: string) {
  return releaseDate ? releaseDate.split("-")[0] : "";
}

export function getAnimeRating(rating: number | null) {
  return rating ? (rating * 0.1).toFixed(1) : null;
}

export function getTMDBRating(rating: number | null) {
  return rating ? rating.toFixed(1).split("-")[0] : null;
}

type UseMediaScraperArgs = {
  type: "TV" | "MOVIE";
  mediaId: string;
  epNum?: number;
  seasonNum?: number;
  enabled: boolean;
};

export function useMediaScraper({
  type,
  mediaId,
  epNum,
  seasonNum,
  enabled,
}: UseMediaScraperArgs) {
  return useQuery({
    queryKey: ["mediaScraper", type, mediaId, epNum, seasonNum],
    queryFn: async () => {
      const mediaScraperApiBaseURL = import.meta.env
        .VITE_HONO_RABBIT_SCRAPER_URL;
      let url: string;

      if (type === "TV") {
        url = `${mediaScraperApiBaseURL}?mediaId=${mediaId}&seasonNum=${seasonNum}&epNum=${epNum}`;
      } else {
        url = `${mediaScraperApiBaseURL}?mediaId=${mediaId}`;
      }

      const { data: mediaScraperResponse } = await axios.get(url);

      if (mediaScraperResponse.message || mediaScraperResponse.error) {
        throw new Error("Media unavailable.");
      }

      return mediaScraperResponse as MediaScraperResponse;
    },
    enabled: !!enabled,
  });
}

type OpenDialogOrDrawerArgs = {
  content: ReactNode;
  isTabletUp: boolean;
  isSecondaryDialog?: boolean;
};

export function toggleDialogOrDrawer({
  content,
  isSecondaryDialog,
  isTabletUp,
}: OpenDialogOrDrawerArgs) {
  const toggleOpenDrawer = useGlobalStore.getState().toggleOpenDrawer;
  const toggleOpenDialogSecondary =
    useGlobalStore.getState().toggleOpenDialogSecondary;
  const toggleOpenDialog = useGlobalStore.getState().toggleOpenDialog;

  if (isTabletUp) {
    isSecondaryDialog
      ? toggleOpenDialogSecondary(content)
      : toggleOpenDialog(content);
  } else {
    toggleOpenDrawer(content);
  }
}
