import { EpisodeChunk, Episode } from "../types/anime_anilist";

export function chunkEpisodes(
  eps: Episode[],
  epsPerChunk: number
): EpisodeChunk[] {
  const chunkedEpisodes = Array.from(
    { length: Math.ceil(eps.length / epsPerChunk) },
    (_, i) => {
      const start = i * epsPerChunk + 1;
      const end = Math.min((i + 1) * epsPerChunk, eps.length);
      return {
        startEp: start,
        endEp: end,
        episodes: eps.slice(i * epsPerChunk, (i + 1) * epsPerChunk),
      };
    }
  );

  console.log(chunkedEpisodes);

  return chunkedEpisodes;
}
