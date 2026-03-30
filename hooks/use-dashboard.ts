import { linksApi } from "@/lib/api-module";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: ["dashboard", { startDate, endDate }],
    queryFn: async () => {
      const data = await linksApi.dashboardData({ startDate, endDate });
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
