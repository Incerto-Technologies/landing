import {
  ClickhouseProblemSummary,
  useClickhouseReport,
} from "@/hooks/use-clickhouse-report";
import { ProblemStats } from "./problem-stats";

const Problem = ({ problem }: { problem: ClickhouseProblemSummary }) => {
  return (
    <div>
      <h1>{problem.name}</h1>

      <ProblemStats problem={problem} />
    </div>
  );
};

export const ProblemContainer = () => {
  const { summary } = useClickhouseReport();
  return (
    <div>
      <h1>Problem Status</h1>
      <div className="">
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
