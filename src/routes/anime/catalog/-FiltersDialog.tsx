import { useGlobalStore } from "@/utils/stores/globalStore";
import {
  AnilistAnimeStatus,
  Format,
  Genre,
  Season,
  SortBy,
} from "@/utils/types/animeAnilist";
import { X } from "lucide-react";
import FilterPill from "./-FilterPill";
import { useState } from "react";
import FilterDropdown from "./-FilterDropdown";
import {
  formatLabels,
  seasonLabels,
  sortByLabels,
  anilistAnimeStatusLabels,
} from "@/utils/variables/anime";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { isEqual } from "radash";

const genres = Object.values(Genre);
const formats = Object.values(Format);
const seasons = Object.values(Season);
const sortBys = Object.values(SortBy);
const statuses = Object.values(AnilistAnimeStatus);
const startYear = 1970;
const endYear = new Date().getFullYear();
const years = Array.from({ length: endYear - startYear + 1 }).map(
  (_, i) => endYear - i
);

type Filters = {
  sortBy: SortBy;
  format: Format | undefined;
  status: AnilistAnimeStatus | undefined;
  season: Season | undefined;
  year: number | undefined;
  genres: Genre[] | [];
};

export default function FiltersDialog() {
  const { toggleOpenDialog } = useGlobalStore();
  const navigate = useNavigate();
  const {
    format: formatSearch,
    genres: genresSearch,
    season: seasonSearch,
    sortBy: sortBySearch,
    year: yearSearch,
    status: statusSearch,
  } = useSearch({ from: "/anime/catalog/" });

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    genresSearch ? genresSearch.split(",").map((genre) => genre as Genre) : []
  );
  const [selectedFormat, setSelectedFormat] = useState<Format | undefined>(
    formatSearch ? formatSearch : undefined
  );
  const [selectedSeason, setSelectedSeason] = useState<Season | undefined>(
    seasonSearch ? seasonSearch : undefined
  );
  const [selectedSortBy, setSelectedSortBy] = useState<SortBy>(
    sortBySearch ? sortBySearch : SortBy.TRENDING_DESC
  );
  const [selectedStatus, setSelectedStatus] = useState<
    AnilistAnimeStatus | undefined
  >(statusSearch ? statusSearch : undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    yearSearch ? yearSearch : undefined
  );

  const [initialFilters] = useState<Filters>({
    format: selectedFormat, 
    genres: selectedGenres,
    season: selectedSeason,
    sortBy: selectedSortBy,
    status: selectedStatus,
    year: selectedYear
  })

  function selectGenre(genre: Genre) {
    setSelectedGenres([...selectedGenres, genre]);
  }

  function deselectGenre(genre: Genre) {
    setSelectedGenres(
      selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
    );
  }

  function clearFilters() {
    setSelectedGenres([]);
    setSelectedFormat(undefined);
    setSelectedSeason(undefined);
    setSelectedSortBy(SortBy.TRENDING_DESC);
    setSelectedStatus(undefined);
    setSelectedYear(undefined);
  }

  function applyFilters() {
    const appliedFilters: Filters = {
      sortBy: selectedSortBy ?? SortBy.TRENDING_DESC,
      format: selectedFormat ?? undefined,
      status: selectedStatus ?? undefined,
      season: selectedSeason ?? undefined,
      year: selectedYear ?? undefined,
      genres: selectedGenres ?? [],
    };
    if (!isEqual(initialFilters, appliedFilters)) {
      navigate({
        to: "/anime/catalog",
        search: {
          format: selectedFormat,
          genres:
            selectedGenres.length !== 0 ? selectedGenres.join(",") : undefined,
          season: selectedSeason,
          sortBy:
            selectedSortBy !== initialFilters.sortBy
              ? selectedSortBy
              : undefined,
          status: selectedStatus,
          year: selectedYear,
        },
      });
    }
    toggleOpenDialog(null);
  }

  return (
    <div className="max-w-full w-dvw bg-black/50">
      <div className="w-[1312px] mx-auto min-h-screen text-white flex flex-col py-12 gap-6">
        <header className="flex items-center justify-between w-full">
          <div className="flex gap-6">
            <div className="relative flex items-center gap-4">
              <p className="text-gray-400">Sort By:</p>
              <FilterDropdown
                itemList={sortBys}
                onSelectItem={(sortBy) => setSelectedSortBy(sortBy)}
                labelMap={sortByLabels}
                currentlySelected={selectedSortBy}
              />
            </div>
            <div className="relative flex items-center gap-4">
              <p className="text-gray-400">Type:</p>
              <FilterDropdown
                itemList={formats}
                onSelectItem={(format) => setSelectedFormat(format)}
                labelMap={formatLabels}
                currentlySelected={selectedFormat}
              />
            </div>
            <div className="relative flex items-center gap-4">
              <p className="text-gray-400">Status:</p>
              <FilterDropdown
                itemList={statuses}
                labelMap={anilistAnimeStatusLabels}
                onSelectItem={(status) => setSelectedStatus(status)}
                currentlySelected={selectedStatus}
              />
            </div>
            <div className="relative flex items-center gap-4">
              <p className="text-gray-400">Season:</p>
              <FilterDropdown
                itemList={seasons}
                onSelectItem={(season) => setSelectedSeason(season)}
                labelMap={seasonLabels}
                currentlySelected={selectedSeason}
              />
            </div>
            <div className="relative flex items-center gap-4">
              <p className="text-gray-400">Year:</p>
              <FilterDropdown
                itemList={years}
                onSelectItem={(year) => setSelectedYear(year)}
                currentlySelected={selectedYear}
              />
            </div>
          </div>
          <button
            onClick={() => toggleOpenDialog(null)}
            className="box-content p-3 border border-white rounded-full group hover:bg-white"
          >
            <X className="size-4 stroke-white group-hover:stroke-darkBg" />
          </button>
        </header>
        <section className="flex flex-col items-center justify-center flex-grow gap-32">
          <div className="flex flex-col items-center w-full gap-8">
            <p className="text-2xl font-semibold text-gray-400">Genres</p>
            <div className="flex flex-wrap justify-center px-8 gap-x-4 gap-y-5">
              {genres.map((genre) => (
                <FilterPill
                  key={genre}
                  isSelected={selectedGenres.includes(genre)}
                  label={genre}
                  onClick={() =>
                    selectedGenres.includes(genre)
                      ? deselectGenre(genre)
                      : selectGenre(genre)
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex gap-5">
            <button
              onClick={() => clearFilters()}
              className="px-5 py-3 text-gray-200 bg-gray-500 rounded-full"
            >
              <p>Clear Filters</p>
            </button>
            <button
              onClick={() => applyFilters()}
              className="px-5 py-3 rounded-full bg-mainAccent"
            >
              <p>Apply Filters</p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
