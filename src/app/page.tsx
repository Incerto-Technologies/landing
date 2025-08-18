import Hero from "@/components/sections/hero";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

const Features = dynamic(() => import("@/components/sections/features"));
const Impact = dynamic(() => import("@/components/sections/impact"));
const CTA = dynamic(() => import("@/components/sections/cta"));
const Feedback = dynamic(() => import("@/components/sections/feedback"));

export const metadata: Metadata = {
  title: "Incerto - Agentic AI That Solves All Database Problems",
  description:
    "Gain full visibility into your database performance with real-time monitoring and intelligent insights. Instantly detect anomalies, identify root causes, and take corrective actions with our AI-powered database management solution.",
  keywords:
    "database monitoring, AI database management, database performance, database optimization, real-time monitoring, database insights",
  openGraph: {
    title: "Incerto - Agentic AI That Solves All Database Problems",
    description:
      "Gain full visibility into your database performance with real-time monitoring and intelligent insights.",
    type: "website",
    url: "https://incerto.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "Incerto - Agentic AI That Solves All Database Problems",
    description:
      "Gain full visibility into your database performance with real-time monitoring and intelligent insights.",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Impact />
      <Features />
      <Feedback />
      <CTA />
    </main>
  );
}
