import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Cache persists for 30 mins
      retry: 1, // Retry once on failure
      refetchOnWindowFocus: false, // Don't spam API when switching tabs
    },
  },
});
