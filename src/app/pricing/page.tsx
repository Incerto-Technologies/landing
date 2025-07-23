"use client";

import { useState } from "react";
import { FAQSection } from "@/components/faq-section";
import CTA from "@/components/sections/cta";
import SectionContainer from "@/components/layouts/section-container";
import { CurrencyToggle, type Currency, currencySymbols, exchangeRates } from "@/components/currency-toggle";
import { CheckIcon, X } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { DownloadForm } from "@/components/download/download-form";
import { getUserOS } from "@/lib/get-user-os";
import { useMemo } from "react";
import Image from "next/image";

const pricingPlans = [
  {
    title: "STARTER",
    price: 0,
    buttonText: "Download Now",
    buttonVariant: "primary" as const,
    features: [
      "Single Database",
      "Hosted in your PC",
      "Single User",
      "Unlimited Alerts",
      "Limited AI Credits",
    ],
  },
  {
    title: "STANDARD",
    price: 149,
    buttonText: "Contact Us",
    buttonVariant: "primary" as const,
    features: [
      "Upto 10 Databases",
      "Hosted in your Cloud",
      "Unlimited Users",
      "Unlimited Alerts",
      "Unlimited AI Credits",
      "Limited Integrations",
      "Priority Slack Support & SLAs",
    ],
  },
  {
    title: "ENTERPRISE",
    price: "Custom",
    buttonText: "Contact Us",
    buttonVariant: "primary" as const,
    features: [
      "Unlimited Databases",
      "Hosted in your Cloud",
      "Unlimited Users",
      "Unlimited Alerts",
      "Custom Integrations",
      "Unlimited AI Credits",
      "24×7×365 premium enterprise support",
    ],
  },
];

export default function PricingPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD");
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("windows");
  const { os, architecture } = getUserOS();

  const formatPrice = (price: number | string) => {
    if (typeof price === "string") return price;
    const numericPrice = price * exchangeRates[selectedCurrency];
    return formatCurrency(numericPrice, selectedCurrency, "standard");
  };

  const getPlatformDisplayText = () => {
    const platformMap: Record<string, string> = {
      windows: "Windows",
      mac: "macOS",
      linux: "Linux"
    };
    
    const architectureMap: Record<string, string> = {
      apple: "Apple Silicon",
      intel: "Intel Chip",
      x64: "x64",
      x86: "x86_64",
      arm: "ARM64"
    };

    const platformText = platformMap[os] || os;
    const architectureText = architecture ? architectureMap[architecture] : "";
    
    const result = architectureText ? `${platformText} (${architectureText})` : platformText;
    
    // Debug logging
    console.log("OS:", os);
    console.log("Architecture:", architecture);
    console.log("Platform display text:", result);
    
    return result;
  };

  const getDownloadButtonText = () => {
    if (os === "mac") return "Download for macOS";
    if (os === "windows") return "Download for Windows";
    if (os === "linux") return "Download for Linux";
    return "Download Now";
  };

  const handleStarterButtonClick = () => {
    setShowDownloadDialog(true);
  };

  return (
    <main className="">

      <SectionContainer className="flex flex-col items-center justify-center space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold md:font-medium md:text-4xl sm:leading-none text-foreground">
            Pricing
          </h1>
          <p className="mt-2 text-base md:text-lg text-muted-foreground">
            Whether you are a small company or a large enterprise – we have the right plan for you. 
            <br />
            <Link href="/contact" className="text-primary">Contact us</Link> for custom requirements like annual plans or compare our plans below.
          </p>
        </div>

        <CurrencyToggle onCurrencyChange={setSelectedCurrency} />

        {/* Pricing Cards */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col p-8 bg-card rounded-lg border border-border shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-card-foreground">{plan.title}</h3>
                <div className="mt-4 flex items-baseline text-card-foreground">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {formatPrice(plan.price)}
                  </span>
                  {typeof plan.price === "number" && (
                    <span className="ml-1 text-xl font-semibold">/Monthly/DB</span>
                  )}
                </div>
                <ul role="list" className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500" />
                      <span className="ml-3 text-base text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {plan.title === "STARTER" ? (
                <button
                  onClick={handleStarterButtonClick}
                  className={`mt-8 block w-full px-6 py-3 text-center text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                >
                  {getDownloadButtonText()}
                </button>
              ) : (
                <a
                  href="/contact"
                  className={`mt-8 block w-full px-6 py-3 text-center text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                >
                  {plan.buttonText}
                </a>
              )}
            </div>
          ))}
        </div>

       
      </SectionContainer>

      {/* Download Form Dialog */}
      {showDownloadDialog && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-black rounded-2xl shadow-2xl w-full max-w-lg border">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Download Incerto
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {getPlatformDisplayText()}
                </p>
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

      <FAQSection />
      <CTA />
    </main>
  );
}
