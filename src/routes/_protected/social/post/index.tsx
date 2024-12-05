import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/post/")({
  component: () => <Navigate to="/social" />,
});
