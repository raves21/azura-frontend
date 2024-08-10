import { AnimeInfoAnify } from "../types/animeAnify";
import {
  AnimeInfoAnilist,
  EpisodeChunk,
  EpisodeToBeRendered,
} from "../types/animeAnilist";

export function chunkEpisodes(
  eps: EpisodeToBeRendered[],
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
  return chunkedEpisodes;
}

export function getEpisodesToBeRendered(
  animeInfoAnify: AnimeInfoAnify | undefined,
  animeInfoAnilist: AnimeInfoAnilist | undefined
): EpisodeToBeRendered[] | null {
  //getting anify anime episodes from different providers
  const gogoAnimeData = animeInfoAnify?.episodes.data.find(
    (epData) => epData.providerId === "gogoanime"
  );
  const animePaheData = animeInfoAnify?.episodes.data.find(
    (epData) => epData.providerId === "animepahe"
  );
  const zoroData = animeInfoAnify?.episodes.data.find(
    (epData) => epData.providerId === "zoro"
  );

  //anify episodes to be used for streaming (gogoanime only)
  const gogoAnimeEpisodes = gogoAnimeData ? gogoAnimeData.episodes : null;
  //anilist epiosdes to be used (as a fallback, if anify-gogoanime does not have episodes)
  const anilistEpisodes = animeInfoAnilist?.episodes;

  let epsToBeRendered: EpisodeToBeRendered[] | null;

  if (gogoAnimeEpisodes && gogoAnimeEpisodes.length !== 0) {
    epsToBeRendered = gogoAnimeEpisodes.map((ep, i) => {
      return {
        //get episode ids from gogoanime
        id: ep.id,
        number: ep.number,

        //get episode images from animepahe
        image:
          animePaheData && animePaheData.episodes[i]
            ? animePaheData.episodes[i].img ?? animeInfoAnilist?.cover
            : animeInfoAnilist?.cover,
        //get episode titles from zoro
        title:
          zoroData && zoroData.episodes[i]
            ? zoroData.episodes[i].title ?? ep.title
            : ep.title,
      };
    });
  } else if (anilistEpisodes && anilistEpisodes.length !== 0) {
    epsToBeRendered = anilistEpisodes.map((ep) => {
      return {
        id: ep.id,
        title: ep.title ?? `EP ${ep.number}`,
        number: ep.number,
        image: ep.image,
      };
    });
  } else {
    //else, accept the fact that the selected anime just has no episodes
    epsToBeRendered = null;
  }
  return epsToBeRendered;
}
