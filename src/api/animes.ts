import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://consumet-api-green.vercel.app/meta/anilist";

export function useFetchTrendingAnime() {
  return useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(`${BASE_URL}/trending`);
      return trendingAnimes;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useSearchAnime(id: string) {
  return useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const { data: searchResults } = await axios.get(`${BASE_URL}/${id}`);
      return searchResults;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useFetchAnimeInfo(id: string) {
  return useQuery({
    queryKey: ["info"],
    queryFn: async () => {
      const { data: animeInfo } = await axios.get(`${BASE_URL}/info/${id}`);
      return animeInfo;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useFetchRecentlyUpdated() {
  return useQuery({
    queryKey: ["recentlyUpdated"],
    queryFn: async () => {
      const { data: recentlyUpdatedAnimes } = await axios.get(
        `${BASE_URL}/recent-episodes`
      );
      return recentlyUpdatedAnimes;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useFetchPopularAnimes() {
  return useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const { data: popularAnimes } = await axios.get(`${BASE_URL}/popular`);
      return popularAnimes;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
