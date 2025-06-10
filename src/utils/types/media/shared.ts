import { PaginatedResponse } from "../social/shared";

export type EpisodeToBeRendered = {
  id: string;
  title: string;
  number: number;
  image: string | null | undefined;
};

export type EpisodeChunk = {
  label: string;
  startEp: number;
  endEp: number;
  episodes: EpisodeToBeRendered[];
};

export type TMDBResource = {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
};

export type PaginatedTMDBResponse = {
  page: number;
  total_pages: number;
  total_results: number;
};

export type TMDBGenre = {
  id: number;
  name: string;
};

export type MediaScraperResponse = {
  message?: string;
  headers: Headers;
  provider: string;
  servers: string[];
  url: URL[];
  tracks: Subtitle[];
  proxy: boolean;
};

export type Headers = {
  Referer: string;
};

export type Subtitle = {
  lang: string;
  url: string;
};

export type URL = {
  lang: string;
  link: string;
  type: string;
};

export type SearchSchemaValidationStatus = {
  success?: boolean;
};

export type MediaExistenceInCollection = {
  id: string;
  name: string;
  doesGivenMediaExist: boolean;
};

export type PaginatedMediaExistenceInCollectionsResponse = PaginatedResponse & {
  data: MediaExistenceInCollection[];
};

export enum TVMovieServerName {
  azuraMain = "Azura Main",
  embed1 = "Embed 1",
  embed2 = "Embed 2",
}

export enum AnimeServerName {
  server1 = "Server 1",
  server2 = "Server 2",
}

export type MovieArgs = {
  type: "movie";
};

export type TVArgs = {
  type: "tv";
  seasonNum: number;
  episodeNum: number;
};
