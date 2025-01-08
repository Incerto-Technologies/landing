import { Details } from "../details/details";
import { RemediationConfig } from "@/types/clickhouse.types";

export const Remediation = ({ alert }: { alert: RemediationConfig }) => {
  return (
    <div className="w-full">
      {/* mobile */}
      <div className="mt-2 h-full w-full md:hidden">
        <Details alert={alert} />
      </div>

      {/* tablet and desktop */}
      <div className="mt-5 hidden h-full w-full gap-2 md:block">
        <Details alert={alert} />
      </div>
    </div>
  );
};
