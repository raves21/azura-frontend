import { AnimeServerName } from "@/utils/types/media/shared";
import {
  AnimeFormat,
  AnimeSeason,
  AnimeSortBy,
  AnilistAnimeStatus,
  AnimeStatus,
} from "../../types/media/anime/animeAnilist";

export const animeSortByLabels: Record<AnimeSortBy, string> = {
  [AnimeSortBy.TRENDING_DESC]: "Trending",
  [AnimeSortBy.POPULARITY_DESC]: "Popularity",
  [AnimeSortBy.FAVOURITES_DESC]: "Favourite",
  [AnimeSortBy.SCORE_DESC]: "Avg Score",
  [AnimeSortBy.TITLE]: "Title (A-Z)",
  [AnimeSortBy.TITLE_DESC]: "Title (Z-A)",
  [AnimeSortBy.START_DATE_DESC]: "Release Date",
};

export const animeFormatLabels: Record<AnimeFormat, string> = {
  [AnimeFormat.TV]: "TV",
  [AnimeFormat.TV_SHORT]: "TV Short",
  [AnimeFormat.OVA]: "OVA",
  [AnimeFormat.ONA]: "ONA",
  [AnimeFormat.MOVIE]: "Movie",
  [AnimeFormat.SPECIAL]: "Special",
  [AnimeFormat.MUSIC]: "Music",
};

export const animeAnilistStatusLabels: Record<AnilistAnimeStatus, string> = {
  [AnilistAnimeStatus.RELEASING]: "Ongoing",
  [AnilistAnimeStatus.FINISHED]: "Completed",
  [AnilistAnimeStatus.NOT_YET_RELEASED]: "Upcoming",
  [AnilistAnimeStatus.CANCELLED]: "Cancelled",
};

export const animeStatusLabels: Record<string, string> = {
  [AnimeStatus.RELEASING]: "Ongoing",
  [AnimeStatus.Ongoing]: "Ongoing",
  [AnimeStatus.FINISHED]: "Completed",
  [AnimeStatus.Completed]: "Completed",
  [AnimeStatus.NotYetAired]: "Upcoming",
  [AnimeStatus.NOT_YET_RELEASED]: "Upcoming",
  [AnimeStatus.CANCELLED]: "Cancelled",
  [AnimeStatus.HIATUS]: "Hiatus",
};

export const animeSeasonLabels: Record<AnimeSeason, string> = {
  [AnimeSeason.WINTER]: "Winter",
  [AnimeSeason.SPRING]: "Spring",
  [AnimeSeason.SUMMER]: "Summer",
  [AnimeSeason.FALL]: "Fall",
};

export const animeCancelledStatus = [
  AnimeStatus.CANCELLED,
  AnimeStatus.Cancelled,
];
export const animeOngoingStatus = [AnimeStatus.Ongoing, AnimeStatus.RELEASING];
export const animeUpcomingStatus = [
  AnimeStatus.NOT_YET_RELEASED,
  AnimeStatus.NotYetAired,
];
export const animeCompletedStatus = [
  AnimeStatus.FINISHED,
  AnimeStatus.Completed,
];

export const animeServerNames: AnimeServerName[] = [
  AnimeServerName.server1,
  AnimeServerName.server2,
];
