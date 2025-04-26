import { useDebounceInput } from "@/utils/hooks/useDebounceInput";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import SearchDialogContainer from "@/components/core/shared/search/SearchDialogContainer";
import SearchDialogForm from "@/components/core/shared/search/SearchDialogForm";
import { useFocusInput } from "@/utils/hooks/useFocusInput";
import TVSearchDialogResults from "./TVSearchDialogResults";
import { useSearchTV } from "@/services/media/tv/tvQueries";

export default function TVSearchDialog() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounceInput({ value: searchInput, delay: 400 });
  const navigate = useNavigate();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const { inputRef: searchInputRef } = useFocusInput({});

  const tvSearchQuery = useSearchTV(
    debouncedSearch.trim(),
    1,
    debouncedSearch.trim().length > 0
  );

  const { error: searchResultsError } = tvSearchQuery;

  const handleEnterPress: React.FormEventHandler = () => {
    toggleOpenDialog(null);
    navigate({
      to: "/tv/catalog/search",
      search: { query: searchInput.trim() },
    });
  };

  return (
    <SearchDialogContainer>
      <SearchDialogForm
        searchInput={searchInput}
        handleEnterPress={handleEnterPress}
      >
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          ref={searchInputRef}
          type="text"
          className={cn(
            "focus:outline-none p-5 md:text-lg placeholder-gray-400 font-medium text-mainWhite bg-gray-800 rounded-lg size-full",
            {
              "rounded-b-none": debouncedSearch || searchResultsError,
            }
          )}
          placeholder="Search TV Show..."
        />
        <TVSearchDialogResults
          query={debouncedSearch.trim()}
          tvSearchQuery={tvSearchQuery}
        />
      </SearchDialogForm>
    </SearchDialogContainer>
  );
}
