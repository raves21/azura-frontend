import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/anime/$")({
  component: () => <Navigate to="/" />,
});
