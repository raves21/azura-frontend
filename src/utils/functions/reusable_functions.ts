import { Data } from "../types/thirdParty/animeAnify";
import { Episode } from "../types/thirdParty/animeAnilist";
import { EpisodeToBeRendered, EpisodeChunk } from "../types/thirdParty/shared";
import { AnimeInfoAnizip } from "../types/thirdParty/animeAnizip";

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
  anifyEpisodes: Data[] | undefined,
  anilistEpisodes: Episode[] | undefined,
  animeInfoAnizip: AnimeInfoAnizip | undefined
): EpisodeToBeRendered[] | null {
  //getting anify episodes
  const gogoAnimeData = anifyEpisodes?.find(
    (epData) => epData.providerId === "gogoanime"
  );
  //anify episodes to be used for streaming (gogoanime only)
  const gogoAnimeEpisodes = gogoAnimeData ? gogoAnimeData.episodes : null;

  if (gogoAnimeEpisodes && gogoAnimeEpisodes.length !== 0) {
    const a = gogoAnimeEpisodes.map((ep) => {
      return {
        id: ep.id,
        number: ep.number,
        image:
          animeInfoAnizip && animeInfoAnizip.episodes[ep.number]
            ? animeInfoAnizip.episodes[ep.number].image
            : undefined,
        title:
          animeInfoAnizip && animeInfoAnizip?.episodes[ep.number]
            ? animeInfoAnizip?.episodes[ep.number].title.en || `EP ${ep.number}`
            : `EP ${ep.number}`,
      };
    });
    return a;
  }
  //if no anify, fallback to anilist
  else if (anilistEpisodes && anilistEpisodes.length !== 0) {
    return anilistEpisodes.map((ep) => {
      return {
        id: ep.id,
        number: ep.number,
        image:
          animeInfoAnizip && animeInfoAnizip?.episodes[ep.number]
            ? animeInfoAnizip?.episodes[ep.number].image || ep.image
            : undefined,
        title:
          animeInfoAnizip && animeInfoAnizip?.episodes[ep.number]
            ? animeInfoAnizip?.episodes[ep.number].title.en || `EP ${ep.number}`
            : `EP ${ep.number}`,
      };
    });
  } else {
    //if no anify and anilist, accept the fact that the selected anime has no episodes
    return null;
  }
}

export function getRatingScore(rating: number) {
  const decimal = (rating * 10).toString().split(".")[1];
  if (!decimal || decimal.length < 1) return (0.05 * (rating * 10)).toFixed(1);
  return (0.05 * (rating * 10)).toFixed(2);
}
