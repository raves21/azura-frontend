import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useMatchRoute } from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import { useShallow } from "zustand/react/shallow";
import SearchOptions from "./SearchOptions";
import { SocialSearchOption } from "@/utils/types/social/shared";

const socialSearchOptions: SocialSearchOption[] = ["People", "Posts"];

export default function SearchDialogContainer({ children }: PropsWithChildren) {
  const [selectedSocialSearchOption, setSelectedSocialSearchOption] =
    useGlobalStore(
      useShallow((state) => [
        state.selectedSocialSearchOption,
        state.setSelectedSocialSearchOption,
      ])
    );

  const matchRoute = useMatchRoute();
  const isSocialRoute = matchRoute({ to: "/social", fuzzy: true });
  const isAccountRoute = matchRoute({ to: "/account", fuzzy: true });

  if (isSocialRoute || isAccountRoute) {
    return (
      <div className="w-dvw sm:px-8 md:max-w-[800px] px-2 flex flex-col">
        <SearchOptions
          searchOptions={socialSearchOptions}
          selectedSearchOption={selectedSocialSearchOption as string}
          setSelectedSearchOption={(option) =>
            setSelectedSocialSearchOption(option as SocialSearchOption)
          }
        />
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return <div className="px-2 w-dvw sm:px-8 md:max-w-[800px]">{children}</div>;
}
