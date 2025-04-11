import { GlowingEffect } from "@/components/ui/bento-grid";
import Image from "next/image";

const IMPACT_METRICS = [
  {
    number: "65%",
    text: "Reduction in MTTR",
    area: "md:col-span-2",
    background: "globe",
    icon: "chart-line",
  },
  {
    number: "80%",
    text: "Reduction in MTTR",
    area: "md:col-span-1",
    background: "mttr",
    icon: "chart-line",
  },
  {
    number: "95%",
    text: "Cost saved on compute & storage",
    area: "md:col-span-1 md:row-span-2",
    background: "cost",
    icon: "dollar-sign",
  },
  {
    number: "90%",
    text: "Reduce on-call time",
    area: "md:col-span-1",
    background: "oncall",
    icon: "clock",
  },
  {
    number: "<2s",
    text: "Time to detect exact root cause",
    area: "md:col-span-1",
    background: "detection",
    icon: "search",
  },
  {
    number: "65%",
    text: "Increase in Query Performance",
    area: "md:col-span-1",
    background: "performance",
    icon: "zap",
  },
];

export function ImpactBento() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4">
      {IMPACT_METRICS.map((metric) => (
        <GridItem
          key={metric.text + metric.number}
          area={metric.area}
          title={metric.text}
          percentage={metric.number}
          background={metric.background}
          icon={metric.icon}
        />
      ))}
    </ul>
  );
}

interface GridItemProps {
  area: string;
  title: string;
  percentage: string;
  background: string;
  icon: string;
}

const GridItem = ({
  area,
  title,
  percentage,
  background,
  icon,
}: GridItemProps) => {
  return (
    <li
      className={`min-h-[14rem] list-none ${area} group overflow-hidden rounded-2xl md:rounded-3xl`}
    >
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 transition-all duration-300 group-hover:border-muted-foreground/20">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-2 z-10">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="text-7xl font-medium leading-[1.1] tracking-tight text-muted-foreground text-start transition-all duration-300 group-hover:text-foreground">
              {percentage}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 text-start pt-0.5 font-sans text-[21px] font-medium text-balance transition-all duration-300 group-hover:text-foreground">
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="absolute -right-1/3 -bottom-1/4 size-full overflow-hidden">
          <BackgroundPattern type={background} />
        </div>
      </div>
    </li>
  );
};

interface BackgroundPatternProps {
  type: string;
}

const BackgroundPattern = ({ type }: BackgroundPatternProps) => {
  switch (type) {
    case "mttr":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-500"
        >
          <path
            d="M10,50 L30,30 L50,50 L70,30 L90,50"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.1"
            className="transition-all duration-500 group-hover:stroke-opacity-30 group-hover:stroke-[1.5]"
          />
          <circle
            cx="50"
            cy="50"
            r="5"
            fill="currentColor"
            fillOpacity="0.1"
            className="transition-all duration-500 group-hover:fill-opacity-30 group-hover:r-6"
          />
          <path
            d="M20,70 L40,50 L60,60 L80,30"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.05"
            className="transition-all duration-500 group-hover:stroke-opacity-20 group-hover:stroke-[1.5]"
          />
          <circle
            cx="60"
            cy="60"
            r="3"
            fill="currentColor"
            fillOpacity="0.1"
            className="transition-all duration-500 group-hover:fill-opacity-30 group-hover:r-4"
          />
        </svg>
      );
    case "cost":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-500"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.1"
            className="transition-all duration-500 group-hover:stroke-opacity-30 group-hover:stroke-[1.5] group-hover:r-45"
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="20"
            fill="currentColor"
            fillOpacity="0.1"
            className="transition-all duration-500 group-hover:fill-opacity-30 group-hover:text-[22px]"
          >
            $
          </text>
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.05"
            className="transition-all duration-500 group-hover:stroke-opacity-20 group-hover:stroke-[1.5] group-hover:r-35"
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="15"
            fill="currentColor"
            fillOpacity="0.05"
            className="transition-all duration-500 group-hover:fill-opacity-20 group-hover:text-[17px]"
          >
            $
          </text>
        </svg>
      );
    case "oncall":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-500"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.1"
            className="transition-all duration-500 group-hover:stroke-opacity-30 group-hover:stroke-[1.5] group-hover:r-45"
          />
          <path
            d="M50,30 L50,50 L65,65"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.1"
            className="transition-all duration-500 group-hover:stroke-opacity-30 group-hover:stroke-[1.5]"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.05"
            className="transition-all duration-500 group-hover:stroke-opacity-20 group-hover:stroke-[1.5] group-hover:r-35"
          />
          <path
            d="M50,40 L50,60 L60,70"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.05"
            className="transition-all duration-500 group-hover:stroke-opacity-20 group-hover:stroke-[1.5]"
          />
        </svg>
      );
    case "detection":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-500"
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.1"
            className="transition-all duration-500 group-hover:stroke-opacity-30 group-hover:stroke-[1.5] group-hover:r-35"
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="currentColor"
            fillOpacity="0.1"
            className="transition-all duration-500 group-hover:fill-opacity-30 group-hover:r-12"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.05"
            className="transition-all duration-500 group-hover:stroke-opacity-20 group-hover:stroke-[1.5] group-hover:r-25"
          />
          <circle
            cx="50"
            cy="50"
            r="5"
            fill="currentColor"
            fillOpacity="0.05"
            className="transition-all duration-500 group-hover:fill-opacity-20 group-hover:r-7"
          />
        </svg>
      );
    case "performance":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-500"
        >
          <path
            d="M20,80 L40,60 L60,70 L80,40"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.1"
            className="transition-all duration-500 group-hover:stroke-opacity-30 group-hover:stroke-[1.5]"
          />
          <circle
            cx="60"
            cy="70"
            r="5"
            fill="currentColor"
            fillOpacity="0.1"
            className="transition-all duration-500 group-hover:fill-opacity-30 group-hover:r-6"
          />
          <path
            d="M10,70 L30,50 L50,60 L70,30"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.05"
            className="transition-all duration-500 group-hover:stroke-opacity-20 group-hover:stroke-[1.5]"
          />
          <circle
            cx="50"
            cy="60"
            r="3"
            fill="currentColor"
            fillOpacity="0.05"
            className="transition-all duration-500 group-hover:fill-opacity-20 group-hover:r-4"
          />
        </svg>
      );
    default:
      return (
        <Image
          src="/images/global1.svg"
          alt="Impact Bento"
          width={500}
          height={500}
          className="bg-center-left opacity-10 transition-all duration-500 group-hover:opacity-20"
        />
      );
  }
};
