import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import FilterPill from "@/components/core/media/shared/catalog/FilterPill";
import { useState } from "react";
import CustomDropdown from "@/components/core/CustomDropdown";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { isEqual } from "radash";
import { X } from "lucide-react";
import { TVGenre, TVSortBy } from "@/utils/types/media/TV/tvShowTmdb";
import { tvSortByLabels } from "@/utils/variables/media/tv";
import { useTVGenres } from "@/services/media/tv/tvQueries";

const startYear = 1900;
const endYear = new Date().getFullYear();
const years = Array.from({ length: endYear - startYear + 1 }).map(
  (_, i) => endYear - i
);

type Filters = {
  sortBy: TVSortBy | undefined;
  genres: TVGenre[] | [];
  year: number | undefined;
};

export default function TVFiltersDialog() {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const navigate = useNavigate();
  const { sortBy, genres, year } = useSearch({
    from: "/_protected/tv/catalog/"
  });

  //already fetched in /tv/catalog->index.tsx so it wont need to load anymore
  const { data: tvGenres } = useTVGenres();

  const [selectedGenres, setSelectedGenres] = useState<TVGenre[]>(genres || []);
  const [selectedSortBy, setSelectedSortBy] = useState<TVSortBy | undefined>(
    sortBy || undefined
  );
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    year || undefined
  );

  const [initialFilters] = useState<Filters>({
    genres: selectedGenres,
    sortBy: selectedSortBy,
    year: selectedYear
  });

  const selectGenre = (genre: TVGenre) => {
    setSelectedGenres([...selectedGenres, genre]);
  };

  const deselectGenre = (genre: TVGenre) => {
    setSelectedGenres(
      selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedSortBy(undefined);
    setSelectedYear(undefined);
  };

  const applyFilters = () => {
    const appliedFilters: Filters = {
      sortBy: selectedSortBy,
      year: selectedYear,
      genres: selectedGenres ?? []
    };
    if (!isEqual(initialFilters, appliedFilters)) {
      navigate({
        to: "/tv/catalog",
        search: {
          genres: selectedGenres.length !== 0 ? selectedGenres : undefined,
          sortBy:
            selectedSortBy !== initialFilters.sortBy
              ? selectedSortBy
              : undefined,
          year: selectedYear
        }
      });
    }
    toggleOpenDialog(null);
  };

  return (
    <div className="max-w-full w-dvw bg-black/50">
      <div className="xl:max-w-[1200px] 1440:max-w-[1350px] 2xl:max-w-[1440px] mx-auto min-h-screen px-1 text-white flex flex-col pb-12 md:pb-0">
        <button
          onClick={() => toggleOpenDialog(null)}
          className="box-content fixed self-end p-2 transition-colors border border-gray-400 rounded-full lg:p-3 top-5 right-3 w-fit group hover:bg-white"
        >
          <X className="size-4 lg:size-5 stroke-gray-400 group-hover:stroke-darkBg" />
        </button>
        <div className="flex flex-col justify-center flex-grow pt-16 md:pt-0 gap-14 md:gap-16 lg:gap-20">
          <div className="flex items-center justify-center w-full pt-8 md:pt-0">
            <div className="flex flex-wrap justify-center gap-6 text-xs xl:text-base mobile-m:px-2 sm:px-2 md:px-3 md:text-sm">
              <div className="relative flex flex-col items-center gap-4">
                <p className="text-gray-400">Sort By:</p>
                <CustomDropdown
                  menuItems={Object.keys(tvSortByLabels) as TVSortBy[]}
                  onSelectItem={(sortBy) => setSelectedSortBy(sortBy)}
                  menuItemLabelNames={Object.values(tvSortByLabels)}
                  currentlySelected={selectedSortBy}
                  menuContentMaxHeight={300}
                />
              </div>
              <div className="relative flex flex-col items-center gap-4">
                <p className="text-gray-400">Year:</p>
                <CustomDropdown
                  menuItems={years}
                  onSelectItem={(year) => setSelectedYear(year)}
                  currentlySelected={selectedYear}
                  menuContentMaxHeight={300}
                />
              </div>
            </div>
          </div>
          <section className="flex flex-col items-center justify-center gap-16">
            <div className="flex flex-col items-center w-full gap-6 px-2">
              <p className="font-semibold text-gray-400 xl:text-2xl sm:text-base md:text-lg lg:text-xl">
                Genres
              </p>
              <div className="flex flex-wrap justify-center gap-x-2 max-w-[1100px] px-4 gap-y-3 md:gap-x-3 md:gap-y-4">
                {tvGenres &&
                  tvGenres.map((genre) => (
                    <FilterPill
                      className="px-3 py-2 text-xs md:text-sm mobile-m:px-4 mobile-m:py-3 md:px-5 md:py-3 xl:text-base"
                      key={genre.id}
                      isSelected={selectedGenres.includes(genre.id)}
                      label={genre.name}
                      onClick={() =>
                        selectedGenres.includes(genre.id)
                          ? deselectGenre(genre.id)
                          : selectGenre(genre.id)
                      }
                    />
                  ))}
              </div>
            </div>
            <div className="flex gap-5 text-sm lg:text-base">
              <button
                onClick={() => clearFilters()}
                className="px-4 py-3 text-gray-200 bg-gray-500 rounded-full lg:px-5 lg:py-3"
              >
                <p>Clear Filters</p>
              </button>
              <button
                onClick={() => applyFilters()}
                className="px-4 py-3 text-gray-200 transition-colors border rounded-full border-mainAccent hover:text-mainAccent lg:px-5 lg:py-3"
              >
                <p>Apply Filters</p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
