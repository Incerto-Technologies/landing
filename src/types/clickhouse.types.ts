import { Alert, AlertRemediationStep } from "./alert.types";
import { ApiResponse } from "./server.type";

export enum ClickhouseTabsEnum {
  SUMMARY = "summary",
  PROBLEMS = "problems",
  REMEDIATION = "remediation",
}

export type ClickhouseStateType = {
  activeTab: ClickhouseTabsEnum;
};
export type SummaryQueryResponse = ApiResponse<
  Omit<
    ClickhouseSummaryData,
    "totalNoOfInsights" | "totalNoOfErrors" | "recentFiringAlertAt"
  >[]
>;

export type ClickhouseSummaryData = {
  label: string;
  remediationConfig?: RemediationConfig;
  remediations?: RemediationConfig[];
  totalNoOfInsights: number;
  totalNoOfErrors: number;
  recentFiringAlertAt: string | null;
  children?: ClickhouseSummaryData[];
};

export type ClickhouseSummaryProblemSummary = {
  desc: string;
  hostSummary?: ClickhouseSummaryHostSummary[];
  id: string;
  isError: boolean;
  isInsight: boolean;
  labels: string[];
  name: string;
  priority: number;
  recentFiringAlertAt?: string;
};

export type ClickhouseSummaryHostSummary = {
  alertSummary?: ClickhouseSummaryAlertSummary[];
  lastFiringAlert?: ClickhouseSummaryAlertSummary;
  isFiring: boolean;
  isConnected: boolean;
  desc: string;
  id: string;
  ip: string;
  name: string;
  refCode: string;
};

export interface ClickhouseSummaryAlertSummary extends Alert {
  isFiring: boolean;
  alertOccurences: string[];
}

export type RemediationConfig = {
  desc: string;
  id: string;
  name: string;
  labels: string[];
  steps: AlertRemediationStep[] | null;
};
