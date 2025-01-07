import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/$userHandle/posts/")({
  component: () => <Navigate to="/social" />,
});
