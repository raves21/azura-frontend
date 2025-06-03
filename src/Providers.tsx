import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/variables/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {!Number(import.meta.env.VITE_IS_PROD ) && <ReactQueryDevtools initialIsOpen={false} />}
      {children}
    </QueryClientProvider>
  );
}
