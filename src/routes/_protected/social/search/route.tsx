import ContentOptions from "@/components/core/social/mainContent/contentOptions/ContentOptions";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { TContentOption } from "@/utils/types/social/shared";
import {
  createFileRoute,
  Outlet,
  useMatchRoute,
  useRouter
} from "@tanstack/react-router";
import { ArrowLeft, Circle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/_protected/social/search")({
  component: () => <SearchPageLayout />
});

function SearchPageLayout() {
  const [selectedSocialSearchOption, setSelectedSocialSearchOption] =
    useState<TContentOption | null>(null);

  const socialSearchKeyword = useGlobalStore(
    (state) => state.socialSearchKeyword
  );

  const router = useRouter();

  const searchPageOptions: TContentOption[] = useMemo(
    () => [
      {
        name: "Posts",
        linkProps: {
          to: "/social/search/posts",
          search: {
            query: socialSearchKeyword
          },
          replace: true
        }
      },
      {
        name: "People",
        linkProps: {
          to: "/social/search/people",
          search: {
            query: socialSearchKeyword
          },
          replace: true
        }
      }
    ],
    [socialSearchKeyword]
  );

  const matchRoute = useMatchRoute();
  const isSearchPostsPage = matchRoute({ to: "/social/search/posts" });

  useEffect(() => {
    if (isSearchPostsPage) {
      setSelectedSocialSearchOption(searchPageOptions[0]);
    } else {
      setSelectedSocialSearchOption(searchPageOptions[1]);
    }
  }, [isSearchPostsPage, searchPageOptions]);

  return (
    <section className="flex flex-col w-full gap-3">
      <div className="flex items-center gap-6 p-3 text-base font-semibold rounded-lg mobile-l:text-lg sm:p-5 sm:text-xl bg-socialPrimary">
        <button
          onClick={() => router.history.go(-1)}
          className="relative self-start w-min group"
        >
          <ArrowLeft className="transition-colors size-6 mobile-l:size-7 stroke-mainWhite group-hover:stroke-mainAccent" />
          <Circle className="fill-gray-700/20 stroke-none size-[150%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </button>
        <p>Showing results for "{socialSearchKeyword}"</p>
      </div>
      <ContentOptions
        contentOptions={searchPageOptions}
        selectedOption={selectedSocialSearchOption || searchPageOptions[0]}
        setSelectedOption={setSelectedSocialSearchOption}
      />
      <Outlet />
    </section>
  );
}
