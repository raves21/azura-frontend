import { useDebounce } from "@/utils/hooks/useDebounce";
import { useState } from "react";
import AnimeSearchDialogResults from "./AnimeSearchDialogResults";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import SearchDialogContainer from "@/components/core/media/shared/search/SearchDialogContainer";
import SearchDialogForm from "@/components/core/media/shared/search/SearchDialogForm";
import { useFocusInput } from "@/utils/hooks/useFocusInput";
import { useSearchAnime } from "@/services/media/anime/queries/animeQueries";

export default function AnimeSearchDialog() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce({ value: searchInput, delay: 400 });
  const navigate = useNavigate();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const { searchInputRef } = useFocusInput();

  const animeSearchQuery = useSearchAnime(
    debouncedSearch.trim(),
    debouncedSearch.trim().length > 0
  );
  const { error: animeSearchQueryError } = animeSearchQuery;

  const handleEnterPress: React.FormEventHandler = () => {
    toggleOpenDialog(null);
    navigate({
      to: "/anime/catalog",
      search: { query: searchInput.trim() }
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
              "rounded-b-none": debouncedSearch || animeSearchQueryError
            }
          )}
          placeholder="Search Animes..."
        />
        <AnimeSearchDialogResults
          query={debouncedSearch.trim()}
          animeSearchQuery={animeSearchQuery}
        />
      </SearchDialogForm>
    </SearchDialogContainer>
  );
}
