import { useSearch } from "@tanstack/react-router";
import FilterPill from "./-FilterPill";

export default function AppliedFilters() {
  const { genres, query, format, season, sortBy, year } = useSearch({
    from: "/anime/filter/",
  });

  return (
    <div className="flex flex-wrap w-full gap-4">
      {query && (
        <div className="space-y-2">
          <p className="font-medium text-gray-400">Query</p>
          <FilterPill
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
              <FilterPill
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
          <FilterPill
            className="text-white bg-pink-600 rounded-full"
            label={`${sortBy.charAt(0).toUpperCase()}${sortBy.slice(1).toLowerCase()}`}
            onDelete={() => {}}
          />
        </div>
      )}
      {year && (
        <div className="space-y-2">
          <p className="font-medium text-gray-400">Year</p>
          <FilterPill
            className="text-white bg-indigo-500 rounded-full"
            label={year.toString()}
            onDelete={() => {}}
          />
        </div>
      )}
      {format && (
        <div className="space-y-2">
          <p className="font-medium text-gray-400">Format</p>
          <FilterPill
            className="text-white bg-orange-500 rounded-full"
            label={`${format.charAt(0).toUpperCase()}${format.slice(1).toLowerCase()}`}
            onDelete={() => {}}
          />
        </div>
      )}
      {season && (
        <div className="space-y-2">
          <p className="font-medium text-gray-400">Season</p>
          <FilterPill
            className="text-white bg-teal-500 rounded-full"
            label={`${season.charAt(0).toUpperCase()}${season.slice(1).toLowerCase()}`}
            onDelete={() => {}}
          />
        </div>
      )}
    </div>
  );
}
