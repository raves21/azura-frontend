import CatalogMovieList from "@/components/core/media/movie/CatalogMovieList";
import MovieAppliedFilters from "@/components/core/media/movie/filter/MovieAppliedFilters";
import MovieFiltersDialog from "@/components/core/media/movie/filter/MovieFiltersDialog";
import Pagination from "@/components/core/media/shared/catalog/pagination/Pagination";
import {
  useDiscoverMovies,
  useMovieGenres,
} from "@/services/media/movie/movieQueries";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useHandleSearchParamsValidationFailure } from "@/utils/hooks/useHandleSearchParamsValidationFailure";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { MovieGenre, MovieSortBy } from "@/utils/types/media/movie/movieTmdb";
import { SearchSchemaValidationStatus } from "@/utils/types/media/shared";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { z } from "zod";

const movieCatalogPageSchema = z.object({
  page: z.number().optional(),
  sortBy: z.nativeEnum(MovieSortBy).optional(),
  genres: z.nativeEnum(MovieGenre).array().optional(),
  year: z.number().optional(),
});

type MovieCatalogPageSchema = z.infer<typeof movieCatalogPageSchema> &
  SearchSchemaValidationStatus;

export const Route = createFileRoute("/_protected/movie/catalog/")({
  component: () => <MovieCatalogPage />,
  validateSearch: (search): MovieCatalogPageSchema => {
    const validatedSearch = movieCatalogPageSchema.safeParse(search);
    if (validatedSearch.success) {
      return {
        ...validatedSearch.data,
        success: true,
      };
    } else {
      return { success: false };
    }
  },
});

function MovieCatalogPage() {
  useCustomScrollRestoration();
  const { page, sortBy, genres, year, success } = Route.useSearch();

  const navigate = useNavigate();

  useHandleSearchParamsValidationFailure({
    isValidationFail: !success,
    onValidationError: () => navigate({ to: "/movie" }),
  });

  const {
    data: catalogMovieList,
    isLoading: isCatalogMovieListLoading,
    error: catalogMovieListError,
  } = useDiscoverMovies({ page, sortBy, genres, year });

  const {
    data: movieGenres,
    isLoading: isMovieGenresLoading,
    error: movieGenresError,
  } = useMovieGenres();

  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  if (isCatalogMovieListLoading || isMovieGenresLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          Loading&nbsp;
          <span className="font-semibold text-cyan-500">Catalog Page</span>
        </p>
      </div>
    );
  }

  if (catalogMovieListError || movieGenresError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this page.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (catalogMovieList && movieGenres) {
    return (
      <main className="flex flex-col w-full min-h-screen gap-6 pt-32 text-mainWhite pb-28">
        <header className="space-y-7 lg:space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold sm:text-xl md:text-2xl">
              Discover Movies
            </h1>
            <button
              onClick={() => toggleOpenDialog(<MovieFiltersDialog />)}
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
          <MovieAppliedFilters />
        </header>
        {catalogMovieList.results.length !== 0 ? (
          <>
            <CatalogMovieList movieList={catalogMovieList.results} />
            <Pagination
              className="mt-10"
              totalPages={catalogMovieList.total_pages}
              currentPage={catalogMovieList.page}
              handlePageChange={(_, page) => {
                navigate({
                  search: (prev) => ({ ...prev, page: page }),
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
