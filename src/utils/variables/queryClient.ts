import { QueryClient } from "@tanstack/react-query";

//this is the settings during development. to minimize network requests
const neverRefetchSettings = {
  gcTime: Infinity,
  staleTime: Infinity,
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      ...neverRefetchSettings
    }
  }
});