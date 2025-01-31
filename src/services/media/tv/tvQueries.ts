import { useQuery } from "@tanstack/react-query";
import { tmdbApi } from "@/utils/variables/axiosInstances/tmdbAxiosInstance";
import {
  PaginatedTVShowResponse,
  TMDBTVEpisode,
  TVGenre,
  TVShowInfo,
  TVSortBy
} from "@/utils/types/media/TV/tvShowTmdb";
import { TMDBGenre } from "@/utils/types/media/shared";

export function useTVByCategory(category: string) {
  return useQuery({
    queryKey: ["categoryTV", category],
    queryFn: async () => {
      let url: string;
      if (category === "trending") {
        url = `/trending/tv/day`;
      } else if (category === "popular") {
        url = `/tv/popular`;
      } else {
        url = `/tv/top_rated`;
      }
      const { data: categoryTVShows } = await tmdbApi.get(url);
      return categoryTVShows as PaginatedTVShowResponse;
    }
  });
}

export function useTVInfo(tvShowId: string) {
  return useQuery({
    queryKey: ["tvInfo", tvShowId],
    queryFn: async () => {
      const { data: tvShowInfo } = await tmdbApi.get(`/tv/${tvShowId}`);
      return tvShowInfo as TVShowInfo;
    },
    retryOnMount: false
  });
}

export function useTVRecommendations(tvShowId: string) {
  return useQuery({
    queryKey: ["tvRecommendations", tvShowId],
    queryFn: async () => {
      const { data: tvShowRecommendations } = await tmdbApi.get(
        `/tv/${tvShowId}/recommendations`
      );
      return tvShowRecommendations as PaginatedTVShowResponse;
    }
  });
}

export function useTVGenres() {
  return useQuery({
    queryKey: ["tvGenres"],
    queryFn: async () => {
      const { data: tvGenres } = await tmdbApi.get(`/genre/tv/list`);
      return tvGenres.genres as TMDBGenre[];
    },
    retryOnMount: false
  });
}

type UseDiscoverTVArgs = {
  page: number | undefined;
  sortBy: TVSortBy | undefined;
  genres: TVGenre[] | undefined;
  year: number | undefined;
};

export function useDiscoverTV({
  page,
  sortBy,
  genres,
  year
}: UseDiscoverTVArgs) {
  return useQuery({
    queryKey: ["discoverTv", page, sortBy, genres, year],
    queryFn: async () => {
      const { data: discoverTvList } = await tmdbApi.get(`/discover/tv`, {
        params: {
          page,
          sort_by: sortBy,
          with_genres: genres?.join(","),
          year
        }
      });
      return discoverTvList as PaginatedTVShowResponse;
    }
  });
}

export function useSearchTV(query: string, page: number, enabled?: boolean) {
  return useQuery({
    queryKey: ["searchTv", query, page],
    queryFn: async () => {
      const { data: searchTvResult } = await tmdbApi.get("/search/tv", {
        params: {
          query,
          page
        }
      });
      return searchTvResult as PaginatedTVShowResponse;
    },
    enabled: !!enabled
  });
}

type UseTVSeasonEpisodesArgs = {
  tvId: string;
  seasonNum: number;
  enabled: boolean;
};

export function useTVSeasonEpisodes({
  tvId,
  seasonNum,
  enabled
}: UseTVSeasonEpisodesArgs) {
  return useQuery({
    queryKey: ["tvSeasonEpisodes", tvId, seasonNum],
    queryFn: async () => {
      const { data: tvSeasonEpisodes } = await tmdbApi.get(
        `/tv/${tvId}/season/${seasonNum}`
      );
      return tvSeasonEpisodes.episodes as TMDBTVEpisode[];
    },
    enabled: !!enabled
  });
}
