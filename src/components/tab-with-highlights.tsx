"use client";
import React, { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import BrowserFrame from "./browser-frame";
import { cn } from "@/lib/utils";
import VideoWithHighlights from "./ui/video-with-highlight";

export type Tab = {
  label: string;
  panel: React.FC<{ isDark: boolean }>;
};

const TABS: Tab[] = [
  {
    label: "Remediation",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        video={{
          title: "Incerto Remediation",
          sources: [
            {
              src: `https://7e494ve81x.ufs.sh/f/YOMccJiK3ygneEWvz7pYSFQJH5xbi2cdg9sLm3nXtEDqp1l8`,
              type: "video/mp4",
            },
          ],
          poster: `/images/index/dashboard/supabase-table-editor${
            isDark ? "" : "-light"
          }.png`,
        }}
      />
    ),
  },
  {
    label: "SQL Editor",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        video={{
          title: "Incerto SQL Editor",
          sources: [
            {
              src: `https://xguihxuzqibwxjnimxev.supabase.co/storage/v1/object/public/videos/marketing/website/supabase-sql-editor${
                isDark ? "" : "-light"
              }`,
              type: "video/mp4",
            },
          ],
          poster: `/images/index/dashboard/supabase-sql-editor${
            isDark ? "" : "-light"
          }.png`,
        }}
      />
    ),
  },
  {
    label: "Query Optimization",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        video={{
          title: "Incerto Query Optimization",
          sources: [
            {
              src: `https://7e494ve81x.ufs.sh/f/YOMccJiK3ygnvnCut7D7LJjY501I4nfwSd6XtirEqosmpvRF`,
              type: 'video/mp4',
            },
          ],
          poster: `/images/index/dashboard/supabase-rls${
            isDark ? "" : "-light"
          }.png`,
        }}
      />
    ),
  },
]



const TabsWithHighlights = () => {
  const { resolvedTheme } = useTheme();
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const Panel: any = TABS[activeTabIdx]?.panel ?? null;

  const handleTabClick = (tabIndex: number) => {
    setActiveTabIdx(tabIndex);
  };

  return (
    <div className="relative flex flex-col gap-8 lg:gap-12 items-center">
      {/* Threshold element used to load video 500px before reaching the video component */}
      <div ref={sectionRef} className="absolute -top-[500px] not-sr-only" />
      <div
        className="relative w-full col-span-full flex justify-center gap-2"
        role="tablist"
      >
        {TABS.map((tab, index) => (
          <Tab
            key={index}
            isActive={index === activeTabIdx}
            label={tab.label}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </div>
      <BrowserFrame
        className="overflow-hidden lg:order-last bg-default w-full max-w-6xl mx-auto"
        contentClassName="aspect-video border overflow-hidden rounded-lg"
      >
        {isInView && (
          <AnimatePresence mode="wait">
            <motion.div
              key={TABS[activeTabIdx]?.label}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.1, delay: 0.2 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="relative w-full max-w-full h-full"
            >
              <Panel
                key={resolvedTheme?.includes("dark")}
                isDark={resolvedTheme?.includes("dark")}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </BrowserFrame>
    </div>
  );
};

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: VoidFunction;
}

const Tab = ({ label, isActive, onClick }: TabProps) => (
  <button
    onClick={onClick}
    aria-selected={isActive}
    role="tab"
    className="md:cursor-pointer"
  >
    <Badge
      size="large"
      className={cn(
        // `text-left py-1.5 px-3 lg:py-2 lg:px-8 border rounded-md bg-alternative hover:border-foreground text-lg opacity-80 transition-all`,
        "py-1.5 px-3 lg:py-2 lg:px-8",
        "hover:border-foreground-lighter hover:text-foreground",
        `opacity-80`,
        isActive ? "opacity-100 !border-foreground" : ""
      )}
    >
      {label}
    </Badge>
  </button>
);

export default TabsWithHighlights;
