import {
  ClickhouseProblemSummary,
  ClickhouseProblemSummaryAlert,
} from "@/hooks/use-clickhouse-report";
import { Server } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Colors for the pie chart segments
const COLORS = [
  "rgb(15, 23, 42)", // slate-900
  "rgb(51, 65, 85)", // slate-700
  "rgb(71, 85, 105)", // slate-600
  "rgb(100, 116, 139)", // slate-500
  "rgb(148, 163, 184)", // slate-400
];

// Helper function to group alerts by host
const groupAlertsByHost = (
  alerts: ClickhouseProblemSummaryAlert[] | undefined | null
) => {
  if (!alerts || alerts.length === 0) {
    return [];
  }

  const hostCounts: { [key: string]: number } = {};

  alerts.forEach((alert) => {
    const hostName = alert.host.name;
    hostCounts[hostName] = (hostCounts[hostName] || 0) + 1;
  });

  return Object.entries(hostCounts)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value) // Sort by value in descending order
    .slice(0, 5); // Take top 5 hosts
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-lg p-2 shadow-lg">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          Alerts: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export const HostStats = ({
  problem,
}: {
  problem: ClickhouseProblemSummary;
}) => {
  const chartData = groupAlertsByHost(problem.alerts);
  const totalAlerts = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-semibold">
            Host Distribution
          </CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Alert distribution by host
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value) => (
                    <span className="text-sm">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-slate-50 rounded-lg border border-dashed">
              <Server className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No host data available
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 pt-2 border-t">
        <div className="flex items-center gap-2 text-sm font-medium">
          Total Alerts: {totalAlerts}
        </div>
        <p className="text-sm text-muted-foreground">
          Showing top 5 hosts by alert count
        </p>
      </CardFooter>
    </Card>
  );
};
