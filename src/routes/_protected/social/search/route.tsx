import BackButton from "@/components/core/BackButton";
import ContentOptions from "@/components/core/social/mainContent/contentOptions/ContentOptions";
import { TContentOption } from "@/utils/types/social/shared";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/search")({
  component: () => <SearchPageLayout />
});

const searchPageOptions: TContentOption[] = [
  {
    name: "Posts",
    linkProps: {
      to: "/social/search/posts"
    }
  },
  {
    name: "People",
    linkProps: {
      to: "/social/search/people"
    }
  },
  {
    name: "Collections",
    linkProps: {
      to: "/social/search/posts"
    }
  }
];

function SearchPageLayout() {
  return (
    <section className="flex flex-col w-full gap-3">
      <div className="flex items-center gap-6 p-3 text-base font-semibold rounded-lg mobile-l:text-lg sm:p-5 sm:text-xl bg-socialPrimary">
        <BackButton
          linkProps={{
            //todo: pass from state before going in /search, so that it will know where to navigate back
            to: "/social"
          }}
        />
        <p>Showing results for "elon musk"</p>
      </div>
      <ContentOptions
        contentOptions={searchPageOptions}
        defaultOption={searchPageOptions[0]}
      />
      <Outlet />
    </section>
  );
}
