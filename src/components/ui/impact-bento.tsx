"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/bento-grid";
import { HTMLAttributes } from "react";

const IMPACT_METRICS = [
  {
    number: "65%",
    text: "Reduction in MTTR",
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/8/3/13]",
  },
  {
    number: "80%",
    text: "Reduction in MTTR",
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
  },
  {
    number: "95%",
    text: "Cost saved on compute & storage",
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
  },
  {
    number: "90%",
    text: "Reduce on-call time",
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
  },
  {
    number: "<2s",
    text: "Time to detect exact root cause",
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:3/1/4/5]",
  },
  {
    number: "65%",
    text: "Increase in Query Performance",
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:3/5/4/13]",
  },
];

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-5 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-3">
      {IMPACT_METRICS.map((metric) => (
        <GridItem
          key={metric.text + metric.number}
          area={metric.area}
          title={metric.text}
          percentage={metric.number}
        />
      ))}
    </ul>
  );
}

interface GridItemProps {
  area: string;
  title: string;
  percentage: string;
}

const GridItem = ({ area, title, percentage }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-2 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="text-[105px] font-medium leading-[1.1] tracking-tight text-muted-foreground text-start">
              {percentage}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 text-start pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
