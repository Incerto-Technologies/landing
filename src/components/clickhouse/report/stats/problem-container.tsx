import { HostStats } from "./host-stats";

import {
  ClickhouseProblemSummary,
  useClickhouseReport,
} from "@/hooks/use-clickhouse-report";
import { ProblemStats } from "./problem-stats";

const Problem = ({ problem }: { problem: ClickhouseProblemSummary }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{problem.name}</h1>

      <ProblemStats problem={problem} />
      <HostStats problem={problem} />
    </div>
  );
};

export const ProblemContainer = () => {
  const { summary } = useClickhouseReport();
  return (
    <div>
      <h1 className="text-3xl font-bold">Problem Status</h1>
      <div className="space-y-10 mt-5">
        {summary ? (
          summary.problems.map((problem) => (
            <Problem key={problem.id} problem={problem} />
          ))
        ) : (
          <div className="flex justify-center items-center h-screen">
            <h4>No problems found</h4>
            <p>Please check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};
