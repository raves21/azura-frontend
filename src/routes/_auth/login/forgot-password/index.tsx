import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login/forgot-password/")({
  component: () => <Navigate to="/login" />,
});
