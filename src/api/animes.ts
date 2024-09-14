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
  Episode,
  AnimeEpisodes,
} from "../utils/types/animeAnilist";
import { AnimeInfoAnify, Data } from "@/utils/types/animeAnify";
import {
  chunkEpisodes,
  getEpisodesToBeRendered,
} from "@/utils/functions/reusable_functions";
import { AnimeInfoAnizip } from "@/utils/types/animeAnizip";

// const frequentlyChanging = {
//   gcTime: 180 * (60 * 1000), //3 hrs
//   staleTime: 120 * (60 * 1000), //2 hrs
// };

// const rarelyChanging = {
//   gcTime: 300 * (60 * 1000), //5 hrs
//   staleTime: 240 * (60 * 1000), //4 hrs
// };

export function useFetchTrendingAnime(perPage: number, pageNum: number) {
  return useQuery({
    queryKey: ["trending", pageNum],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(
        `${import.meta.env.VITE_ANILIST_URL}/advanced-search?sort=["TRENDING_DESC"]&perPage=${perPage}&page=${pageNum}`
      );
      return trendingAnimes as MultipleAnimeResponse;
    },
  });
}

export function useFetchTopRatedAnime(perPage: number) {
  return useQuery({
    queryKey: ["topRated", perPage],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(
        `${import.meta.env.VITE_N_ANILIST_URL}/advanced-search?sort=["SCORE_DESC"]&perPage=${perPage}`
      );
      return trendingAnimes as MultipleAnimeResponse;
    },
  });
}

export function useFetchAllTimeFavoriteAnime(perPage: number) {
  return useQuery({
    queryKey: ["allTimeFavorite"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(
        `${import.meta.env.VITE_ANILIST_URL}/advanced-search?sort=["FAVOURITES_DESC"]&perPage=${perPage}&page=1`
      );
      return trendingAnimes as MultipleAnimeResponse;
    },
  });
}

export function useSearchAnime(query: string, enabled: boolean) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const { data: searchResults } = await axios.get(
        `${import.meta.env.VITE_ANILIST_URL}/advanced-search?query=${query}&perPage=10`
      );
      return searchResults as MultipleAnimeResponse;
    },
    enabled: enabled,
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
        `${import.meta.env.VITE_ANILIST_URL}/advanced-search?perPage=30${_query}${_season}${_genres}${_year}${_sortBy}${_format}${_page}${_status}`
      );

      return filteredAnimes as MultipleAnimeResponse;
    },
  });
}

//currently used for fetching anime info
export function useFetchAnimeInfo(animeId: string) {
  return useQuery({
    queryKey: ["animeInfo", animeId],
    queryFn: async () => {
      const [anilistResponse, anifyResponse] = await axios.all([
        axios
          .get(`${import.meta.env.VITE_ANILIST_URL}/data/${animeId}`)
          .catch(() => null),
        axios
          .get(
            `${import.meta.env.VITE_ANIFY_URL}/info/${animeId}?fields=[bannerImage,coverImage,title,rating,trailer,description,id,totalEpisodes,year,status,format]`
          )
          .catch(() => null),
      ]);

      if (!anilistResponse && !anifyResponse) {
        throw new Error("error fetch anime info.");
      }

      const animeInfoAnilist = anilistResponse?.data as AnimeInfoAnilist;
      const animeInfoAnify = anifyResponse?.data as AnimeInfoAnify;
      return { animeInfoAnilist, animeInfoAnify };
    },
  });
}

export function useFetchPopularAnimes(perPage: number) {
  return useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const { data: popularAnimes } = await axios.get(
        `${import.meta.env.VITE_ANILIST_URL}/advanced-search?sort=["POPULARITY_DESC"]&perPage=${perPage}`
      );
      return popularAnimes as MultipleAnimeResponse;
    },
  });
}

export function useFetchAnimeEpisodes(animeId: string) {
  return useQuery({
    queryKey: ["episodes", animeId],
    queryFn: async () => {
      const [anifyEpsResponse, anilistEpsResponse] = await axios.all([
        axios
          .get(
            `${import.meta.env.VITE_ANIFY_URL}/info/${animeId}?fields=[episodes]`
          )
          .catch(() => null),
        axios
          .get(`${import.meta.env.VITE_ANILIST_URL}/episodes/${animeId}`)
          .catch(() => null),
      ]);

      if (!anifyEpsResponse && !anilistEpsResponse) {
        throw new Error("therse was an error fetching episodes for this anime");
      }

      const anizipResponse = await axios.get(
        `${import.meta.env.VITE_ANIZIP_URL}/mappings?anilist_id=${animeId}`
      );

      const anifyEps = anifyEpsResponse?.data.episodes.data as Data[];
      const anilistEps = anilistEpsResponse?.data as Episode[];
      const anizipEps = anizipResponse?.data as AnimeInfoAnizip;
      return { anifyEps, anilistEps, anizipEps };
    },
  });
}

export function useFetchEpisodeStreamLinks(episodeId: string) {
  return useQuery({
    queryKey: ["watchEpisode", episodeId],
    queryFn: async () => {
      const { data: episodeStreamLinks } = await axios.get(
        `${import.meta.env.VITE_ANILIST_URL}/watch/${episodeId}`
      );
      return episodeStreamLinks as EpisodeStreamLinks;
    },
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
  });
}

export function useChunkEpisodes(animeEpisodes: AnimeEpisodes | undefined) {
  const anifyEpisodes = animeEpisodes?.anifyEps;
  const anilistEpisodes = animeEpisodes?.anilistEps;
  const anizipEpisodes = animeEpisodes?.anizipEps;
  return useQuery({
    queryKey: ["chunkedEpisodes", animeEpisodes],
    queryFn: () => {
      return chunkEpisodes(
        getEpisodesToBeRendered(anifyEpisodes, anilistEpisodes, anizipEpisodes),
        30
      );
    },
    enabled: !!animeEpisodes,
  });
}
