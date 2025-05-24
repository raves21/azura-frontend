import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/settings/_change-details/change-password/"
)({
  component: () => <Navigate to="/settings" />,
});
