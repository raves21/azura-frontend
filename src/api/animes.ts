import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  AnimeInfoAnilist,
  EpisodeStreamLinks,
  MultipleAnimeResponse,
} from "../utils/types/animeAnilist";
import { AnimeInfoAnify } from "@/utils/types/animeAnify";
import {
  chunkEpisodes,
  getEpisodesToBeRendered,
} from "@/utils/functions/reusable_functions";

const BASE_URL_ANILIST = "https://consumet-api-green.vercel.app/meta/anilist";

const frequentlyChanging = {
  gcTime: 180 * (60 * 1000), //3 hrs
  staleTime: 120 * (60 * 1000), //2 hrs
};

const rarelyChanging = {
  gcTime: 300 * (60 * 1000), //5 hrs
  staleTime: 240 * (60 * 1000), //4 hrs
};

//this is the settings during development. to minimize network requests
const neverRefetchSettings = {
  gcTime: Infinity,
  staleTime: Infinity,
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export function useFetchTrendingAnime(perPage: number, pageNum: number) {
  return useQuery({
    queryKey: ["trending", pageNum],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/advanced-search?sort=["TRENDING_DESC"]&perPage=${perPage}&page=${pageNum}`
      );
      return trendingAnimes as MultipleAnimeResponse;
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
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
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
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
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
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
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useFetchAnimeInfoAnilist(id: string, enabled: boolean) {
  return useQuery({
    queryKey: ["infoAnilist", id],
    queryFn: async () => {
      const { data: animeInfoAnilist } = await axios.get(
        `${BASE_URL_ANILIST}/info/${id}`
      );
      console.log("FETCHING FROM ANIMEINFOANLIST");
      return animeInfoAnilist as AnimeInfoAnilist;
    },
    enabled: enabled,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useFetchAnimeInfoAnify(id: string) {
  return useQuery({
    queryKey: ["infoAnify", id],
    queryFn: async () => {
      const { data: animeInfoAnify } = await axios.get(
        `https://anify.eltik.cc/info/${id}?fields=[episodes,bannerImage,coverImage,title,rating,trailer,description,type,id,totalEpisodes,year,status,format]`
      );
      return animeInfoAnify as AnimeInfoAnify;
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
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
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useFetchEpisodeStreamLinks(episodeId: string) {
  return useQuery({
    queryKey: ["watchEpisode", episodeId],
    queryFn: async () => {
      const { data: episodeStreamLinks } = await axios.get(
        `${BASE_URL_ANILIST}/watch/${episodeId}`
      );
      return episodeStreamLinks as EpisodeStreamLinks;
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useFetchChunkedEpisodes(
  animeInfoAnify: AnimeInfoAnify | undefined,
  animeInfoAnilist: AnimeInfoAnilist | undefined
) {
  return useQuery({
    queryKey: [
      "epsToBeRendered",
      `anify ${animeInfoAnify?.id}`,
      `anilist ${animeInfoAnilist?.id}`,
    ],
    queryFn: () => {
      console.log("useFetchChunkedEpisodes");
      return chunkEpisodes(
        getEpisodesToBeRendered(animeInfoAnify, animeInfoAnilist),
        30
      );
    },
    enabled: !!animeInfoAnify && !!animeInfoAnilist,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}
