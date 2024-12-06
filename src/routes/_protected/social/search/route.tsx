import BackButton from "@/components/shared/BackButton";
import ContentOptions from "@/components/shared/social/mainContent/content/ContentOptions";
import { TContentOption } from "@/utils/types/social/shared";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/search")({
  component: () => <SearchPageLayout />,
});

const searchPageOptions: TContentOption[] = [
  {
    name: "Posts",
    linkProps: {
      to: "/social/search/posts",
    },
  },
  {
    name: "People",
    linkProps: {
      to: "/social/search/people",
    },
  },
  {
    name: "Collections",
    linkProps: {
      to: "/social/search/posts",
    },
  },
];

function SearchPageLayout() {
  return (
    <section className="flex flex-col w-full gap-4">
      <div className="flex items-center gap-6 p-5 text-xl font-semibold rounded-lg bg-socialPrimary">
        <BackButton
          linkProps={{
            //todo: pass from state before going in /search, so that it will know where to navigate back
            to: "/social",
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
