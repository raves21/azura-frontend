import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  AnimeInfo,
  MultipleAnimeResponse,
} from "../utils/types/anime_anilist";

const BASE_URL_ANILIST = "https://consumet-api-green.vercel.app/meta/anilist";

const frequentlyChanging = {
  gcTime: 180 * (60 * 1000), //3 hrs
  staleTime: 120 * (60 * 1000), //2 hrs
};

const rarelyChanging = {
  gcTime: 300 * (60 * 1000), //5 hrs
  staleTime: 240 * (60 * 1000), //4 hrs
};

export function useFetchTrendingAnime(perPage: number) {
  return useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/advanced-search?sort=["TRENDING_DESC"]&perPage=${perPage}&page=1`
      );
      return trendingAnimes as MultipleAnimeResponse;
    },
    ...frequentlyChanging,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useFetchTrendingAnimePageTwo(perPage?: number) {
  return useQuery({
    queryKey: ["trendingPageTwo"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/trending?perPage=${perPage}&page=2`
      );
      return trendingAnimes as MultipleAnimeResponse;
    },
    ...frequentlyChanging,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useFetchTopRatedAnime(perPage: number) {
  return useQuery({
    queryKey: ["topRated"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/advanced-search?sort=["SCORE_DESC"]&perPage=${perPage}&page=1`
      );
      return trendingAnimes as MultipleAnimeResponse;
    },
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useFetchAllTimeFavoriteAnime(perPage: number) {
  return useQuery({
    queryKey: ["allTimeFavorite"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/advanced-search?sort=["FAVOURITES_DESC"]&perPage=${perPage}&page=1`
      );
      return trendingAnimes as MultipleAnimeResponse;
    },
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useSearchAnime(id: string) {
  return useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const { data: searchResults } = await axios.get(
        `${BASE_URL_ANILIST}/${id}`
      );
      return searchResults;
    },
    ...rarelyChanging,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useFetchAnimeInfo(id: string) {
  return useQuery({
    queryKey: ["info", id],
    queryFn: async () => {
      const { data: animeInfo } = await axios.get(
        `${BASE_URL_ANILIST}/info/${id}`
      );
      return animeInfo as AnimeInfo;
    },
    ...rarelyChanging,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

// export function useFetchAnimeEpisodes(id: string) {
//   return useQuery({
//     queryKey: ["animeEpisodes", id],
//     queryFn: async () => {
//       const { data: animeEpisodes } = await axios.get(
//         `${BASE_URL_ANILIST}/episodes/${id}`
//       );
//       return animeEpisodes as Episode[];
//     },
//     gcTime: Infinity,
//     retry: false,
//  
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//   });
// }
