import { simpleHash } from "@/utils/functions/sharedFunctions";
import { AnimeInfoAnizip } from "@/utils/types/media/anime/animeAnizip";
import { EpisodeToBeRendered } from "@/utils/types/media/shared";

export function getEpisodesToBeRendered(
  animeInfoAnizip: AnimeInfoAnizip | undefined,
): EpisodeToBeRendered[] | null {
  if (animeInfoAnizip) {
    const episodes = Object.entries(animeInfoAnizip.episodes);

    if (!episodes.length) return null;

    return Object.entries(animeInfoAnizip.episodes)
      .filter(([key]) => /^\d+$/.test(key))
      .map(([epNum, ep]) => ({
        id: `${simpleHash(JSON.stringify(animeInfoAnizip.titles))}-${epNum}`,
        image: ep.image,
        number: ep.episodeNumber,
        title: ep.title.en || `EP ${ep.episodeNumber}`,
      }));
  }
  return null;
}
