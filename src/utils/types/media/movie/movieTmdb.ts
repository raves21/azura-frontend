import { PaginatedTMDBResponse, TMDBGenre, TMDBResource } from "../shared";

export type PaginatedMovieResponse = PaginatedTMDBResponse & {
  results: MovieTMDB[];
};

export type MovieTMDB = TMDBResource & {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
};

export type MovieInfo = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: TMDBGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ProductionCompany = {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export enum MovieSortBy {
  POPULARITY_DESC = "popularity.desc",
  REVENUE_DESC = "revenue.desc",
  VOTE_AVERAGE_DESC = "vote_average.desc"
}

export enum MovieGenre {
  ACTION = 28,
  ADVENTURE = 12,
  ANIMATION = 16,
  COMEDY = 35,
  CRIME = 80,
  DOCUMENTARY = 99,
  DRAMA = 18,
  FAMILY = 10751,
  FANTASY = 14,
  HISTORY = 36,
  HORROR = 27,
  MUSIC = 10402,
  MYSTERY = 9648,
  ROMANCE = 10749,
  SCIENCE_FICTION = 878,
  TV_MOVIE = 10770,
  THRILLER = 53,
  WAR = 10752,
  WESTERN = 37
}
