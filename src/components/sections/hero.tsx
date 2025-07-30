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
    <div className="relative overflow-hidden pt-8 sm:pt-16">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pb-12 sm:pb-20">
        <div className="w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-900 via-teal-600 to-emerald-700 py-8 px-4 sm:py-10 sm:px-3 md:p-28 lg:p-32 xl:p-40 pb-16 sm:pb-20 md:pb-48 lg:pb-56 xl:pb-64 2xl:pb-72">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 pt-4 sm:pt-8">
            The AI Database Co-Pilot
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto px-2">
            Knows your database. Fixes all problems. No more manual work.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap relative z-30 px-2">
            <button
              className={cn(
                "flex items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-white text-gray-900 border border-white rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all w-full sm:w-auto text-base sm:text-lg font-semibold shadow-md"
              )}
              onClick={() => setShowDownloadDialog(true)}
            >
              <Image
                src={imageUrl}
                alt={os}
                width={24}
                height={24}
                className={cn(
                  "w-5 h-5 object-contain",
                  os === "mac" && "-mt-0.5"
                )}
              />
              {downloadBtnText}
            </button>
            <Link
              href="/contact"
              className="px-6 sm:px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-gray-900 transition-all w-full sm:w-auto text-base sm:text-lg font-medium text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
        {/* Main Visual - Co-Pilot Diagram, overlaps gradient */}
        <div className="w-full max-w-4xl mx-auto -mt-12 sm:-mt-16 md:-mt-28 lg:-mt-36 xl:-mt-44 relative z-10 px-3">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl overflow-hidden">
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
      <div className="space-y-4 sm:space-y-5 relative overflow-hidden text-center bg-black w-full py-6 sm:py-8 mt-4 sm:mt-8">
        <h3 className="text-lg sm:text-xl md:text-2xl leading-tight font-medium text-white px-4">
          Trusted By
        </h3>
        <Logos />
      </div>
      {/* Download Dialog */}
      {showDownloadDialog && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-black rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg border mx-4">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-card-foreground">
                  Get Incerto
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Download for{" "}
                  {os === "mac"
                    ? "macOS"
                    : os === "windows"
                    ? "Windows"
                    : "Linux"}
                </p>
              </div>
              <button
                onClick={() => setShowDownloadDialog(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
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
