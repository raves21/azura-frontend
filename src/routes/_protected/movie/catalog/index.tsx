import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/movie/catalog/")({
  component: () => <MovieCatalogPage />
});

function MovieCatalogPage() {
  return <div></div>;
}
