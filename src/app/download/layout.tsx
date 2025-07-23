import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Incerto - AI-Powered Database Co-Pilot",
  description: "Download Incerto's AI-powered database co-pilot for Windows, macOS, and Linux. Get real-time database monitoring, intelligent insights, and automated problem resolution.",
  keywords: "download incerto, database co-pilot download, AI database tool, database monitoring software, database management tool download",
  openGraph: {
    title: "Download Incerto - AI-Powered Database Co-Pilot",
    description: "Download Incerto's AI-powered database co-pilot for Windows, macOS, and Linux. Get real-time database monitoring and intelligent insights.",
    type: "website",
    url: "https://incerto.com/download",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Incerto - AI-Powered Database Co-Pilot",
    description: "Download Incerto's AI-powered database co-pilot for Windows, macOS, and Linux. Get real-time database monitoring and intelligent insights.",
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 