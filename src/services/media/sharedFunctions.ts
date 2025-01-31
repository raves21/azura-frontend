import { MediaScraperResponse } from "@/utils/types/media/shared";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function getTMDBImageURL(backdropPath: string) {
  return `https://image.tmdb.org/t/p/original/${backdropPath}`;
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
  enabled
}: UseMediaScraperArgs) {
  return useQuery({
    queryKey: ["mediaScraper", type, mediaId, epNum, seasonNum],
    queryFn: async () => {
      const mediaScraperApiBaseURL = "http://127.0.0.1:8787/api/rabbit/fetch";
      let url: string;

      if (type === "TV") {
        url = `${mediaScraperApiBaseURL}?mediaId=${mediaId}&seasonNum=${seasonNum}&epNum=${epNum}`;
      } else {
        url = `${mediaScraperApiBaseURL}?mediaId=${mediaId}`;
      }

      const { data: mediaScraperResponse } = await axios.get(url);

      return mediaScraperResponse as MediaScraperResponse;
    },
    enabled: !!enabled
  });
}
