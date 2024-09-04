import { useFilterAnime } from "@/api/animes";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import FilteredAnimes from "./-FilteredAnimes";
import AppliedFilters from "./-AppliedFilters";
import { Format, Season, SortBy } from "@/utils/types/animeAnilist";

const filterPageSearchSchema = z.object({
  page: z.number().optional(),
  query: z.coerce.string().optional(),
  season: z.nativeEnum(Season).optional(),
  genres: z.coerce.string().optional(),
  year: z.number().optional(),
  sortBy: z.nativeEnum(SortBy).optional(),
  format: z.nativeEnum(Format).optional(),
});

type FilterPageSearchParams = z.infer<typeof filterPageSearchSchema>

export const Route = createFileRoute("/anime/filter/")({
  component: () => <FilterPage />,
  validateSearch: (search) : FilterPageSearchParams => {
    const validationResult = filterPageSearchSchema.safeParse(search)
    if(validationResult.success) {
      return validationResult.data
    }
    else{
      return {}
    }
  }
});

function FilterPage() {
  const { format, genres, page, query, season, sortBy, year } = Route.useSearch();
  
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
    page
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
      <main className="w-full text-[#f6f4f4] pt-32 pb-28 px-16 flex flex-col gap-10">
        <div className="space-y-3">
          <div className="flex justify-between">
            <h1 className="text-2xl font-medium">Filter Anime</h1>
            <button className="flex items-center gap-2 px-5 py-2 border rounded-full border-mainAccent">
              <p className="font-medium">Filter</p>
              <SlidersHorizontal className="size-4" strokeWidth={3} />
            </button>
          </div>
          <AppliedFilters />
        </div>
        {filteredAnimes.results.length !== 0 ? (
          <FilteredAnimes animeList={filteredAnimes.results} />
        ) : (
          <div className="grid h-[40dvh] text-lg place-items-center">
            Sorry, we could not find the Anime you were looking for.
          </div>
        )}
      </main>
    );
  }
}
