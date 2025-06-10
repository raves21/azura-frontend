import { useFilterAnime } from "@/services/media/anime/queries";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import CatalogAnimeList from "@/components/core/media/anime/CatalogAnimeList";
import AnimeAppliedFilters from "../../../../components/core/media/anime/filter/AnimeAppliedFilters";
import {
  AnilistAnimeStatus,
  AnimeFormat,
  AnimeGenre,
  AnimeSeason,
  AnimeSortBy,
} from "@/utils/types/media/anime/animeAnilist";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import AnimeFiltersDialog from "../../../../components/core/media/anime/filter/AnimeFiltersDialog";
import Pagination from "@/components/core/media/shared/catalog/pagination/Pagination";
import { SearchSchemaValidationStatus } from "@/utils/types/media/shared";
import { useHandleSearchParamsValidationFailure } from "@/utils/hooks/useHandleSearchParamsValidationFailure";
import CatalogPageSkeleton from "@/components/core/loadingSkeletons/media/catalog/CatalogPageSkeleton";

const filterPageSearchSchema = z.object({
  page: z.number().optional(),
  query: z.coerce.string().optional(),
  season: z.nativeEnum(AnimeSeason).optional(),
  genres: z.nativeEnum(AnimeGenre).array().optional(),
  year: z.number().optional(),
  sortBy: z.nativeEnum(AnimeSortBy).optional(),
  format: z.nativeEnum(AnimeFormat).optional(),
  status: z.nativeEnum(AnilistAnimeStatus).optional(),
});

type FilterPageSearchSchema = z.infer<typeof filterPageSearchSchema> &
  SearchSchemaValidationStatus;

export const Route = createFileRoute("/_protected/anime/catalog/")({
  component: () => <AnimeCatalogPage />,
  validateSearch: (search): FilterPageSearchSchema => {
    const validated = filterPageSearchSchema.safeParse(search);
    if (validated.success) {
      return {
        ...validated.data,
        success: true,
      };
    }
    return {
      success: false,
    };
  },
});

function AnimeCatalogPage() {
  const { format, genres, page, query, season, sortBy, year, status, success } =
    Route.useSearch();
  const navigate = useNavigate();

  useHandleSearchParamsValidationFailure({
    isValidationFail: !success,
    onValidationFail: () => navigate({ to: "/anime" }),
  });
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const {
    data: filteredAnimes,
    isLoading: isFilteredAnimesLoading,
    error: filteredAnimeError,
  } = useFilterAnime({
    query: query?.trim(),
    season,
    genres,
    year,
    sortBy,
    format,
    page: page ?? 1,
    status,
  });

  if (isFilteredAnimesLoading) {
    return <CatalogPageSkeleton />;
  }

  if (filteredAnimeError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this page.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (filteredAnimes) {
    return (
      <main className="flex flex-col w-full min-h-screen gap-6 pt-32 text-mainWhite pb-28">
        <header className="space-y-7 lg:space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold sm:text-xl md:text-2xl">
              Discover Animes
            </h1>
            <button
              onClick={() => toggleOpenDialog(<AnimeFiltersDialog />)}
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
          <AnimeAppliedFilters />
        </header>
        {filteredAnimes.results.length !== 0 ? (
          <>
            <CatalogAnimeList animeList={filteredAnimes.results} />
            <Pagination
              className="mt-10"
              totalPages={filteredAnimes.totalPages}
              currentPage={filteredAnimes.currentPage}
              handlePageChange={(_, page) => {
                navigate({
                  search: (prev) => ({ ...prev, page: page }),
                });
              }}
            />
          </>
        ) : (
          <div className="grid flex-grow text-base text-center md:text-lg place-items-center">
            Sorry, we could not find the Anime you were looking for.
          </div>
        )}
      </main>
    );
  }
}
