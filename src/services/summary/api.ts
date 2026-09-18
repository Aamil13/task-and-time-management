import type { AxiosResponse } from "axios";
import client from "../api-client";
import type { DailySummaryResponse } from "./types";

// GET /summary/daily?date=YYYY-MM-DD
export async function getDailySummary(
  date?: string
): Promise<AxiosResponse<DailySummaryResponse>> {
  return client.get<DailySummaryResponse>("/summary/daily", {
    params: date ? { date } : undefined,
  });
}
