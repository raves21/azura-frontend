import CatalogMovieList from "@/components/core/media/movie/CatalogMovieList";
import Pagination from "@/components/core/media/shared/catalog/Pagination";
import { useSearchMovie } from "@/services/media/movie/movieQueries";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const movieSearchResultsPageSchema = z.object({
  query: z.string(),
  page: z.coerce.number().optional()
});

export const Route = createFileRoute("/_protected/movie/catalog/search/")({
  component: () => <MovieSearchPage />,
  validateSearch: (search) => movieSearchResultsPageSchema.parse(search)
});

function MovieSearchPage() {
  const { query, page } = Route.useSearch();
  const {
    data: movieSearchResults,
    isLoading: movieSearchResultsLoading,
    error: movieSearchResultsError
  } = useSearchMovie(query, page || 1, true);
  const navigate = useNavigate();

  if (movieSearchResultsLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          Loading&nbsp;
          <span className="font-semibold text-cyan-500">Search Page</span>
        </p>
      </div>
    );
  }

  if (movieSearchResultsError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error while searching for this movie.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (movieSearchResults) {
    return (
      <main className="flex flex-col w-full min-h-screen gap-6 pt-32 text-mainWhite pb-28">
        <header className="space-y-7 lg:space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold sm:text-xl md:text-2xl">
              Search Movies
            </h1>
          </div>
        </header>
        {movieSearchResults.results.length !== 0 ? (
          <>
            <CatalogMovieList movieList={movieSearchResults.results} />
            <Pagination
              className="mt-10"
              totalPages={movieSearchResults.total_pages}
              currentPage={page || 1}
              handlePageChange={(_, page) => {
                navigate({
                  search: (prev) => ({ ...prev, page: page })
                });
              }}
            />
          </>
        ) : (
          <div className="grid flex-grow text-base text-center md:text-lg place-items-center">
            Sorry, we could not find the Movie you were looking for.
          </div>
        )}
      </main>
    );
  }
}
