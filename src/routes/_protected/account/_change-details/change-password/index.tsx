import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/account/_change-details/change-password/")({
  component: () => <Navigate to="/account" />,
});
