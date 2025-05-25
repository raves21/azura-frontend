import { QueryClient } from "@tanstack/react-query";

const neverRefetchSettings = {
  gcTime: Infinity,
  staleTime: Infinity,
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false
};

export const frequentlyChanging = {
  gcTime: 20 * 60 * 1000, //20 min
  staleTime: 15 * 60 * 1000, //15 min
};

export const rarelyChanging = {
  gcTime: 300 * (60 * 1000), //5 hrs
  staleTime: 240 * (60 * 1000), //4 hrs
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