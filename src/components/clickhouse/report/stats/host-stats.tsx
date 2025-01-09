"use client";

import {
  ClickhouseProblemSummary,
  ClickhouseProblemSummaryAlert,
  ClickhouseProblemSummaryHost,
} from "@/hooks/use-clickhouse-report";
import { Server } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = {
  chrome: "hsl(217, 91%, 60%)", // blue
  safari: "hsl(339, 90%, 68%)", // pink
  firefox: "hsl(31, 97%, 72%)", // orange
  edge: "hsl(262, 83%, 74%)", // purple
  other: "hsl(142, 71%, 45%)", // green
};

// Helper function to group alerts by host
const groupAlertsByHost = (
  alerts: ClickhouseProblemSummaryAlert[] | undefined | null
) => {
  if (!alerts || alerts.length === 0) {
    return [];
  }

  const hostCounts: {
    [key: string]: {
      host: ClickhouseProblemSummaryHost;
      count: number;
    };
  } = {};

  alerts.forEach((alert) => {
    const hostId = alert.host.id;
    if (!hostCounts[hostId]) {
      hostCounts[hostId] = {
        host: alert.host,
        count: 0,
      };
    }
    hostCounts[hostId].count += 1;
  });

  return Object.values(hostCounts)
    .map((value, index) => ({
      name: value.host.name,
      value: value.count,
      fill: Object.values(COLORS)[index % Object.keys(COLORS).length],
      host: value.host,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Take top 5 hosts
};

const createChartConfig = (chartData: any[]): ChartConfig => {
  const config: any = {
    value: {
      label: "Alerts",
    },
  };

  chartData.forEach((item) => {
    config[item.name] = {
      label: item.host.name,
      color: item.fill,
    };
  });

  return config as ChartConfig;
};

// const CustomLegend = ({ payload }: any) => {
//   return (
//     <div className="flex flex-wrap justify-center gap-4 mt-4">
//       {payload.map((entry: any, index: number) => (
//         <div key={index} className="flex items-center gap-2">
//           <div
//             className="w-3 h-3 rounded-sm"
//             style={{ backgroundColor: entry.color }}
//           />
//           <span className="text-sm">{entry.value}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

export const HostStats = ({
  problem,
}: {
  problem: ClickhouseProblemSummary;
}) => {
  const chartData = groupAlertsByHost(problem.alerts);
  const chartConfig = createChartConfig(chartData);

  return (
    <Card className="h-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle>Host Distribution</CardTitle>
        <CardDescription>Alert distribution by host</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          {chartData.length > 0 ? (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <Pie data={chartData} dataKey="value" />
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="value" />}
                />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-slate-50 rounded-lg border border-dashed">
              <Server className="h-8 w-8 text-muted-foreground/50 animate-pulse" />
              <p className="text-sm text-muted-foreground">
                No host data available
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
