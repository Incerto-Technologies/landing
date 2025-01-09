import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const Loading = ({
  title,
  message,
  children,
  className,
}: {
  title?: string;
  message?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-[70vh] space-y-4 flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="flex items-center space-x-4">
        <Loader2 className="text-gray-500 animate-spin" />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">{title || "Loading..."}</h1>
          <p className="text-sm">{message || "Please wait..."}</p>
        </div>
      </div>
      {children}
    </div>
  );
};
