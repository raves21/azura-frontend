import { useMediaPortalStore } from "@/utils/stores/useMediaPortal";
import { MediaScraperResponse } from "@/utils/types/media/shared";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function getTMDBImageURL(imagePath: string) {
  return `https://image.tmdb.org/t/p/original${imagePath}`;
}

export function getTMDBReleaseYear(releaseDate: string) {
  return releaseDate ? releaseDate.split("-")[0] : "";
}

export function getAnimeRatingInfoPage(
  aniwatchRating: number | undefined,
  anilistRating: number | undefined
) {
  let rating: string | null;
  if (anilistRating) {
    rating = (anilistRating * 0.1).toFixed(1);
  } else if (aniwatchRating) {
    rating = aniwatchRating ? aniwatchRating.toFixed(1) : null;
  } else {
    rating = null;
  }
  return rating;
}

export function getAnimeRating(rating: number | null) {
  return rating ? rating.toFixed(1) : null;
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

export function toggleMediaPortal(isMediaPortalOpen: boolean) {
  const setMediaPortalAnimationStatus =
    useMediaPortalStore.getState().setMediaPortalAnimationStatus;
  const setIsMediaPortalOpen =
    useMediaPortalStore.getState().setIsMediaPortalOpen;

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
