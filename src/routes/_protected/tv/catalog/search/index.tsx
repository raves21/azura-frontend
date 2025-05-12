import AppliedFilterPill from "@/components/core/media/shared/catalog/AppliedFilterPill";
import Pagination from "@/components/core/media/shared/catalog/pagination/Pagination";
import CatalogTVList from "@/components/core/media/tv/CatalogTVList";
import { useSearchTV } from "@/services/media/tv/tvQueries";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useHandleSearchParamsValidationFailure } from "@/utils/hooks/useHandleSearchParamsValidationFailure";
import { SearchSchemaValidationStatus } from "@/utils/types/media/shared";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const tvSearchResultsPageSchema = z.object({
  query: z.string(),
  page: z.coerce.number().optional(),
});

type TVSearchResultsPageSchema = z.infer<typeof tvSearchResultsPageSchema> &
  SearchSchemaValidationStatus;

export const Route = createFileRoute("/_protected/tv/catalog/search/")({
  component: () => <TVSearchPage />,
  validateSearch: (search): TVSearchResultsPageSchema => {
    const validated = tvSearchResultsPageSchema.safeParse(search);
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

function TVSearchPage() {
  useCustomScrollRestoration();
  const { query, page, success } = Route.useSearch();
  const navigate = useNavigate();

  useHandleSearchParamsValidationFailure({
    isValidationFail: !success,
    onValidationError: () => navigate({ to: "/tv/catalog" }),
  });

  const {
    data: tvSearchResults,
    isLoading: tvSearchResultsLoading,
    error: tvSearchResultsError,
  } = useSearchTV(query, page || 1, true);

  if (tvSearchResultsLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          Loading&nbsp;
          <span className="font-semibold text-cyan-500">Search Page</span>
        </p>
      </div>
    );
  }

  if (tvSearchResultsError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error while searching for this movie.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (tvSearchResults) {
    return (
      <main className="flex flex-col w-full min-h-screen gap-6 pt-32 text-mainWhite pb-28">
        <header className="space-y-7 lg:space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold sm:text-xl md:text-2xl">
              Search TV Shows
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
        {tvSearchResults.results.length !== 0 ? (
          <>
            <CatalogTVList tvShowList={tvSearchResults.results} />
            <Pagination
              className="mt-10"
              totalPages={tvSearchResults.total_pages}
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
            Sorry, we could not find the TV you were looking for.
          </div>
        )}
      </main>
    );
  }
}
