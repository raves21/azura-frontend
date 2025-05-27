import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { EpisodeToBeRendered, EpisodeChunk } from "@/utils/types/media/shared";
import { AnimeInfoAnizip } from "@/utils/types/media/anime/animeAnizip";
import {
  AnimeSortBy,
  AnilistAnimeStatus,
  PaginatedAnimeResponse,
  AnimeSeason,
  AnimeFormat,
  AnimeInfoAnilist,
  AnimeGenre,
  AnimeEpisodeStreamLinks,
} from "@/utils/types/media/anime/animeAnilist";
import {
  chunkEpisodes,
  getEpisodesToBeRendered,
  getRandomAniwatchProxyURL,
} from "../functions/animeFunctions";
import {
  AnimeInfoAniwatch,
  AniwatchEpisode,
} from "@/utils/types/media/anime/animeAniwatch";
import { AnimeEpisodesData } from "@/utils/types/media/anime/shared";
import { drawRandomURL } from "@/utils/functions/sharedFunctions";

const ANILIST_URL = drawRandomURL({
  urlList: [
    `${import.meta.env.VITE_N_ANILIST_URL}`,
    `${import.meta.env.VITE_ANILIST_URL}`,
    `${import.meta.env.VITE_K_ANILIST_URL}`,
  ],
});

const ANIWATCH_URL = drawRandomURL({
  urlList: [
    `${import.meta.env.VITE_ANIWATCH_API_URL_2}`,
    `${import.meta.env.VITE_ANIWATCH_API_URL_3}`,
    `${import.meta.env.VITE_ANIWATCH_API_URL}`,
  ]
})

export function useAnimesByCategory(
  perPage: number,
  category: AnimeSortBy,
  status?: AnilistAnimeStatus
) {
  return useQuery({
    queryKey: ["categoryAnime", perPage, category],
    queryFn: async () => {
      const { data: categoryAnime } = await axios.get(
        `${ANILIST_URL}/advanced-search?sort=["${category}"]&perPage=${perPage}${status ? `&status=${status}` : ""}`
      );
      return categoryAnime as PaginatedAnimeResponse;
    },
  });
}

export function useSearchAnime(query: string, enabled: boolean) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const { data: searchResults } = await axios.get(
        `${ANILIST_URL}/advanced-search?query=${query}&perPage=10`
      );
      return searchResults as PaginatedAnimeResponse;
    },
    enabled: enabled,
  });
}

type UseFilterAnimeArgs = {
  query?: string;
  season?: AnimeSeason;
  genres?: AnimeGenre[];
  year?: number;
  sortBy?: AnimeSortBy;
  format?: AnimeFormat;
  page?: number;
  status?: AnilistAnimeStatus;
};

export function useFilterAnime({
  query,
  season,
  genres,
  year,
  sortBy,
  format,
  page,
  status,
}: UseFilterAnimeArgs) {
  return useQuery({
    queryKey: [
      "filterAnime",
      query,
      season,
      genres,
      year,
      sortBy ?? AnimeSortBy.TRENDING_DESC,
      format,
      page ?? 1,
      status,
    ],
    queryFn: async () => {
      const { data: filteredAnimes } = await axios.get(
        `${ANILIST_URL}/advanced-search`,
        {
          params: {
            perPage: 30,
            query,
            season,
            genres: genres
              ? `[${genres?.map((genre) => `"${genre}"`)}]`
              : undefined,
            year,
            sort: [sortBy],
            format,
            page: page ?? 1,
            status,
          },
        }
      );

      return filteredAnimes as PaginatedAnimeResponse;
    },
  });
}

type UseFetchAnimeInfoArgs = {
  animeId: string;
  title: string;
  titleLang: "eng" | "jap";
};

export function useAnimeInfo({
  animeId,
  title,
  titleLang,
}: UseFetchAnimeInfoArgs) {
  return useQuery({
    queryKey: ["animeInfo", animeId],
    queryFn: async () => {
      const [anilistResponse, aniwatchResponse] = await axios.all([
        axios.get(`${ANILIST_URL}/data/${animeId}`).catch(() => null),
        axios
          .get(`${import.meta.env.VITE_ANILIST_TO_ANIWATCH_URL}/info`, {
            params: {
              title,
              type: titleLang,
            },
          })
          .catch(() => null),
      ]);

      if (!anilistResponse && !aniwatchResponse) {
        throw new Error("error fetch anime info.");
      }

      const animeInfoAnilist = anilistResponse?.data as AnimeInfoAnilist;
      const animeInfoAniwatch = aniwatchResponse?.data
        .data as AnimeInfoAniwatch;
      return { animeInfoAnilist, animeInfoAniwatch };
    },
  });
}

type UseFetchAnimeEpisodesArgs = {
  animeId: string;
  title: string;
  titleLang: "eng" | "jap";
};
export function useAnimeEpisodes({
  animeId,
  title,
  titleLang,
}: UseFetchAnimeEpisodesArgs) {
  return useQuery({
    queryKey: ["episodes", animeId],
    queryFn: async () => {
      const [anizipResponse, aniwatchResponse] = await axios.all([
        axios
          .get(
            `${import.meta.env.VITE_ANIZIP_URL}/mappings?anilist_id=${animeId}`
          )
          .catch(() => null),
        axios.get(`${import.meta.env.VITE_ANILIST_TO_ANIWATCH_URL}/episodes`, {
          params: {
            title,
            type: titleLang,
          },
        }),
      ]);

      if (!aniwatchResponse) {
        throw new Error("therse was an error fetching episodes for this anime");
      }

      const aniwatchEps = aniwatchResponse.data.data as AniwatchEpisode[];
      const anizipEps = anizipResponse?.data as AnimeInfoAnizip;
      return { aniwatchEps, anizipEps };
    },
  });
}

export function useAnimeEpisodeStreamLinks(episodeId: string) {
  return useQuery({
    queryKey: ["watchEpisode", episodeId],
    queryFn: async () => {
      const { data: episodeStreamLinks } = await axios.get(
        `${getRandomAniwatchProxyURL()}`,
        {
          params: {
            url: `${ANIWATCH_URL}/api/v2/hianime/episode/sources?animeEpisodeId=${episodeId}&server=hd-2`,
          },
        }
      );
      return episodeStreamLinks.data as AnimeEpisodeStreamLinks;
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

export function useChunkAnimeEpisodes(
  animeEpisodes: AnimeEpisodesData | undefined
) {
  const aniwatchEpisodes = animeEpisodes?.aniwatchEps;
  const anizipEpisodes = animeEpisodes?.anizipEps;
  return useQuery({
    queryKey: ["chunkedEpisodes", animeEpisodes],
    queryFn: () => {
      return chunkEpisodes(
        getEpisodesToBeRendered(aniwatchEpisodes, anizipEpisodes),
        30
      );
    },
    enabled: !!animeEpisodes,
  });
}
