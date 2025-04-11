import { GlowingEffect } from "@/components/ui/bento-grid";
import Image from "next/image";

const IMPACT_METRICS = [
  {
    number: "65%",
    text: "Reduction in MTTR",
    area: "col-span-2",
  },
  {
    number: "80%",
    text: "Reduction in MTTR",
    area: "col-span-1",
  },
  {
    number: "95%",
    text: "Cost saved on compute & storage",
    area: "col-span-1 row-span-2",
    // area: "col-span-1",
  },
  {
    number: "90%",
    text: "Reduce on-call time",
    area: "col-span-1",
  },
  {
    number: "<2s",
    text: "Time to detect exact root cause",
    area: "col-span-1",
  },
  {
    number: "65%",
    text: "Increase in Query Performance",
    area: "col-span-1",
    // area: "row-span-2 col-start-3",
  },
];

export function GlowingEffectDemo() {
  return (
    // <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-5 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-3">
    <ul className="grid grid-cols-4 grid-rows-2 gap-4">
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
    <li
      className={`min-h-[14rem] list-none ${area} group bg-muted  overflow-hidden rounded-2xl md:rounded-3xl`}
    >
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-2  z-10">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="text-7xl font-medium leading-[1.1] tracking-tight text-muted-foreground text-start">
              {percentage}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 text-start pt-0.5 font-sans text-[21px] font-medium text-balance">
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 overflow-hidden -right-[190px] h-[calc(100%-3rem)]">
          <div className="relative overflow-hidden h-full w-full">
            <Image
              src="/images/global1.svg"
              alt="Impact Bento"
              width={500}
              height={500}
              className="bg-center-left"
            />
          </div>
        </div>
      </div>
    </li>
  );
};