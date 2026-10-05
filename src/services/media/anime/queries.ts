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
  // AnimeEpisodeStreamLinks,
} from "@/utils/types/media/anime/animeAnilist";
import { getEpisodesToBeRendered } from "@/utils/functions/media/animeFunctions";
import { chunkEpisodes } from "@/utils/functions/media/sharedFunctions";
import { AnimeEpisodesData } from "@/utils/types/media/anime/shared";
import { drawRandomURL, simpleHash } from "@/utils/functions/sharedFunctions";

const ANILIST_URL = drawRandomURL({
  urlList: [
    `${import.meta.env.VITE_N_ANILIST_URL}`,
    `${import.meta.env.VITE_ANILIST_URL}`,
    `${import.meta.env.VITE_K_ANILIST_URL}`,
  ],
});

export function useAnimesByCategory(
  perPage: number,
  category: AnimeSortBy,
  status?: AnilistAnimeStatus,
) {
  return useQuery({
    queryKey: ["categoryAnime", perPage, category],
    queryFn: async () => {
      const { data: categoryAnime } = await axios.get(
        `${ANILIST_URL}/advanced-search?sort=["${category}"]&perPage=${perPage}${status ? `&status=${status}` : ""}`,
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
        `${ANILIST_URL}/advanced-search?query=${query}&perPage=10`,
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
            sort: `["${sortBy ?? AnimeSortBy.TRENDING_DESC}"]`,
            format,
            page: page ?? 1,
            status,
          },
        },
      );

      return filteredAnimes as PaginatedAnimeResponse;
    },
  });
}

type UseFetchAnimeInfoArgs = {
  animeId: string;
};

export function useAnimeInfo({ animeId }: UseFetchAnimeInfoArgs) {
  return useQuery({
    queryKey: ["animeInfo", animeId],
    queryFn: async () => {
      const anilistResponse = await axios
        .get(`${ANILIST_URL}/data/${animeId}`)
        .catch(() => null);

      if (!anilistResponse) {
        throw new Error("error fetch anime info.");
      }

      const animeInfoAnilist = anilistResponse.data as AnimeInfoAnilist;
      return { animeInfoAnilist };
    },
  });
}

export function useAnimeEpisodes(animeId: string) {
  return useQuery({
    queryKey: ["episodes", animeId],
    queryFn: async () => {
      const [anizipResponse] = await axios.all([
        axios
          .get(
            `${import.meta.env.VITE_ANIZIP_URL}/mappings?anilist_id=${animeId}`,
          )
          .catch(() => null),
      ]);

      const anizipEps = anizipResponse?.data as AnimeInfoAnizip;
      return {
        anizipEps,
      };
    },
  });
}

export function useEpisodeInfo(
  episodeId: string,
  chunkedEpisodes: EpisodeChunk[] | null | undefined,
) {
  return useQuery({
    queryKey: ["episodeInfo", episodeId],
    queryFn: () => {
      let foundEpisode: unknown;

      for (let i = 0; i < chunkedEpisodes!.length; i++) {
        foundEpisode = chunkedEpisodes![i].episodes.find(
          (episode) => episode.id.replace(/^\//, "") === episodeId,
        );
        if (foundEpisode) break;
      }
      return foundEpisode as EpisodeToBeRendered;
    },
    enabled: !!chunkedEpisodes,
  });
}

export function useChunkAnimeEpisodes(
  animeEpisodes: AnimeEpisodesData | undefined,
) {
  const anizipEpisodes = animeEpisodes?.anizipEps;

  return useQuery({
    queryKey: ["chunkedEpisodes", simpleHash(JSON.stringify(anizipEpisodes))],
    queryFn: () => {
      return chunkEpisodes(getEpisodesToBeRendered(anizipEpisodes), 30);
    },
    enabled: !!animeEpisodes,
  });
}
