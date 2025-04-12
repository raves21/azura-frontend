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
