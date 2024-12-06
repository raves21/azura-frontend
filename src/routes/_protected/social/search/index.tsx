import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/search/")({
  component: () => <Navigate to="/social" />,
});
