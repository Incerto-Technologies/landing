"use client";
import React, { useRef, Suspense, useMemo, useState } from "react";
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
import VideoModal from "./ui/video-modal";
import { ArrowRight, Play } from "lucide-react";
import { useVideoProvider } from "./ui/video-provider";

export type Tab = {
  label: string;
  slug: string;
  panel: React.FC<{ isDark: boolean }>;
  flow?: string[];
  video?: string;
};

const TABS: Tab[] = [
  {
    label: "Detect & Solve Production Issues",
    slug: "remediation",
    flow: ["100+ problems are checked regularly by Incerto agent (non-AI) and corresponding verified solutions are run with AI. Prevents production issues before they impact users. These problem vary from inefficient query to complete cluster failiure.",],
    video:
      "https://res.cloudinary.com/diin3us70/video/upload/v1751788657/ai-remediation_r5l5xn.mp4",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"remediation"}
        video={{
          title: "Incerto Remediation",
          sources: [
            {
              src: `https://res.cloudinary.com/diin3us70/video/upload/v1751788657/ai-remediation_r5l5xn.mp4`,
              type: "video/mp4",
            },
          ],
          poster: `/features/ai-remediation.png`,
        }}
      />
    ),
  },

  {
    label: "Boost Query Performance",
    slug: "query-optimizer",
    flow: ["Slow queries are detected and optimized through human in loop AI workflow specific to different DBMSes"],
    video:
      "https://res.cloudinary.com/diin3us70/video/upload/v1751788655/query-optimization_uba57z.mp4",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"query-optimization"}
        video={{
          title: "Incerto Query Optimization",
          sources: [
            {
              src: `https://res.cloudinary.com/diin3us70/video/upload/v1751788655/query-optimization_uba57z.mp4`,
              type: "video/mp4",
            },
          ],
          poster: `/features/query.png`,
        }}
      />
    ),
  },
  {
    label: "Text to Task",
    slug: "deep-research",
    flow: ["Access to best of LLM's intelligence with precise and rich context, solving any problem or completing any task"],
    video:
      "https://res.cloudinary.com/diin3us70/video/upload/v1751788653/deep-research_mexsmg.mp4",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"deep-research"}
        video={{
          title: "Incerto Deep Research",
          sources: [
            {
              src: `https://res.cloudinary.com/diin3us70/video/upload/v1751788653/deep-research_mexsmg.mp4`,
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
    flow: ["Feature rich SQL Editor with AI assistance, complete text to SQL, and more"],
    video:
      "https://res.cloudinary.com/diin3us70/video/upload/v1751788647/sql-editor_c2o10v.mp4",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"sql-editor"}
        video={{
          title: "Incerto SQL Editor",
          sources: [
            {
              src: `https://res.cloudinary.com/diin3us70/video/upload/v1751788647/sql-editor_c2o10v.mp4`,
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

  // Use VideoProvider context
  const { getVideoElement } = useVideoProvider();
  const videoKeyMap: Record<string, string> = {
    remediation: "remediation",
    "query-optimizer": "query-optimization",
    "deep-research": "deep-research",
    "sql-editor": "sql-editor",
  };
  const videoKey = videoKeyMap[activeTab.slug];
  const preloadedVideo = videoKey ? getVideoElement(videoKey) : null;

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
                  {/* Use preloaded video if available */}
                  {videoKey && preloadedVideo ? (
                    <video
                      key={videoKey}
                      src={preloadedVideo.src}
                      poster={preloadedVideo.poster}
                      style={{ display: "block", width: "100%", height: "100%" }}
                      controls={false}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    Panel && <Panel key={resolvedTheme?.includes("dark")} isDark={resolvedTheme?.includes("dark")} />
                  )}
                </motion.div>
              </AnimatePresence>
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

export const MobileTabsWithHighlights = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    videoSrc: string;
    title: string;
    poster: string;
  }>({
    isOpen: false,
    videoSrc: "",
    title: "",
    poster: "",
  });

  const openModal = (tab: Tab) => {
    if (tab.video) {
      setModalState({
        isOpen: true,
        videoSrc: tab.video,
        title: tab.label,
        poster: `/features/${tab.slug}.png`,
      });
    }
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div className="space-y-8 px-3">
        {TABS.map((tab) => (
          <div key={tab.slug} className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-foreground">
                {tab.label}
              </h4>

              {/* Flow Steps for Mobile */}
              {tab.flow && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {tab.flow.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
                          {step}
                        </span>
                      </div>
                      {index < tab.flow!.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-primary/60 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {tab.video && (
              <div
                className="relative group cursor-pointer rounded-lg overflow-hidden"
                onClick={() => openModal(tab)}
              >
                <video
                  className="relative z-10 block w-full h-full reduce-motion:hidden rounded-lg"
                  height="100%"
                  key={tab.video}
                  width="100%"
                  loop
                  muted
                  autoPlay
                  controls={false}
                  playsInline
                  poster={`/features/${tab.slug}.png`}
                >
                  <source src={tab.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-black ml-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <VideoModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        videoSrc={modalState.videoSrc}
        title={modalState.title}
        poster={modalState.poster}
      />
    </>
  );
};

export default TabsWithHighlights;
