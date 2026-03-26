import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as T from "@/types/api";
import { linksApi } from "@/lib/api-module";

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: T.CreateLinkPayload) =>
      linksApi.create(payload).then((r) => r.data),

    // Optimistic update: inject a "pending" link immediately
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["links"] });
      const previous = queryClient.getQueryData<T.PaginatedLinks>(["links", 1]);

      const optimistic: T.ShortUrlLink = {
        shortCode: "...",
        originalUrl: payload.originalUrl,
        totalClicks: 0,
        status: "active",
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<T.PaginatedLinks>(["links", 1], (old) =>
        old
          ? { ...old, data: [optimistic, ...old.data], total: old.total + 1 }
          : old,
      );

      return { previous };
    },

    // Roll back on error
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["links", 1], ctx.previous);
      }
    },

    // Always refetch to get real shortCode from server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
}
