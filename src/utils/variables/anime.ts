import {
  Format,
  Season,
  SortBy,
  AnilistAnimeStatus,
  Status,
} from "../types/thirdParty/animeAnilist";

export const sortByLabels: Record<SortBy, string> = {
  [SortBy.TRENDING_DESC]: "Trending",
  [SortBy.POPULARITY_DESC]: "Popularity",
  [SortBy.FAVOURITES_DESC]: "Favourite",
  [SortBy.SCORE_DESC]: "Avg Score",
  [SortBy.TITLE]: "Title (A-Z)",
  [SortBy.TITLE_DESC]: "Title (Z-A)",
  [SortBy.START_DATE_DESC]: "Release Date",
};

export const formatLabels: Record<Format, string> = {
  [Format.TV]: "TV",
  [Format.TV_SHORT]: "TV Short",
  [Format.OVA]: "OVA",
  [Format.ONA]: "ONA",
  [Format.MOVIE]: "Movie",
  [Format.SPECIAL]: "Special",
  [Format.MUSIC]: "Music",
};

export const anilistAnimeStatusLabels: Record<AnilistAnimeStatus, string> = {
  [AnilistAnimeStatus.RELEASING]: "Ongoing",
  [AnilistAnimeStatus.FINISHED]: "Completed",
  [AnilistAnimeStatus.NOT_YET_RELEASED]: "Upcoming",
  [AnilistAnimeStatus.CANCELLED]: "Cancelled",
};

export const statusLabels: Record<string, string> = {
  [Status.RELEASING]: "Ongoing",
  [Status.Ongoing]: "Ongoing",
  [Status.FINISHED]: "Completed",
  [Status.Completed]: "Completed",
  [Status.NotYetAired]: "Upcoming",
  [Status.NOT_YET_RELEASED]: "Upcoming",
  [Status.CANCELLED]: "Cancelled",
  [Status.HIATUS]: "Hiatus",
};

export const seasonLabels: Record<Season, string> = {
  [Season.WINTER]: "Winter",
  [Season.SPRING]: "Spring",
  [Season.SUMMER]: "Summer",
  [Season.FALL]: "Fall",
};

export const animeCancelledStatus = [Status.CANCELLED, Status.Cancelled];
export const animeOngoingStatus = [Status.Ongoing, Status.RELEASING];
export const animeUpcomingStatus = [
  Status.NOT_YET_RELEASED,
  Status.NotYetAired,
];
export const animeCompletedStatus = [Status.FINISHED, Status.Completed];
