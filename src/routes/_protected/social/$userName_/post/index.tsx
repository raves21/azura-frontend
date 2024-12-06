import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/$userName/post/")({
  component: () => <Navigate to="/social" />,
});
