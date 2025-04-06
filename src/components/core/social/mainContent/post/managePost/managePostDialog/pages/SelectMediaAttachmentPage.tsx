import { useState } from "react";
import SearchOptions from "@/components/core/media/shared/search/SearchOptions";
import { useDebounceInput } from "@/utils/hooks/useDebounceInput";
import { useFocusInput } from "@/utils/hooks/useFocusInput";
import AttachmentMovieSearchResults from "../postAttachment/mediaAttachment/searchResults/movie/AttachmentMovieSearchResults";
import AttachmentTVSearchResults from "../postAttachment/mediaAttachment/searchResults/tv/AttachmentTVSearchResults";
import AttachmentAnimeSearchResults from "../postAttachment/mediaAttachment/searchResults/anime/AttachmentAnimeSearchResults";

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
        <AttachmentMovieSearchResults query={debouncedSearch.trim()} />
      ) : selectedMediaType === "TV" ? (
        <AttachmentTVSearchResults query={debouncedSearch.trim()} />
      ) : (
        <AttachmentAnimeSearchResults query={debouncedSearch.trim()} />
      )}
    </div>
  );
}
