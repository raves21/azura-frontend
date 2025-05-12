import MediaSelectionAnimeSearchResults from "@/components/core/shared/search/mediaSelectionSearchResults/MediaSelectionAnimeSearchResults";
import MediaSelectionMovieSearchResults from "@/components/core/shared/search/mediaSelectionSearchResults/MediaSelectionMovieSearchResults";
import MediaSelectionTVSearchResults from "@/components/core/shared/search/mediaSelectionSearchResults/MediaSelectionTVSearchResults";
import SearchOptions from "@/components/core/shared/search/SearchOptions";
import GlobalDialogHeader from "@/components/global/shared/GlobalDialogHeader";
import GlobalDialogHeaderCloseButton from "@/components/global/shared/GlobalDialogHeaderCloseButton";
import GlobalDialogHeaderTitle from "@/components/global/shared/GlobalDialogHeaderTitle";
import { useDebounceInput } from "@/utils/hooks/useDebounceInput";
import { useFocusInput } from "@/utils/hooks/useFocusInput";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useState } from "react";

const mediaTypes = ["Movie", "TV", "Anime"];

export default function AddCollectionItemDialog() {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const [selectedMediaType, setSelectedMediaType] = useState(mediaTypes[0]);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounceInput({ value: searchInput, delay: 400 });
  const { inputRef: searchInputRef } = useFocusInput({
    deps: [selectedMediaType],
  });

  return (
    <div className="h-dvh w-dvw md:h-[500px] overflow-hidden bg-socialPrimary rounded-lg flex flex-col md:w-[550px] text-mainWhite">
      <GlobalDialogHeader>
        <GlobalDialogHeaderTitle>Add Collection Item</GlobalDialogHeaderTitle>
        <GlobalDialogHeaderCloseButton onClick={() => toggleOpenDialog(null)} />
      </GlobalDialogHeader>
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
