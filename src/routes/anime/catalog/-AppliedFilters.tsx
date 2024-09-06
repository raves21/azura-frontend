import { useSearch } from "@tanstack/react-router";
import AppliedFilterPill from "./-AppliedFilterPill";
import {
  formatLabels,
  seasonLabels,
  sortByLabels,
  anilistAnimeStatusLabels,
} from "@/utils/variables/anime";

export default function AppliedFilters() {
  const {
    genres,
    query,
    format,
    season,
    sortBy,
    year,
    status,
  } = useSearch({
    from: "/anime/catalog/",
  });

  return (
    <div className="flex flex-wrap w-full gap-4">
      {query && (
        <div className="space-y-2">
          <p className="font-medium text-gray-400">Query</p>
          <AppliedFilterPill
            className="text-white rounded-full bg-emerald-500"
            label={query}
            onDelete={() => {}}
          />
        </div>
      )}
      {genres && (
        <div className="space-y-2">
          <p className="font-medium text-gray-400">Genres</p>
          <div className="flex flex-wrap items-center gap-2">
            {genres.split(",").map((genre) => (
              <AppliedFilterPill
                key={genre}
                className="text-white rounded-full bg-sky-500"
                label={genre}
                onDelete={() => {}}
              />
            ))}
          </div>
        </div>
      )}
      {sortBy && (
        <div className="space-y-2">
          <p className="font-medium text-gray-400">Sort By</p>
          <AppliedFilterPill
            className="text-white bg-pink-600 rounded-full"
            label={sortByLabels[sortBy]}
            onDelete={() => {}}
          />
        </div>
      )}
      {status && (
        <div className="space-y-2">
          <p className="font-medium text-gray-400">Sort By</p>
          <AppliedFilterPill
            className="text-white bg-pink-600 rounded-full"
            label={anilistAnimeStatusLabels[status]}
            onDelete={() => {}}
          />
        </div>
      )}
      {year && (
        <div className="space-y-2">
          <p className="font-medium text-gray-400">Year</p>
          <AppliedFilterPill
            className="text-white bg-indigo-500 rounded-full"
            label={year.toString()}
            onDelete={() => {}}
          />
        </div>
      )}
      {format && (
        <div className="space-y-2">
          <p className="font-medium text-gray-400">Format</p>
          <AppliedFilterPill
            className="text-white bg-orange-500 rounded-full"
            label={formatLabels[format]}
            onDelete={() => {}}
          />
        </div>
      )}
      {season && (
        <div className="space-y-2">
          <p className="font-medium text-gray-400">Season</p>
          <AppliedFilterPill
            className="text-white bg-teal-500 rounded-full"
            label={seasonLabels[season]}
            onDelete={() => {}}
          />
        </div>
      )}
    </div>
  );
}
