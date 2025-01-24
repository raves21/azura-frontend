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
  video: boolean;
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

export type RabbitScraperResponse = {
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

export enum TMDBSortBy {
  POPULARITY_DESC = "popularity.desc",
  REVENUE_DESC = "revenue.desc",
  VOTE_AVERAGE = "vote.average",
  
}
