"use client";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Logos from "./logos";
import { getUserOS } from "@/lib/get-user-os";
import { useMemo, useState } from "react";
import { DownloadForm } from "../download/download-form";
import { X } from "lucide-react";

const Hero = () => {
  const { os, architecture } = getUserOS();
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const imageUrl = useMemo(() => {
    if (os === "mac") return "/download/apple.png";
    if (os === "windows") return "/download/windows.svg";
    if (os === "linux") return "/download/Linux.png";
    return "/download/windows.svg";
  }, [os]);

  const downloadBtnText = useMemo(() => {
    if (os === "mac") return "Download for macOS";
    if (os === "windows") return "Download for Windows";
    if (os === "linux") return "Download for Linux";
    return "Download for Windows";
  }, [os]);

  return (
    <div className="relative overflow-hidden pt-16">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pb-20">
        <div className="w-full max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-blue-900 via-teal-600 to-emerald-700 p-12 sm:p-16 md:p-20 lg:p-28 pb-32 sm:pb-40 md:pb-48 lg:pb-56">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 pt-8">
            The AI Database Co-Pilot
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Knows your database. Fixes all problems. No more manual work.
          </p>
          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap relative z-30">
            <button
              className={cn(
                "flex items-center gap-2 px-6 py-3 bg-gray-800 text-white border border-white rounded-lg hover:bg-gray-700 transition-colors"
              )}
              onClick={() => setShowDownloadDialog(true)}
            >
              <Image
                src={imageUrl}
                alt={os}
                width={20}
                height={20}
                className={cn("w-4 h-4 object-contain", os === "mac" && "-mt-0.5")}
              />
              {downloadBtnText}
            </button>
            <Link
              href="/contact"
              className="px-6 py-3 bg-gray-200 text-gray-800 border border-white rounded-lg hover:bg-gray-300 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
        {/* Main Visual - Co-Pilot Diagram, overlaps gradient */}
        <div className="w-full max-w-4xl mx-auto -mt-20 sm:-mt-28 md:-mt-36 lg:-mt-44 relative z-10">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <Image
              src="/co-pilot-diagram.png"
              alt="AI Co-Pilot Interface"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
      {/* Clients Section */}
      <div className="space-y-5 relative overflow-hidden text-center bg-black w-full py-8 mt-8">
        <h3 className="text-xl md:text-2xl leading-tight font-medium text-white">
          Trusted By
        </h3>
        <Logos />
      </div>
      {/* Download Dialog */}
      {showDownloadDialog && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-black rounded-2xl shadow-2xl w-full max-w-lg border">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Download Incerto
                </h3>
              </div>
              <button
                onClick={() => setShowDownloadDialog(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <DownloadForm
                os={os}
                platform={architecture}
                setShowDialog={setShowDownloadDialog}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
