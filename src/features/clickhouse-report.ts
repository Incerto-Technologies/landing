import { ClickhouseReport, Summary } from "@/hooks/use-clickhouse-report";
import { atom } from "jotai";

export const ClickhouseReportState = atom<ClickhouseReport[] | null>(null);

export const ClickhouseSummaryState = atom<Summary | null>(null);
