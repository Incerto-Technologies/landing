import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Choose Your Incerto Database AI Plan",
  description:
    "Explore Incerto's flexible pricing plans for AI-powered database management. From free starter to enterprise solutions with unlimited databases, users, and AI credits. Start optimizing your database performance today.",
  keywords:
    "incerto pricing, database AI pricing, database management cost, database monitoring pricing, AI database plans, enterprise database solution",
  openGraph: {
    title: "Pricing - Choose Your Incerto Database AI Plan",
    description:
      "Explore Incerto's flexible pricing plans for AI-powered database management. From free starter to enterprise solutions.",
    type: "website",
    url: "https://incerto.in/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing - Choose Your Incerto Database AI Plan",
    description:
      "Explore Incerto's flexible pricing plans for AI-powered database management. From free starter to enterprise solutions.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
