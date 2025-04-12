import SearchDialogResultsLoading from "@/components/core/loadingSkeletons/media/episode/SearchDialogResultsLoading";
import {
  useMoviesByCategory,
  useSearchMovie,
} from "@/services/media/movie/movieQueries";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import {
  getTMDBImageURL,
  getTMDBRating,
  getTMDBReleaseYear,
  toggleDialogOrDrawer,
} from "@/services/media/sharedFunctions";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { useShallow } from "zustand/react/shallow";
import AddCollectionItemMediaPreviewDialog from "@/components/core/social/mainContent/previewPopup/addCollectionItem/AddCollectionItemMediaPreviewDialog";
import MovieSearchResultCard from "../mediaSearchResultCards/MovieSearchResultCard";

type Props = {
  query: string;
  type: "addCollectionItem" | "managePostMediaAttachment";
};

export default function MediaSelectionMovieSearchResults({
  query,
  type,
}: Props) {
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
  } = useMoviesByCategory({ category: "trending" });

  const { isTabletUp } = useWindowBreakpoints();

  const [setMediaAttachment, setManagePostPage, setCollectionAttachment] =
    useManagePostStore(
      useShallow((state) => [
        state.setMediaAttachment,
        state.setManagePostPage,
        state.setCollectionAttachment,
      ])
    );

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
          {trendingMovies.results.map((movie) => {
            if (type === "addCollectionItem") {
              return (
                <MovieSearchResultCard
                  movie={movie}
                  onClick={() =>
                    toggleDialogOrDrawer({
                      content: (
                        <AddCollectionItemMediaPreviewDialog
                          media={{
                            coverImage: getTMDBImageURL(movie.backdrop_path),
                            description: movie.overview,
                            id: movie.id.toString(),
                            posterImage: getTMDBImageURL(movie.poster_path),
                            rating: getTMDBRating(movie.vote_average),
                            status: null,
                            title: movie.title,
                            type: "MOVIE",
                            year: getTMDBReleaseYear(movie.release_date),
                          }}
                        />
                      ),
                      isTabletUp,
                      isSecondaryDialog: true,
                    })
                  }
                />
              );
            }
            return (
              <MovieSearchResultCard
                movie={movie}
                onClick={() => {
                  setCollectionAttachment(null);
                  setMediaAttachment({
                    coverImage: getTMDBImageURL(movie.backdrop_path),
                    description: movie.overview,
                    id: movie.id.toString(),
                    posterImage: getTMDBImageURL(movie.poster_path),
                    rating: getTMDBRating(movie.vote_average),
                    status: null,
                    title: movie.title,
                    type: "MOVIE",
                    year: getTMDBReleaseYear(movie.release_date),
                  });
                  setManagePostPage("managePost");
                }}
              />
            );
          })}
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
          {searchResults.results.map((movie) => {
            if (type === "addCollectionItem") {
              return (
                <MovieSearchResultCard
                  movie={movie}
                  onClick={() =>
                    toggleDialogOrDrawer({
                      content: (
                        <AddCollectionItemMediaPreviewDialog
                          media={{
                            coverImage: getTMDBImageURL(movie.backdrop_path),
                            description: movie.overview,
                            id: movie.id.toString(),
                            posterImage: getTMDBImageURL(movie.poster_path),
                            rating: getTMDBRating(movie.vote_average),
                            status: null,
                            title: movie.title,
                            type: "MOVIE",
                            year: getTMDBReleaseYear(movie.release_date),
                          }}
                        />
                      ),
                      isTabletUp,
                      isSecondaryDialog: true,
                    })
                  }
                />
              );
            }
            return (
              <MovieSearchResultCard
                movie={movie}
                onClick={() => {
                  setCollectionAttachment(null);
                  setMediaAttachment({
                    coverImage: getTMDBImageURL(movie.backdrop_path),
                    description: movie.overview,
                    id: movie.id.toString(),
                    posterImage: getTMDBImageURL(movie.poster_path),
                    rating: getTMDBRating(movie.vote_average),
                    status: null,
                    title: movie.title,
                    type: "MOVIE",
                    year: getTMDBReleaseYear(movie.release_date),
                  });
                  setManagePostPage("managePost");
                }}
              />
            );
          })}
        </ul>
      </ScrollArea>
    );
  }
}
