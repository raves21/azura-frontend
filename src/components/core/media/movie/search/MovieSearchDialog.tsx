import { useDebounceInput } from "@/utils/hooks/useDebounceInput";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import SearchDialogContainer from "@/components/core/media/shared/search/SearchDialogContainer";
import SearchDialogForm from "@/components/core/media/shared/search/SearchDialogForm";
import { useFocusInput } from "@/utils/hooks/useFocusInput";
import MovieSearchDialogResults from "./MovieSearchDialogResults";
import { useSearchMovie } from "@/services/media/movie/movieQueries";

export default function MovieSearchDialog() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounceInput({ value: searchInput, delay: 400 });
  const navigate = useNavigate();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const { searchInputRef } = useFocusInput({});

  const movieSearchQuery = useSearchMovie(
    debouncedSearch.trim(),
    1,
    debouncedSearch.trim().length > 0
  );

  const { error: searchResultsError } = movieSearchQuery;

  const handleEnterPress: React.FormEventHandler = () => {
    toggleOpenDialog(null);
    navigate({
      to: "/movie/catalog/search",
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
          placeholder="Search Movies..."
        />
        <MovieSearchDialogResults
          query={debouncedSearch.trim()}
          movieSearchQuery={movieSearchQuery}
        />
      </SearchDialogForm>
    </SearchDialogContainer>
  );
}
