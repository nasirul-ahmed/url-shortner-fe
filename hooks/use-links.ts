import { httpClient } from "@/lib/http-client";
import { useQuery } from "@tanstack/react-query";

export const useLinks = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["links", page, limit],
    queryFn: async () => {
      const { data } = await httpClient.get(
        `/links?page=${page}&limit=${limit}`,
      );
      return data;
    },
  });
};
