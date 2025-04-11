import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import {
  AnilistAnimeStatus,
  AnimeFormat,
  AnimeGenre,
  AnimeSeason,
  AnimeSortBy,
} from "@/utils/types/media/anime/animeAnilist";
import FilterPill from "@/components/core/media/shared/catalog/FilterPill";
import { useState } from "react";
import CustomDropdown from "@/components/core/shared/CustomDropdown";
import {
  animeFormatLabels,
  animeSeasonLabels,
  animeSortByLabels,
  animeAnilistStatusLabels,
} from "@/utils/variables/media/anime";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { isEqual } from "radash";
import { X } from "lucide-react";

const startYear = 1970;
const endYear = new Date().getFullYear();
const years = Array.from({ length: endYear - startYear + 1 }).map(
  (_, i) => endYear - i
);

type Filters = {
  sortBy: AnimeSortBy;
  format: AnimeFormat | undefined;
  status: AnilistAnimeStatus | undefined;
  season: AnimeSeason | undefined;
  year: number | undefined;
  genres: AnimeGenre[] | [];
};

export default function AnimeFiltersDialog() {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const navigate = useNavigate();
  const { format, genres, season, sortBy, year, status, query } = useSearch({
    from: "/_protected/anime/catalog/",
  });

  const [selectedGenres, setSelectedGenres] = useState<AnimeGenre[]>(
    genres || []
  );
  const [selectedFormat, setSelectedFormat] = useState<AnimeFormat | undefined>(
    format ? format : undefined
  );
  const [selectedSeason, setSelectedSeason] = useState<AnimeSeason | undefined>(
    season ? season : undefined
  );
  const [selectedSortBy, setSelectedSortBy] = useState<AnimeSortBy>(
    sortBy ? sortBy : AnimeSortBy.TRENDING_DESC
  );
  const [selectedStatus, setSelectedStatus] = useState<
    AnilistAnimeStatus | undefined
  >(status ? status : undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    year ? year : undefined
  );

  const [initialFilters] = useState<Filters>({
    format: selectedFormat,
    genres: selectedGenres,
    season: selectedSeason,
    sortBy: selectedSortBy,
    status: selectedStatus,
    year: selectedYear,
  });

  const selectGenre = (genre: AnimeGenre) => {
    setSelectedGenres([...selectedGenres, genre]);
  };

  const deselectGenre = (genre: AnimeGenre) => {
    setSelectedGenres(
      selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedFormat(undefined);
    setSelectedSeason(undefined);
    setSelectedSortBy(AnimeSortBy.TRENDING_DESC);
    setSelectedStatus(undefined);
    setSelectedYear(undefined);
  };

  const applyFilters = () => {
    const appliedFilters: Filters = {
      sortBy: selectedSortBy ?? AnimeSortBy.TRENDING_DESC,
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
          genres: selectedGenres.length !== 0 ? selectedGenres : undefined,
          season: selectedSeason,
          sortBy:
            selectedSortBy !== initialFilters.sortBy
              ? selectedSortBy
              : undefined,
          status: selectedStatus,
          year: selectedYear,
          query,
        },
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
                  menuItems={Object.keys(animeSortByLabels) as AnimeSortBy[]}
                  onSelectItem={(sortBy) => setSelectedSortBy(sortBy)}
                  menuItemLabelNames={Object.values(animeSortByLabels)}
                  currentlySelected={selectedSortBy}
                  menuContentMaxHeight={300}
                />
              </div>
              <div className="relative flex flex-col items-center gap-4">
                <p className="text-gray-400">Type:</p>
                <CustomDropdown
                  menuItems={Object.keys(animeFormatLabels) as AnimeFormat[]}
                  onSelectItem={(format) => setSelectedFormat(format)}
                  menuItemLabelNames={Object.values(animeFormatLabels)}
                  currentlySelected={selectedFormat}
                  menuContentMaxHeight={300}
                />
              </div>
              <div className="relative flex flex-col items-center gap-4">
                <p className="text-gray-400">Status:</p>
                <CustomDropdown
                  menuItems={
                    Object.keys(
                      animeAnilistStatusLabels
                    ) as AnilistAnimeStatus[]
                  }
                  onSelectItem={(status) => setSelectedStatus(status)}
                  menuItemLabelNames={Object.values(animeAnilistStatusLabels)}
                  currentlySelected={selectedStatus}
                  menuContentMaxHeight={300}
                />
              </div>
              <div className="relative flex flex-col items-center gap-4">
                <p className="text-gray-400">Season:</p>
                <CustomDropdown
                  menuItems={Object.keys(animeSeasonLabels) as AnimeSeason[]}
                  onSelectItem={(season) => setSelectedSeason(season)}
                  menuItemLabelNames={Object.values(animeSeasonLabels)}
                  currentlySelected={selectedSeason}
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
                {Object.values(AnimeGenre).map((genre) => (
                  <FilterPill
                    className="px-3 py-2 text-xs md:text-sm mobile-m:px-4 mobile-m:py-3 md:px-5 md:py-3 xl:text-base"
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
