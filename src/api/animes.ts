import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  AnimeInfoAnilist,
  MultipleAnimeResponse,
} from "../utils/types/animeAnilist";
import { AnimeInfoAnify } from "@/utils/types/animeAnify";

const BASE_URL_ANILIST = "https://consumet-api-green.vercel.app/meta/anilist";

const frequentlyChanging = {
  gcTime: 180 * (60 * 1000), //3 hrs
  staleTime: 120 * (60 * 1000), //2 hrs
};

const rarelyChanging = {
  gcTime: 300 * (60 * 1000), //5 hrs
  staleTime: 240 * (60 * 1000), //4 hrs
};

export function useFetchTrendingAnime(perPage: number, pageNum: number) {
  return useQuery({
    queryKey: ["trending", perPage],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/advanced-search?sort=["TRENDING_DESC"]&perPage=${perPage}&page=${pageNum}`
      );
      return trendingAnimes as MultipleAnimeResponse;
    },
    ...frequentlyChanging,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useFetchTopRatedAnime(perPage: number) {
  return useQuery({
    queryKey: ["topRated"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/advanced-search?sort=["SCORE_DESC"]&perPage=${perPage}&page=1`
      );
      return trendingAnimes as MultipleAnimeResponse;
    },
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useFetchAllTimeFavoriteAnime(perPage: number) {
  return useQuery({
    queryKey: ["allTimeFavorite"],
    queryFn: async () => {
      const { data: trendingAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/advanced-search?sort=["FAVOURITES_DESC"]&perPage=${perPage}&page=1`
      );
      return trendingAnimes as MultipleAnimeResponse;
    },
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useSearchAnime(id: string) {
  return useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const { data: searchResults } = await axios.get(
        `${BASE_URL_ANILIST}/${id}`
      );
      return searchResults;
    },
    ...rarelyChanging,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useFetchAnimeInfoAnilist(id: string) {
  return useQuery({
    queryKey: ["infoAnilist", id],
    queryFn: async () => {
      const { data: animeInfoAnilist } = await axios.get(
        `${BASE_URL_ANILIST}/info/${id}`
      );
      return animeInfoAnilist as AnimeInfoAnilist;
    },
    ...rarelyChanging,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useFetchAnimeInfoAnify(id: string) {
  return useQuery({
    queryKey: ["infoAnify", id],
    queryFn: async () => {
      const { data: animeInfoAnify } = await axios.get(
        `https://anify.eltik.cc/info/${id}?fields=[episodes,bannerImage,coverImage,title,rating,trailer,genres,description,type,id]`
      );
      return animeInfoAnify as AnimeInfoAnify;
    },
    ...rarelyChanging,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useFetchPopularAnimes(perPage: number) {
  return useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const { data: popularAnimes } = await axios.get(
        `${BASE_URL_ANILIST}/advanced-search?sort=["POPULARITY_DESC"]&perPage=${perPage}`
      );
      return popularAnimes as MultipleAnimeResponse;
    },
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

// export function useFetchAnimeEpisodes(id: string) {
//   return useQuery({
//     queryKey: ["animeEpisodes", id],
//     queryFn: async () => {
//       const { data: animeEpisodes } = await axios.get(
//         `${BASE_URL_ANILIST}/episodes/${id}`
//       );
//       return animeEpisodes as Episode[];
//     },
//     gcTime: Infinity,
//     retry: false,
//  
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//   });
// }
