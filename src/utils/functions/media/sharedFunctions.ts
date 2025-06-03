import { useMediaPortalStore } from "@/utils/stores/useMediaPortal";
import { EpisodeToBeRendered, EpisodeChunk } from "@/utils/types/media/shared";

export function getTMDBImageURL(imagePath: string) {
  return `https://image.tmdb.org/t/p/original${imagePath}`;
}

export function getTMDBReleaseYear(releaseDate: string) {
  return releaseDate ? releaseDate.split("-")[0] : "";
}

export function getAnimeRatingInfoPage(
  aniwatchRating: number | undefined,
  anilistRating: number | undefined
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
