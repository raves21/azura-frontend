import MediaSelectionAnimeSearchResults from "@/components/core/shared/search/mediaSelectionSearchResults/MediaSelectionAnimeSearchResults";
import MediaSelectionMovieSearchResults from "@/components/core/shared/search/mediaSelectionSearchResults/MediaSelectionMovieSearchResults";
import MediaSelectionTVSearchResults from "@/components/core/shared/search/mediaSelectionSearchResults/MediaSelectionTVSearchResults";
import SearchOptions from "@/components/core/shared/search/SearchOptions";
import { useDebounceInput } from "@/utils/hooks/useDebounceInput";
import { useFocusInput } from "@/utils/hooks/useFocusInput";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { X } from "lucide-react";
import { useState } from "react";

const mediaTypes = ["Movie", "TV", "Anime"];

export default function AddCollectionItemDialog() {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const [selectedMediaType, setSelectedMediaType] = useState(mediaTypes[0]);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounceInput({ value: searchInput, delay: 400 });
  const { searchInputRef } = useFocusInput({ deps: [selectedMediaType] });

  return (
    <div className="h-[500px] overflow-hidden bg-socialPrimary rounded-lg flex flex-col w-[550px] text-mainWhite">
      <div className="relative w-full py-4 border-b-[0.5px] grid place-items-center border-socialTextSecondary/40">
        <p className="text-lg font-semibold">Add Collection Item</p>
        <button
          onClick={() => toggleOpenDialog(null)}
          className="group absolute top-1/2 -translate-y-1/2 right-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
        >
          <X className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
        </button>
      </div>
      <div className="size-full flex flex-col">
        <SearchOptions
          className="bg-socialPrimary rounded-none"
          searchOptions={mediaTypes}
          selectedSearchOption={selectedMediaType}
          setSelectedSearchOption={setSelectedMediaType}
        />
        <input
          ref={searchInputRef}
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={`Search for ${selectedMediaType}...`}
          className="w-full outline-none border-b-[0.5px] border-socialTextSecondary py-5 px-4 text-lg text-mainWhite bg-socialPrimary"
        />
        {selectedMediaType === "Movie" ? (
          <MediaSelectionMovieSearchResults
            query={debouncedSearch.trim()}
            type="addCollectionItem"
          />
        ) : selectedMediaType === "TV" ? (
          <MediaSelectionTVSearchResults
            query={debouncedSearch.trim()}
            type="addCollectionItem"
          />
        ) : (
          <MediaSelectionAnimeSearchResults
            query={debouncedSearch.trim()}
            type="addCollectionItem"
          />
        )}
      </div>
    </div>
  );
}
