import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/")({
  component: () => <SocialPage />,
});

function SocialPage() {
  return (
    <div className="grid min-h-screen bg-darkBg text-mainWhite place-items-center">
      hello social
    </div>
  );
}
