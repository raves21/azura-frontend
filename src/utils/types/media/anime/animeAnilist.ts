export type PaginatedAnimeResponse = {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
  totalResults: number;
  results: Anime[];
};

export type Anime = {
  id: string;
  malId: number;
  title: Title;
  image: string;
  imageHash: string;
  trailer: Trailer;
  description: string;
  status: AnimeStatus;
  cover: string;
  coverHash: string;
  rating: number;
  releaseDate: number;
  color: string | null;
  genres: AnimeGenre[];
  totalEpisodes: number;
  duration: number;
  type: AnimeFormat;
};

export type AnimeInfoAnilist = Anime & {
  isLicensed: boolean;
  isAdult: boolean;
  countryOfOrigin: string;
  popularity: number;
  startDate: EndDateClass;
  endDate: EndDateClass;
  currentEpisode: number;
  season: string;
  studios: string[];
  subOrDub: string;
  recommendations: Recommendation[];
  relations: Relation[];
  mappings: Mapping[];
  episodes: Episode[];
};

export enum AnimeSeason {
  WINTER = "WINTER",
  SPRING = "SPRING",
  SUMMER = "SUMMER",
  FALL = "FALL",
}

export enum AnimeGenre {
  Action = "Action",
  Adventure = "Adventure",
  Comedy = "Comedy",
  Drama = "Drama",
  Fantasy = "Fantasy",
  Horror = "Horror",
  MahouShoujo = "Mahou Shoujo",
  Mecha = "Mecha",
  Music = "Music",
  Mystery = "Mystery",
  Psychological = "Psychological",
  Romance = "Romance",
  SciFi = "Sci-Fi",
  SliceOfLife = "Slice of Life",
  Sports = "Sports",
  Supernatural = "Supernatural",
  Thriller = "Thriller",
}

export type Title = {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
};

export type Trailer = {
  id: string;
  site: string;
  thumbnail: string;
  thumbnailHash: string;
};

export enum ArtworkType {
  Banner = "banner",
  ClearArt = "clear_art",
  ClearLogo = "clear_logo",
  Icon = "icon",
  Poster = "poster",
  TopBanner = "top_banner",
}

export enum Language {
  English = "English",
  French = "French",
  German = "German",
  Indonesian = "Indonesian",
  Italian = "Italian",
  Japanese = "Japanese",
  Korean = "Korean",
  Portuguese = "Portuguese",
  Spanish = "Spanish",
  Thai = "Thai",
}

export type EndDateClass = {
  year: number;
  month: number;
  day: number;
};

export type Episode = {
  id: string;
  title: string;
  number: number;
  image?: string | null;
  img?: string | null;
};

export type Mapping = {
  id: string;
  providerId: string;
  similarity: number;
  providerType: string;
};

export type Recommendation = {
  id: number;
  malId: number;
  title: Title;
  status: AnimeStatus;
  episodes: number | null;
  image: string;
  imageHash: string;
  cover: string;
  coverHash: string;
  rating: number;
  type: AnimeFormat;
};

export enum AnilistAnimeStatus {
  RELEASING = "RELEASING",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
  NOT_YET_RELEASED = "NOT_YET_RELEASED",
}

export enum AnimeSortBy {
  TRENDING_DESC = "TRENDING_DESC",
  POPULARITY_DESC = "POPULARITY_DESC",
  FAVOURITES_DESC = "FAVOURITES_DESC",
  SCORE_DESC = "SCORE_DESC",
  TITLE = "TITLE_ROMAJI",
  TITLE_DESC = "TITLE_ROMAJI_DESC",
  START_DATE_DESC = "START_DATE_DESC",
}

export enum AnimeFormat {
  TV = "TV",
  TV_SHORT = "TV_SHORT",
  OVA = "OVA",
  ONA = "ONA",
  MOVIE = "MOVIE",
  SPECIAL = "SPECIAL",
  MUSIC = "MUSIC",
}

export enum AnimeStatus {
  RELEASING = "RELEASING",
  Ongoing = "Ongoing",
  FINISHED = "FINISHED",
  Completed = "Completed",
  NotYetAired = "Not yet aired",
  NOT_YET_RELEASED = "NOT_YET_RELEASED",
  CANCELLED = "CANCELLED",
  HIATUS = "HIATUS",
  Cancelled = "Cancelled",
}

export type Relation = {
  id: number;
  relationType: string;
  malId: number;
  title: Title;
  status: AnimeStatus;
  episodes: number | null;
  image: string;
  imageHash: string;
  color: string;
  type: string;
  cover: string;
  coverHash: string;
  rating: number;
};

// export type EpisodeStreamLinks = {
//   headers: {
//     Referrer: string;
//   };
//   sources: Source[];
//   download: string;
// };

// export type Source = {
//   url: string;
//   isM3U8: boolean;
//   quality: string;
// };

export type AnimeEpisodeStreamLinks = {
  headers: Headers;
  tracks: Track[];
  sources: Source[];
  anilistID: number;
  malID: number;
};

export type Headers = {
  Referer: string;
};

export type Source = {
  url: string;
  type: string;
};

export type Track = {
  file: string;
  label?: string;
  kind: Kind;
  default?: boolean;
};

export enum Kind {
  Captions = "captions",
  Thumbnails = "thumbnails",
}
