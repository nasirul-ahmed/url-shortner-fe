import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as T from "@/types/api";
import { linksApi } from "@/lib/api-module";

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: T.CreateLinkPayload) =>
      linksApi.create(payload).then((r) => r.data),

    onSuccess: (newLink) => {
      const existing = JSON.parse(localStorage.getItem("guest_links") || "[]");
      const updated = [newLink, ...existing];
      localStorage.setItem("guest_links", JSON.stringify(updated));
      queryClient.invalidateQueries({ queryKey: ["guest_links"] });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
}
