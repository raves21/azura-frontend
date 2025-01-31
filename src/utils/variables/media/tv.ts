import { TVGenre, TVSortBy } from "@/utils/types/media/TV/tvShowTmdb";

export const tvSortByLabels: Record<TVSortBy, string> = {
  [TVSortBy.POPULARITY_DESC]: "Popularity",
  [TVSortBy.VOTE_AVERAGE_DESC]: "Top Rated"
};

export const tvGenreLabels: Record<TVGenre, string> = {
  [TVGenre.ACTION_ADVENTURE]: "Action & Adventure",
  [TVGenre.ANIMATION]: "Animation",
  [TVGenre.COMEDY]: "Comedy",
  [TVGenre.CRIME]: "Crime",
  [TVGenre.DOCUMENTARY]: "Documentary",
  [TVGenre.DRAMA]: "Drama",
  [TVGenre.FAMILY]: "Family",
  [TVGenre.KIDS]: "Kids",
  [TVGenre.MYSTERY]: "Mystery",
  [TVGenre.NEWS]: "News",
  [TVGenre.REALITY]: "Reality",
  [TVGenre.SCI_FI_FANTASY]: "Sci-Fi & Fantasy",
  [TVGenre.SOAP]: "Soap",
  [TVGenre.TALK]: "Talk",
  [TVGenre.WAR_POLITICS]: "War & Politics",
  [TVGenre.WESTERN]: "Western"
};
