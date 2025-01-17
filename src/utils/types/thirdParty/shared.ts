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
