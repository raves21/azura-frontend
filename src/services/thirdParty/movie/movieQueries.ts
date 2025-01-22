import {
  MovieInfo,
  PaginatedMovieResponse
} from "@/utils/types/thirdParty/movie/movieTmdb";
import { MovieGenres } from "@/utils/types/thirdParty/movie/movieTmdb";
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

export function useMovieStreamLink(movieId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["movieStream", movieId],
    queryFn: async () => {
      const headers = new Headers();
      headers.append("x-api-key", import.meta.env.VITE_RABBIT_API_KEY);
      const requestOptions: RequestInit = {
        method: "GET",
        headers,
        redirect: "follow"
      };
      const streamLinkURL = await (
        await fetch(
          `${import.meta.env.VITE_RABBIT_URL}/${movieId}`,
          requestOptions
        )
      ).text();

      return streamLinkURL;
    },
    enabled: !!enabled
  });
}
