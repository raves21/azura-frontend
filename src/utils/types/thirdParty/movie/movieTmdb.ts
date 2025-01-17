import { PaginatedTMDBResponse, TMDBResource } from "../shared";

export type PaginatedMovieResponse = PaginatedTMDBResponse & {
  results: MovieTMDB[];
};

export type MovieTMDB = TMDBResource & {
  title: string;
  original_title: string;
  release_date: string;
};
