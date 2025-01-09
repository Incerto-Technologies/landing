import { ClickhouseProblemSummary } from "@/hooks/use-clickhouse-report";
import { TrendingUp, AlertCircle } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Helper function to format date
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// Helper function to group alerts by date and count them
const groupAlertsByDate = (alerts: any[] | undefined | null) => {
  if (!alerts || alerts.length === 0) {
    return [];
  }

  const grouped = alerts.reduce((acc: any, alert) => {
    const date = formatDate(alert.eventTime);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped).map(([date, count]) => ({
    date,
    count,
  }));
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-lg p-2 shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          Alerts: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export const ProblemStats = ({
  problem,
}: {
  problem: ClickhouseProblemSummary;
}) => {
  const chartData = groupAlertsByDate(problem.alerts);

  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{problem.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Alert frequency per day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickMargin={10}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickMargin={10}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "#f3f4f6" }}
                />
                <Bar
                  dataKey="count"
                  fill="rgb(15, 23, 42)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-slate-50 rounded-lg border border-dashed">
              <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No alerts found</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 pt-2 border-t">
        <div className="flex items-center gap-2 text-sm font-medium">
          Total Alerts: {problem.count} <TrendingUp className="h-4 w-4" />
        </div>
        <p className="text-sm text-muted-foreground">
          Showing alert distribution over time
        </p>
      </CardFooter>
    </Card>
  );
};
