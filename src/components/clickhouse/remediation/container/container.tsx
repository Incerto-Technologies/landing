import { AlertNotFound } from "../not-found/alert-not-found";
import { Remediation } from "./remediation";
import { RemediationConfig } from "@/types/clickhouse.types";

export const RemediationContainer = ({
  alert,
}: {
  alert: RemediationConfig | null;
}) => {
  return <>{!alert ? <AlertNotFound /> : <Remediation alert={alert} />}</>;
};
