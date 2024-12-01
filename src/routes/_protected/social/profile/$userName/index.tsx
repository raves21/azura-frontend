import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/profile/$userName/")({
  component: () => <UserProfilePage />,
});

function UserProfilePage() {
  return <></>;
}
