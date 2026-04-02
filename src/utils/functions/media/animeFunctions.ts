import { drawRandomURL } from "@/utils/functions/sharedFunctions";
import { AniwatchEpisode } from "@/utils/types/media/anime/animeAniwatch";
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
  aniwatchEpisodes: AniwatchEpisode[] | undefined,
  animeInfoAnizip: AnimeInfoAnizip | undefined,
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
