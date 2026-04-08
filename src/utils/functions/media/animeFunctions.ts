import { drawRandomURL, simpleHash } from "@/utils/functions/sharedFunctions";
import {
  AnimeInfoAnizip,
  AnizipEpisodes,
} from "@/utils/types/media/anime/animeAnizip";
import { ZencloudEpisode } from "@/utils/types/media/anime/animeZencloud";
import {
  EpisodeToBeRendered,
  ZencloudEpisodeToBeRendered,
} from "@/utils/types/media/shared";

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

export function getZencloudEpisodesToBeRendered(
  zencloudEps: ZencloudEpisode[] | undefined,
  anizipEps: AnizipEpisodes | undefined,
): ZencloudEpisodeToBeRendered[] | null {
  if (zencloudEps && zencloudEps.length > 0) {
    return zencloudEps.map((ep) => {
      const anizipEp = anizipEps
        ? anizipEps[ep.episode]
          ? anizipEps[ep.episode]
          : null
        : null;

      return {
        id: ep.access_id,
        embedUrl: ep.player_url,
        number: ep.episode,
        title: anizipEp?.title.en || `EP ${ep.episode}`,
        image: anizipEp?.image || null,
      };
    });
  }
  return null;
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
  return drawRandomURL({ urlList: urls });
}
