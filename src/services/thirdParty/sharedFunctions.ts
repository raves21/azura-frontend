import { RabbitScraperResponse } from "@/utils/types/thirdParty/shared";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function getTMDBImageURL(backdropPath: string) {
  return `https://image.tmdb.org/t/p/original/${backdropPath}`;
}

export function getTMDBReleaseYear(releaseDate: string) {
  return releaseDate.split("-")[0];
}

type UseMediaScraperArgs = {
  mediaId: string;
  epNum?: number;
  seasonNum?: number;
  enabled: boolean;
};

export function useMediaScraper({
  mediaId,
  epNum,
  seasonNum,
  enabled
}: UseMediaScraperArgs) {
  return useQuery({
    queryKey: ["mediaScraper", mediaId, epNum, seasonNum],
    queryFn: async () => {
      const rabbitApiBaseURL = "http://127.0.0.1:8787/api/rabbit/fetch";
      let url: string;

      if (epNum && seasonNum) {
        url = `${rabbitApiBaseURL}?mediaId=${mediaId}?ss=${seasonNum}&ep=${epNum}`;
      } else {
        url = `${rabbitApiBaseURL}?mediaId=${mediaId}`;
      }

      const { data: rabbitResponse } = await axios.get(url);

      return rabbitResponse as RabbitScraperResponse;
    },
    enabled: !!enabled
  });
}
