import React from "react";

export const WindowView = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-[16px] p-3 border w-full aspect-video">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#DFDFDF]"></div>
          <div className="w-2 h-2 rounded-full bg-[#DFDFDF]"></div>
          <div className="w-2 h-2 rounded-full bg-[#DFDFDF]"></div>
        </div>
      </div>
      <div className="mt-3 h-full">{children}</div>
    </div>
  );
};
