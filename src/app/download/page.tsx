"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Sparkles, Gift, X, WatchIcon, Clock } from "lucide-react";
import Image from "next/image";
import { DownloadForm } from "@/components/download/download-form";
import { UserArchitecture, UserOS } from "@/lib/get-user-os";
import Link from "next/link";

export default function DownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<
    "windows" | "mac" | "linux"
  >("mac");
  const [showDialog, setShowDialog] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState<{
    platform: UserOS;
    architecture?: UserArchitecture;
  } | null>(null);

  const handleDownloadClick = (
    platform: UserOS,
    architecture?: UserArchitecture
  ) => {
    setDownloadInfo({ platform, architecture });
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setDownloadInfo(null);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-6 lg:py-10">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm text-foreground px-3 py-2 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium mb-4 lg:mb-6 border shadow-sm">
            <Sparkles className="w-3 h-3 lg:w-4 lg:h-4" />
            AI-Powered Database Co-Pilot
          </div>
          <h1 className="text-4xl lg:text-7xl xl:text-9xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-6 lg:mb-8 tracking-tight">
            Download
          </h1>
          
          {/* Security Message */}
          <div className="max-w-2xl mx-auto p-4 lg:p-6 bg-green-950/20 dark:bg-green-950/30 backdrop-blur-sm rounded-xl border border-green-800/30 text-sm lg:text-base text-green-100 mb-4 lg:mb-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-green-400 text-xl">🛡️</span>
              <div className="text-center">
                <span className="font-semibold text-green-200">100% secure & private.</span> 
                <span className="ml-1 text-green-100">Everything stays on your servers - we never see your data.</span>
                <Link
                  href="/blogs/safe-co-pilot"
                  className="text-green-300 hover:text-green-200 hover:underline ml-2 font-medium transition-colors"
                >
                  Learn how we keep you safe →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mb-8 lg:mb-12 w-full max-w-md lg:max-w-none justify-center items-center">
          <button
            onClick={() => setSelectedPlatform("windows")}
            className={`flex items-center justify-center gap-2 lg:gap-3 px-4 lg:px-8 py-3 lg:py-4 rounded-full border transition-all duration-300 text-sm lg:text-base w-full lg:w-auto ${
              selectedPlatform === "windows"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/80 text-foreground border-border hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <div className="w-4 h-4 lg:w-5 lg:h-5 relative">
              <Image
                src="/download/windows.svg"
                alt="Windows"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            Windows
          </button>
          <button
            onClick={() => setSelectedPlatform("mac")}
            className={`flex items-center justify-center gap-2 lg:gap-3 px-4 lg:px-8 py-3 lg:py-4 rounded-full border transition-all duration-300 text-sm lg:text-base w-full lg:w-auto ${
              selectedPlatform === "mac"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/80 text-foreground border-border hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <div className="w-4 h-4 lg:w-5 lg:h-5 relative -mt-1 lg:-mt-2">
              <Image
                src="/download/apple.png"
                alt="macOS"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            Mac
          </button>
          <button
            onClick={() => setSelectedPlatform("linux")}
            className={`flex items-center justify-center gap-2 lg:gap-3 px-4 lg:px-8 py-3 lg:py-4 rounded-full border transition-all duration-300 text-sm lg:text-base w-full lg:w-auto ${
              selectedPlatform === "linux"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/80 text-foreground border-border hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <div className="w-4 h-4 lg:w-5 lg:h-5 relative">
              <Image
                src="/download/Linux.png"
                alt="Linux"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            Linux
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-12 max-w-4xl w-full text-center border shadow-2xl mx-4 lg:mx-0">
          {selectedPlatform === "windows" && (
            <>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-semibold mb-4 lg:mb-6">
                <Gift className="w-3 h-3 lg:w-4 lg:h-4" />
                Limited Time Offer
              </div>
              <h2 className="text-2xl lg:text-4xl font-bold text-card-foreground mb-2 lg:mb-3">
                Get your AI Co-Pilot Now
              </h2>
              <p className="text-lg lg:text-xl font-semibold text-emerald-600 mb-6 lg:mb-8">
                First 100 users get unlimited Anthropic credits
              </p>
              <p className="text-muted-foreground text-base lg:text-lg mb-6 lg:mb-8">
                Compatible with Windows 10 and Windows 11
              </p>
              <div className="flex flex-wrap gap-2 lg:gap-3 justify-center mb-6 lg:mb-8">
                <Badge variant="secondary" className="text-xs lg:text-sm">
                  Windows 10
                </Badge>
                <Badge variant="secondary" className="text-xs lg:text-sm">
                  Windows 11
                </Badge>
                <Badge variant="secondary" className="text-xs lg:text-sm">
                  64-bit
                </Badge>
              </div>
              <Button
                onClick={() => handleDownloadClick("windows", "x64")}
                className="rounded-full font-bold w-full lg:w-auto"
                size="lg"
              >
                <Download className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Download
              </Button>
            </>
          )}

          {selectedPlatform === "mac" && (
            <>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-semibold mb-4 lg:mb-6">
                <Gift className="w-3 h-3 lg:w-4 lg:h-4" />
                Limited Time Offer
              </div>
              <h2 className="text-2xl lg:text-4xl font-bold text-card-foreground mb-2 lg:mb-3">
                Get your AI Co-Pilot Now
              </h2>
              <p className="text-lg lg:text-xl font-semibold text-emerald-600 mb-6 lg:mb-8">
                First 100 users get unlimited Anthropic credits
              </p>
              <p className="text-muted-foreground text-base lg:text-lg mb-6 lg:mb-8">
                Choose your Mac processor type
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-2xl mx-auto">
                <div className="bg-accent/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 lg:p-8 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg lg:text-xl font-bold text-card-foreground mb-2">
                    Intel Chip
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 lg:mb-6">
                    For Macs with Intel processors
                  </p>
                  <Button
                    onClick={() => handleDownloadClick("mac", "intel")}
                    variant={"outline"}
                    className="w-full rounded-full text-primary border-2 font-semibold"
                  >
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    Join the waitlist
                  </Button>
                </div>

                <div className="bg-accent/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 lg:p-8 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
                  <h3 className="text-lg lg:text-xl font-bold text-card-foreground mb-2">
                    Apple Chip
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 lg:mb-6">
                    For Macs with Apple Silicon
                  </p>
                  <Button
                    onClick={() => handleDownloadClick("mac", "apple")}
                    className="w-full rounded-full font-bold"
                  >
                    <Download className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    Apple Chip
                  </Button>
                </div>
              </div>
            </>
          )}

          {selectedPlatform === "linux" && (
            <>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-semibold mb-4 lg:mb-6">
                <Gift className="w-3 h-3 lg:w-4 lg:h-4" />
                Limited Time Offer
              </div>
              <h2 className="text-2xl lg:text-4xl font-bold text-card-foreground mb-2 lg:mb-3">
                Get your AI Co-Pilot Now
              </h2>
              <p className="text-lg lg:text-xl font-semibold text-emerald-600 mb-6 lg:mb-8">
                First 100 users get unlimited Anthropic credits
              </p>
              <p className="text-muted-foreground text-base lg:text-lg mb-6 lg:mb-8">
                Choose your system architecture
              </p>
              <div className="flex flex-wrap gap-2 lg:gap-3 justify-center mb-6 lg:mb-8">
                <Badge variant="secondary" className="text-xs lg:text-sm">
                  Ubuntu
                </Badge>
                <Badge variant="secondary" className="text-xs lg:text-sm">
                  Debian
                </Badge>
                <Badge variant="secondary" className="text-xs lg:text-sm">
                  CentOS
                </Badge>
                <Badge variant="secondary" className="text-xs lg:text-sm">
                  RHEL
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-2xl mx-auto">
                <div className="bg-accent/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 lg:p-8 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg lg:text-xl font-bold text-card-foreground mb-2">
                    x86_64
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 lg:mb-6">
                    For Intel/AMD 64-bit systems
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4 lg:mb-6">
                    <Badge variant="outline" className="text-xs lg:text-sm">
                      Intel x64
                    </Badge>
                    <Badge variant="outline" className="text-xs lg:text-sm">
                      AMD x64
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleDownloadClick("linux", "x86")}
                    className="w-full rounded-full text-primary border-2 font-semibold"
                    variant={"outline"}
                  >
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    Join the waitlist
                  </Button>
                </div>

                <div className="bg-accent/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 lg:p-8 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg lg:text-xl font-bold text-card-foreground mb-2">
                    ARM64
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 lg:mb-6">
                    For ARM-based systems
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4 lg:mb-6">
                    <Badge variant="outline" className="text-xs lg:text-sm">
                      ARM Cortex
                    </Badge>
                    <Badge variant="outline" className="text-xs lg:text-sm">
                      Apple M-series
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleDownloadClick("linux", "arm")}
                    className="w-full rounded-full text-primary border-2 font-semibold"
                    variant={"outline"}
                  >
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    Join the waitlist
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Download Form Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-black rounded-xl lg:rounded-2xl shadow-2xl w-full max-w-lg border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 lg:p-6 border-b">
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-card-foreground">
                  Download Incerto
                </h3>
              </div>
              <button
                onClick={closeDialog}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>

            <div className="p-4 lg:p-6">
              <DownloadForm
                os={downloadInfo?.platform || ""}
                platform={downloadInfo?.architecture || ""}
                setShowDialog={setShowDialog}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
