import { useFilterAnime } from "@/services/thirdParty/animeQueries";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import CatalogMediaList from "@/components/shared/catalog/CatalogMediaList";
import AppliedFilters from "./-AppliedFilters";
import {
  AnilistAnimeStatus,
  Format,
  Season,
  SortBy,
} from "@/utils/types/thirdParty/animeAnilist";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import FiltersDialog from "./-FiltersDialog";
import Pagination from "@/components/shared/Pagination";

const filterPageSearchSchema = z.object({
  page: z.number().optional(),
  query: z.coerce.string().optional(),
  season: z.nativeEnum(Season).optional(),
  genres: z.coerce.string().optional(),
  year: z.number().optional(),
  sortBy: z.nativeEnum(SortBy).optional(),
  format: z.nativeEnum(Format).optional(),
  status: z.nativeEnum(AnilistAnimeStatus).optional(),
});

type FilterPageSearchParams = z.infer<typeof filterPageSearchSchema>;

export const Route = createFileRoute("/_protected/anime/catalog/")({
  component: () => <CatalogPage />,
  validateSearch: (search): FilterPageSearchParams => {
    const validationResult = filterPageSearchSchema.safeParse(search);
    if (validationResult.success) {
      return validationResult.data;
    } else {
      return {};
    }
  },
});

function CatalogPage() {
  const { format, genres, page, query, season, sortBy, year, status } =
    Route.useSearch();
  const navigate = useNavigate();
  const { toggleOpenDialog } = useGlobalStore();
  const {
    data: filteredAnimes,
    isLoading: isFilteredAnimesLoading,
    error: filteredAnimeError,
  } = useFilterAnime(
    query?.trim(),
    season,
    genres?.trim(),
    year,
    sortBy,
    format,
    page,
    status
  );

  if (isFilteredAnimesLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          Loading&nbsp;
          <span className="font-semibold text-cyan-500">Filter Page</span>
        </p>
      </div>
    );
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
              onClick={() => toggleOpenDialog(<FiltersDialog />)}
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
          <AppliedFilters />
        </header>
        {filteredAnimes.results.length !== 0 ? (
          <>
            <CatalogMediaList type="anime" animeList={filteredAnimes.results} />
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
