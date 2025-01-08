import { RemediationRunner } from "./remediation-runner";
import { RemediationConfig } from "@/types/clickhouse.types";

export const Details = ({ alert }: { alert: RemediationConfig }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold capitalize">{alert.name}</h2>
      <p className="font-condensed mt-2 text-justify text-sm text-muted-foreground">
        {alert.desc}
      </p>

      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold">Remediation</h3>
        {alert.steps?.map((step, i) => (
          <RemediationRunner key={i} step={step} />
        ))}
      </div>
    </div>
  );
};
