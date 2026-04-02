import { useMediaPortalStore } from "@/utils/stores/useMediaPortal";
import {
  EpisodeToBeRendered,
  EpisodeChunk,
  TVMovieServerName,
  AnimeServerName,
  ZencloudEpisodeChunk,
  ZencloudEpisodeToBeRendered,
} from "@/utils/types/media/shared";

export function getTMDBImageURL(imagePath: string) {
  return `https://image.tmdb.org/t/p/original${imagePath}`;
}

export function getTMDBReleaseYear(releaseDate: string) {
  return releaseDate ? releaseDate.split("-")[0] : "";
}

export function getAnimeRatingInfoPage(
  aniwatchRating: number | undefined,
  anilistRating: number | undefined,
) {
  let rating: string | null;
  if (anilistRating) {
    rating = (anilistRating * 0.1).toFixed(1);
  } else if (aniwatchRating) {
    rating = aniwatchRating ? aniwatchRating.toFixed(1) : null;
  } else {
    rating = null;
  }
  return rating;
}

export function getAnimeRating(rating: number | null) {
  return rating ? rating.toFixed(1) : null;
}

export function getTMDBRating(rating: number | null) {
  return rating ? rating.toFixed(1).split("-")[0] : null;
}

export function toggleMediaPortal(isMediaPortalOpen: boolean) {
  const setMediaPortalAnimationStatus =
    useMediaPortalStore.getState().setMediaPortalAnimationStatus;
  const setIsMediaPortalOpen =
    useMediaPortalStore.getState().setIsMediaPortalOpen;

  if (isMediaPortalOpen) {
    setMediaPortalAnimationStatus("exit");

    //give delay when closing media portal since its animation takes 600ms to complete
    setTimeout(() => {
      setIsMediaPortalOpen(false);
    }, 600);
  } else {
    setMediaPortalAnimationStatus("intro");
    setIsMediaPortalOpen(true);
  }
}

export function chunkZencloudEpisodes(
  eps: ZencloudEpisodeToBeRendered[] | null,
  epsPerChunk: number,
): ZencloudEpisodeChunk[] | null {
  if (!eps) return null;
  const chunkedEpisodes = Array.from(
    { length: Math.ceil(eps.length / epsPerChunk) },
    (_, i) => {
      const chunk = eps.slice(i * epsPerChunk, (i + 1) * epsPerChunk);
      const start = chunk[0].number;
      const end = chunk[chunk.length - 1].number;
      return {
        label: `${start} - ${end}`,
        startEp: start,
        endEp: end,
        episodes: chunk,
      };
    },
  );
  console.log(chunkedEpisodes);
  return chunkedEpisodes;
}

export function chunkEpisodes(
  eps: EpisodeToBeRendered[] | null,
  epsPerChunk: number,
): EpisodeChunk[] | null {
  if (!eps) return null;
  const chunkedEpisodes = Array.from(
    { length: Math.ceil(eps.length / epsPerChunk) },
    (_, i) => {
      const chunk = eps.slice(i * epsPerChunk, (i + 1) * epsPerChunk);
      const start = chunk[0].number;
      const end = chunk[chunk.length - 1].number;
      return {
        label: `${start} - ${end}`,
        startEp: start,
        endEp: end,
        episodes: chunk,
      };
    },
  );
  return chunkedEpisodes;
}

export function getDefaultTVMovieServer() {
  const server = localStorage.getItem(
    "defaultTVMovieServer",
  ) as TVMovieServerName | null;

  //temp set back to embed1
  if (server && server === "Azura Main") {
    localStorage.setItem("defaultTVMovieServer", TVMovieServerName.embed1);
  }
  const serverFinal = localStorage.getItem(
    "defaultTVMovieServer",
  ) as TVMovieServerName | null;
  return serverFinal || TVMovieServerName.embed1;
}

export function getDefaultAnimeServer() {
  // const server = localStorage.getItem(
  //   "defaultAnimeServer",
  // ) as AnimeServerName | null;

  //temporarily default to server2
  return AnimeServerName.server2;
}
