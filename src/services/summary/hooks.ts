import { useQuery } from "@tanstack/react-query";
import { getDailySummary } from "./api";
import type { DailySummary } from "./types";

export const useGetDailySummary = (date?: string) => {
  return useQuery<DailySummary>({
    queryKey: ["summary", "daily", date],
    queryFn: async () => {
      const res = await getDailySummary(date);
      return res.data?.summary ?? res.data;
    },
  });
};
