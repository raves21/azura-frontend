import CatalogPageSkeleton from "@/components/core/loadingSkeletons/media/catalog/CatalogPageSkeleton";
import CatalogMovieList from "@/components/core/media/movie/CatalogMovieList";
import AppliedFilterPill from "@/components/core/media/shared/catalog/AppliedFilterPill";
import Pagination from "@/components/core/media/shared/catalog/pagination/Pagination";
import { useSearchMovie } from "@/services/media/movie/queries";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useHandleSearchParamsValidationFailure } from "@/utils/hooks/useHandleSearchParamsValidationFailure";
import { SearchSchemaValidationStatus } from "@/utils/types/media/shared";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const movieSearchResultsPageSchema = z.object({
  query: z.string(),
  page: z.coerce.number().optional(),
});

type MovieSearchResultPageSchema = z.infer<
  typeof movieSearchResultsPageSchema
> &
  SearchSchemaValidationStatus;

export const Route = createFileRoute("/_protected/movie/catalog/search/")({
  component: () => <MovieSearchPage />,
  validateSearch: (search): MovieSearchResultPageSchema => {
    const validated = movieSearchResultsPageSchema.safeParse(search);
    if (validated.success) {
      return {
        ...validated.data,
        success: true,
      };
    }
    return {
      query: "",
      success: false,
    };
  },
});

function MovieSearchPage() {
  useCustomScrollRestoration();
  const { query, page, success } = Route.useSearch();
  const navigate = useNavigate();

  useHandleSearchParamsValidationFailure({
    isValidationFail: !success,
    onValidationFail: () => navigate({ to: "/movie/catalog" }),
  });

  const {
    data: movieSearchResults,
    isLoading: movieSearchResultsLoading,
    error: movieSearchResultsError,
  } = useSearchMovie(query, page || 1, true);

  if (movieSearchResultsLoading) {
    return <CatalogPageSkeleton />;
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
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
              Query
            </p>
            <AppliedFilterPill
              className="text-white rounded-full bg-emerald-500 w-min"
              label={`"${query}"`}
            />
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
                  search: (prev) => ({ ...prev, page }),
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
