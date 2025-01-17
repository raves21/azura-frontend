import { cn } from "@/lib/utils";
import SearchDialogForm from "../../media/shared/search/SearchDialogForm";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useFocusInput } from "@/utils/hooks/useFocusInput";
import SearchDialogContainer from "../../media/shared/search/SearchDialogContainer";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useShallow } from "zustand/react/shallow";

export default function SocialSearchDialog() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce({ value: search, delay: 400 });
  const [selectedSocialSearchOption, setSelectedSocialSearchOption] =
    useGlobalStore(
      useShallow((state) => [
        state.selectedSocialSearchOption,
        state.setSelectedSocialSearchOption
      ])
    );

  useEffect(() => {
    setSelectedSocialSearchOption("posts");
  }, []);

  const { searchInputRef } = useFocusInput({
    deps: [selectedSocialSearchOption]
  });

  const handleEnterPress: React.FormEventHandler = () => {};

  return (
    <SearchDialogContainer>
      <SearchDialogForm
        searchInput={search}
        handleEnterPress={handleEnterPress}
      >
        <input
          onChange={(e) => setSearch(e.target.value)}
          ref={searchInputRef}
          type="text"
          className={cn(
            "focus:outline-none p-5 md:text-lg placeholder-gray-400 font-medium text-mainWhite bg-gray-800 rounded-b-lg size-full",
            {
              "rounded-b-none": debouncedSearch
              //   ||
              //   isSearchResultsLoading ||
              //   searchResultsError,
            }
          )}
          placeholder={`Search for ${selectedSocialSearchOption}...`}
        />
      </SearchDialogForm>
    </SearchDialogContainer>
  );
}
