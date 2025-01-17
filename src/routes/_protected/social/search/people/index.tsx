import UserListItem from "@/components/core/social/UserListItem";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/search/people/")({
  component: () => <PeopleSearchResultsPage />
});

function PeopleSearchResultsPage() {
  return (
    <div className="flex flex-col w-full gap-3 p-5 rounded-lg bg-socialPrimary">
      {Array.from({ length: 3 }).map((_, i) => (
        <UserListItem key={i} />
      ))}
    </div>
  );
}
