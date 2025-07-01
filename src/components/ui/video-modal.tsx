"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
  poster?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  title,
  poster,
}: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-background rounded-lg overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="aspect-video">
              <video
                className="w-full h-full"
                controls
                autoPlay
                poster={poster}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="p-4 border-t">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
