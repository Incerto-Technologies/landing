import { Status } from "@/components/clickhouse/report/status/status";
import { useClickhouseReport } from "@/hooks/use-clickhouse-report";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";

export const ClickhouseReport = () => {
  // const { id } = useParams();
  const { setClickhouseReport } = useClickhouseReport();

  useEffect(() => {
    setClickhouseReport();
  }, []);

  return (
    <div>
      <Status />
    </div>
  );
};
