import { useState } from "react";
import SearchOptions from "@/components/core/shared/search/SearchOptions";
import { useDebounceInput } from "@/utils/hooks/useDebounceInput";
import { useFocusInput } from "@/utils/hooks/useFocusInput";
import MediaSelectionMovieSearchResults from "@/components/core/social/shared/mediaSelectionSearchDialog/MediaSelectionMovieSearchResults";
import MediaSelectionTVSearchResults from "@/components/core/social/shared/mediaSelectionSearchDialog/MediaSelectionTVSearchResults";
import MediaSelectionAnimeSearchResults from "@/components/core/social/shared/mediaSelectionSearchDialog/MediaSelectionAnimeSearchResults";

const mediaTypes = ["Movie", "TV", "Anime"];

export default function SelectMediaAttachmentPage() {
  const [selectedMediaType, setSelectedMediaType] = useState(mediaTypes[0]);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounceInput({ value: searchInput, delay: 400 });
  const { searchInputRef } = useFocusInput({ deps: [selectedMediaType] });

  return (
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
          type="managePostMediaAttachment"
        />
      ) : selectedMediaType === "TV" ? (
        <MediaSelectionTVSearchResults
          query={debouncedSearch.trim()}
          type="managePostMediaAttachment"
        />
      ) : (
        <MediaSelectionAnimeSearchResults
          query={debouncedSearch.trim()}
          type="managePostMediaAttachment"
        />
      )}
    </div>
  );
}
