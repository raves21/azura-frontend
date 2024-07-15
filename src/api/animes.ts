import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MultipleAnimeResponse } from "../utils/types/anime_anilist";
import { AniwatchHomeResponse } from "../utils/types/anime_aniwatch";

const BASE_URL_ANILIST = "https://consumet-api-green.vercel.app/meta/anilist";
const BASE_URL_ANIWATCH = "https://aniwatch-api-pearl.vercel.app/anime";

export function useFetchTrendingAnime(perPage: number) {
  return useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(`${BASE_URL_ANILIST}/advanced-search?sort=["TRENDING_DESC"]&perPage=${perPage}&page=1`);
      return trendingAnimes as MultipleAnimeResponse;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

export function useFetchTrendingAnimePageTwo(perPage?: number) {
  return useQuery({
    queryKey: ["trendingPageTwo"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(`${BASE_URL_ANILIST}/trending?perPage=${perPage}&page=2`);
      return trendingAnimes as MultipleAnimeResponse;
    },  
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

export function useFetchTopRatedAnime(perPage: number) {
  return useQuery({
    queryKey: ["topRated"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(`${BASE_URL_ANILIST}/advanced-search?sort=["SCORE_DESC"]&perPage=${perPage}&page=1`);
      return trendingAnimes as MultipleAnimeResponse;
    },  
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

export function useFetchAllTimeFavoriteAnime(perPage: number) {
  return useQuery({
    queryKey: ["allTimeFavorite"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(`${BASE_URL_ANILIST}/advanced-search?sort=["FAVOURITES_DESC"]&perPage=${perPage}&page=1`);
      return trendingAnimes as MultipleAnimeResponse;
    },  
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

export function useSearchAnime(id: string) {
  return useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const { data: searchResults } = await axios.get(`${BASE_URL_ANILIST}/${id}`);
      return searchResults;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

export function useFetchAnimeInfo(id: string) {
  return useQuery({
    queryKey: ["info"],
    queryFn: async () => {
      const { data: animeInfo } = await axios.get(`${BASE_URL_ANILIST}/info/${id}`);
      return animeInfo;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

export function useFetchRecentlyUpdatedAnilist(perPage?: number) {
  return useQuery({
    queryKey: ["recentlyUpdatedAnilist"],
    queryFn: async () => {
      const { data: recentlyUpdatedAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/recent-episodes?perPage=${perPage}`
      );
      return recentlyUpdatedAnimes;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

export function useFetchPopularAnimes(perPage: number) {
  return useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const { data: popularAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/advanced-search?sort=["POPULARITY_DESC"]&perPage=${perPage}`
      );
      return popularAnimes as MultipleAnimeResponse;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

export function useFetchRecentlyUpdatedAniwatch() {
  return useQuery({
    queryKey: ["recentlyUpdatedAniwatch"],
    queryFn: async () => {
      console.log('QQQQQQ');
      const { data: recentlyUpdatedAniwatchAnimes } = await axios.get(
        `${BASE_URL_ANIWATCH}/recently-updated`
      );
      console.log('DQWNKDQWN');
      return recentlyUpdatedAniwatchAnimes as AniwatchHomeResponse;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}
