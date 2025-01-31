import { useSearch } from "@tanstack/react-router";
import AppliedFilterPill from "@/components/core/media/shared/catalog/AppliedFilterPill";
import { tvGenreLabels, tvSortByLabels } from "@/utils/variables/media/tv";

export default function TVAppliedFilters() {
  const { genres, sortBy, year } = useSearch({
    from: "/_protected/tv/catalog/"
  });

  return (
    <div className="flex w-full gap-4 overflow-x-auto hide-scrollbar sm:overflow-x-visible sm:flex-wrap">
      {genres && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Genres
          </p>
          <div className="flex items-center gap-2 overflow-x-auto sm:flex-wrap">
            {genres.map((genre) => (
              <AppliedFilterPill
                key={genre}
                className="text-white bg-blue-500 rounded-full"
                label={tvGenreLabels[genre]}
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
            label={tvSortByLabels[sortBy]}
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
    </div>
  );
}
