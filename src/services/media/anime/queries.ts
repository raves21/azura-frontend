import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  EpisodeToBeRendered,
  EpisodeChunk,
  ZencloudEpisodeChunk,
  ZencloudEpisodeToBeRendered,
} from "@/utils/types/media/shared";
import {
  AnimeInfoAnizip,
  AnizipEpisodes,
} from "@/utils/types/media/anime/animeAnizip";
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
import {
  getEpisodesToBeRendered,
  getZencloudEpisodesToBeRendered,
  // getRandomAniwatchProxyURL,
} from "@/utils/functions/media/animeFunctions";
import {
  chunkEpisodes,
  chunkZencloudEpisodes,
} from "@/utils/functions/media/sharedFunctions";
// import {
//   AnimeInfoAniwatch,
//   AniwatchEpisode,
// } from "@/utils/types/media/anime/animeAniwatch";
import {
  AnimeEpisodesData,
  ZencloudEpisodesData,
} from "@/utils/types/media/anime/shared";
import { drawRandomURL, simpleHash } from "@/utils/functions/sharedFunctions";
import {
  ZencloudEpisode,
  ZencloudResponse,
} from "@/utils/types/media/anime/animeZencloud";
import { api } from "@/utils/variables/axiosInstances/backendAxiosInstance";

const ANILIST_URL = drawRandomURL({
  urlList: [
    `${import.meta.env.VITE_N_ANILIST_URL}`,
    `${import.meta.env.VITE_ANILIST_URL}`,
    `${import.meta.env.VITE_K_ANILIST_URL}`,
  ],
});

// const ANIWATCH_URL = drawRandomURL({
//   urlList: [
//     `${import.meta.env.VITE_ANIWATCH_API_URL_2}`,
//     `${import.meta.env.VITE_ANIWATCH_API_URL_3}`,
//     `${import.meta.env.VITE_ANIWATCH_API_URL}`,
//   ],
// });

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
      const [
        anilistResponse,
        // aniwatchResponse
      ] = await axios.all([
        axios.get(`${ANILIST_URL}/data/${animeId}`).catch(() => null),
        // axios
        //   .get(`${import.meta.env.VITE_ANILIST_TO_ANIWATCH_URL}/info`, {
        //     params: {
        //       title,
        //       type: titleLang,
        //     },
        //   })
        //   .catch(() => null),
      ]);

      if (
        !anilistResponse
        // &&
        // !aniwatchResponse
      ) {
        throw new Error("error fetch anime info.");
      }

      const animeInfoAnilist = anilistResponse?.data as AnimeInfoAnilist;
      // const animeInfoAniwatch = aniwatchResponse?.data
      //   .data as AnimeInfoAniwatch;
      return {
        animeInfoAnilist,
        // animeInfoAniwatch
      };
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

type UseEmbedStreamZencloud = {
  animeId: string;
  episodeNum: number;
};

export function useEmbedStreamZencloud({
  animeId,
  episodeNum,
}: UseEmbedStreamZencloud) {
  return useQuery({
    queryKey: ["zencloudStream", animeId, episodeNum],
    queryFn: async () => {
      const { data } = await api.get(`/zencloud_episodes`, {
        params: { anilistId: animeId, episode: episodeNum },
      });

      if (data.data.length !== 1) {
        throw new Error("episode unavailable");
      }

      return data.data[0] as ZencloudEpisode;
    },
  });
}

export function useZencloudEpisodes(anilistId: string) {
  return useQuery({
    queryKey: ["zencloudEpisodes", anilistId],
    queryFn: async () => {
      const [zencloudResponse, anizipResponse] = await axios.all([
        api.get(`/zencloud_episodes?anilistId=${anilistId}`).catch(() => null),
        axios
          .get(
            `${import.meta.env.VITE_ANIZIP_URL}/mappings?anilist_id=${anilistId}`,
          )
          .catch(() => null),
      ]);

      if (!zencloudResponse) {
        throw new Error("Error fetching episodes.");
      }

      const zencloud = zencloudResponse?.data as ZencloudResponse;
      const anizipEps = anizipResponse?.data.episodes as AnizipEpisodes;

      let allZencloudEps: ZencloudEpisode[] = [];
      allZencloudEps = zencloud.data;

      if (zencloud.pagination.total_pages > 1) {
        let counter = 2;

        while (counter <= zencloud.pagination.total_pages) {
          const response = await api
            .get(`/zencloud_episodes?anilistId=${anilistId}&page=${counter}`)
            .catch(() => null);

          if (response) {
            const zencloudNext = response.data as ZencloudResponse;
            allZencloudEps = [...allZencloudEps, ...zencloudNext.data];
          } else {
            break;
          }
          counter++;
        }
      }

      //sort by ep
      allZencloudEps = [...allZencloudEps].sort(
        (a, b) => a.episode - b.episode,
      );

      return { allZencloudEps, anizipEps };
    },
  });
}

export function useChunkZencloudEpisodes(
  eps: ZencloudEpisodesData | undefined,
) {
  const anizipEps = eps?.anizipEps;
  const zencloudEps = eps?.allZencloudEps;

  return useQuery({
    queryKey: [
      "chunkedZencloudEps",
      anizipEps ? simpleHash(JSON.stringify(anizipEps)) : null,
      anizipEps ? simpleHash(JSON.stringify(zencloudEps)) : null,
    ],
    queryFn: async () => {
      return chunkZencloudEpisodes(
        getZencloudEpisodesToBeRendered(zencloudEps, anizipEps),
        30,
      );
    },
    enabled: !!eps,
  });
}

export function useZencloudEpisodeInfo(
  episodeId: string,
  chunkedEpisodes: ZencloudEpisodeChunk[] | null | undefined,
) {
  return useQuery({
    queryKey: ["zencloudEpisodeInfo", episodeId],
    queryFn: () => {
      let foundEpisode: unknown;

      for (let i = 0; i < chunkedEpisodes!.length; i++) {
        foundEpisode = chunkedEpisodes![i].episodes.find(
          (episode) => episode.id === episodeId,
        );
        if (foundEpisode) break;
      }
      return foundEpisode as ZencloudEpisodeToBeRendered;
    },
    enabled: !!chunkedEpisodes,
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
