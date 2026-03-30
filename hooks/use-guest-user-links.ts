import { useQuery } from "@tanstack/react-query";

export function useGuestLinks() {
  return useQuery({
    queryKey: ["guest_links"],
    queryFn: () => {
      const data = localStorage.getItem("guest_links");
      return data ? JSON.parse(data) : [];
    },
    staleTime: Infinity,
  });
}
