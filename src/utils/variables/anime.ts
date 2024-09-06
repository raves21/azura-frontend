import { Format, Season, SortBy, AnilistAnimeStatus } from "../types/animeAnilist";

export const sortByLabels: Record<string, string> = {
  [SortBy.TRENDING_DESC]: "Trending",
  [SortBy.POPULARITY_DESC]: "Popularity",
  [SortBy.FAVOURITES_DESC]: "Favourite",
  [SortBy.SCORE_DESC]: "Avg Score",
  [SortBy.TITLE]: "Title (A-Z)",
  [SortBy.TITLE_DESC]: "Title (Z-A)",
  [SortBy.START_DATE_DESC]: "Release Date",
};

export const formatLabels: Record<string, string> = {
  [Format.TV]: "TV",
  [Format.TV_SHORT]: "TV Short",
  [Format.OVA]: "OVA",
  [Format.ONA]: "ONA",
  [Format.MOVIE]: "Movie",
  [Format.SPECIAL]: "Special",
  [Format.MUSIC]: "Music",
};

export const anilistAnimeStatusLabels: Record<string, string> = {
  [AnilistAnimeStatus.RELEASING]: "Releasing",
  [AnilistAnimeStatus.FINISHED]: "Finished",
  [AnilistAnimeStatus.NOT_YET_RELEASED]: "Not Yet Aired",
  [AnilistAnimeStatus.CANCELLED]: "Cancelled",
};

export const seasonLabels: Record<string, string> = {
  [Season.WINTER]: "Winter",
  [Season.SPRING]: "Spring",
  [Season.SUMMER]: "Summer",
  [Season.FALL]: "Fall",
};
