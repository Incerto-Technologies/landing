"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Monitor,
  Apple,
  Terminal,
  Cpu,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export default function DownloadPage() {
  const [selectedMacChip, setSelectedMacChip] = useState<
    "intel" | "apple" | null
  >(null);
  const [selectedLinuxArch, setSelectedLinuxArch] = useState<
    "x86" | "arm" | null
  >(null);

  const handleDownload = (platform: string, architecture?: string) => {
    // This would be replaced with actual download logic
    console.log(
      `Downloading for ${platform}${architecture ? ` - ${architecture}` : ""}`
    );
    // You can replace this with actual download URLs
    const downloadUrl =
      "https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7kGWPavetwzn7PHqYpkabNj2oW31dAt8lGgTZ";
    window.open(downloadUrl, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Download Incerto
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your AI-powered database monitoring tool for your platform
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <Tabs defaultValue="windows" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
              <TabsTrigger
                value="windows"
                className="flex items-center gap-2 text-base"
              >
                <Monitor className="w-5 h-5" />
                Windows
              </TabsTrigger>
              <TabsTrigger
                value="mac"
                className="flex items-center gap-2 text-base"
              >
                <Apple className="w-5 h-5" />
                macOS
              </TabsTrigger>
              <TabsTrigger
                value="linux"
                className="flex items-center gap-2 text-base"
              >
                <Terminal className="w-5 h-5" />
                Linux
              </TabsTrigger>
            </TabsList>

            <TabsContent value="windows" className="mt-0">
              <div className="text-center py-12">
                <div className="mb-8">
                  <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <Image
                      src="/download/windows.svg"
                      alt="Windows"
                      width={96}
                      height={96}
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Windows Desktop
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Compatible with Windows 10 and Windows 11
                  </p>
                </div>
                <Button
                  onClick={() => handleDownload("windows")}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download for Windows
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="mac" className="mt-0">
              <div className="text-center py-8">
                <div className="mb-8">
                  <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <Image
                      src="/download/apple.png"
                      alt="Mac"
                      width={96}
                      height={96}
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Get your AI Co-Pilot Now
                  </h3>
                  <p className="text-lg text-green-600 font-medium mb-6">
                    First 100 users get unlimited Anthropic credits
                  </p>
                  <p className="text-gray-600 mb-8">
                    Choose your Mac processor type
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      selectedMacChip === "intel"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedMacChip("intel")}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <Cpu className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Intel Chip
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      For Macs with Intel processors
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload("mac", "intel");
                      }}
                      variant={
                        selectedMacChip === "intel" ? "default" : "outline"
                      }
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Intel
                    </Button>
                  </div>

                  <div
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      selectedMacChip === "apple"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedMacChip("apple")}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <Apple className="w-8 h-8 text-gray-800" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Apple Chip
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      For Macs with M1, M2, M3, or M4
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload("mac", "apple");
                      }}
                      variant={
                        selectedMacChip === "apple" ? "default" : "outline"
                      }
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Apple Silicon
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="linux" className="mt-0">
              <div className="text-center py-8">
                <div className="mb-8">
                  <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <Image
                      src="/download/linux.png"
                      alt="Linux"
                      width={96}
                      height={96}
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Linux Distribution
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Choose your system architecture
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      selectedLinuxArch === "x86"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedLinuxArch("x86")}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <Cpu className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      x86_64
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      For Intel/AMD 64-bit systems
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload("linux", "x86");
                      }}
                      variant={
                        selectedLinuxArch === "x86" ? "default" : "outline"
                      }
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download x86_64
                    </Button>
                  </div>

                  <div
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      selectedLinuxArch === "arm"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedLinuxArch("arm")}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <Cpu className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      ARM64
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      For ARM-based systems
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload("linux", "arm");
                      }}
                      variant={
                        selectedLinuxArch === "arm" ? "default" : "outline"
                      }
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download ARM64
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            By downloading, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
