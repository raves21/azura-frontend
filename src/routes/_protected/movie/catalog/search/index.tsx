import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const movieSearchResultsPageSchema = z.object({
  query: z.string()
});

export const Route = createFileRoute("/_protected/movie/catalog/search/")({
  component: () => <MovieSearchPage />,
  validateSearch: (search) => movieSearchResultsPageSchema.parse(search)
});

function MovieSearchPage() {
  return <div></div>;
}
