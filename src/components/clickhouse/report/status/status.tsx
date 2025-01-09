import { useClickhouseReport } from "@/hooks/use-clickhouse-report";

export const Status = () => {
  const { report, isLoadingReport } = useClickhouseReport();
  return (
    <div>
      {isLoadingReport ? (
        <div>Loading...</div>
      ) : (
        <div>{JSON.stringify(report)}</div>
      )}
    </div>
  );
};
