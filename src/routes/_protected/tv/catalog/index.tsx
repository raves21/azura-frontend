import Pagination from "@/components/core/media/shared/catalog/Pagination";
import CatalogTVList from "@/components/core/media/tv/CatalogTVList";
import TVAppliedFilters from "@/components/core/media/tv/filter/TVAppliedFilters";
import TVFiltersDialog from "@/components/core/media/tv/filter/TVFiltersDialog";
import { useDiscoverTV, useTVGenres } from "@/services/media/tv/tvQueries";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useHandleSearchValidationFailure } from "@/utils/hooks/useHandleSearchValidation";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { TVGenre, TVSortBy } from "@/utils/types/media/TV/tvShowTmdb";
import { SearchSchemaValidationStatus } from "@/utils/types/media/shared";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { z } from "zod";

const tvCatalogPageSchema = z.object({
  page: z.coerce.number().optional(),
  sortBy: z.nativeEnum(TVSortBy).optional(),
  genres: z.nativeEnum(TVGenre).array().optional(),
  year: z.coerce.number().optional()
});

type TVCatalogPageSchema = z.infer<typeof tvCatalogPageSchema> &
  SearchSchemaValidationStatus;

export const Route = createFileRoute("/_protected/tv/catalog/")({
  component: () => <TVCatalogPage />,
  validateSearch: (search): TVCatalogPageSchema => {
    const validated = tvCatalogPageSchema.safeParse(search);
    if (validated.success) {
      return { ...validated.data, success: true };
    }
    return { success: false };
  }
});

function TVCatalogPage() {
  useCustomScrollRestoration();
  const { page, sortBy, genres, year, success } = Route.useSearch();
  const navigate = useNavigate();

  useHandleSearchValidationFailure({
    isValidationFail: !success,
    onValidationError: () => navigate({ to: "/tv" })
  });

  const {
    data: catalogTVList,
    isLoading: isCatalogTVListLoading,
    error: catalogTVListError
  } = useDiscoverTV({ page, sortBy, genres, year });

  const {
    data: tvGenres,
    isLoading: isTVGenresLoading,
    error: tvGenresError
  } = useTVGenres();

  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  if (isCatalogTVListLoading || isTVGenresLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          Loading&nbsp;
          <span className="font-semibold text-cyan-500">Catalog Page</span>
        </p>
      </div>
    );
  }

  if (catalogTVListError || tvGenresError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this page.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (catalogTVList && tvGenres) {
    return (
      <main className="flex flex-col w-full min-h-screen gap-6 pt-32 text-mainWhite pb-28">
        <header className="space-y-7 lg:space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold sm:text-xl md:text-2xl">
              Discover TV Shows
            </h1>
            <button
              onClick={() => toggleOpenDialog(<TVFiltersDialog />)}
              className="flex items-center gap-2 px-3 py-2 border rounded-full mobile-l:gap-3 mobile-l:px-4 md:px-5 md:py-3 group border-mainAccent"
            >
              <p className="text-xs font-medium transition-colors mobile-l:text-sm md:text-base group-hover:text-mainAccent">
                Filter
              </p>
              <SlidersHorizontal
                className="transition-colors size-3 sm:size-4 group-hover:stroke-mainAccent"
                strokeWidth={3}
              />
            </button>
          </div>
          <TVAppliedFilters />
        </header>
        {catalogTVList.results.length !== 0 ? (
          <>
            <CatalogTVList tvShowList={catalogTVList.results} />
            <Pagination
              className="mt-10"
              totalPages={catalogTVList.total_pages}
              currentPage={catalogTVList.page}
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
