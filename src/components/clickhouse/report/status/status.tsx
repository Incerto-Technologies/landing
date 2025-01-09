import { Loading } from "@/components/ui/loading";
import { useClickhouseReport } from "@/hooks/use-clickhouse-report";
import { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export const Status = () => {
  const { report, isLoadingReport } = useClickhouseReport();
  useEffect(() => {
    console.log("report", report);
  }, [report]);

  return (
    <div>
      {isLoadingReport ? (
        <Loading title="Getting report..." message="Please wait..." />
      ) : (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Clickhouse Status Report
          </h1>
          <div className="bg-white rounded-lg overflow-hidden">
            {report?.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-center justify-between p-4 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <div className="flex-1">
                  <h2 className="text-base font-medium text-gray-900">
                    {item.title}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm ${
                      item.isOK ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.isOK ? "Good" : "Needs Attention"}
                  </span>
                  {item.isOK ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
