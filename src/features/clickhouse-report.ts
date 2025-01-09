import {
  ClickhouseReport,
  ClickhouseSummary,
} from "@/hooks/use-clickhouse-report";
import { atom } from "jotai";

export const ClickhouseReportState = atom<ClickhouseReport[] | null>(null);

export const ClickhouseSummaryState = atom<ClickhouseSummary | null>(null);
