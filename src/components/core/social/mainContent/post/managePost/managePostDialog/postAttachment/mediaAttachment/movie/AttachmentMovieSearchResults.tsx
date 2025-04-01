import SearchDialogResultsLoading from "@/components/core/loadingSkeletons/media/episode/SearchDialogResultsLoading";
import {
  useMoviesByCategory,
  useSearchMovie,
} from "@/services/media/movie/movieQueries";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import AttachmentMovieSearchResultCard from "./AttachmentMovieSearchResultCard";

type Props = {
  query: string;
};

export default function AttachmentMovieSearchResults({ query }: Props) {
  //todo: use infinite scrolling
  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    error: searchResultsError,
  } = useSearchMovie(query, 1, query.length > 0);
  const {
    data: trendingMovies,
    isLoading: isTrendingMoviesLoading,
    error: trendingMoviesError,
  } = useMoviesByCategory("trending");

  if (isSearchResultsLoading || isTrendingMoviesLoading) {
    return <SearchDialogResultsLoading className="bg-socialPrimary" />;
  }

  if (searchResultsError || trendingMoviesError) {
    return (
      <div className="grid w-full py-4 text-lg text-center text-gray-400 bg-gray-800 rounded-b-lg place-items-center text-balance">
        There seems to be problems with search. Please try again later.
      </div>
    );
  }

  if (query.length === 0 && trendingMovies) {
    return (
      <ScrollArea
        className={`w-full text-mainWhite rounded-b-lg bg-socialPrimary mt-2 h-[300px] overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {" "}
          {trendingMovies.results.map((movie) => (
            <AttachmentMovieSearchResultCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </ScrollArea>
    );
  }

  if (searchResults) {
    return (
      <ScrollArea
        className={`w-full text-mainWhite rounded-b-lg bg-socialPrimary mt-2 h-[300px] overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {searchResults.results.map((movie) => (
            <AttachmentMovieSearchResultCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </ScrollArea>
    );
  }
}
