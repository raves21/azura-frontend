// import { StrictMode, useState } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import Providers from "./Providers";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface HistoryState {
    animeInfoPageNavigationState?: {
      id: string;
      image: string;
      cover: string;
      genres: string[];
      description: string;
      type: string;
    };
  }
}

export default function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
