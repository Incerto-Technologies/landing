"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Sparkles, Gift, X, WatchIcon, Clock } from "lucide-react";
import Image from "next/image";
import { DownloadForm } from "@/components/download/download-form";

export default function DownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<
    "windows" | "mac" | "linux"
  >("mac");
  const [showDialog, setShowDialog] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState<{
    platform: string;
    architecture?: string;
  } | null>(null);

  const handleDownloadClick = (platform: string, architecture?: string) => {
    setDownloadInfo({ platform, architecture });
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setDownloadInfo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative overflow-hidden py-10">
      {/* Floating Elements Background */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-slate-200/30 to-gray-200/30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 border shadow-sm">
            <Sparkles className="w-4 h-4" />
            AI-Powered Database Monitoring
          </div>
          <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-8 tracking-tight">
            Download
          </h1>
        </div>

        {/* Platform Tabs */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setSelectedPlatform("windows")}
            className={`flex items-center gap-3 px-8 py-4 rounded-full border transition-all duration-300 ${
              selectedPlatform === "windows"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/80 text-foreground border-border hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <div className="w-5 h-5 relative">
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
            className={`flex items-center gap-3 px-8 py-4 rounded-full border transition-all duration-300 ${
              selectedPlatform === "mac"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/80 text-foreground border-border hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <div className="w-5 h-5 relative -mt-2">
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
            className={`flex items-center gap-3 px-8 py-4 rounded-full border transition-all duration-300 ${
              selectedPlatform === "linux"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/80 text-foreground border-border hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <div className="w-5 h-5 relative">
              <Image
                src="/download/linux.png"
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
        <div className="bg-card/95 backdrop-blur-sm rounded-3xl p-12 max-w-4xl w-full text-center border shadow-2xl">
          {selectedPlatform === "windows" && (
            <>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Gift className="w-4 h-4" />
                Limited Time Offer
              </div>
              <h2 className="text-4xl font-bold text-card-foreground mb-3">
                Get your AI Co-Pilot Now
              </h2>
              <p className="text-xl font-semibold text-emerald-600 mb-8">
                First 100 users get unlimited Anthropic credits
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Compatible with Windows 10 and Windows 11
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                <Badge variant="secondary">Windows 10</Badge>
                <Badge variant="secondary">Windows 11</Badge>
                <Badge variant="secondary">64-bit</Badge>
              </div>
              <Button
                onClick={() => handleDownloadClick("windows")}
                className="px-10 py-6 rounded-full text-lg font-medium shadow-lg hover:shadow-xl"
                size="lg"
              >
                <Clock className="w-5 h-5" />
                Join the waitlist
              </Button>
            </>
          )}

          {selectedPlatform === "mac" && (
            <>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Gift className="w-4 h-4" />
                Limited Time Offer
              </div>
              <h2 className="text-4xl font-bold text-card-foreground mb-3">
                Get your AI Co-Pilot Now
              </h2>
              <p className="text-xl font-semibold text-emerald-600 mb-8">
                First 100 users get unlimited Anthropic credits
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Choose your Mac processor type
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-accent/50 backdrop-blur-sm rounded-2xl p-8 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  {/* <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Image
                      src="/icons/intel.svg"
                      alt="Intel"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div> */}
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    Intel Chip
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    For Macs with Intel processors
                  </p>
                  <Button
                    onClick={() => handleDownloadClick("mac", "intel")}
                    className="w-full rounded-full font-medium"
                  >
                    <Clock className="w-5 h-5" />
                    Join the waitlist
                  </Button>
                </div>

                <div className="bg-accent/50 backdrop-blur-sm rounded-2xl p-8 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
                  {/* <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Image
                      src="/icons/apple.svg"
                      alt="Apple Silicon"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div> */}
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    Apple Chip
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    For Macs with Apple Silicon
                  </p>
                  <Button
                    onClick={() => handleDownloadClick("mac", "apple")}
                    className="w-full rounded-full font-medium"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Apple Chip
                  </Button>
                </div>
              </div>
            </>
          )}

          {selectedPlatform === "linux" && (
            <>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Gift className="w-4 h-4" />
                Limited Time Offer
              </div>
              <h2 className="text-4xl font-bold text-card-foreground mb-3">
                Get your AI Co-Pilot Now
              </h2>
              <p className="text-xl font-semibold text-emerald-600 mb-8">
                First 100 users get unlimited Anthropic credits
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Choose your system architecture
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                <Badge variant="secondary">Ubuntu</Badge>
                <Badge variant="secondary">Debian</Badge>
                <Badge variant="secondary">CentOS</Badge>
                <Badge variant="secondary">RHEL</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-accent/50 backdrop-blur-sm rounded-2xl p-8 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  {/* <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Image
                      src="/icons/cpu.svg"
                      alt="x86_64"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div> */}
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    x86_64
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    For Intel/AMD 64-bit systems
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <Badge variant="outline">Intel x64</Badge>
                    <Badge variant="outline">AMD x64</Badge>
                  </div>
                  <Button
                    onClick={() => handleDownloadClick("linux", "x86")}
                    className="w-full rounded-full font-medium"
                  >
                    <Clock className="w-5 h-5" />
                    Join the waitlist
                  </Button>
                </div>

                <div className="bg-accent/50 backdrop-blur-sm rounded-2xl p-8 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  {/* <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Image
                      src="/icons/arm.svg"
                      alt="ARM64"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div> */}
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    ARM64
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    For ARM-based systems
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <Badge variant="outline">ARM Cortex</Badge>
                    <Badge variant="outline">Apple M-series</Badge>
                  </div>
                  <Button
                    onClick={() => handleDownloadClick("linux", "arm")}
                    className="w-full rounded-full font-medium"
                  >
                    <Clock className="w-5 h-5" />
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
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg border">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Download Incerto
                </h3>
                {/* <p className="text-sm text-muted-foreground mt-1">
                  {downloadInfo?.platform}{" "}
                  {downloadInfo?.architecture &&
                    `(${downloadInfo.architecture})`}
                </p> */}
              </div>
              <button
                onClick={closeDialog}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <DownloadForm
                canDownload={
                  downloadInfo?.platform === "mac" &&
                  downloadInfo?.architecture === "apple" &&
                  downloadInfo?.architecture === "apple"
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
