"use client";

import React, { createContext, useContext, useRef, useEffect, useState } from "react";

// List of all feature videos to preload
const FEATURE_VIDEOS = [
  {
    key: "remediation",
    src: "https://res.cloudinary.com/diin3us70/video/upload/v1751788657/ai-remediation_r5l5xn.mp4",
    poster: "/features/ai-remediation.png",
    title: "Incerto Remediation",
  },
  {
    key: "query-optimization",
    src: "https://res.cloudinary.com/diin3us70/video/upload/v1751788655/query-optimization_uba57z.mp4",
    poster: "/features/query.png",
    title: "Incerto Query Optimization",
  },
  {
    key: "deep-research",
    src: "https://res.cloudinary.com/diin3us70/video/upload/v1751788653/deep-research_mexsmg.mp4",
    poster: "/features/deep-research.jpg",
    title: "Incerto Deep Research",
  },
  {
    key: "sql-editor",
    src: "https://res.cloudinary.com/diin3us70/video/upload/v1751788647/sql-editor_c2o10v.mp4",
    poster: "/features/sql-editor.jpg",
    title: "Incerto SQL Editor",
  },
];

type VideoMap = {
  [key: string]: HTMLVideoElement | null;
};

interface VideoContextType {
  getVideoElement: (key: string) => HTMLVideoElement | null;
}

const VideoContext = createContext<VideoContextType>({
  getVideoElement: () => null,
});

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const videoRefs = useRef<VideoMap>({});
  const [, forceUpdate] = useState(0); // To force re-render after videos are loaded
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // Preload all videos
    FEATURE_VIDEOS.forEach((video) => {
      if (!videoRefs.current[video.key]) {
        const vid = document.createElement("video");
        vid.src = video.src;
        vid.preload = "auto";
        vid.poster = video.poster;
        vid.muted = true;
        vid.setAttribute("playsInline", "true");
        vid.style.display = "none";
        vid.load();
        videoRefs.current[video.key] = vid;
        // When loaded, force update to notify consumers
        vid.oncanplaythrough = () => forceUpdate((n) => n + 1);
        document.body.appendChild(vid); // Keep in DOM for caching
      }
    });
    
    // Store a reference to the current videos for cleanup
    const currentVideos = {...videoRefs.current};
    
    return () => {
      Object.values(currentVideos).forEach((vid) => {
        if (vid && vid.parentNode) vid.parentNode.removeChild(vid);
      });
    };
  }, [isClient]);

  const getVideoElement = (key: string) => {
    return videoRefs.current[key] || null;
  };

  return (
    <VideoContext.Provider value={{ getVideoElement }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoProvider = () => useContext(VideoContext); 