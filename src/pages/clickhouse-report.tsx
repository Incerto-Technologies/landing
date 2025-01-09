import { ProblemContainer } from "@/components/clickhouse/report/stats/problem-container";
import { Status } from "@/components/clickhouse/report/status/status";
import { useClickhouseReport } from "@/hooks/use-clickhouse-report";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";

export const ClickhouseReport = () => {
  // const { id } = useParams();
  const { setClickhouseReport } = useClickhouseReport();

  useEffect(() => {
    console.log("setClickhouseReport");
    setClickhouseReport();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <Status />

      <div className="mt-10">
        <ProblemContainer />
      </div>
    </div>
  );
};
