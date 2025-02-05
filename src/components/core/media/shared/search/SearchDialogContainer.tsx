import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useMatchRoute } from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import { useShallow } from "zustand/react/shallow";

export default function SearchDialogContainer({ children }: PropsWithChildren) {
  const [selectedSocialSearchOption, setSelectedSocialSearchOption] =
    useGlobalStore(
      useShallow((state) => [
        state.selectedSocialSearchOption,
        state.setSelectedSocialSearchOption
      ])
    );

  const matchRoute = useMatchRoute();

  if (matchRoute({ to: "/social", fuzzy: true })) {
    return (
      <div className="w-dvw sm:px-8 md:max-w-[800px] px-2 flex flex-col">
        <div className="flex w-full overflow-hidden font-medium text-gray-300 bg-gray-800 rounded-t-lg">
          <button
            onClick={() => setSelectedSocialSearchOption("people")}
            className={cn("grid flex-grow py-4 place-items-center", {
              "bg-mainAccent text-mainWhite font-semibold transition-colors duration-300":
                selectedSocialSearchOption === "people"
            })}
          >
            People
          </button>
          <button
            onClick={() => setSelectedSocialSearchOption("posts")}
            className={cn("grid flex-grow py-4 place-items-center", {
              "bg-mainAccent text-mainWhite font-semibold transition-colors duration-300":
                selectedSocialSearchOption === "posts"
            })}
          >
            Posts
          </button>
        </div>
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return <div className="px-2 w-dvw sm:px-8 md:max-w-[800px]">{children}</div>;
}
