"use client";
import React, { useRef, Suspense, useMemo, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import BrowserFrame from "./browser-frame";
import { cn } from "@/lib/utils";
import VideoWithHighlights from "./ui/video-with-highlight";
import { useQueryState } from "nuqs";
import { ArrowRight } from "lucide-react";

export type Tab = {
  label: string;
  slug: string;
  panel: React.FC<{ isDark: boolean }>;
  flow?: string[];
};

const TABS: Tab[] = [
  {
    label: "AI Remediation",
    slug: "remediation",
    flow: ["Analyze", "Observe", "Remediate", "Fixed"],
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"remediation"}
        video={{
          title: "Incerto Remediation",
          sources: [
            {
              src: `https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7DX7GASrf4oDJhwHGjraRVM5uqEYkxeOP9IKN`,
              type: "video/mp4",
            },
          ],
          poster: `/features/ai-remediation.png`,
        }}
      />
    ),
  },

  {
    label: "Query Optimizer",
    slug: "query-optimizer",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"query-optimization"}
        video={{
          title: "Incerto Query Optimization",
          sources: [
            {
              src: `https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7oOJTdgRXsAlQGYjpD7FmaJKkIS98XiyeVBEC`,
              type: "video/mp4",
            },
          ],
          poster: `/features/query.png`,
        }}
      />
    ),
  },
  {
    label: "Deep Research",
    slug: "deep-research",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"deep-research"}
        video={{
          title: "Incerto Deep Research",
          sources: [
            {
              src: `https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7CMwswVL0RA1TX2QOCbBgwIqY4J89hxGdnlcF`,
              type: "video/mp4",
            },
          ],
          poster: `/features/deep-research.jpg`,
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
              src: `https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7R9MLh6uvetIkDPSYLbWVz6NQ1xaZwyT08u34`,
              type: "video/mp4",
            },
          ],
          poster: `/features/sql-editor.jpg`,
        }}
      />
    ),
  },
];

const TabsWithHighlights = () => {
  return (
    <Suspense
      fallback={
        <div className="relative flex flex-col gap-8 lg:gap-12 items-center">
          <div className="w-full h-[600px] animate-pulse bg-muted rounded-lg"></div>
        </div>
      }
    >
      <TabsWithHighlightsContent />
    </Suspense>
  );
};

const TabsWithHighlightsContent = () => {
  const { resolvedTheme } = useTheme();
  const [activeTabSlug, setActiveTabSlug] = useState(TABS[0].slug);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest * TABS.length),
      TABS.length - 1
    );
    if (TABS[newIndex] && TABS[newIndex].slug !== activeTabSlug) {
      setActiveTabSlug(TABS[newIndex].slug);
    }
  });

  const activeTab = useMemo(
    () => TABS.find((tab) => tab.slug === activeTabSlug) || TABS[0],
    [activeTabSlug]
  );
  const Panel: any = activeTab?.panel ?? null;

  return (
    <div ref={containerRef} className={cn("relative h-[200vh]")}>
      <div className={cn("sticky top-24 flex flex-col items-center pt-10")}>
        <div className="relative flex w-full flex-col items-center gap-4 lg:gap-6">
          {/* Threshold element used to load video 500px before reaching the video component */}
          <div ref={sectionRef} className="absolute -top-[500px] not-sr-only" />
          <div className="w-full md:w-auto">
            <div
              className="grid grid-rows-1 grid-flow-col justify-start md:justify-center space-x-2 overflow-x-auto w-full px-6 md:px-0 hide-scrollbar"
              role="tablist"
            >
              {TABS.map((tab, index) => (
                <Tab
                  key={index}
                  isActive={tab.slug === activeTabSlug}
                  label={tab.label}
                  onClick={() => {
                    setActiveTabSlug(tab.slug);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeTab?.flow &&
              activeTab?.flow.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{step}</span>
                  <ArrowRight
                    className={cn(
                      "w-4 h-4 text-primary/80",
                      index === (activeTab?.flow?.length ?? 0) - 1
                        ? "hidden"
                        : ""
                    )}
                  />
                </div>
              ))}
          </div>
          <div className="w-full px-6 md:px-0 ">
            <BrowserFrame
              className="w-full max-w-6xl mx-auto overflow-hidden bg-default lg:order-last"
              contentClassName="aspect-video border overflow-hidden rounded-lg"
            >
              {isInView && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.label}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.1, delay: 0.2 },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                    className="relative h-full w-full max-w-full"
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
    className="w-max cursor-pointer"
  >
    <Badge
      size="large"
      className={cn(
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
