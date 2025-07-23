import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import TailwindIndicator from "@/components/tailwind-indicator";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Script from "next/script";
import { VideoProvider } from "@/components/ui/video-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code",
});

export const metadata: Metadata = {
  title: {
    default: "Incerto - Agentic AI That Solves All Database Problems",
    template: "%s | Incerto"
  },
  description:
    "Gain full visibility into your database performance with real-time monitoring and intelligent insights. Instantly detect anomalies, identify root causes, and take corrective actions with our AI-powered database management solution.",
  keywords: "database monitoring, AI database management, database performance, database optimization, real-time monitoring, database insights, database co-pilot, database automation",
  authors: [{ name: "Incerto Team" }],
  creator: "Incerto",
  publisher: "Incerto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://incerto.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Incerto - Agentic AI That Solves All Database Problems",
    description: "Gain full visibility into your database performance with real-time monitoring and intelligent insights.",
    url: "https://incerto.com",
    siteName: "Incerto",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Incerto - Agentic AI That Solves All Database Problems",
    description: "Gain full visibility into your database performance with real-time monitoring and intelligent insights.",
    creator: "@incerto",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="clarity-script" src="/js/clarity.js" />
        <Script id="gtag-script" src="/js/gtag.js" />
        <Script
          id="clarity-script"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17224396662"
          async
        />
      </head>
      <body
        className={`${inter.variable} ${sourceCodePro.variable} font-sans antialiased`}
      >
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <VideoProvider>
              <Navbar />
              {children}
              <Footer />
              <TailwindIndicator />
            </VideoProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
