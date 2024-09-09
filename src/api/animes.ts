import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  AnilistAnimeStatus,
  AnimeInfoAnilist,
  EpisodeChunk,
  EpisodeStreamLinks,
  EpisodeToBeRendered,
  Format,
  MultipleAnimeResponse,
  Season,
  SortBy,
} from "../utils/types/animeAnilist";
import { AnimeInfoAnify } from "@/utils/types/animeAnify";
import {
  chunkEpisodes,
  getEpisodesToBeRendered,
} from "@/utils/functions/reusable_functions";

const BASE_URL_ANILIST = "https://consumet-api-raves.vercel.app/meta/anilist";

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

export function useFilterAnime(
  query?: string,
  season?: Season,
  genres?: string,
  year?: number,
  sortBy?: SortBy,
  format?: Format,
  page?: number,
  status?: AnilistAnimeStatus
) {
  return useQuery({
    queryKey: [
      "filterAnime",
      query,
      season,
      genres,
      year,
      sortBy ?? SortBy.TRENDING_DESC,
      format,
      page ?? 1,
      status,
    ],
    queryFn: async () => {
      const _query = query ? `&query=${query}` : "";
      const _season = season ? `&season=${season}` : "";
      const _genres =
        genres && genres.length !== 0
          ? `&genres=[${genres
              .split(",")
              .map((genre) => `"${genre}"`)
              .join(",")}]`
          : "";
      const _year = year ? `&year=${year}` : "";
      const _sortBy = `&sort=["${sortBy ?? SortBy.TRENDING_DESC}"]`;
      const _format = format ? `&format=${format}` : "";
      const _page = `&page=${page ?? 1}`;
      const _status = status ? `&status=${status}` : "";

      const { data: filteredAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/advanced-search?perPage=30${_query}${_season}${_genres}${_year}${_sortBy}${_format}${_page}${_status}`
      );

      return filteredAnimes as MultipleAnimeResponse;
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useFetchAnimeInfoAnify(animeId: string){
  return useQuery({
    queryKey: ["animeInfoAnify", animeId],
    queryFn: async () => {
      const {data: animeInfoAnify} = await axios.get(`https://anify.eltik.cc/info/${animeId}?fields=[episodes,bannerImage,coverImage,title,rating,trailer,description,type,id,totalEpisodes,year,status,format]`)
      return animeInfoAnify as AnimeInfoAnify
    }
  })
}

export function useFetchAnimeInfoAnilist(animeId: string){
  return useQuery({
    queryKey: ["animeInfoAnilist", animeId],
    queryFn: async () => {
      const {data: animeInfoAnilist} = await axios.get(`${BASE_URL_ANILIST}/info/${animeId}`)
      return animeInfoAnilist as AnimeInfoAnilist
    }
  })
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
  animeInfoAnilist: AnimeInfoAnilist | undefined,
  animeInfoAnify: AnimeInfoAnify | undefined
) {
  return useQuery({
    queryKey: [
      "chunkedEpisodes",
      `anify ${animeInfoAnify?.id}`,
      `anilist ${animeInfoAnilist?.id}`,
    ],
    queryFn: () => {
      const a = chunkEpisodes(
        getEpisodesToBeRendered(
          animeInfoAnify,
          animeInfoAnilist
        ),
        30
      );
      return a;
    },
    enabled: !!animeInfoAnify || !!animeInfoAnilist,
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
