"use client";
import React, { useRef, Suspense, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
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
  poster: string;
  panel: React.FC<{ isDark: boolean }>;
  flow?: string[];
  video?: string;
};

const TABS: Tab[] = [
  {
    label: "Detect & Solve Production Issues",
    slug: "remediation",
    flow: [
      "100+ problems are checked regularly by Incerto agent (non-AI) and corresponding verified solutions are run with AI. Prevents production issues before they impact users. These problem vary from inefficient query to complete cluster failiure.",
    ],

    poster: `/features/ai-remediation.png`,
    video:
      "https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7i69CyaKsq6AhXSmeKlJHnu1cBIQPD9WdkyV5",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"remediation"}
        video={{
          title: "Incerto Remediation",
          sources: [
            {
              src: `https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7i69CyaKsq6AhXSmeKlJHnu1cBIQPD9WdkyV5`,
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
    flow: [
      "Slow queries are detected and optimized through human in loop AI workflow specific to different DBMSes",
    ],
    video:
      "https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7LGwaJEnKiZ23OUBzHkuDRd5Wh4aoNVGtwFTe",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"query-optimization"}
        video={{
          title: "Incerto Query Optimization",
          sources: [
            {
              src: `https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7LGwaJEnKiZ23OUBzHkuDRd5Wh4aoNVGtwFTe`,
              type: "video/mp4",
            },
          ],
          poster: `/features/query.png`,
        }}
      />
    ),
    poster: `/features/query.png`,
  },
  {
    label: "Text to Task",
    slug: "deep-research",
    flow: [
      "Access to best of LLM's intelligence with precise and rich context, solving any problem or completing any task",
    ],
    video:
      "https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7nNqpjgadVYe3EDhHObxpW1vIlstrKQafw2oj",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"deep-research"}
        video={{
          title: "Incerto Deep Research",
          sources: [
            {
              src: `https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7nNqpjgadVYe3EDhHObxpW1vIlstrKQafw2oj`,
              type: "video/mp4",
            },
          ],
          poster: `/features/deep-research.jpg`,
        }}
      />
    ),
    poster: `/features/deep-research.jpg`,
  },
  {
    label: "SQL Editor",
    slug: "sql-editor",
    flow: [
      "Feature rich SQL Editor with AI assistance, complete text to SQL, and more",
    ],
    video:
      "https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7kGED2vhtwzn7PHqYpkabNj2oW31dAt8lGgTZ",
    panel: ({ isDark }: { isDark: boolean }) => (
      <VideoWithHighlights
        key={"sql-editor"}
        video={{
          title: "Incerto SQL Editor",
          sources: [
            {
              src: `https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7kGED2vhtwzn7PHqYpkabNj2oW31dAt8lGgTZ`,
              type: "video/mp4",
            },
          ],
          poster: `/features/sql-editor.jpg`,
        }}
      />
    ),
    poster: `/features/sql-editor.jpg`,
  },
];

// New Sticky Scroll Component for Desktop
const StickyScrollWithHighlights = () => {
  return (
    <Suspense
      fallback={
        <div className="relative flex flex-col gap-8 lg:gap-12 items-center">
          <div className="w-full h-[600px] animate-pulse bg-muted rounded-lg"></div>
        </div>
      }
    >
      <StickyScrollWithHighlightsContent />
    </Suspense>
  );
};

const StickyScrollWithHighlightsContent = () => {
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

  return (
    <div ref={containerRef} className="space-y-16">
      {/* Threshold element used to load video 500px before reaching the video component */}
      <div ref={sectionRef} className="absolute -top-[500px] not-sr-only" />

      {TABS.map((tab, index) => (
        <div key={tab.slug} className="space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
              {tab.label}
            </h3>

            {/* Flow Steps */}
            {tab.flow && (
              <div className="space-y-3">
                {tab.flow.map((step, stepIndex) => (
                  <div
                    key={stepIndex}
                    className="p-4 bg-muted/30 rounded-xl border border-border/30 max-w-4xl mx-auto"
                  >
                    <span className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Section */}
          {tab.video && (
            <div className="w-full px-6 md:px-0">
              <BrowserFrame
                className="w-full max-w-6xl mx-auto overflow-hidden bg-default"
                contentClassName="aspect-video border overflow-hidden rounded-lg"
              >
                <div className="relative w-full h-full">
                  {/* Poster Image - shown while video loads */}
                  <Image
                    src={tab.poster}
                    alt={`${tab.label} preview`}
                    fill
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      // Fallback to jpg if png doesn&apos;t exist
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith(".png")) {
                        target.src = target.src.replace(".png", ".jpg");
                      }
                    }}
                  />
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
                    onLoadStart={() => {
                      // Video started loading, poster will be hidden automatically
                    }}
                  >
                    <source src={tab.video} type="video/mp4" />
                  </video>
                </div>
              </BrowserFrame>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Original Tabs Component (kept for reference but not used in desktop)
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
          <div className="flex flex-col items-center gap-3 max-w-4xl mx-auto px-6">
            {activeTab?.flow &&
              activeTab?.flow.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-center"
                >
                  <span className="text-sm md:text-base text-muted-foreground leading-relaxed text-center">
                    {step}
                  </span>
                  {index < (activeTab?.flow?.length ?? 0) - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground/60 flex-shrink-0 hidden md:block" />
                  )}
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
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      controls={false}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    Panel && (
                      <Panel
                        key={resolvedTheme?.includes("dark")}
                        isDark={resolvedTheme?.includes("dark")}
                      />
                    )
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
              <h4 className="text-xl font-semibold text-foreground text-center">
                {tab.label}
              </h4>

              {/* Flow Steps for Mobile */}
              {tab.flow && (
                <div className="space-y-3">
                  {tab.flow.map((step, index) => (
                    <div
                      key={index}
                      className="p-4 bg-muted/30 rounded-xl border border-border/30"
                    >
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {step}
                      </span>
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
                <div className="relative w-full h-full">
                  {/* Poster Image - shown while video loads */}
                  <Image
                    src={tab.poster}
                    alt={`${tab.label} preview`}
                    fill
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      // Fallback to jpg if png doesn&apos;t exist
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith(".png")) {
                        target.src = target.src.replace(".png", ".jpg");
                      }
                    }}
                  />
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
                    onLoadStart={() => {
                      // Video started loading, poster will be hidden automatically
                    }}
                  >
                    <source src={tab.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
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

export default StickyScrollWithHighlights;
