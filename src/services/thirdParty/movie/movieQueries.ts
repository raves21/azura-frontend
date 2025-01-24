import {
  MovieInfo,
  PaginatedMovieResponse
} from "@/utils/types/thirdParty/movie/movieTmdb";
import { MovieGenres } from "@/utils/types/thirdParty/movie/movieTmdb";
import { TMDBSortBy } from "@/utils/types/thirdParty/shared";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3";
export function useMoviesByCategory(category: string) {
  return useQuery({
    queryKey: ["categoryMovies", category],
    queryFn: async () => {
      let url: string;
      if (category === "trending") {
        url = `${TMDB_API_URL}/trending/movie/day?api_key=${TMDB_API_KEY}`;
      } else if (category === "popular") {
        url = `${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
      } else {
        url = `${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`;
      }
      const { data: categoryMovies } = await axios.get(url);
      return categoryMovies as PaginatedMovieResponse;
    }
  });
}

export function useMovieInfo(movieId: string) {
  return useQuery({
    queryKey: ["movieInfo", movieId],
    queryFn: async () => {
      const { data: movieInfo } = await axios.get(
        `${TMDB_API_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
      );
      return movieInfo as MovieInfo;
    }
  });
}

export function useMovieRecommendations(movieId: string) {
  return useQuery({
    queryKey: ["movieRecommendations", movieId],
    queryFn: async () => {
      const { data: movieRecommendations } = await axios.get(
        `${TMDB_API_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}`
      );
      return movieRecommendations as PaginatedMovieResponse;
    }
  });
}

export function useMovieGenres() {
  return useQuery({
    queryKey: ["movieGenres"],
    queryFn: async () => {
      const { data: movieGenres } = await axios.get(
        `${TMDB_API_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
      );
      return movieGenres as MovieGenres;
    }
  });
}

type UseDiscoverMoviesArgs = {
  page: number;
  sortBy: TMDBSortBy;
  genres: number[];
};

export function useDiscoverMovies({
  page,
  sortBy,
  genres
}: UseDiscoverMoviesArgs) {
  return useQuery({
    queryKey: ["discoverMovies", page],
    queryFn: async () => {
      const { data: discoverMoviesList } = await axios.get(
        `${TMDB_API_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
      );
      return discoverMoviesList as PaginatedMovieResponse;
    }
  });
}

export function useSearchMovies() {}
