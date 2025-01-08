import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClickhouseSummaryData } from "@/types/clickhouse.types";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { SummaryTreeHost } from "./summary-tree-host";

const TreeNode = ({
  data,
  depth = 0,
}: {
  data: ClickhouseSummaryData;
  depth?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const childrenCount = data.children?.length || 0;
  const hasContent = childrenCount > 0 || data.remediationConfig !== undefined;

  return (
    <div className={cn("mx-auto flex w-full flex-col", isOpen && "mb-6")}>
      <Button
        className="group w-full items-center justify-start hover:bg-accent/30 md:gap-0"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="transition-transform group-hover:scale-110">
          {isOpen ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </div>
        <div className="flex w-full items-center justify-between">
          <section className="w-full">
            <h2 className="w-full max-w-xl truncate pl-2 text-start text-lg font-semibold">
              {data.label || "Alerts"}
              {hasContent && (
                <span className="ml-2 text-sm text-muted-foreground">
                  ({childrenCount > 0 ? childrenCount + " labels" : "1 config"})
                </span>
              )}
            </h2>
          </section>
        </div>
      </Button>

      <div
        className={cn(
          "relative ml-6 w-[calc(100%-1.5rem)] transition-all duration-300",
          isOpen ? "block fade-in-20" : "hidden"
        )}
      >
        <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-border" />

        {/* Render child labels first */}
        {data.children && data.children.length > 0 && (
          <div className="space-y-2">
            {data.children.map((child, index) => (
              <div key={index} className="relative">
                <div className="absolute left-0 top-4 h-px w-4 bg-border" />
                <div className="pl-6">
                  <TreeNode data={child} depth={depth + 1} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Then render remediation config if it exists */}
        {data.remediationConfig && (
          <div className="mt-2">
            <div className="relative flex w-full items-start gap-2">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-4 h-px w-4 bg-border" />
              </div>
              <div className="w-full pl-6">
                <SummaryTreeHost config={data.remediationConfig} />
              </div>
            </div>
          </div>
        )}

        {!hasContent && (
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-lg font-semibold">No alerts or insights</h2>
            <p className="text-sm text-muted-foreground">
              No alerts or insights to display at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const SummaryTree = ({ data }: { data: ClickhouseSummaryData }) => {
  return <TreeNode data={data} />;
};
