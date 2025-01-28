import { MovieGenre, MovieSortBy } from "@/utils/types/media/movie/movieTmdb";

export const movieSortByLabels: Record<MovieSortBy, string> = {
  [MovieSortBy.POPULARITY_DESC]: "Popularity",
  [MovieSortBy.REVENUE_DESC]: "Highest Revenue",
  [MovieSortBy.VOTE_AVERAGE_DESC]: "Top Rated"
};

export const movieGenreLabels: Record<MovieGenre, string> = {
  [MovieGenre.ACTION]: "Action",
  [MovieGenre.ADVENTURE]: "Adventure",
  [MovieGenre.ANIMATION]: "Animation",
  [MovieGenre.COMEDY]: "Comedy",
  [MovieGenre.CRIME]: "Crime",
  [MovieGenre.DOCUMENTARY]: "Documentary",
  [MovieGenre.DRAMA]: "Drama",
  [MovieGenre.FAMILY]: "Family",
  [MovieGenre.FANTASY]: "Fantasy",
  [MovieGenre.HISTORY]: "History",
  [MovieGenre.HORROR]: "Horror",
  [MovieGenre.MUSIC]: "Music",
  [MovieGenre.MYSTERY]: "Mystery",
  [MovieGenre.ROMANCE]: "Romance",
  [MovieGenre.SCIENCE_FICTION]: "Science Fiction",
  [MovieGenre.TV_MOVIE]: "TV Movie",
  [MovieGenre.THRILLER]: "Thriller",
  [MovieGenre.WAR]: "War",
  [MovieGenre.WESTERN]: "Western"
};
