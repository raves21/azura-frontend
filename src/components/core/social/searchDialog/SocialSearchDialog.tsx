import { cn } from "@/lib/utils";
import SearchDialogForm from "../../media/shared/search/SearchDialogForm";
import { useDebounceInput } from "@/utils/hooks/useDebounceInput";
import { useEffect, useState } from "react";
import { useFocusInput } from "@/utils/hooks/useFocusInput";
import SearchDialogContainer from "../../media/shared/search/SearchDialogContainer";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useShallow } from "zustand/react/shallow";
import {
  useSearchPeople,
  useSearchPosts,
} from "@/services/social/queries/socialQueries";
import SearchPeopleResults from "./searchPeople/SearchPeopleResults";
import SearchPostsResults from "./searchPosts/SearchPostsResults";
import { useNavigate } from "@tanstack/react-router";

export default function SocialSearchDialog() {
  const [searchInput, setSearchInput] = useState("");
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const navigate = useNavigate();
  const debouncedSearch = useDebounceInput({ value: searchInput, delay: 400 });
  const [
    selectedSocialSearchOption,
    setSelectedSocialSearchOption,
    setSocialSearchKeyword,
  ] = useGlobalStore(
    useShallow((state) => [
      state.selectedSocialSearchOption,
      state.setSelectedSocialSearchOption,
      state.setSocialSearchKeyword,
    ])
  );

  useEffect(() => {
    setSelectedSocialSearchOption("people");
  }, []);

  const { searchInputRef } = useFocusInput({
    deps: [selectedSocialSearchOption],
  });

  const searchPostsQuery = useSearchPosts(
    debouncedSearch.trim(),
    debouncedSearch.trim().length > 0 && selectedSocialSearchOption === "posts"
  );

  const { error: searchPostsError } = searchPostsQuery;

  const searchPeopleQuery = useSearchPeople(
    debouncedSearch.trim(),
    debouncedSearch.trim().length > 0 && selectedSocialSearchOption === "people"
  );

  const { error: searchPeopleError } = searchPeopleQuery;

  const handleEnterPress: React.FormEventHandler = () => {
    toggleOpenDialog(null);
    const query = searchInput.trim();
    setSocialSearchKeyword(query);
    if (selectedSocialSearchOption === "people") {
      navigate({
        to: "/social/search/people",
        search: { query },
      });
    } else {
      navigate({
        to: "/social/search/people",
        search: { query },
      });
    }
  };

  if (selectedSocialSearchOption === "people") {
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
              "focus:outline-none p-5 text-sm mobile-m:text-md sm:text-base md:text-lg placeholder-gray-400 font-medium text-mainWhite bg-gray-800 rounded-b-lg size-full",
              {
                "rounded-b-none": debouncedSearch || searchPeopleError,
              }
            )}
            placeholder={`Search for people...`}
          />
          <SearchPeopleResults
            query={debouncedSearch.trim()}
            searchPeopleQuery={searchPeopleQuery}
          />
        </SearchDialogForm>
      </SearchDialogContainer>
    );
  }
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
            "focus:outline-none p-5 text-sm mobile-m:text-md sm:text-base md:text-lg placeholder-gray-400 font-medium text-mainWhite bg-gray-800 rounded-b-lg size-full",
            {
              "rounded-b-none": debouncedSearch || searchPostsError,
            }
          )}
          placeholder={`Search for posts...`}
        />
        <SearchPostsResults
          query={debouncedSearch.trim()}
          searchPostsQuery={searchPostsQuery}
        />
      </SearchDialogForm>
    </SearchDialogContainer>
  );
}
