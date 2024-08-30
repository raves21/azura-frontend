import { useSearchAnime } from "@/api/animes";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import SearchResults from "./-SearchResults";
import { cn } from "@/lib/utils";

export default function SearchDialog() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    error: searchResultsError,
  } = useSearchAnime(debouncedSearch.trim(), debouncedSearch.length > 0);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-[800px]">
      <input
        onChange={(e) => setSearch(e.target.value)}
        ref={searchInputRef}
        type="text"
        className={cn(
          "focus:outline-none p-5 text-lg placeholder-gray-400 font-medium text-[#f6f4f4] bg-gray-800 rounded-lg size-full",
          debouncedSearch ? "rounded-b-none" : ""
        )}
        placeholder="Search anime..."
      />
      <SearchResults
        query={debouncedSearch.trim()}
        searchResults={searchResults}
        isLoading={isSearchResultsLoading}
        error={searchResultsError}
      />
    </div>
  );
}
