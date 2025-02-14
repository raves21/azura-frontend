import { MediaScraperResponse } from "@/utils/types/media/shared";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function getTMDBImageURL(backdropPath: string) {
  return `https://image.tmdb.org/t/p/original${backdropPath}`;
}

export function getTMDBReleaseYear(releaseDate: string) {
  return releaseDate.split("-")[0];
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

      if (
        mediaScraperResponse.message === "Sorry, the media isn't available ATM"
      ) {
        throw new Error("Media unavailable.");
      }

      return mediaScraperResponse as MediaScraperResponse;
    },
    enabled: !!enabled,
  });
}
