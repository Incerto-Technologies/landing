import { SummaryTree } from "./summary-tree";
import { RefreshCcw, AlertCircle } from "lucide-react";
import { useClickhouseSummary } from "@/hooks/use-clickhouse-summary";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";

export const Summary = () => {
  const { summary, isLoading, setSummaryData, searchTerm, handleSearch } =
    useClickhouseSummary();

  useEffect(() => {
    console.log("summary", summary);
    setSummaryData();
  }, []);

  return (
    <div className="h-full bg-background px-4 py-6 md:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <h1 className="text-xl md:text-2xl font-bold">
            Clickhouse Remediation List
          </h1>
          <div className="w-full md:w-1/4">
            <Input
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search remediations..."
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-[calc(100vh-12rem)] w-full flex-col items-center justify-center gap-3">
            <RefreshCcw className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Loading summary data...
            </p>
          </div>
        ) : summary && summary.length > 0 ? (
          <ScrollArea className="w-full">
            <div className="space-y-6 pr-4">
              {summary.map((item, index) => (
                <SummaryTree key={index} data={item} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <div className="flex h-[calc(100vh-12rem)] w-full flex-col items-center justify-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">No Summary Data</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No alerts or insights to display at the moment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
