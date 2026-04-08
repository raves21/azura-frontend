import { useMediaPortalStore } from "@/utils/stores/useMediaPortal";
import {
  EpisodeToBeRendered,
  EpisodeChunk,
  TVMovieServerName,
  AnimeServerName,
  ZencloudEpisodeChunk,
  ZencloudEpisodeToBeRendered,
} from "@/utils/types/media/shared";
import { animeServerNames } from "@/utils/variables/media/anime";
import { tvMovieserverNames } from "@/utils/variables/media/shared";

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

export function buildMovieEmbedLink(id: string, server: TVMovieServerName) {
  switch (server) {
    case TVMovieServerName.serverZenith:
      return `${import.meta.env.VITE_VIDEASY_URL}/movie/${id}?color=c026d3`;
    case TVMovieServerName.serverYuna:
      return `${import.meta.env.VITE_RIVESTREAM_URL}?type=movie&id=${id}`;
    case TVMovieServerName.serverXanthe:
      return `${import.meta.env.VITE_VIDROCK_URL}/movie/${id}?theme=c026d3&episodeselector=false&autoplay=false`;
    case TVMovieServerName.serverWisteria:
      return `${import.meta.env.VITE_VIDNEST_URL}/movie/${id}`;
    case TVMovieServerName.serverVaelis:
      return `${import.meta.env.VITE_VIDZEN_URL}/movie/${id}`;
    case TVMovieServerName.serverUmbra:
      return `${import.meta.env.VITE_VIDFAST_URL}/movie/${id}?autoPlay=false`;
    case TVMovieServerName.serverThalor:
      return `${import.meta.env.VITE_EMBED1_URL}/movie/${id}`;
    case TVMovieServerName.serverSolus:
      return `${import.meta.env.VITE_EMBED2_URL}/movie?tmdb=${id}`;
    default:
      return null;
  }
}

export function buildTVEmbedLink(
  id: string,
  season: number,
  episode: number,
  server: TVMovieServerName,
) {
  switch (server) {
    case TVMovieServerName.serverZenith:
      return `${import.meta.env.VITE_VIDEASY_URL}/tv/${id}/${season}/${episode}?color=c026d3`;
    case TVMovieServerName.serverYuna:
      return `${import.meta.env.VITE_RIVESTREAM_URL}?type=tv&id=${id}&season=${season}&episode=${episode}`;
    case TVMovieServerName.serverXanthe:
      return `${import.meta.env.VITE_VIDROCK_URL}/tv/${id}/${season}/${episode}?theme=c026d3&episodeselector=false&autoplay=false`;
    case TVMovieServerName.serverWisteria:
      return `${import.meta.env.VITE_VIDNEST_URL}/tv/${id}/${season}/${episode}`;
    case TVMovieServerName.serverVaelis:
      return `${import.meta.env.VITE_VIDZEN_URL}/tv/${id}/${season}/${episode}`;
    case TVMovieServerName.serverUmbra:
      return `${import.meta.env.VITE_VIDFAST_URL}/tv/${id}/${season}/${episode}?autoPlay=false`;
    case TVMovieServerName.serverThalor:
      return `${import.meta.env.VITE_EMBED1_URL}/tv/${id}/${season}/${episode}`;
    case TVMovieServerName.serverSolus:
      return `${import.meta.env.VITE_EMBED2_URL}/tv?tmdb=${id}&season=${season}&episode=${episode}`;
    default:
      return null;
  }
}

export function buildAnimeEmbedLink(
  id: string,
  episode: number,
  server: AnimeServerName,
  isMovie?: boolean,
) {
  switch (server) {
    case AnimeServerName.serverBlight:
      return `${import.meta.env.VITE_VIDNEST_URL}/anime/${id}/${episode}/sub`;
    case AnimeServerName.serverCrowe:
      if (isMovie) {
        return `${import.meta.env.VITE_VIDEASY_URL}/anime/${id}?color=c026d3`;
      }
      return `${import.meta.env.VITE_VIDEASY_URL}/anime/${id}/${episode}?color=c026d3`;
    default:
      return null;
  }
}

export function getDefaultTVMovieServer() {
  const defaultServer = localStorage.getItem(
    "defaultTVMovieServer",
  ) as TVMovieServerName | null;

  if (defaultServer && tvMovieserverNames.includes(defaultServer)) {
    return defaultServer;
  }
  return TVMovieServerName.serverZenith;
}

export function getDefaultAnimeServer() {
  const defaultServer = localStorage.getItem(
    "defaultAnimeServer",
  ) as AnimeServerName | null;

  if (defaultServer && animeServerNames.includes(defaultServer)) {
    return defaultServer;
  }
  return AnimeServerName.serverAshen;
}
