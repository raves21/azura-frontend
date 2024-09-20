import { useSearchAnime } from "@/api/animes";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import SearchDialogResults from "./-SearchDialogResults";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useGlobalStore } from "@/utils/stores/globalStore";

export default function SearchDialog() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce({ value: search, delay: 400 });
  const navigate = useNavigate();
  const { toggleOpenDialog } = useGlobalStore();

  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    error: searchResultsError,
  } = useSearchAnime(debouncedSearch.trim(), debouncedSearch.trim().length > 0);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleEnterPress: React.FormEventHandler = () => {
    toggleOpenDialog(null);
    navigate({
      to: "/anime/catalog",
      search: { query: search.trim() },
    });
  };

  return (
    <div className="w-[800px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (search.trim().length >= 1) {
            handleEnterPress(e);
          }
        }}
      >
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
        <SearchDialogResults
          query={debouncedSearch.trim()}
          searchResults={searchResults}
          isLoading={isSearchResultsLoading}
          error={searchResultsError}
        />
        <input type="submit" className="hidden" />
      </form>
    </div>
  );
}
