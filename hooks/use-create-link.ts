import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as T from "@/types/api";
import { linksApi } from "@/lib/api-module";

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: T.CreateLinkPayload) =>
      linksApi.create(payload).then((r) => r.data),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
}
