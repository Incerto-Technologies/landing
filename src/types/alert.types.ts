// ALert types
export type AlertPriority = "low" | "medium" | "high";
export type AlertStatus = "pending" | "fixed" | "ignored";

export type AlertHost = {
  desc: string;
  id: string;
  ip: string;
  name: string;
  refCode: string;
};

export type AlertScriptArg = {
  scriptArgId: string;
  value: string;
};

export type AlertRemediationStep = {
  hasArgument: boolean;
  instruction: string;
  scriptId: string;
  scriptName: string;
  scriptArgs: AlertScriptArg[];
  stepNo: number;
  content?: string;
};

export type AlertProblem = {
  supportsAIRemediation?: boolean;
  desc: string;
  host: AlertHost;
  id: string;
  isError: boolean;
  isInsight: boolean;
  labels: string[];
  name: string;
  priority: number;
  steps: AlertRemediationStep[];
};

export type Alert = {
  isFiring: boolean;
  id: string;
  problem: AlertProblem;
  status: AlertStatus;
  triggeredAt: string;
};

export interface AlertsState {
  alerts: Alert[];
  open: boolean;
}

export type AlertStatusUpdateApiBody = {
  alertId: string;
  status: AlertStatus;
};

export interface AlertState extends Alert {
  currentStepIndex: number;
  executedIds: string[];
}

export type AlertToasterState = {
  alertedIds: string[];
  open: boolean;
};
