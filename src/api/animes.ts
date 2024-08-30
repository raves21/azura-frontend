import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  AnimeInfoAnilist,
  EpisodeChunk,
  EpisodeStreamLinks,
  EpisodeToBeRendered,
  MultipleAnimeResponse,
} from "../utils/types/animeAnilist";
import { AnimeInfoAnify } from "@/utils/types/animeAnify";
import {
  chunkEpisodes,
  getEpisodesToBeRendered,
} from "@/utils/functions/reusable_functions";

const BASE_URL_ANILIST = "https://consumet-api-green.vercel.app/meta/anilist";

// const frequentlyChanging = {
//   gcTime: 180 * (60 * 1000), //3 hrs
//   staleTime: 120 * (60 * 1000), //2 hrs
// };

// const rarelyChanging = {
//   gcTime: 300 * (60 * 1000), //5 hrs
//   staleTime: 240 * (60 * 1000), //4 hrs
// };

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

export function useSearchAnime(query: string, enabled: boolean) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const { data: searchResults } = await axios.get(
        `${BASE_URL_ANILIST}/advanced-search?query=${query}&perPage=10`
      );
      return searchResults as MultipleAnimeResponse;
    },
    enabled: enabled,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useFetchAnimeInfo(id: string) {
  return useQuery({
    queryKey: ["animeInfo", id],
    queryFn: async () => {
      const animeInfoAnilistRes = await axios.get(
        `${BASE_URL_ANILIST}/info/${id}`
      );
      const animeInfoAnifyRes = await axios.get(
        `https://anify.eltik.cc/info/${id}?fields=[episodes,bannerImage,coverImage,title,rating,trailer,description,type,id,totalEpisodes,year,status,format]`
      );
      const animeInfoAnilist = animeInfoAnilistRes.data as AnimeInfoAnilist;
      const animeInfoAnify = animeInfoAnifyRes.data as AnimeInfoAnify;
      return { animeInfoAnilist, animeInfoAnify };
    },
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

export function useChunkEpisodes(
  animeInfo:
    | {
        animeInfoAnilist: AnimeInfoAnilist;
        animeInfoAnify: AnimeInfoAnify;
      }
    | undefined
) {
  return useQuery({
    queryKey: [
      "chunkedEpisodes",
      `anify ${animeInfo?.animeInfoAnify?.id}`,
      `anilist ${animeInfo?.animeInfoAnilist?.id}`,
    ],
    queryFn: () => {
      const a = chunkEpisodes(
        getEpisodesToBeRendered(
          animeInfo?.animeInfoAnify,
          animeInfo?.animeInfoAnilist
        ),
        30
      );
      return a;
    },
    enabled: !!animeInfo,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useEpisodeInfo(
  episodeId: string,
  chunkedEpisodes: EpisodeChunk[] | null | undefined
) {
  return useQuery({
    queryKey: ["episodeInfo", episodeId],
    queryFn: () => {
      let foundEpisode: unknown;

      for (let i = 0; i < chunkedEpisodes!.length; i++) {
        foundEpisode = chunkedEpisodes![i].episodes.find(
          (episode) => episode.id.replace(/^\//, "") === episodeId
        );
        if (foundEpisode) break;
      }

      return foundEpisode as EpisodeToBeRendered;
    },
    enabled: !!chunkedEpisodes,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}
