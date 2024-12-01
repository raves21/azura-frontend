import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/profile/")({
  component: () => <Navigate to="/social" />,
});
