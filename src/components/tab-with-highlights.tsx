"use client";
import React, { useRef, Suspense } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import BrowserFrame from "./browser-frame";
import { cn } from "@/lib/utils";
import VideoWithHighlights from "./ui/video-with-highlight";
import { useQueryState } from "nuqs";
export type Tab = {
  label: string;
  slug: string;
  panel: React.FC<{ isDark: boolean }>;
};

const TABS: Tab[] = [
  {
    label: "Remediation",
    slug: "remediation",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"remediation"}
        video={{
          title: "Incerto Remediation",
          sources: [
            {
              src: `https://7e494ve81x.ufs.sh/f/YOMccJiK3ygnn3UW4P0zxlPY9SbMuc0WaKvEQCyDXROpZqIz`,
              type: "video/mp4",
            },
          ],
          poster: `/features/remediation.png`,
        }}
      />
    ),
  },
  {
    label: "SQL Editor",
    slug: "sql-editor",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"sql-editor"}
        video={{
          title: "Incerto SQL Editor",
          sources: [
            {
              src: `https://7e494ve81x.ufs.sh/f/YOMccJiK3ygnkXm7ULICz5OiyjlvmurnSXN8J9p3xawtBIGZ`,
              type: "video/mp4",
            },
          ],
          poster: `/features/sql-editor.png`,
        }}
      />
    ),
  },
  {
    label: "Query Optimization",
    slug: "query-optimization",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"query-optimization"}
        video={{
          title: "Incerto Query Optimization",
          sources: [
            {
              src: `https://7e494ve81x.ufs.sh/f/YOMccJiK3ygnkXm7ULICz5OiyjlvmurnSXN8J9p3xawtBIGZ`,
              type: 'video/mp4',
            },
          ],
          poster: `/features/query-optimization.png`,
        }}
      />
    ),
  },
]



const TabsWithHighlights = () => {
  return (
    <Suspense fallback={
      <div className="relative flex flex-col gap-8 lg:gap-12 items-center">
        <div className="w-full h-[600px] animate-pulse bg-muted rounded-lg"></div>
      </div>
    }>
      <TabsWithHighlightsContent />
    </Suspense>
  );
};

const TabsWithHighlightsContent = () => {
  const { resolvedTheme } = useTheme();
  const [activeTabSlug, setActiveTabSlug] = useQueryState("tab", {
    defaultValue: TABS[0].slug,
  });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const Panel: any = TABS.find((tab) => tab.slug === activeTabSlug)?.panel ?? null;

  // console.log(isInView)

  const handleTabClick = (tabSlug: string) => {
    setActiveTabSlug(tabSlug);
  };

  return (
    <div className="relative  flex flex-col gap-8 lg:gap-12 items-center">
      {/* Threshold element used to load video 500px before reaching the video component */}
      <div ref={sectionRef} className="absolute -top-[500px] not-sr-only" />
      <div
        className="relative w-full col-span-full  flex justify-center gap-2 overflow-x-auto pb-2 hide-scrollbar"
        role="tablist"
      >
        <div className="flex gap-2   min-w-max mx-auto">
          {TABS.map((tab, index) => (
            <Tab
              key={index}
              isActive={tab.slug === activeTabSlug}
              label={tab.label}
              onClick={() => handleTabClick(tab.slug)}
            />
          ))}
        </div>
      </div>
      <div className="max-md:px-6 w-full ">
      <BrowserFrame
        className="overflow-hidden lg:order-last bg-default w-full max-w-6xl mx-auto"
        contentClassName="aspect-video border overflow-hidden rounded-lg"
      >
        {isInView && (
          <AnimatePresence mode="wait">
            <motion.div
              key={TABS.find((tab) => tab.slug === activeTabSlug)?.label}
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
