import { PaginatedTMDBResponse, TMDBResource } from "../shared";

export type PaginatedTVShowResponse = PaginatedTMDBResponse & {
  results: TVShowTMDB[];
};

export type TVShowTMDB = TMDBResource & {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
};
