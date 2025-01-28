import {
  MovieGenre,
  MovieInfo,
  PaginatedMovieResponse
} from "@/utils/types/media/movie/movieTmdb";
import { MovieSortBy } from "@/utils/types/media/movie/movieTmdb";
import { TMDBGenre } from "@/utils/types/media/shared";
import { tmdbApi } from "@/utils/variables/axiosInstances/tmdbAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export function useMoviesByCategory(category: string) {
  return useQuery({
    queryKey: ["categoryMovies", category],
    queryFn: async () => {
      let url: string;
      if (category === "trending") {
        url = `/trending/movie/day`;
      } else if (category === "popular") {
        url = `/movie/popular`;
      } else {
        url = `/movie/top_rated`;
      }
      const { data: categoryMovies } = await tmdbApi.get(url);
      return categoryMovies as PaginatedMovieResponse;
    }
  });
}

export function useMovieInfo(movieId: string) {
  return useQuery({
    queryKey: ["movieInfo", movieId],
    queryFn: async () => {
      const { data: movieInfo } = await tmdbApi.get(`/movie/${movieId}`);
      return movieInfo as MovieInfo;
    }
  });
}

export function useMovieRecommendations(movieId: string) {
  return useQuery({
    queryKey: ["movieRecommendations", movieId],
    queryFn: async () => {
      const { data: movieRecommendations } = await tmdbApi.get(
        `/movie/${movieId}/recommendations`
      );
      return movieRecommendations as PaginatedMovieResponse;
    }
  });
}

export function useMovieGenres() {
  return useQuery({
    queryKey: ["movieGenres"],
    queryFn: async () => {
      const { data: movieGenres } = await tmdbApi.get(`/genre/movie/list`);
      return movieGenres.genres as TMDBGenre[];
    },
    retryOnMount: false
  });
}

type UseDiscoverMoviesArgs = {
  page: number | undefined;
  sortBy: MovieSortBy | undefined;
  genres: MovieGenre[] | undefined;
  year: number | undefined;
};

export function useDiscoverMovies({
  page,
  sortBy,
  genres,
  year
}: UseDiscoverMoviesArgs) {
  return useQuery({
    queryKey: ["discoverMovies", page, sortBy, genres, year],
    queryFn: async () => {
      const { data: discoverMoviesList } = await tmdbApi.get(
        `/discover/movie`,
        {
          params: {
            page,
            sort_by: sortBy,
            with_genres: genres?.join(","),
            year
          }
        }
      );
      return discoverMoviesList as PaginatedMovieResponse;
    }
  });
}

export function useSearchMovie(query: string, page: number, enabled?: boolean) {
  return useQuery({
    queryKey: ["searchMovie", query, page],
    queryFn: async () => {
      const { data: searchMovieResults } = await tmdbApi.get("/search/movie", {
        params: {
          query,
          page
        }
      });
      return searchMovieResults as PaginatedMovieResponse;
    },
    enabled: !!enabled
  });
}
