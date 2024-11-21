import { useSearchAnime } from "@/services/thirdParty/animeQueries";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import SearchDialogResults from "./-SearchDialogResults";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useGlobalStore } from "@/utils/stores/globalStore";
import SearchDialogContainer from "@/components/shared/search/SearchDialogContainer";
import SearchDialogForm from "@/components/shared/search/SearchDialogForm";

export default function SearchDialog() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce({ value: search, delay: 400 });
  const navigate = useNavigate();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    error: searchResultsError,
  } = useSearchAnime(debouncedSearch.trim(), debouncedSearch.trim().length > 0);

  const handleEnterPress: React.FormEventHandler = () => {
    toggleOpenDialog(null);
    navigate({
      to: "/anime/catalog",
      search: { query: search.trim() },
    });
  };

  return (
    <SearchDialogContainer>
      <SearchDialogForm search={search} handleEnterPress={handleEnterPress}>
        <input
          onChange={(e) => setSearch(e.target.value)}
          ref={searchInputRef}
          type="text"
          className={cn(
            "focus:outline-none p-5 md:text-lg placeholder-gray-400 font-medium text-mainWhite bg-gray-800 rounded-lg size-full",
            {
              "rounded-b-none":
                debouncedSearch || isSearchResultsLoading || searchResultsError,
            }
          )}
          placeholder="Search anime..."
        />
        <SearchDialogResults
          query={debouncedSearch.trim()}
          searchResults={searchResults}
          isLoading={isSearchResultsLoading}
          error={searchResultsError}
        />
      </SearchDialogForm>
    </SearchDialogContainer>
  );
}
