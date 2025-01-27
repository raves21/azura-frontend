import { useSearch } from "@tanstack/react-router";
import AppliedFilterPill from "@/components/core/media/shared/catalog/AppliedFilterPill";
import {
  animeFormatLabels,
  animeSeasonLabels,
  animeSortByLabels,
  animeAnilistStatusLabels
} from "@/utils/variables/media/anime";

export default function AnimeAppliedFilters() {
  const { genres, query, format, season, sortBy, year, status } = useSearch({
    from: "/_protected/anime/catalog/"
  });

  return (
    <div className="flex w-full gap-4 overflow-x-auto hide-scrollbar sm:overflow-x-visible sm:flex-wrap">
      {query && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Query
          </p>
          <AppliedFilterPill
            className="text-white rounded-full bg-emerald-500"
            label={`"${query}"`}
          />
        </div>
      )}
      {genres && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Genres
          </p>
          <div className="flex items-center gap-2 overflow-x-auto sm:flex-wrap">
            {genres.split(",").map((genre) => (
              <AppliedFilterPill
                key={genre}
                className="text-white bg-blue-500 rounded-full"
                label={genre}
              />
            ))}
          </div>
        </div>
      )}
      {sortBy && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Sort By
          </p>
          <AppliedFilterPill
            className="text-white bg-pink-600 rounded-full"
            label={animeSortByLabels[sortBy]}
          />
        </div>
      )}
      {format && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Format
          </p>
          <AppliedFilterPill
            className="text-white bg-orange-500 rounded-full"
            label={animeFormatLabels[format]}
          />
        </div>
      )}
      {status && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Status
          </p>
          <AppliedFilterPill
            className="text-white rounded-full bg-lime-600"
            label={animeAnilistStatusLabels[status]}
          />
        </div>
      )}
      {year && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Year
          </p>
          <AppliedFilterPill
            className="text-white rounded-full bg-sky-500"
            label={year.toString()}
          />
        </div>
      )}
      {season && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Season
          </p>
          <AppliedFilterPill
            className="text-white bg-teal-500 rounded-full"
            label={animeSeasonLabels[season]}
          />
        </div>
      )}
    </div>
  );
}
