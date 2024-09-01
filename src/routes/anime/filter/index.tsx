import { useFilterAnime } from "@/api/animes";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import FilterAnimeList from "./-FilterAnimeList";

const filterPageSearchSchema = z.object({
  page: z.number().optional(),
  query: z.string().optional(),
  season: z.string().optional(),
  genres: z.string().optional(),
  year: z.number().optional(),
  sortBy: z.string().optional(),
  format: z.string().optional(),
});

export const Route = createFileRoute("/anime/filter/")({
  component: () => <FilterPage />,
  validateSearch: (search) => filterPageSearchSchema.parse(search),
});

function FilterPage() {
  const { page, query, season, genres, year, sortBy, format } = Route.useSearch();

  const {
    data: filteredAnimes,
    isLoading: isFilteredAnimesLoading,
    error: filteredAnimeError,
  } = useFilterAnime(
    query?.trim(),
    season?.trim(),
    genres?.trim(),
    year,
    sortBy?.trim(),
    format?.trim(),
    page ?? 1
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
      <main className="w-full text-[#f6f4f4] pt-32 pb-28 px-16 space-y-10">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">Filter Anime</h1>
          <button className="flex items-center gap-2 px-5 py-2 border rounded-full border-mainAccent">
            <p className="font-medium">Filter</p>
            <SlidersHorizontal className="size-4" strokeWidth={3} />
          </button>
        </div>
        <FilterAnimeList animeList={filteredAnimes.results} />
      </main>
    );
  }
}
