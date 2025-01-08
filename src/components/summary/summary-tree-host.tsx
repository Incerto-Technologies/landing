import { useState, useRef } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { RemediationConfig } from "@/types/clickhouse.types";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon, Info } from "lucide-react";
import { RemediationContainer } from "../remediation/container/container";

export const SummaryTreeHost = ({ config }: { config: RemediationConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <div className="group/host" id={config.id} ref={hostRef}>
      <Button
        className="w-full items-center justify-start hover:bg-transparent hover:text-primary md:gap-0"
        variant="ghost"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="transition-transform group-hover/host:scale-110">
          {isOpen ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </div>
        <div className="flex w-full items-center justify-between gap-3">
          <section className="w-full">
            <div className="flex w-full max-w-xl items-center gap-2 truncate pl-2">
              <h3 className="max-w-xl truncate text-start text-lg font-semibold">
                {config.name}
              </h3>
              <HoverCard>
                <HoverCardTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="w-full max-w-xs text-start">
                  <h3 className="text-md text-wrap">{config.name}</h3>
                  <p className="mt-1 text-wrap text-sm text-muted-foreground">
                    {config.desc}
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </section>
        </div>
      </Button>

      <section
        data-open={isOpen}
        className="transition-all data-[open=false]:hidden ml-10"
      >
        <RemediationContainer alert={config} />
      </section>
    </div>
  );
};
