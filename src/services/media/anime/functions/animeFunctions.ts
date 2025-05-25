import { drawRandomURL } from "@/utils/functions/sharedFunctions";
import { AniwatchEpisode } from "@/utils/types/media/anime/animeAniwatch";
import { AnimeInfoAnizip } from "@/utils/types/media/anime/animeAnizip";
import { EpisodeToBeRendered, EpisodeChunk } from "@/utils/types/media/shared";

export function chunkEpisodes(
  eps: EpisodeToBeRendered[] | null,
  epsPerChunk: number
): EpisodeChunk[] | null {
  if (!eps) return null;
  const chunkedEpisodes = Array.from(
    { length: Math.ceil(eps.length / epsPerChunk) },
    (_, i) => {
      const start = i * epsPerChunk + 1;
      const end = Math.min((i + 1) * epsPerChunk, eps.length);
      return {
        label: `${start} - ${end}`,
        startEp: start,
        endEp: end,
        episodes: eps.slice(i * epsPerChunk, (i + 1) * epsPerChunk),
      };
    }
  );
  return chunkedEpisodes;
}

export function getEpisodesToBeRendered(
  aniwatchEpisodes: AniwatchEpisode[] | undefined,
  animeInfoAnizip: AnimeInfoAnizip | undefined
): EpisodeToBeRendered[] | null {
  if (aniwatchEpisodes && aniwatchEpisodes.length > 0) {
    return aniwatchEpisodes.map((episode) => {
      const anizipEpisode = animeInfoAnizip
        ? animeInfoAnizip.episodes[episode.number]
          ? animeInfoAnizip.episodes[episode.number]
          : null
        : null;
      return {
        id: episode.episodeId,
        title:
          episode.title || anizipEpisode?.title.en || `EP ${episode.number}`,
        number: episode.number,
        image: anizipEpisode?.image || null,
      };
    });
  } else {
    return null;
  }
}

export function getRandomAniwatchProxyURL(): string {
  //💀💀 LOAD BALANCER HAHSQHAHAHHAHAHAH
  const urls = [
    `${import.meta.env.VITE_ANIWATCH_API_PROXY_1}`,
    `${import.meta.env.VITE_ANIWATCH_API_PROXY_2}`,
    `${import.meta.env.VITE_ANIWATCH_API_PROXY_3}`,
    `${import.meta.env.VITE_ANIWATCH_API_PROXY_4}`,
    `${import.meta.env.VITE_ANIWATCH_API_PROXY_5}`,
  ];
  return drawRandomURL({urlList: urls})
}
