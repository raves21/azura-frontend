import { Data } from "../types/animeAnify";
import {
  Episode,
  EpisodeChunk,
  EpisodeToBeRendered,
} from "../types/animeAnilist";
import { AnimeInfoAnizip } from "../types/animeAnizip";

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
        startEp: start,
        endEp: end,
        episodes: eps.slice(i * epsPerChunk, (i + 1) * epsPerChunk),
      };
    }
  );
  return chunkedEpisodes;
}

// export function getEpisodesToBeRendered(
//   animeInfoAnify: AnimeInfoAnify | undefined,
//   animeInfoAnilist: AnimeInfoAnilist | undefined
// ): EpisodeToBeRendered[] | null {
//   //getting anify anime episodes from different providers
//   const gogoAnimeData = animeInfoAnify?.episodes.data.find(
//     (epData) => epData.providerId === "gogoanime"
//   );
//   // const animePaheData = animeInfoAnify?.episodes.data.find(
//   //   (epData) => epData.providerId === "animepahe"
//   // );
//   const zoroData = animeInfoAnify?.episodes.data.find(
//     (epData) => epData.providerId === "zoro"
//   );

//   //anify episodes to be used for streaming (gogoanime only)
//   const gogoAnimeEpisodes = gogoAnimeData ? gogoAnimeData.episodes : null;
//   //anilist epiosdes to be used (as a fallback, if anify-gogoanime does not have episodes)
//   const anilistEpisodes = animeInfoAnilist?.episodes;

//   if (gogoAnimeEpisodes && gogoAnimeEpisodes.length !== 0) {
//     return gogoAnimeEpisodes.map((ep, i) => ({
//       //get episode ids from gogoanime
//       id: ep.id,
//       number: ep.number,

//       // ! since (9/8/24) this method of getting episode image doesnt work
//       // ! requesting animePahe images returns 403 forbidden, (might be CORS)
//       // image:
//       //   animePaheData && animePaheData.episodes[i]
//       //     ? animePaheData.episodes[i].img : animeInfoAnilist?.cover,

//       // ! currently this is the way.
//       // ! we just hope anilist gives us episode images 🙏
//       //get episode images from anilist, if none, just the default image
//       image: anilistEpisodes
//         ? anilistEpisodes[i].image
//         : animeInfoAnilist?.cover ?? animeInfoAnify?.coverImage,

//       //get episode titles from zoro
//       title:
//         zoroData && zoroData.episodes[i]
//           ? zoroData.episodes[i].title
//           : ep.title,
//     }));
//   } else if (anilistEpisodes && anilistEpisodes.length !== 0) {
//     return anilistEpisodes.map((ep) => ({
//       id: ep.id,
//       title: ep.title ?? `EP ${ep.number}`,
//       number: ep.number,
//       image: ep.image,
//     }));
//   } else {
//     //else, accept the fact that the selected anime has no episodes
//     return null;
//   }
// }

export function getEpisodesToBeRendered(
  anifyEpisodes: Data[] | null | undefined,
  anilistEpisodes: Episode[] | null | undefined,
  animeInfoAnizip: AnimeInfoAnizip | null | undefined
): EpisodeToBeRendered[] | null {
  //getting anify anime episodes from different providers
  const gogoAnimeData = anifyEpisodes?.find(
    (epData) => epData.providerId === "gogoanime"
  );
  const zoroData = anifyEpisodes?.find(
    (epData) => epData.providerId === "zoro"
  );

  //anify episodes to be used for streaming (gogoanime only)
  const gogoAnimeEpisodes = gogoAnimeData ? gogoAnimeData.episodes : null;

  if (gogoAnimeEpisodes && gogoAnimeEpisodes.length !== 0) {
    const a = gogoAnimeEpisodes.map((ep, i) => {
      return {
        //get episode ids from gogoanime
        id: ep.id,
        number: ep.number,

        image: animeInfoAnizip?.episodes[i + 1].image,
        //get episode titles from zoro
        title:
          zoroData && zoroData.episodes[i]
            ? zoroData.episodes[i].title
            : animeInfoAnizip?.episodes[i + 1].title.en ?? `EP ${ep.number}`,
      };
    });
    return a;
  } else if (anilistEpisodes && anilistEpisodes.length !== 0) {
    const a = anilistEpisodes.map((ep, i) => ({
      id: ep.id,
      title:
        animeInfoAnizip?.episodes[i + 1].title.en ??
        ep.title ??
        `EP ${ep.number}`,
      number: ep.number,
      image: animeInfoAnizip?.episodes[i + 1].image ?? ep.image,
    }));
    return a;
  } else {
    //else, accept the fact that the selected anime has no episodes
    return null;
  }
}

export function getRatingScore(rating: number) {
  const decimal = (rating * 10).toString().split(".")[1];
  if (!decimal || decimal.length < 1) return (0.05 * (rating * 10)).toFixed(1);
  return (0.05 * (rating * 10)).toFixed(2);
}
