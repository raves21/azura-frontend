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

export type TVShowInfo = {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air?: LastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type LastEpisodeToAir = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
};

export type Network = {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type Season = {
  air_date: Date | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type SeasonInfo = {
  _id: string;
  air_date: Date;
  episodes: TMDBTVEpisode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type TMDBTVEpisode = {
  air_date: Date;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};

export enum Department {
  Acting = "Acting",
  Camera = "Camera",
  Crew = "Crew",
  Directing = "Directing",
  Editing = "Editing",
  Production = "Production",
  Writing = "Writing"
}

export enum TVSortBy {
  POPULARITY_DESC = "popularity.desc",
  VOTE_AVERAGE = "vote_average.desc"
}

export enum TVGenre {
  ACTION_ADVENTURE = 10759,
  ANIMATION = 16,
  COMEDY = 35,
  CRIME = 80,
  DOCUMENTARY = 99,
  DRAMA = 18,
  FAMILY = 10751,
  KIDS = 10762,
  MYSTERY = 9648,
  NEWS = 10763,
  REALITY = 10764,
  SCI_FI_FANTASY = 10765,
  SOAP = 10766,
  TALK = 10767,
  WAR_POLITICS = 10768,
  WESTERN = 37
}
